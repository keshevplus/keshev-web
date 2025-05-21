import { ReactNode, useEffect } from 'react';
import PageTitle from './PageTitle';

interface PageLayoutProps {
  title: string;
  children: ReactNode;
  maxWidth?: string;
  withRtl?: boolean;
  withAnimation?: boolean;
  background?: string;
}

export default function PageLayout({
  title,
  children,
  maxWidth = 'md:max-w-[75%] lg:max-w-[90%]',
  withRtl = true,
  withAnimation = true,
  background = 'bg-white',
}: PageLayoutProps) {
  // Set RTL direction for the document if needed
  useEffect(() => {
    if (withRtl) {
      document.documentElement.dir = 'rtl';
    }
  }, [withRtl]);

  return (
    <div className={`${withRtl ? 'rtl' : ''} flex flex-col pb-10`}>
      <PageTitle title={title} />
      <div
        className={`${background} flex-grow pb-0 ${withAnimation ? 'animate-slide-in' : ''}`}
        style={withAnimation ? { animation: 'slideUp 0.8s ease-out' } : {}}
      >
        <div className={`container mx-auto px-8 pb-4 ${maxWidth}`}>{children}</div>
      </div>
    </div>
  );
}
