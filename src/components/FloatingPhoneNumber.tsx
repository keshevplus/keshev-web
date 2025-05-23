import React from 'react';

const FloatingPhoneNumber: React.FC = () => {
  return (
    <div className="relative inline-block">  
      <span className="absolute hidden md:block left-0 -bottom-8 transform z-30 text-white whitespace-nowrap bg-transparent px-2 py-1 hover:text-green-100 transition-all duration-300 text-base font-semibold shine-text">
        055-27-399-27
      </span>
    </div>

  );
};

export default FloatingPhoneNumber;
