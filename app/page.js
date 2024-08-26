"use client"

import Messages from "@/components/Messages"
import { MessagesContextProvider } from "@/contexts/MessagesContext"
import SearchField from "@/components/SearchField"

export default function Home() {
  return (
    <main className="flex flex-col items-center">
      <MessagesContextProvider>
        <Messages />
        <SearchField />
      </MessagesContextProvider>
    </main>
  )
}
