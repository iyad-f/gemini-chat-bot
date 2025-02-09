'use client';

import React, { useState } from 'react';
import ChatMessage from '@/app/components/ChatMessage';
import ChatInput from '@/app/components/ChatInput';
import LoadingSpinner from '@/app/components/LoadingSpinner';

export default function Home() {
  const [messages, setMessages] = useState<{ text: string; isUser: boolean }[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(true);

  const handleSendMessage = async (message: string) => {
    if (isLoading) return; // Prevent sending another message while loading

    setIsLoading(true);
    setMessages((prevMessages) => [...prevMessages, { text: message, isUser: true }]);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message }),
      });

      const data = await response.json();
      setMessages((prevMessages) => [
        ...prevMessages,
        { text: data.response, isUser: false },
      ]);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-gray-900' : 'bg-gray-100'}`}>
      <div className="container mx-auto p-4">
        <div className="flex justify-between items-center mb-6">
          <h1 className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
            Gemini Chatbot
          </h1>
          <button
            onClick={toggleDarkMode}
            className={`p-2 rounded-lg ${
              isDarkMode ? 'bg-gray-700 text-white' : 'bg-gray-200 text-gray-900'
            }`}
          >
            {isDarkMode ? '🌙' : '☀️'}
          </button>
        </div>
        <div
          className={`w-full max-w-2xl mx-auto rounded-lg shadow-lg p-6 ${
            isDarkMode ? 'bg-gray-800' : 'bg-white'
          }`}
        >
          <div className="h-[500px] overflow-y-auto mb-4">
            {messages.map((msg, index) => (
              <ChatMessage
                key={index}
                message={msg.text}
                isUser={msg.isUser}
                isDarkMode={isDarkMode}
              />
            ))}
            {isLoading && <LoadingSpinner isDarkMode={isDarkMode} />}
          </div>
          <ChatInput onSendMessage={handleSendMessage} isDarkMode={isDarkMode} isLoading={isLoading} />
        </div>
      </div>
    </div>
  );
}