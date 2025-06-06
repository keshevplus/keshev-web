import React, { useEffect, useState, useRef, ReactNode } from 'react';

// Define the interface for the Card component props
interface CardProps {
  bgColor: string; // Background color of the card
  textColor: string; // Text color of the card
  textSize: string; // Font size for the title text
  paraSize?: string; // Optional font size for the description text
  title: string; // Title of the card
  description: string; // Description text of the card (HTML markup allowed)
  image?: string; // Optional image URL for the card
  alt?: string; // Optional alt text for the image
  icon?: ReactNode; // Optional icon or clipart to display above the text
  subtitle?: string; // Optional subtitle for the card
  files?: ReactNode; // Optional files or download links to display
  isRtl?: boolean; // Indicates if the card should be displayed in RTL layout
  subItems?: { title: string; description: string }[]; // SubItems array
  customClass?: string; // Optional customClass for the root element
}

// Card component definition
const Card: React.FC<CardProps> = ({
  bgColor = 'bg-white', // Default background color
  textColor = 'text-black', // Default text color
  textSize,
  paraSize,
  title,
  description,
  image,
  alt, // Add alt prop
  icon,
  subtitle,
  files,
  subItems,
  customClass = 'text-center', // Default to center text if no custom class is provided
  isRtl = false, // Default to LTR layout if not specified
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
        ${bgColor} 
        hover:shadow-2xl hover:-translate-y-1 ${customClass}`}
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
              dangerouslySetInnerHTML={{ __html: description || '' }}
            />
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
            {/* Render subItems as nested mini-cards */}
            {subItems?.length > 0 && (
              <div className="grid grid-cols-1 gap-4 mt-4">
                {(subItems ?? []).map((item, i) => (
                  <Card
                    key={i}
                    bgColor="bg-gray-100"
                    textColor="text-black"
                    textSize="text-md"
                    paraSize="text-sm"
                    title={item.title}
                    description={item.description}
                  />
                ))}
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
              alt={alt || title} // Use alt prop if provided
              className="w-10 h-10 object-cover rounded-full hover:scale-125 transition-transform duration-200"
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Card;
