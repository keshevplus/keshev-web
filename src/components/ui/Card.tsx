import React, { useEffect, useState, useRef, ReactNode } from 'react';

// Define the interface for the Card component props
interface CardProps {
  bgcolor: string; // Background color of the card
  textColor: string; // Text color of the card
  textSize: string; // Font size for the title text
  paraSize?: string; // Optional font size for the description text
  title: string; // Title of the card
  description: ReactNode; // Description text of the card (can be string or React element)
  image?: string; // Optional image URL for the card
  icon?: ReactNode; // Optional icon or clipart to display above the text
  maxHeight?: string; // Optional custom max height for the card when condensed
}

// Card component definition
const Card: React.FC<CardProps> = ({
  bgcolor, // Background color passed as a prop
  textColor, // Text color passed as a prop
  textSize, // Font size for the title text passed as a prop
  paraSize, // Optional font size for the description text
  title, // Title text passed as a prop
  description, // Description text passed as a prop
  image, // Optional image URL passed as a prop
  icon, // Optional icon or clipart to display above the text
  maxHeight = 'max-h-32', // Default max height when condensed
}) => {
  const [animate, setAnimate] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [isOverflowing, setIsOverflowing] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const descriptionRef = useRef<HTMLDivElement>(null);

  // Handle hover state for subtle animations
  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => setIsHovered(false);
  
  useEffect(() => {
    const timeout = setTimeout(() => setAnimate(true), 500); // Delay animation slightly
    return () => clearTimeout(timeout);
  }, []);

  useEffect(() => {
    if (descriptionRef.current) {
      setIsOverflowing(
        descriptionRef.current.scrollHeight >
          descriptionRef.current.clientHeight
      );
    }
  }, [description, expanded]);

  return (
    <div
      className={`flex flex-col items-center rounded-3xl shadow-xl group px-4 py-4 transition-all duration-500 mb-2 
        ${animate ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'} 
        ${bgcolor} 
        ${expanded ? 'min-h-[240px]' : 'md:min-h-[240px]'} 
        hover:shadow-2xl hover:-translate-y-1`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Icon with animation */}
      {icon && (
        <div className="text-green-600 mb-3 text-4xl flex justify-center items-center h-16 transition-transform duration-300 transform group-hover:scale-110">
          {icon}
        </div>
      )}
      
      <div className="flex items-start w-full">
        {image && (
          <img
            src={image}
            alt={title}
            className="w-10 h-10 object-cover rounded-full mx-2 group-hover:scale-125 transition-transform duration-200"
          />
        )}
        <div className="flex flex-col w-full">
          {/* Title with subtle pulse animation on hover */}
          <h4 
            className={`font-bold ${textSize} ${textColor} transition-all duration-300 group-hover:text-green-700`}
          >
            {title}
          </h4>
          
          {/* Content area with maxHeight when condensed */}
          <div className="overflow-hidden transition-all duration-500 ease-in-out" 
               style={{
                 maxHeight: expanded ? '1000px' : `${window.innerWidth < 768 ? '0' : ''}`
               }}
          >
            <div
              ref={descriptionRef}
              className={`mx-2 ${textColor} font-normal ${paraSize || 'text-base'} 
                ${expanded ? '' : 'md:line-clamp-2 hidden md:block'} 
                ${maxHeight && !expanded ? maxHeight : ''} 
                transition-all duration-500 ease-in-out`}
            >
              {description}
            </div>
          </div>
          
          {/* Read more button - only on desktop view and when content is overflowing */}
          {isOverflowing && (
            <button
              className="text-green-900 cursor-pointer mt-2 hover:text-green-700 transition-colors duration-300 hidden md:block"
              onClick={() => setExpanded(!expanded)}
            >
              {expanded ? 'קרא פחות' : 'קרא עוד'}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Card; // Export the Card component for use in other parts of the application
