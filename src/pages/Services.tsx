<<<<<<< HEAD
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
=======
import { usePageData } from '../hooks/usePageData';
import PageTitle from '../components/ui/PageTitle';
import { useEffect } from 'react';
import Card from '../components/ui/Card';

export default function Services() {
  const { data, isLoading, error } = usePageData('services');

  useEffect(() => {
    document.documentElement.dir = 'rtl';
  }, []);

  if (isLoading)
    return (
      <div className="container mx-auto max-w-full md:max-w-[75%] py-8 loading">
        <div className="animate-pulse">Loading...</div>
      </div>
    );

  if (error)
    return (
      <div className="container mx-auto max-w-full md:max-w-[85%] py-8 error">
        <div className="text-red-600">Error: {error}</div>
      </div>
    );

  if (!data?.length)
    return (
      <div className="container mx-auto max-w-full md:max-w-[85%] py-8 error">
        <div className="text-red-600">No services data found.</div>
      </div>
    );

  const pageData = data[0];

  return (
    <div className="rtl">
      <PageTitle title={pageData.heading || 'Services'} />
      <div className="bg-white flex flex-auto items-center justify-center h-full">
        <div className="container mx-auto max-w-[95%] lg:max-w-[80%] pb-16">
          <h3 className="text-xl md:text-4xl font-bold text-black text-center mb-8">
            {pageData.subheading || 'Our Services'}
          </h3>
          <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {pageData.body?.map((item, index) => (
              <li key={index} className="items-start justify-start">
                <Card
                  bgcolor="bg-orange-400/35 hover:bg-orange-400/60 text-right"
                  textColor="text-black font-bold"
                  textSize="text-xl md:text-xl"
                  paraSize="text-xl md:text-2xl"
                  title={item.title || 'Untitled'}
                  description={item.description || ''}
                  image={item.image}
                />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
>>>>>>> 430a8d2625f8bfe902f04811e3d440f6634a849c
