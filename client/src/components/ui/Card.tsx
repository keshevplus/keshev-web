import React, { useEffect, useState, useRef } from 'react';

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
export default function Card({
  bgcolor, // Background color passed as a prop
  textColor, // Text color passed as a prop
  textSize, // Font size for the title text passed as a prop
  title, // Title text passed as a prop
  description, // Description text passed as a prop
  image, // Optional image URL passed as a prop
}: CardProps) {
  const [animate, setAnimate] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [isOverflowing, setIsOverflowing] = useState(false);
  const descriptionRef = useRef<HTMLParagraphElement>(null);

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
      className={`flex items-start rounded-3xl shadow-xl group px-4 py-2 transition-transform duration-[2s] mb-4 ${
        animate ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
      } ${bgcolor}`}
    >
      {image && (
        <img
          src={image}
          alt={title}
          className="w-10 h-10 object-cover rounded-full mx-2 group-hover:scale-125 transition-transform duration-200"
        />
      )}
      <div>
        <p className={`font-bold ${textSize} ${textColor}`}>{title}</p>
        <div className="overflow-hidden">
          <p
            ref={descriptionRef}
            className={`mx-2 ${textColor} font-normal ${
              expanded ? '' : 'line-clamp-2'
            }`}
          >
            {description}
          </p>
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
  );
}
