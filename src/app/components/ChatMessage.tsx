import React from 'react';

interface ChatMessageProps {
  message: string;
  isUser: boolean;
  isDarkMode: boolean;
}

export default function ChatMessage({ message, isUser, isDarkMode }: ChatMessageProps) {
  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-4`}>
      <div
        className={`max-w-[70%] rounded-lg p-3 ${
          isUser
            ? isDarkMode
              ? 'bg-blue-600 text-white'
              : 'bg-blue-500 text-white'
            : isDarkMode
            ? 'bg-gray-700 text-white'
            : 'bg-gray-200 text-gray-900'
        }`}
      >
        <p>{message}</p>
      </div>
    </div>
  );
}