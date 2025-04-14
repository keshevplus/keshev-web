import React from 'react';

// Define the interface for the Card component props
interface CardProps {
  bgcolor: string; // Background color of the card
  textColor: string; // Text color of the card
  textSize: string; // Font size for the title text
  paraSize?: string; // Optional font size for the description text
  title: string; // Title of the card
  description: string; // Description text of the card
  image?: string; // Optional image URL for the card
}

// Card component definition
const Card: React.FC<CardProps> = ({
  bgcolor, // Background color passed as a prop
  textColor, // Text color passed as a prop
  textSize, // Font size for the title text passed as a prop
  title, // Title text passed as a prop
  description, // Description text passed as a prop
  image, // Optional image URL passed as a prop
}) => {
  return (
    <div
      className={` group rounded-3xl shadow-xl px-4 py-2 transition-all duration-300 mb-2 ${bgcolor} hover:[img:scale-110] `} // Card container styling
    >
      <div className="flex flex-row items-start ">
        {' '}
        {/* Flex container for image and text */}
        {image && ( // Conditionally render the image if provided
          <img
            src={image} // Image source URL
            alt={title} // Alt text for the image
            className={` w-10 h-10 object-cover rounded-full mx-2 group-hover:scale-125 transition-transform duration-300`} // Image styling and hover effect
          />
        )}
        <div className="text-right">
          {' '}
          {/* Text container */}
          <p className={`font-bold ${textSize}  ${textColor}`}>{title}</p>{' '}
          {/* Title text */}
          <p className={`mx-2 ${textColor} font-normal `}>{description}</p>{' '}
          {/* Description text */}
        </div>
      </div>
    </div>
  );
};

export default Card; // Export the Card component for use in other parts of the application
