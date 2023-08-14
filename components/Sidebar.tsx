import NewChat from "./NewChat"

function Sidebar() {
  return (
    <div className="p-2 flex flex-col h-screen">
      <div className="flex-1">

            {/* new chat */}
        <NewChat />
        <div>
            {/* model selection */}
        </div>

        {/* Map through chatRow */}
      </div>
    </div>
  )
}

export default Sidebar
