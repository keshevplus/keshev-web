import React from 'react';

const FloatingPhoneNumber: React.FC = () => {
  return (
    <a 
      href="tel:055-27-399-27" 
      className="fixed top-[2.5rem] md:top-[4rem] lg:top-[4.5rem] right-4 z-50 text-white whitespace-nowrap bg-green-800/80 px-3 py-1 rounded-full shadow-lg hover:bg-green-700 transition-all duration-300 text-base md:text-lg font-semibold backdrop-blur-sm"
    >
      055-27-399-27
    </a>
  );
};

export default FloatingPhoneNumber;
