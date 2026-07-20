import { useEffect } from 'react';
import { usePageData } from '../hooks/usePageData';
import { useErrorHandler } from '../hooks/useErrorHandler';
import type { BasePageContent } from '../types/content';
import adhdPageData from '../data/adhdPage';
import PageRenderer from '../components/PageRenderer';
import PageTitle from '../layouts/PageTitle';

export default function ADHD() {
  const { data, isLoading } = usePageData<BasePageContent>('adhd');
  const { error, handleError } = useErrorHandler();
  const content = data || adhdPageData;

  useEffect(() => {
    handleError(() => { document.documentElement.dir = 'rtl'; });
  }, [handleError]);

  if (isLoading) return <div className="container mx-auto py-8 loading"><div className="animate-pulse">Loading...</div></div>;
  if (error) return <div className="container mx-auto py-8 error text-red-600">Error: {error}</div>;

  return (
    <div className="adhd-page bg-white">
      {/* Use PageTitle component with animation for non-homepage pages */}
      {Array.isArray(content) ? null : <PageTitle title={content.title} />}

      {/* Content area with leaf bullet points in lists */}
      <div className="py-8">
        {Array.isArray(content) ? null : <PageRenderer content={content} className="bg-white pt-0" />}
      </div>
    </div>
  );
}
