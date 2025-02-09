import React, { useState } from 'react';

interface ChatInputProps {
  onSendMessage: (message: string) => void;
  isDarkMode: boolean;
  isLoading: boolean;
}

export default function ChatInput({ onSendMessage, isDarkMode, isLoading }: ChatInputProps) {
  const [message, setMessage] = useState('');

  const handleSend = () => {
    if (message.trim() && !isLoading) {
      onSendMessage(message);
      setMessage('');
    }
  };

  return (
    <div className="flex gap-2">
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyPress={(e) => e.key === 'Enter' && handleSend()}
        placeholder="Type your message..."
        className={`flex-1 p-2 rounded-lg focus:outline-none ${
          isDarkMode
            ? 'bg-gray-700 text-white placeholder-gray-400'
            : 'bg-gray-200 text-gray-900 placeholder-gray-500'
        } ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
        disabled={isLoading}
      />
      <button
        onClick={handleSend}
        disabled={isLoading}
        className={`px-4 py-2 rounded-lg ${
          isDarkMode
            ? 'bg-blue-600 text-white hover:bg-blue-700'
            : 'bg-blue-500 text-white hover:bg-blue-600'
        } ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
      >
        Send
      </button>
    </div>
  );
}