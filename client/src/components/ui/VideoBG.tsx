// The provided code defines a React functional component named `VideoBG` in TypeScript.
import React, { ReactNode } from 'react';

interface VideoBGProps {
  children?: ReactNode;
}

const VideoBG: React.FC<VideoBGProps> = ({ children }) => {
  return (
    <div className="relative">
      <video
        className="absolute inset-0 object-cover z-[-50] opacity-70 pointer-events-none"
        autoPlay
        loop
        muted
      >
        {/* <source src="/assets/images/formulas.mp4" type="video/mp4" /> */}
      </video>
      <div className="absolute inset-0 bg-orange-400 opacity-40 z-[2]"></div>
      {children}
    </div>
  );
};

export default VideoBG;
