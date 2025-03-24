import React from 'react';

interface PageTitleProps {
  children: React.ReactNode;
}

export default function PageTitle({ children }: PageTitleProps) {
  return (
    <div className="width-full">
      {/* Title Bar 
      
          <div className="width-full bg-green-900 flex flex-auto mt-20 min-h-48">
      <h1 className="font-bold text-justify align-bottom text-white">
        fdfsf
        {children}
      </h1>
    </div>
      
      */}

      <div className="min-w relative h-[100px] width-full inset-0 bg-gradient-to-b from-transparent bg-green-800 mx-auto px-0 h-full flex flex-col justify-center to-black/80">
        <h1 className="font-bold text-center text-white mx-0">ddd</h1>
      </div>
    </div>
  );
}
