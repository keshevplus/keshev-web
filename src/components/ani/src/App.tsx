import React, { useState } from 'react';
import NeuralAnimation from './components/NeuralAnimation';
import ThemeToggle from './components/ThemeToggle';

function App() {
  const [isDarkTheme, setIsDarkTheme] = useState(false);

  const toggleTheme = () => {
    setIsDarkTheme(prev => !prev);
  };

  return (
    <div className={`min-h-screen w-full transition-colors duration-500 ${isDarkTheme ? 'bg-black' : 'bg-white'}`}>
      <NeuralAnimation isDarkTheme={isDarkTheme} />
      <div className="fixed top-4 right-4 z-10">
        <ThemeToggle isDarkTheme={isDarkTheme} toggleTheme={toggleTheme} />
      </div>
    </div>
  );
}

export default App;