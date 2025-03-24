import React from 'react';

interface BodyContentProps {
  children: React.ReactNode;
}

export default function BodyContent({ children }: BodyContentProps) {
  return (
    <div className="min-h-screen bg-gray-100">
      {/* Content */}
      <div className="relative mt-16 bg-white py-4 px-4">
        <div className="container mx-auto px-4">{children}</div>
      </div>
    </div>
  );
}
