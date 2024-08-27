"use client";

import Messages from "@/components/Messages";
import { MessagesContextProvider } from "@/contexts/MessagesContext";
//import SearchField from "@/components/SearchField";

export default function Home() {
  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-60 mt-8 mb-8 ml-5 p-[1px] bg-gradient-to-b from-[#5661F6] via-[#8091F6] to-[#F6A856] rounded-[30px] overflow-hidden">
        <div className="h-full bg-white p-4 flex flex-col items-center rounded-[29px]">
          <button className="mb-6 w-full max-w-[200px] bg-white text-black py-2 px-4 rounded-[12px] relative overflow-hidden
                     before:absolute before:inset-0 before:bg-gradient-to-r before:from-[#5661F6] before:via-[#8091F6] before:to-[#F6A856] before:rounded-[12px]
                     flex items-center justify-center group">
            <span className="absolute inset-[1px] bg-white rounded-[11px] z-0"></span>
            <svg width="0" height="0" className="absolute">
              <defs>
                <linearGradient id="icon-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#5661F6" />
                  <stop offset="50%" stopColor="#8091F6" />
                  <stop offset="100%" stopColor="#F6A856" />
                </linearGradient>
              </defs>
            </svg>
            <img src="/images/plus-circle-svgrepo-com.svg" alt="Plus" className="w-4 h-4 mr-2 relative z-10 filter-gradient" />
            <span className="relative z-10 font-inter text-sm">New chat</span>
          </button>
          <nav className="font-inter text-sm w-full">
            {/* Add your sidebar items here */}
            <button className="mb-7 w-full text-left flex items-center justify-start">
              <img src="/images/ChatText.svg" alt="Google" className="w-5 h-5 mr-2" />
              Current Chat
            </button>
          </nav>
          <div className="flex-grow"></div>
          <div className="flex flex-col items-center justify-center font-inter text-sm w-full mt-8">
            {/* Add bottom sidebar items here */}
            <button className="mb-7 w-full text-left flex items-center justify-start">
              <img src="/images/delete.svg" alt="Google" className="w-5 h-5 mr-2" />
              Clear conversations
            </button>
            <button className="mb-7 w-full text-left flex items-center justify-start">
              <img src="/images/sun-icon.svg" alt="Google" className="w-5 h-5 mr-2" />
              Light mode
            </button>
            <button className="mb-7 w-full text-left flex items-center justify-start">
              <img src="/images/signOut.svg" alt="Google" className="w-5 h-5 mr-2" />
              Learn More
            </button>
          </div>
        </div>
      </aside>

      {/* Main content area */}
      <div className="flex-1 flex flex-col">
        {/* Welcome screen */}
        <main className="flex-1 flex flex-col items-center justify-center p-4 font-inter font-bold gap-8">
          <h1 className="text-4xl font-bold mb-8">
            Company<span className="text-4xl font-bold mb-8 bg-gradient-to-r from-[#5661F6] via-[#8091F6] to-[#F6A856] text-transparent bg-clip-text">Critique</span>
          </h1>
          <h2 className="text-3xl font-bold mb-8 font-lato">Good day! How may I assist you?</h2>
          <div className="flex space-x-4">
            <button className="relative p-[1px] bg-gradient-to-r from-[#5661F6] via-[#8091F6] to-[#F6A856] rounded-lg">
              <span className="block bg-white px-3 py-2 rounded-lg text-sm text-left h-full flex items-center">
                How much is an average software engineer at Amazon paid?
              </span>
            </button>
            <button className="relative p-[1px] bg-gradient-to-r from-[#5661F6] via-[#8091F6] to-[#F6A856] rounded-lg">
              <span className="block bg-white px-3 py-2 rounded-lg text-sm text-left h-full flex items-center">
                Level of diversity among workers at Meta
              </span>
            </button>
            <button className="relative p-[1px] bg-gradient-to-r from-[#5661F6] via-[#8091F6] to-[#F6A856] rounded-lg">
              <span className="block bg-white px-3 py-2 rounded-lg text-sm text-left h-full flex items-center">
                Benefits for employees working at Headstarter
              </span>
            </button>
          </div>
        </main>

        {/* Chat interface */}
        <main className="flex-1 flex flex-col mb-10 mt-0">
          <MessagesContextProvider>
            <Messages />
            <div className="mt-auto p-4">
              <input
                type="text"
                placeholder="Type your message..."
                className="w-full p-2 border border-gray-300 rounded-lg"
              />
            </div>
          </MessagesContextProvider>
        </main>
      </div>
    </div>
  );
}