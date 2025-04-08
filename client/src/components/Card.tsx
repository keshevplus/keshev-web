import React from 'react';

interface CardProps {
  bgcolor: string;
  textColor: string;
  textSize: string;
  title: string;
  description: string;
  image?: string;
}

const Card: React.FC<CardProps> = ({
  bgcolor,
  textColor,
  textSize,
  title,
  description,
  image,
}) => {
  return (
    <div
      className={` group rounded-3xl shadow-xl px-4 py-2 transition-all duration-300 mb-2 ${bgcolor} hover:[img:scale-110] `}
    >
      <div className="flex flex-row items-center ">
        {image && (
          <img
            src={image}
            alt={title}
            className={` w-10 h-10 object-cover rounded-full m-2 group-hover:scale-125 transition-transform duration-300`}
          />
        )}
        <h3 className={`font-bold ${textSize}  ${textColor}`}>{title}</h3>
      </div>
      <p className={`mx-2 ${textColor} font-bold `}>{description}</p>
    </div>
  );
};

export default Card;
