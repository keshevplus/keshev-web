import React from 'react';
import { usePageData } from '../hooks/usePageData';
import PageLayout from '../components/ui/PageLayout';
import PageTitle from '../components/ui/PageTitle'; // Adjusted path to match the correct location
import Card from '../components/ui/Card';

// Define the type for the additional items
interface AdditionalItem {
  title: string;
  subtite?: string;
  description: string;
  image?: string;
  icon?: string;
}

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

  const pageData = data[0] as {
    heading: string;
    subheading: string;
    body: {
      image: any;
      title: string;
      description: string;
    }[];
    additional?: AdditionalItem[];
  };

  return (
    <PageLayout>
      <PageTitle title={pageData.heading} />
      <div className="container mx-auto px-4 py-8">
        <p className="text-xl text-gray-700 mb-6 text-center">
          {pageData.subheading}
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          {pageData.body.map((item, idx) => (
            <Card
              key={idx}
              bgcolor="bg-white"
              textColor="text-black"
              textSize="text-lg"
              title={item.title}
              description={item.description}
              image={item.image}
            />
          ))}
        </div>
        {pageData.additional && pageData.additional.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {pageData.additional.map((item, idx) => (
              <Card
                key={idx}
                bgcolor="bg-orange-400/35 hover:bg-orange-400/60"
                textColor="text-black font-bold"
                textSize="text-2xl"
                title={item.title}
                description={item.description}
                image={item.image}
              />
            ))}
          </div>
        )}
      </div>
    </PageLayout>
  );
};

export default ADHDPage;
