import openai from "./chatgpt";
import sleep from "sleep-promise"; // You need to import a library to implement sleep

const query = async (prompt: string, chatId: string, model: string) => {
  const maxRetries = 5;


      const res = await openai.createCompletion({
        model,
        prompt,
        temperature: 0.8,
        top_p: 1,
        max_tokens: 1000,
        frequency_penalty: 0,
        presence_penalty: 0,
      }).then(res => res.data.choices[0].text)
      .catch(
        (err) =>
        `ChatGPT was unable to find an answer for that! (Error:${err.message})`
    );
    return  res;
    }
    

export default query;
