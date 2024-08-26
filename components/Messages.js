"use client"
import { MessagesContext } from "@/contexts/MessagesContext"
import { useContext } from "react"
import Loader from "./Loader"
import Markdown from "react-markdown"

export default function Messages() {
  const { messages } = useContext(MessagesContext)

  return (
    <div className="flex flex-col gap-4 flex-grow w-full max-w-[700px]">
      {messages.map((message, index) => {
        const hasMessage = message.content
        return (
          <div
            key={`message-${index + 1}`}
            className={`flex w-fit ${
              message.role === "assistant" ? "self-start" : "self-end"
            }`}>
            <div
              className={`message ${
                message.role === "assistant" ? "bg-black" : "bg-lime-600"
              } text-white rounded-2xl ${hasMessage ? "p-3" : "p-2"}`}>
              {hasMessage && <Markdown>{message.content}</Markdown>}
              {!hasMessage && <Loader />}
            </div>
          </div>
        )
      })}
    </div>
  )
}
