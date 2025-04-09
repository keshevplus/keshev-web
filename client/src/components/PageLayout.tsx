import { ReactNode } from 'react';
import PageTitle from './ui/PageTitle';

interface PageLayoutProps {
  title: string;
  children: ReactNode;
  maxWidth?: string;
}

export default function PageLayout({
  title,
  children,
  maxWidth = 'md:max-w-[75%] lg:max-w-[90%]',
}: PageLayoutProps) {
  return (
    <>
      <PageTitle title={title} />
      <div
        className="bg-white py-0 animate-slide-in"
        style={{
          animation: 'fadeInUp 0.8s ease-out',
        }}
      >
        <div className={`container mx-auto px-8 ${maxWidth}`}>{children}</div>
      </div>
    </>
  );
}
