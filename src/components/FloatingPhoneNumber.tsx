import React from 'react';

const FloatingPhoneNumber: React.FC = () => {
  return (
    <div className="shine-text-container" >  
      <span className="absolute hidden md:block  mx-10 left-16 top-24 transform -translate-x-1/2 z-50 text-white whitespace-nowrap bg-transparent px-3 py-1 hover:text-green-100 transition-all duration-300 text-base md:text-lg font-semibold shine-text"
      > 055-27-399-27 </span>
    </div>

  );
};

export default FloatingPhoneNumber;
