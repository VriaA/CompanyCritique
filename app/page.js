"use client";

import Messages from "@/components/Messages";
import { MessagesContextProvider, MessagesContext } from "@/contexts/MessagesContext";
import Link from 'next/link';
import { useState, useEffect, useContext } from 'react';

export default function Home() {
  return (
    <MessagesContextProvider>
      <HomeContent />
    </MessagesContextProvider>
  );
}

function HomeContent() {
  const [darkMode, setDarkMode] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const {setMessage, sendMessage, setMessages} = useContext(MessagesContext);

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

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleClearConversations = () => {
    setMessage("");
    setMessages(() => []);
  };


  const handleButtonClick = (message) => {
    setMessage(message);
    sendMessage();
  };

  return (
    <div className={`flex flex-col h-screen ${darkMode ? 'bg-[#111111] text-white' : 'bg-gray-100'}`}>
      {/* Hamburger menu for mobile */}
      <button 
        onClick={toggleSidebar} 
        className="lg:hidden fixed top-4 left-4 z-20 p-2 rounded-md bg-gray-200 text-black"
      >
        ☰
      </button>

      {/* Main content area */}
      <div className="flex-1 flex flex-col overflow-y-auto relative p-4 lg:p-0 lg:ml-64">
        {/* Welcome screen */}
        <main className={`flex-1 flex flex-col items-center justify-start pt-16 lg:pt-0 lg:justify-center p-4 font-inter font-bold gap-4 lg:gap-8 ${darkMode ? 'text-white' : ''}`}>
          <Link href="/">
            <h1 className="text-3xl lg:text-4xl font-bold mb-4 lg:mb-8">
              Company<span className="bg-gradient-to-r from-[#5661F6] via-[#8091F6] to-[#F6A856] text-transparent bg-clip-text">Critique</span>
            </h1>
          </Link>
          <h2 className="text-xl lg:text-3xl font-bold mb-4 lg:mb-8 font-lato text-center">Good day! How may I assist you?</h2>
  
          {/* Button container */}
          <div className="flex flex-col lg:flex-row w-full max-w-4xl space-y-4 lg:space-y-0 lg:space-x-4">
            <button onClick={() => handleButtonClick("How much is an average software engineer at Amazon paid?")} className="relative p-[1px] bg-gradient-to-r from-[#5661F6] via-[#8091F6] to-[#F6A856] rounded-lg w-full">
              <span className={`block ${darkMode ? 'bg-[#111111]' : 'bg-white'} px-3 py-2 rounded-lg text-sm text-left h-full flex items-center`}>
                How much is an average software engineer at Amazon paid?
              </span>
            </button>
            <button onClick={() => handleButtonClick("Level of diversity among workers at Meta")} className="relative p-[1px] bg-gradient-to-r from-[#5661F6] via-[#8091F6] to-[#F6A856] rounded-lg w-full">
              <span className={`block ${darkMode ? 'bg-[#111111]' : 'bg-white'} px-3 py-2 rounded-lg text-sm text-left h-full flex items-center`}>
                Level of diversity among workers at Meta
              </span>
            </button>
            <button onClick={() => handleButtonClick("Benefits for employees working at Headstarter")} className="relative p-[1px] bg-gradient-to-r from-[#5661F6] via-[#8091F6] to-[#F6A856] rounded-lg w-full">
              <span className={`block ${darkMode ? 'bg-[#111111]' : 'bg-white'} px-3 py-2 rounded-lg text-sm text-left h-full flex items-center`}>
                Benefits for employees working at Headstarter
              </span>
            </button>
          </div>
        </main>

        {/* Chat interface */}
        <main className="flex-1 flex flex-col mt-auto">
          <Messages darkMode={darkMode} />
        </main>
      </div>

      {/* Sidebar */}
      <aside className={`w-64 fixed top-0 left-0 bottom-0 overflow-y-auto p-[1px] bg-gradient-to-b from-[#5661F6] via-[#8091F6] to-[#F6A856] transition-transform duration-300 ease-in-out transform ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 lg:top-4 lg:left-4 lg:bottom-4 lg:rounded-[30px] z-30`}>
        <div className={`h-full ${darkMode ? 'bg-[#111111]' : 'bg-white'} p-4 flex flex-col items-center rounded-[29px]`}>
          <button onClick={handleClearConversations} className={`mb-6 w-full max-w-[200px] ${darkMode ? 'bg-[#111111] text-white' : 'bg-white text-black'} py-2 px-4 rounded-[12px] relative overflow-hidden
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
            <Link href="/" className={`mb-5 w-full text-left flex items-center justify-start ${darkMode ? 'hover:bg-gray-800' : 'hover:bg-gray-100'} rounded-lg transition duration-150 ease-in-out p-2`}>
              <img src={darkMode ? "/images/ChatText_dark.svg" : "/images/ChatText.svg"} alt="Google" className="w-5 h-5 mr-2" />
              Current Chat
            </Link>
          </nav>
          <div className="flex-grow"></div>
          <div className="flex flex-col items-center justify-center font-inter text-sm w-full mt-8">
            <button onClick={handleClearConversations} className={`mb-4 w-full text-left flex items-center justify-start ${darkMode ? 'hover:bg-gray-800' : 'hover:bg-gray-100'} rounded-lg transition duration-150 ease-in-out p-2`}>
              <img src={darkMode ? "/images/delete_dark.svg" : "/images/delete.svg"} alt="Clear" className="w-5 h-5 mr-2" />
              Clear conversations
            </button>
            <button onClick={toggleDarkMode} className={`mb-4 w-full text-left flex items-center justify-start ${darkMode ? 'hover:bg-gray-800' : 'hover:bg-gray-100'} rounded-lg transition duration-150 ease-in-out p-2`}>
              <img src={darkMode ? "/images/moon.svg" : "/images/sun-icon.svg"} alt={darkMode ? "Dark mode" : "Light mode"} className="w-5 h-5 mr-2" />
              {darkMode ? "Dark mode" : "Light mode"}
            </button>
            <Link href="https://github.com/VriaA/rate-my-employer" className={`mb-4 w-full text-left flex items-center justify-start ${darkMode ? 'hover:bg-gray-800' : 'hover:bg-gray-100'} rounded-lg transition duration-150 ease-in-out p-2`}>
              <img src={darkMode ? "/images/signOut_dark.svg" : "/images/signOut.svg"} alt="Light mode" className="w-5 h-5 mr-2" />
              Learn More
            </Link>
          </div>
        </div>
      </aside>

      {/* Overlay for mobile when sidebar is open */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-20 lg:hidden" 
          onClick={toggleSidebar}
        ></div>
      )}
    </div>
  );
}