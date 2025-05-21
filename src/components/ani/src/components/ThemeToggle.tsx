import React from 'react';
import { Sun, Moon } from 'lucide-react';

interface ThemeToggleProps {
  isDarkTheme: boolean;
  toggleTheme: () => void;
}

const ThemeToggle: React.FC<ThemeToggleProps> = ({ isDarkTheme, toggleTheme }) => {
  return (
    <button
      onClick={toggleTheme}
      className={`p-2 rounded-full transition-colors duration-300 flex items-center justify-center
      ${isDarkTheme ? 'bg-gray-800 text-white hover:bg-gray-700' : 'bg-white text-gray-800 hover:bg-gray-100 shadow-md'}`}
      aria-label={isDarkTheme ? 'Switch to light theme' : 'Switch to dark theme'}
    >
      {isDarkTheme ? (
        <Sun size={20} className="text-yellow-300" />
      ) : (
        <Moon size={20} className="text-gray-600" />
      )}
    </button>
  );
};

export default ThemeToggle;