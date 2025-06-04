import React from 'react';
import { usePageData } from '../hooks/usePageData';
import PageLayout from '../components/ui/PageLayout';
import Card from '../components/ui/Card';
import { ContentItem } from '../types/content';

const ADHDPage: React.FC = () => {
  const { data, isLoading, error } = usePageData('adhd');

  if (isLoading)
    return (
      <div className="container mx-auto py-8 loading">
        <div className="animate-pulse">Loading...</div>
      </div>
    );
  if (error)
    return (
      <div className="container mx-auto  py-8 error">
        <div className="text-red-600">Error: {error}</div>
      </div>
    );
  if (!data || !data.length) return null;

  const pageData = data[0] as ContentItem & {
    // Extend the ContentItem type to include additional properties specific to this page
    heading: string;
    subheading: string;
    body: {
      image: any;
      title: string;
      description: string;
      subItems?: {
        title: string;
        description: string;
      }[];
      textColor?: string; // Add textColor property
      bgColor?: string; // Add bgColor property
    }[];
  };

  return (
    <PageLayout
      title={pageData.title || 'מהי ADHD?'}
      background="bg-white"
      withRtl={true}
      maxWidth="md:max-w-[90%] lg:max-w-[55%]"
    >
      <div className="container mx-auto px-4 py-8">
        <h3 className="text-xl md:text-3xl font-bold text-black text-center mb-8">
          {pageData.heading || 'שירותינו במרפאה'}
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-1 gap-8 mb-8">
          {pageData.body.map((item, idx) => (
            <Card
              key={idx}
              bgcolor={item.bgColor || ""}
              textColor={item.textColor || "text-black"}
              textSize="text-xl md:text-2xl" /* Bigger title font */
              paraSize='text-md md:text-lg whitespace-pre-line' /* Smaller content font */
              title={item.title}
              description={item.description}
              image={item.image}
              subItems={item.subItems} // Pass subItems here
            />
          ))}
        </div>

      </div>
    </PageLayout>
  );
};

export default ADHDPage;
