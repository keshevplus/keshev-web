import { usePageData } from '../hooks/usePageData';
import PageLayout from '../components/ui/PageLayout';
import { useEffect } from 'react';
import Card from '../components/ui/Card'; // Adjusted the path to match the correct location

// Define the type for the additional items
interface AdditionalItem {
  title: string;
  subtite?: string;
  description: string;
  image?: string;
  icon?: string;
}

export default function ADHD() {
  const { data, isLoading, error } = usePageData('adhd');

  // Set RTL direction for the document
  useEffect(() => {
    document.documentElement.dir = 'rtl';
  }, []);

  if (isLoading)
    return (
      <div className="container mx-auto max-w-full md:max-w-[85%] py-8 loading">
        <div className="animate-pulse">Loading...</div>
      </div>
    );
  if (error)
    return (
      <div className="container mx-auto max-w-full md:max-w-[85%] py-8 error">
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
    <div className="rtl">
      <PageLayout title={pageData.heading} children={undefined} />
      <>
        <div className="bg-white flex flex-auto items-start justify-start h-full">
          <div className="container mx-auto px-4 sm:px-6 max-w-full md:max-w-[95%] lg:max-w-[70%]">
            <div className="flex flex-col items-center justify-center">
              <div className="text-right items-start ">
                <h2 className="md:whitespace-nowrap text-2xl md:text-2xl font-bold text-black text-center mb-2">
                  {pageData.body[0].title} = {pageData.subheading}
                </h2>
                <h3 className="text-xl md:text-2xl font-bold text-black mb-2"></h3>
                <p className="text-gray-700 text-lg md:text-lg mb-4">
                  {pageData.body[0].description}
                </p>
              </div>

              {/* Symptoms Title */}
              <div className="w-full text-center mb-4">
                <h4 className="text-2xl md:text-2xl font-bold text-black  ">
                  {pageData.body[1].title}
                </h4>
                <p className="text-gray-700 text-xl md:text-xl mb-2">
                  {pageData.body[1].description}
                </p>
              </div>
              {/* Symptoms Grid Container */}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 md:gap-8 w-full mb-4">
                {pageData.additional?.map((item, index) => (
                  <Card
                    key={index}
                    bgcolor="bg-orange-400/35 hover:bg-orange-400/60"
                    textColor="text-black font-bold"
                    textSize="text-2xl md:text-2xl"
                    title={item.title}
                    description={item.description}
                    image={item.image}
                  />
                ))}
              </div>
              {/* Grid End */}

              <div className="grid grid-cols-1 md:grid-cols-2 text-right gap-4 ">
                {pageData.body.slice(3).map((item, index) => (
                  <Card
                    key={index}
                    bgcolor="bg-green-800"
                    textColor="text-white"
                    textSize="text-xl md:text-2xl"
                    title={item.title}
                    description={item.description}
                    image={item.image}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </>
    </div>
  );
}
