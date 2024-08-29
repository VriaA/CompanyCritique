"use client"
import { MessagesContext } from "@/contexts/MessagesContext"
import { useContext, useRef, useEffect } from "react"
import Loader from "./Loader"
import DarkLoader from "./dark_loader"
import Markdown from "react-markdown"

export default function Messages({ darkMode }) {
  const { messages, message, setMessage, sendMessage } = useContext(MessagesContext)
  const messagesEndRef = useRef(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])
  
  const handleSendMessage = () => {
    if (message.trim()) {
      sendMessage();
    }
  };

  return (
    <div className="flex flex-col h-full font-Inter">
      <div className="flex-1 overflow-y-auto">
        <div className="flex flex-col gap-4 flex-grow w-full max-w-[800px] mb-4 mx-auto px-4">
          {messages.map((message, index) => {
            const isAssistant = message.role === "assistant";
            return (
              <div key={`message-${index + 1}`} className={`w-full flex ${isAssistant ? 'justify-end' : 'justify-start'}`}>
                {isAssistant ? (
                  <div className={`flex items-start rounded-lg p-[1px] bg-gradient-to-r from-[#F6A856] via-[#8091F6] to-[#5661F6] max-w-[80%]`}>
                    <div className={`flex items-start w-full rounded-lg p-4 bg-white`}>
                      <div className="flex-grow">
                        <p className="font-semibold mb-5">
                          <span className={`${darkMode ? "text-white" : "text-black"}`}>Company</span>
                          <span className="bg-gradient-to-r from-[#F6A856] via-[#8091F6] to-[#5661F6] text-transparent bg-clip-text">Critique</span>
                        </p>
                        <div className={`${darkMode ? "text-sm text-white" : "text-sm text-black"}`}> {/* Changed text color to white */}
                          {message.content ? (
                            <Markdown>{message.content}</Markdown>
                          ) : (
                            darkMode ? <Loader /> : <DarkLoader />
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="flex items-start rounded-lg p-4 max-w-[80%]">
                    <span className="flex-shrink-0 mr-2">
                      <img src="images/3d_avatar_24.svg" alt="User" className="w-7 h-7" />
                    </span>
                    <div className={darkMode ? "text-sm text-white" : "text-sm text-black"}>
                      {message.content ? (
                        <Markdown>{message.content}</Markdown>
                      ) : (
                        darkMode ? <Loader /> : <DarkLoader />
                      )}
                    </div>
                  </div>
                )}
              </div>
            )
          })}
          <div ref={messagesEndRef} />
        </div>
      </div>
      <div className="sticky bottom-0 p-4 flex justify-center bg-inherit">
        <div className="w-3/5 h-12 p-[1px] bg-gradient-to-r from-[#F6A856] via-[#8091F6] to-[#5661F6] rounded-lg">
          <div className={`relative flex items-center w-full h-full ${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg`}>
            <div className="absolute left-2 flex items-center">
              <span className="p-1">
                <img src="images/brain.png" alt="Brain" className="w-5 h-5 drop-shadow-md" />
              </span>
            </div>
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Type your message..."
              className="w-full h-full pl-10 pr-12 bg-transparent rounded-lg outline-none font-lato text-sm"
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
            />
            <div className="absolute right-2 flex items-center">
              <button className="p-1" onClick={handleSendMessage}>
                <img src="images/send.svg" alt="Send" className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
