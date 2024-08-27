"use client"

import { useEffect, useState } from "react"

export default function useMessage() {
  const [messages, setMessages] = useState([])
  const [message, setMessage] = useState("")

  useEffect(() => {
    // SCROLL TO THE BOTTOM WHEN A NEW MESSAGE IS ADDED
    window.scroll({
      top: document.body.scrollHeight,
      behavior: "smooth",
    })
  }, [messages])

  async function sendMessage(event) {
    if (event && event.preventDefault) {
      event.preventDefault();
    }

    if (!message.trim()) return;

    setMessage("") // Clear the message after it's sent
    setMessages((messages) => [
      ...messages,
      { role: "user", content: message }, // Add user message
      { role: "assistant", content: "" }, // Prepare for the assistant's response
    ])

    try {
      // ---- TO DO ----------------------------------------------> RAG
      //   const rag_response = await fetch("/api/rag", {
      //     method: "POST",
      //     headers: {
      //       "Content-Type": "application/json",
      //     },
      //     body: JSON.stringify({ question: message }),
      //   });

      //   if (!rag_response.ok) {
      //     throw new Error("Network response was not ok");
      //   }

      //   const { prompt } = await rag_response.json();
      // --------------------------------------------------------

      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify([...messages, { role: "user", content: message }]),
      })

      if (!response.ok) {
        throw new Error("Network response was not ok")
      }

      const reader = response.body.getReader()
      const decoder = new TextDecoder()

      while (true) {
        const { done, value } = await reader.read()
        if (done) break
        const text = decoder.decode(value, { stream: true })

        setMessages((messages) => {
          let lastMessage = messages[messages.length - 1]
          let otherMessages = messages.slice(0, messages.length - 1)
          return [
            ...otherMessages,
            { ...lastMessage, content: lastMessage.content + text },
          ]
        })
      }
    } catch (error) {
      // REPLACES THE EMPTY STRING WITH AN ERROR MESSAGE SO THE LOADER IS REMOVED
      setMessages((messages) => [
        ...messages.slice(0, -1),
        {
          role: "assistant",
          content:
            "I'm sorry, but I encountered an error. Please try again later.",
        },
      ])
    }
  }

  return { messages, setMessages, message, setMessage, sendMessage }
}
