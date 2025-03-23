import React from 'react';

interface PageTitleProps {
  children: React.ReactNode;
}

export default function PageTitle({ children }: PageTitleProps) {
  return (
    <div className="width-full">
      {/* Title Bar */}
      <div className="relative h-[400px] top-0">
        <div className="mt-20 absolute inset-0 bg-gradient-to-b from-transparent bg-green-800 mx-auto px-0 h-full flex flex-col justify-center to-black/80">
          <div className="container mx-auto px-4 mt-20">
            <h1 className="text-5xl font-bold text-center text-white mx-4">
              {children}
            </h1>
          </div>
        </div>
      </div>
    </div>
  );
}
