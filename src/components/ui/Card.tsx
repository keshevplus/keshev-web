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
  // Removed unused maxHeight prop
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
  // maxHeight parameter removed
  isRtl = false, // Default to left-to-right layout
}) => {
  const [animate, setAnimate] = useState(false);
  const descriptionRef = useRef<HTMLDivElement>(null);

  // We don't need hover state as we're using CSS hover effects instead
  
  useEffect(() => {
    const timeout = setTimeout(() => setAnimate(true), 500); // Delay animation slightly
    return () => clearTimeout(timeout);
  }, []);

  // Removed unused overflow checking useEffect

  return (
    <div
      className={`flex flex-col rounded-3xl shadow-xl group px-4 py-4 transition-all duration-500 mb-2 
        ${animate ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'} 
        ${bgcolor} 
        hover:shadow-2xl hover:-translate-y-1`}
    >
      <div className={`flex ${isRtl ? 'flex-row-reverse' : 'flex-row'} items-start justify-between w-full gap-4`}>
        {/* Icon on one side - with RTL positioning */}
        <div className="flex-shrink-0">
          {icon && (
            <div className="flex justify-center items-center transition-transform duration-300 transform group-hover:scale-110 mx-4">
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
        </div>
        
        {/* Title and content on the same row */}
        <div className="flex-1">
          {/* Title with subtle pulse animation on hover */}
          <h4 
            className={`font-bold ${textSize} ${textColor} transition-all duration-300 group-hover:text-green-700 ${isRtl ? 'text-right' : 'text-left'} mb-2`}
          >
            {title}
          </h4>
          
          {/* Description directly below title */}
          <div
            ref={descriptionRef}
            className={`${textColor} font-normal ${paraSize || 'text-lg'} /* Larger font */
              ${isRtl ? 'text-right' : 'text-left'} text-justify
              transition-all duration-500 ease-in-out`}
          >
            {description}
          </div>
        </div>
      </div>
      {/* Content is now displayed directly with the title */}
    </div>
  );
};

export default Card; // Export the Card component for use in other parts of the application
