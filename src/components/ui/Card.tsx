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
  subtitle?: string; // Optional subtitle for the card
  files?: ReactNode; // Optional files or download links to display
  isRtl?: boolean; // Indicates if the card should be displayed in RTL layout
  subItems?: { title: string; description: string }[]; // SubItems array
}

// Card component definition
const Card: React.FC<CardProps> = ({
  bgcolor,
  textColor,
  textSize,
  paraSize,
  title,
  description,
  image,
  icon,
  subtitle,
  files,
  subItems, // Add subItems prop
}) => {
  const [animate, setAnimate] = useState(false);
  const descriptionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timeout = setTimeout(() => setAnimate(true), 500); // Delay animation slightly
    return () => clearTimeout(timeout);
  }, []);

  return (
    <div
      className={`flex flex-col rounded-3xl shadow-xl group px-4 py-4 transition-all duration-500 mb-2 
        ${animate ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'} 
        ${bgcolor} 
        hover:shadow-2xl hover:-translate-y-1`}
    >
      <div className="flex flex-row-reverse items-start justify-between w-full gap-6">
        {/* Text content on the right in RTL context */}
        <div className="flex-1 text-right">
          <div className="flex flex-col items-end">
            <h4
              className={`font-bold ${textSize} ${textColor} transition-all duration-300 hover:text-green-700 text-right w-full mb-2`}
            >
              {title}
            </h4>
            <div
              ref={descriptionRef}
              className={`${textColor} font-normal ${paraSize || 'text-lg'} text-right w-full transition-all duration-500 ease-in-out`}
            >
              {description}
            </div>
            {subtitle && (
              <h4
                className={`font-bold ${textSize} ${textColor} transition-all duration-300 hover:text-green-700 text-right w-full mb-2`}
              >
                {subtitle}
              </h4>
            )}
            {files && (
              <h4
                className={`font-bold ${textSize} ${textColor} transition-all duration-300 hover:text-green-700 text-right w-full mb-2`}
              >
                {files}
              </h4>
            )}
            {/* Render subItems if they exist */}
            {subItems && subItems.length > 0 && (
              <div className="mt-4 grid-co+">
                <div className="grid grid-cols-1 gap-4 w-full">
                  {subItems.map((subItem, idx) => (
                    <div
                      key={idx}
                      className="flex flex-col bg-gray-100 rounded-lg shadow-md md:mx-10 md:p-4 sm  transition-transform duration-300 hover:scale-105"
                    >
                      <h5 className="font-bold md:text-2xl">{subItem.title}</h5>
                      <p className="text-lg text-black">{subItem.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Icon and image */}
        <div className="flex-shrink-0">
          {icon && (
            <div className="flex justify-center items-center transition-transform duration-300 transform hover:scale-110 mx-2">
              {icon}
            </div>
          )}
          {image && (
            <img
              src={image}
              alt={title}
              className="w-10 h-10 object-cover rounded-full hover:scale-125 transition-transform duration-200"
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Card;
