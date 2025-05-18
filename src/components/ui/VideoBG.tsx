// The provided code defines a React functional component named `VideoBG` in TypeScript.
import React, { ReactNode } from 'react';

interface VideoBGProps {
  children?: ReactNode;
}

const VideoBG: React.FC<VideoBGProps> = ({ children }) => {
  return (
    <div className="absolute inset-0 overflow-hidden z-[-1]">
      <img
        className="absolute inset-0 object-cover w-full h-full opacity-70 pointer-events-none"
        src="/assets/images/bgvideogif.gif"        
        />
       
    
      <div className="absolute inset-0 bg-orange-400 opacity-10"></div>
    </div>
  );
};

export default VideoBG;
