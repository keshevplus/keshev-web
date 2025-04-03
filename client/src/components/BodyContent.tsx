import React from 'react';
import PageTitle from '../components/PageTitle';

interface BodyContentProps {
  children: React.ReactNode;
}
export function withBodyContent<P>(Component: React.ComponentType<P>) {
  return function WrappedComponent(props: P & React.Attributes) {
    return (
      <>
        <PageTitle title="Default Title" />
        <BodyContent>
          <Component {...props} />
        </BodyContent>
      </>
    );
  };
}
export default function BodyContent({ children }: BodyContentProps) {
  return (
    <div className="relative top-0  mx-auto">
      {/* Content */}
      <div className="mx-auto bg-white">
        <div className="text-center container mx-auto ">{children}</div>
      </div>
    </div>
  );
}
