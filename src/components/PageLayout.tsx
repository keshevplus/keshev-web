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
      <div className="bg-white py-16">
        <div className={`container mx-auto px-4 ${maxWidth}`}>{children}</div>
      </div>
    </>
  );
}
