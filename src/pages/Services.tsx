import { useEffect } from 'react';
import { usePageData } from '../hooks/usePageData';
import { useErrorHandler } from '../hooks/useErrorHandler';
import type { BasePageContent } from '../types/content';
import servicesPageData from '../data/servicesPage';
import PageRenderer from '../components/PageRenderer';
import PageTitle from '../layouts/PageTitle'; // Adjusted the path to point to the correct location

export default function Services() {
  const { data, isLoading } = usePageData<BasePageContent>('services');
  const { error, handleError } = useErrorHandler();
  const content = Array.isArray(data) ? data[0] : data || servicesPageData;

  useEffect(() => {
    handleError(() => { document.documentElement.dir = 'rtl'; });
  }, [handleError]);

  if (isLoading) return <div className="container mx-auto py-8 loading"><div className="animate-pulse">Loading...</div></div>;
  if (error) return <div className="container mx-auto py-8 error text-red-600">Error: {error}</div>;

  return (
    <>
      {/* Use exact title from servicesPage data */}
      <PageTitle title={content.title} />
      <div style={{ paddingTop: '120px' }}>
        <PageRenderer content={{ ...content, description: content.description }} className="absolute inset-0 z-[-1]" />
      </div>
    </>
  );
}