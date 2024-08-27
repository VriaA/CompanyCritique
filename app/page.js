"use client";

import Messages from "@/components/Messages";
import { MessagesContextProvider } from "@/contexts/MessagesContext";
import Link from 'next/link';
import { useState, useEffect } from 'react';
//import SearchField from "@/components/SearchField";

export default function Home() {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    // Apply the dark mode class to the body when the component mounts
    if (darkMode) {
      document.body.classList.add('dark');
    } else {
      document.body.classList.remove('dark');
    }
  }, [darkMode]);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <div className={`flex h-screen ${darkMode ? 'bg-[#111111] text-white' : 'bg-gray-100'}`}>
      {/* Sidebar */}
      <aside className={`w-60 mt-8 mb-8 ml-5 p-[1px] bg-gradient-to-b from-[#5661F6] via-[#8091F6] to-[#F6A856] rounded-[30px] overflow-hidden`}>
        <div className={`h-full ${darkMode ? 'bg-[#111111]' : 'bg-white'} p-4 flex flex-col items-center rounded-[29px]`}>
          <button className={`mb-6 w-full max-w-[200px] ${darkMode ? 'bg-[#111111] text-white' : 'bg-white text-black'} py-2 px-4 rounded-[12px] relative overflow-hidden
                     before:absolute before:inset-0 before:bg-gradient-to-r before:from-[#5661F6] before:via-[#8091F6] before:to-[#F6A856] before:rounded-[12px]
                     flex items-center justify-center group`}>
            <span className={`absolute inset-[1px] ${darkMode ? 'bg-[#111111]' : 'bg-white'} rounded-[11px] z-0`}></span>
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
            <span className={`relative z-10 font-inter text-sm ${darkMode ? 'text-white' : 'text-black'}`}>New chat</span>
          </button>
          <nav className="font-inter text-sm w-full">
            {/* Add your sidebar items here */}
            <button className="mb-5 w-full text-left flex items-center justify-start hover:bg-gray-100 rounded-lg transition duration-150 ease-in-out p-2">
              <img src="/images/ChatText.svg" alt="Google" className="w-5 h-5 mr-2" />
              Current Chat
            </button>
          </nav>
          <div className="flex-grow"></div>
          <div className="flex flex-col items-center justify-center font-inter text-sm w-full mt-8">
            {/* Add bottom sidebar items here */}
            <button className="mb-4 w-full text-left flex items-center justify-start hover:bg-gray-100 rounded-lg transition duration-150 ease-in-out p-2">
              <img src={darkMode ? "/images/delete.svg" : "/images/delete.svg"} alt="Clear" className="w-5 h-5 mr-2" />
              Clear conversations
            </button>
            <button onClick={toggleDarkMode} className="mb-4 w-full text-left flex items-center justify-start hover:bg-gray-100 rounded-lg transition duration-150 ease-in-out p-2">
              <img src={darkMode ? "/images/moon.svg" : "/images/sun-icon.svg"} alt={darkMode ? "Dark mode" : "Light mode"} className="w-5 h-5 mr-2" />
              {darkMode ? "Dark mode" : "Light mode"}
            </button>
            <button className="w-full flex items-center justify-start hover:bg-gray-100 rounded-lg transition duration-150 ease-in-out p-2">
                <img src="/images/signOut.svg" alt="Light mode" className="w-5 h-5 mr-2" />
                Learn More
              </button>
          </div>
        </div>
      </aside>

      {/* Main content area */}
      <div className="flex-1 flex flex-col">
        {/* Welcome screen */}
        <main className={`flex-1 flex flex-col items-center justify-center p-4 font-inter font-bold gap-8 ${darkMode ? 'text-white' : ''}`}>
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
            <div className="mt-auto p-4 flex justify-center">
              <div className="w-3/5 h-12 p-[1px] bg-gradient-to-r from-[#F6A856] via-[#8091F6] to-[#5661F6] rounded-lg">
                <div className={`relative flex items-center w-full h-full ${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg`}>
                  <div className="absolute left-2 flex items-center">
                    <button className="p-1">
                      <img src="images/brain.png" alt="Brain" className="w-5 h-5 drop-shadow-md" />
                    </button>
                  </div>
                  <input
                    type="text"
                    placeholder="Type your message..."
                    className="w-full h-full pl-10 pr-12 bg-transparent rounded-lg outline-none font-lato text-sm"
                  />
                  <div className="absolute right-2 flex items-center">
                    <button className="p-1">
                      <img src="images/send.svg" alt="Send" className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </MessagesContextProvider>
        </main>
      </div>
    </div>
  );
}