import React from 'react';
import { useState } from 'react';
import { useTheme } from 'next-themes';

const DarkModeToggle = () => {
  const { theme, setTheme } = useTheme();
  const [isDarkMode, setIsDarkMode] = useState(theme === 'dark');

  const handleToggle = () => {
    setIsDarkMode(!isDarkMode);
    setTheme(isDarkMode ? 'light' : 'dark');
  };

  return (
    <button
      className={`${
        isDarkMode ? 'bg-gray-800' : 'bg-gray-200'
      } text-white rounded-full p-2`}
      onClick={handleToggle}
    >
      {isDarkMode ? 'Light Mode' : 'Dark Mode'}
    </button>
  );
};

export default DarkModeToggle;
