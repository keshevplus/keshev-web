import { usePageData } from '../hooks/usePageData';
import PageTitle from '../components/ui/PageTitle';
import { useEffect } from 'react';
import Card from '../components/Card';

export default function Services() {
  const { data, isLoading, error } = usePageData('services');

  // Set RTL direction for the document
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
      <div className="container mx-auto max-w-full md:max-w-[75%] py-8 error">
        <div className="text-red-600">Error: {error}</div>
      </div>
    );
  if (!data.length) return null;

  const pageData = data[0];

  return (
    <div className="rtl">
      <PageTitle title={pageData.heading} />
      <div className="bg-white flex flex-auto items-center justify-center h-full">
        <div className="container mx-auto max-w-[95%] lg:max-w-[80%]">
          <h3 className="text-xl md:text-4xl font-bold text-black text-center mb-8 transition-transform duration-300 ease-in-out hover:scale-105">
            {pageData.subheading}
          </h3>
          <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {pageData.body?.map((item, index) => (
              <li key={index} className="items-start justify-start">
                <Card
                  key={index}
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
