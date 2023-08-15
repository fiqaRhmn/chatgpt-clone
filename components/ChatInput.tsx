'use client'

import { PaperAirplaneIcon } from '@heroicons/react/24/solid'
import { FormEvent, useState } from 'react'
import { useSession } from 'next-auth/react';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { db } from '@/firebase';
import  toast  from 'react-hot-toast';
import ModelSelection from './ModelSelection';
import useSWR from "swr";


type Props = {
    chatId: string;
};

function ChatInput({chatId}: Props) {
    const [prompt, setPrompt] = useState("");
    const { data: session } = useSession();

    const { data: model } = useSWR('model', {
        fallbackData: 'text-davinci-003'
    })
    
    const sendMessage = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (!prompt) return;

        const input = prompt.trim();
        setPrompt("");

        const message: Message = {
            text: input,
            createdAt: serverTimestamp(),
            user: {
                _id: session?.user?.email!,
                name: session?.user?.name!,
                avatar: session?.user?.image! || `https://ui-avatars.com/api/?name=${session?.user?.name!}`,
            }
        }

        await addDoc(
            collection(
                db, 
                'users', 
                session?.user?.email!, 
                'chats', 
                chatId, 
                'messages'
            ),
            message
        );
        
        //toast notification to say loading!
        const notification = toast.loading("ChatGPT is thinking...");
        
        await fetch('/api/askQuestion', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                prompt: input,
                chatId,
                model,
                session,
            }),
        }).then(() => {
            //toast notification to say successful!
            toast.success("ChatGPT has responded!",{
                id: notification,
            })
        });
    };
  

    return (
    <div className='bg-[#40414F] 
    text-sm text-white border-gray-900/50 shadow-xs '>

      <form onSubmit={sendMessage} className='space-x-5 p-5 flex'>
        <input 
            className='bg-transparent focus:outline-none flex-1
            disabled:cursor-not-allowed disabled:text-gray-300'
            disabled={!session}
            type="text" 
            placeholder="Send a messages" 
            value = {prompt}
            onChange={(e) => setPrompt(e.target.value)}
        />
        
        <button 
            disabled={!prompt || !session} 
            type="submit"
            className='enabled:bg-[#11A37F] hover:opacity-50
            text-white font-bold px-4 py-2 rounded
            disabled:bg-transparent disabled:text-gray-400
            disabled:opacity-100 transition-colors'
        >
            <PaperAirplaneIcon className='h-4 w-4 -rotate-45' />
        </button>
      </form>

      <div className='md:hidden'>
        <ModelSelection />
      </div>
    </div>
  )
}

export default ChatInput
