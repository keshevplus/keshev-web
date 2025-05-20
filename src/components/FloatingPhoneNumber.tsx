import React from 'react';

const FloatingPhoneNumber: React.FC = () => {
  return (
    <a 
      href="tel:055-27-399-27" 
      className="fixed top-[3.5rem] md:top-[8rem] lg:top-[8.5rem] left-6 z-50 text-white whitespace-nowrap bg-transparent px-4 py-2 rounded-full hover:text-green-100 transition-all duration-300 text-xl md:text-2xl font-bold"
    >
      <span>055-27-399-27</span>
    </a>
  );
};

export default FloatingPhoneNumber;
