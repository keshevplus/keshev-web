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
  // Removed unused maxHeight prop
  isRtl?: boolean; // Indicates if the card should be displayed in RTL layout
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
  subtitle, // Optional subtitle for the card
  files, // Optional files or download links to display
  // maxHeight and isRtl parameters removed as we're using fixed RTL layout
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
      <div className="flex flex-row-reverse items-start justify-between w-full gap-6">
        {/* Text content on the right in RTL context */}
        <div className="flex-1 text-right">
          {/* Title and content aligned together */}
          <div className="flex flex-col items-end"> {/* For RTL content, align items to the end */}
            {/* Title with subtle pulse animation on hover */}
            <h4 
              className={`font-bold ${textSize} ${textColor} transition-all duration-300 group-hover:text-green-500 text-right w-full mb-2`}
            >
              {title}
            </h4>
            
   

            {/* Description directly below title with same alignment */}
            <div
              ref={descriptionRef}
              className={`${textColor} font-normal ${paraSize || 'text-lg'} /* Larger font */
                text-right w-full
                transition-all duration-500 ease-in-out`}
            >
              {description}
            </div>
             {/* Title with subtle pulse animation on hover */}
             <h4 
              className={`font-bold ${textSize} ${textColor} transition-all duration-300 group-hover:text-green-700 text-right w-full mb-2`}
            >
              {subtitle}
            </h4>              {/* Title with subtle pulse animation on hover */}
             <h4 
              className={`font-bold ${textSize} ${textColor} transition-all duration-300 group-hover:text-green-700 text-right w-full mb-2`}
            >
              {files}
            </h4> 
            
          </div>
        </div>

        {/* Icon on the left side for RTL layout */}
        <div className="flex-shrink-0">
          {icon && (
            <div className="flex justify-center items-center transition-transform duration-300 transform group-hover:scale-110 mx-2">
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
  
            </div>

      </div>


  );
};

export default Card; // Export the Card component for use in other parts of the application
