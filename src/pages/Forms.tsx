import { useEffect } from 'react';
import { usePageData } from '../hooks/usePageData';
import { useErrorHandler } from '../hooks/useErrorHandler';
import type { BasePageContent } from '../types/content';
import formsPageData from '../data/formsPage';
import PageRenderer from '../components/PageRenderer';
import PageTitle from '../layouts/PageTitle';

export default function Forms() {
  const { data, isLoading } = usePageData<BasePageContent>('forms');
  const { error, handleError } = useErrorHandler();
  const content = Array.isArray(data) ? data[0] : data || formsPageData;

  useEffect(() => {
    handleError(() => { document.documentElement.dir = 'rtl'; });
  }, [handleError]);

  if (isLoading) return <div className="container mx-auto py-8 loading"><div className="animate-pulse">Loading...</div></div>;
  if (error) return <div className="container mx-auto py-8 error text-red-600">Error: {error}</div>;

  return (
    <>
      <PageTitle title={content.title} />
      <PageRenderer content={content} className="bg-white py-16" />
    </>
  );
}
