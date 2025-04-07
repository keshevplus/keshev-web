import PageLayout from '../components/PageLayout';
import { usePageData } from '../hooks/usePageData';
import { ContentItem } from '../types/content';
import { useEffect } from 'react';

export default function About() {
  const { data, isLoading, error } = usePageData('about'); // Use the hook to fetch content
  // Removed invalid usage of ContentItem
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

  if (!data?.length || !data[0]?.body?.length) return null;

  // pageData contains all content for this page including heading and body sections
  const pageData: ContentItem = data[0];

  return (
    <div className="rtl">
      {/* Animated background gradient */}
      <div className="absolute inset-0 z-[-1] bg-gradient-radial from-green-900/80 via-green-800/70 to-green-950/90 animate-gradient-slow"></div>
      {/* Background video */}

      <PageLayout title={pageData.heading} children={undefined} />
      <div className="bg-white flex items-center justify-end h-full">
        <div className="container mx-auto max-w-full md:max-w-[70%]">
          <h2 className="text-xl md:text-4xl font-bold text-black text-center mb-8 transition-transform duration-300 ease-in-out hover:scale-105">
            {pageData.body?.[0]?.title ?? 'No title available'}
          </h2>

          {/* Main content section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start mb-0 md:mb-8">
            {pageData.body?.[0]?.image && (
              <div className="order-2 md:order-2 flex justify-center">
                <figure className="flex flex-col items-center">
                  <img
                    src={pageData.body[0].image}
                    alt={pageData.body[0].title}
                    className="max-w-xs md:max-w-sm h-auto rounded-full shadow-xl transition-all duration-300 hover:shadow-2xl"
                  />
                </figure>
              </div>
            )}
            <div className="order-1 md:order-1 text-right">
              <h2 className="text-2xl md:text-4xl font-bold text-green-800 mb-6">
                {pageData.body?.[1]?.title ?? 'No title available'}
              </h2>
              {/* Additional content */}
              {pageData.body?.slice(1)?.map(
                (
                  item: {
                    title?: string;
                    subtitle?: string;
                    description?: string;
                    image?: string;
                    icon?: string;
                    file?: string;
                  },
                  index: number
                ) => (
                  <div key={index} className="mt-4">
                    <p className="text-gray-700 text-xl md:text-2xl leading-relaxed">
                      <span className="block md:hidden text-green-800 font-semibold text-lg mb-2">
                        {item.title ?? 'Untitled'}
                      </span>
                      {item.description ?? 'No description available'}
                    </p>
                  </div>
                )
              ) ?? null}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
