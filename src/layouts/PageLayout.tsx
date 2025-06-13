import { ReactNode } from 'react';
import type { PageType } from '../types/pages';
import PageTitle from './PageTitle';
// import Footer from './Footer';

export default function PageLayout({
  page,
  title,
  children
}: {
  page: PageType;
  title: string;
  children: ReactNode;
}) {
  return (
    <div className={`page-layout page-${page}`}>
      {/* Always show page title except on home page */}
      {page !== 'home' && <PageTitle title={title} />}
      <div className="px-4 py-2">
        {children}
      </div>
    </div>
  );
}
