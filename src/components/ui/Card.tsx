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
}

// Card component definition
const Card: React.FC<CardProps> = ({
  bgcolor, // Background color passed as a prop
  textColor, // Text color passed as a prop
  textSize, // Font size for the title text passed as a prop
  title, // Title text passed as a prop
  description, // Description text passed as a prop
  image, // Optional image URL passed as a prop
  icon, // Optional icon or clipart to display above the text
}) => {
  const [animate, setAnimate] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [isOverflowing, setIsOverflowing] = useState(false);
  const descriptionRef = useRef<HTMLDivElement>(null);

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
  }, [description]);

  return (
    <div
      className={`flex flex-col items-center rounded-3xl shadow-xl group px-4 py-4 transition-transform duration-[2s] mb-2 min-h-[240px] ${
        animate ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
      } ${bgcolor}`}
    >
      {/* Display icon if provided */}
      {icon && (
        <div className="text-green-600 mb-3 text-4xl flex justify-center items-center h-16">
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
          <h4 className={`font-bold ${textSize} ${textColor}`}>{title}</h4>
          <div className="overflow-hidden">
            <div
              ref={descriptionRef}
              className={`mx-2 ${textColor} font-normal ${
                expanded ? '' : 'line-clamp-2'
              }`}
            >
              {description}
            </div>
            {isOverflowing && (
              <button
                className="text-green-900 cursor-pointer mt-2"
                onClick={() => setExpanded(!expanded)}
              >
                {expanded ? 'קרא פחות' : 'קרא עוד'}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card; // Export the Card component for use in other parts of the application
