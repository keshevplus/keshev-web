import React, { useEffect, useState, useRef, ReactNode } from 'react';
import { FaMinus } from 'react-icons/fa';

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
  isRtl?: boolean; // Whether to use right-to-left layout (for Hebrew)
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
  isRtl = false, // Default to left-to-right layout
}) => {
  const [animate, setAnimate] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [isOverflowing, setIsOverflowing] = useState(false);
  const descriptionRef = useRef<HTMLDivElement>(null);

  // We don't need hover state as we're using CSS hover effects instead
  
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
      className={`flex flex-col rounded-3xl shadow-xl group px-4 py-4 transition-all duration-500 mb-2 
        ${animate ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'} 
        ${bgcolor} 
        ${expanded ? '' : 'md:min-h-[240px]'} 
        hover:shadow-2xl hover:-translate-y-1`}
    >
      <div className={`flex ${isRtl ? 'flex-row-reverse' : 'flex-row'} items-center justify-between w-full`}>
        {/* Title with icon on the right for RTL or left for LTR */}
        <div className={`flex ${isRtl ? 'flex-row-reverse' : 'flex-row'} items-center gap-3 flex-1`}>
          {/* Icon with animation */}
          {icon && (
            <div className="text-green-600 flex justify-center items-center transition-transform duration-300 transform group-hover:scale-110">
              {icon}
            </div>
          )}
          
          {image && (
            <img
              src={image}
              alt={title}
              className="w-10 h-10 object-cover rounded-full group-hover:scale-125 transition-transform duration-200"
            />
          )}
          
          {/* Title with subtle pulse animation on hover */}
          <h4 
            className={`font-bold ${textSize} ${textColor} transition-all duration-300 group-hover:text-green-700`}
          >
            {title}
          </h4>
        </div>
        
        {/* Toggle plus/minus button */}
        <button 
          onClick={() => setExpanded(!expanded)}
          className="flex items-center justify-center w-6 h-6 text-green-700 hover:text-green-900 transition-colors duration-300"
          aria-label={expanded ? 'Show less' : 'Show more'}
        >
          {expanded ? 
            <FaMinus size={16} /> : 
            <img src="/assets/images/gplus.png" alt="Expand" className="w-4 h-4" />
          }
        </button>
      </div>
      
      {/* Content area with maxHeight when condensed */}
      <div 
        className="overflow-hidden transition-all duration-500 ease-in-out mt-3" 
        style={{
          maxHeight: expanded ? '1000px' : '0',
          opacity: expanded ? 1 : 0
        }}
      >
        <div
          ref={descriptionRef}
          className={`${textColor} font-normal ${paraSize || 'text-base'} 
            ${isRtl ? 'text-right' : 'text-left'} 
            transition-all duration-500 ease-in-out`}
        >
          {description}
        </div>
        
        {/* Show less button at the bottom when expanded */}
        {expanded && (
          <button
            className={`text-green-900 cursor-pointer mt-4 hover:text-green-700 transition-colors duration-300 ${isRtl ? 'text-right block w-full' : 'text-left block w-full'}`}
            onClick={() => setExpanded(false)}
          >
            {isRtl ? 'הראה פחות' : 'Show less'}
          </button>
        )}
      </div>
    </div>
  );
};

export default Card; // Export the Card component for use in other parts of the application
