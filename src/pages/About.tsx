import { useEffect } from 'react';
import { usePageData } from '../hooks/usePageData';
import { useErrorHandler } from '../hooks/useErrorHandler';
import type { BasePageContent } from '../types/content';
import aboutPageData from '../data/aboutPage';
import PageTitle from '../layouts/PageTitle'; // Adjust the path as necessary

export default function About() {
  const { data, isLoading } = usePageData<BasePageContent>('about');
  const { error, handleError } = useErrorHandler();
  const content = data || aboutPageData;

  useEffect(() => {
    handleError(() => { document.documentElement.dir = 'rtl'; });
  }, [handleError]);

  if (isLoading) return <div className="container mx-auto py-8 loading"><div className="animate-pulse">Loading...</div></div>;
  if (error) return <div className="container mx-auto py-8 error text-red-600">Error: {error}</div>;

  // Get primary section (first section in the array)
  const section = Array.isArray(content) ? content[0]?.sections?.[0] : content.sections?.[0];

  return (
    <div className="bg-white flex-grow pb-0 animate-slide-in">
      {/* Add proper PageTitle for non-homepage with exact title from data */}
      {!Array.isArray(content) && <PageTitle title={content.title} />}

      <div className="container mx-auto px-8 pb-4 sm:max-w-[90%] lg:max-w-[75%]">
        {!Array.isArray(content) && content.description && (
          <h2 className="text-xl md:text-4xl font-bold text-black text-center mb-8 transition-transform duration-300 ease-in-out hover:scale-105">
            {content.description}
          </h2>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 items-start mb-0 md:mb-4">
          <div className="order-2 md:order-2 flex justify-center">
            <figure className="flex flex-col items-center">
              {!Array.isArray(content) && content.image && (
                <img
                  alt="דר' איירין כוכב-רייפמן"
                  className="max-w-xs h-auto rounded-full shadow-xl transition-all duration-300 hover:shadow-2xl"
                  src={content.image}
                />
              )}
            </figure>
          </div>

          <div className="order-1 md:order-1 text-right">
            <div className="mt-4">
              {section && (
                <>
                  <h3 className="text-black text-xl md:text-3xl relative leading-none md:leading-relaxed">
                    <span className="whitespace-pre-line text-green-800 font-semibold mb-2">
                      {section.heading}
                    </span>
                  </h3>

                  {section.text && (
                    <h3 className="text-black text-xl md:text-2xl relative leading-none md:leading-relaxed">
                      <span className="whitespace-pre-line text-green-800 font-semibold mb-2">
                        {section.text}
                      </span>
                    </h3>
                  )}
                </>
              )}

              {/* Additional sections, if any */}
              {Array.isArray(content) ? null : content.sections?.slice(1).map((additionalSection, idx) => (
                <h3 key={idx} className="text-black text-xl md:text-2xl relative leading-none md:leading-relaxed">
                  <span className="whitespace-pre-line text-green-800 font-semibold mb-2">
                    {additionalSection.heading}
                    {additionalSection.text && (
                      <span className="block mt-2">{additionalSection.text}</span>
                    )}
                  </span>
                </h3>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
