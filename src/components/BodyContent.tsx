import React from 'react';

interface BodyContentProps {
  children: React.ReactNode;
}

export default function BodyContent({ children }: BodyContentProps) {
  return (
    <div className="relative top-0  mx-auto">
      {/* Content */}
      <div className="mx-auto bg-white">
        <div className="text-center">{children}</div>
      </div>
    </div>
  );
}
