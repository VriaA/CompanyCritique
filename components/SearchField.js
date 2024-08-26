import { useContext } from "react"
import { MessagesContext } from "@/contexts/MessagesContext"

export default function SearchField() {
  const { sendMessage, setMessage, message } = useContext(MessagesContext)
  return (
    <form
      onSubmit={sendMessage}
      className="w-full max-w-[700px]">
      <input
        type="text"
        className="resize-none bg-transparent border border-lime-600"
        placeholder="Type a message..."
        dir="auto"
        onChange={(e) => setMessage(e.target.value)}
        value={message}
      />
      <button>Send</button>
    </form>
  )
}
