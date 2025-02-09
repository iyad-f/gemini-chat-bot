import React from 'react';

interface LoadingSpinnerProps {
  isDarkMode: boolean;
}

export default function LoadingSpinner({ isDarkMode }: LoadingSpinnerProps) {
  return (
    <div className="flex justify-center items-center">
      <div
        className={`animate-spin rounded-full h-8 w-8 border-b-2 ${
          isDarkMode ? 'border-gray-300' : 'border-gray-900'
        }`}
      ></div>
    </div>
  );
}