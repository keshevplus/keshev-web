import { ReactNode } from 'react';
import PageTitle from './PageTitle';

interface PageLayoutProps {
  title: string;
  children: ReactNode;
  maxWidth?: string;
}

export default function PageLayout({
  title,
  children,
  maxWidth = 'md:max-w-[75%]',
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
        <div className={`container mx-auto px-4 ${maxWidth}`}>{children}</div>
      </div>
    </>
  );
}
