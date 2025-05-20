import React from 'react';

const FloatingPhoneNumber: React.FC = () => {
  return (
    <a 
      href="tel:055-27-399-27" 
      className="fixed top-[2.3rem] md:top-[2.3rem] lg:top-[2.3rem] left-1/2 transform -translate-x-1/2 z-50 text-white whitespace-nowrap bg-transparent px-3 py-1 hover:text-green-100 transition-all duration-300 text-base md:text-lg font-semibold"
    >
      <span>055-27-399-27</span>
    </a>
  );
};

export default FloatingPhoneNumber;
