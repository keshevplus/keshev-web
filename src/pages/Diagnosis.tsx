import { useEffect } from 'react';
import { usePageData } from '../hooks/usePageData';
import { useErrorHandler } from '../hooks/useErrorHandler';
import type { BasePageContent } from '../types/content';
import diagnosisPageData from '../data/diagnosisPage';
import PageRenderer from '../components/PageRenderer';
import PageTitle from '../layouts/PageTitle';

export default function Diagnosis() {
  const { data, isLoading } = usePageData<BasePageContent>('diagnosis');
  const { error, handleError } = useErrorHandler();
  const content = Array.isArray(data) ? data[0] : data || diagnosisPageData;

  useEffect(() => {
    handleError(() => { document.documentElement.dir = 'rtl'; });
  }, [handleError]);

  if (isLoading) return <div className="container mx-auto py-8 loading"><div className="animate-pulse">Loading...</div></div>;
  if (error) return <div className="container mx-auto py-8 error text-red-600">Error: {error}</div>;

  return (
    <>
      {/* Add PageTitle with exact title from diagnosisPageData */}
      <PageTitle title={content.title} />
      <PageRenderer content={{ ...content, description: content.description }} className="absolute inset-0 z-[-1]" />
    </>
  );
}
