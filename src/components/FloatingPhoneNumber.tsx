import React from 'react';

const FloatingPhoneNumber: React.FC = () => {
  return (
    <a 
      href="tel:055-27-399-27" 
      className="fixed hidden md:block md:top-[7.3rem] left-0 mx-10 transform -translate-x-1/2 z-50 text-white whitespace-nowrap bg-transparent px-3 py-1 hover:text-green-100 transition-all duration-300 text-base md:text-lg font-semibold"
    >
      <span>055-27-399-27</span>
    </a>
  );
};

export default FloatingPhoneNumber;
