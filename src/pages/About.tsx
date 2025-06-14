<<<<<<< HEAD
import { useEffect } from 'react';
import { usePageData } from '../hooks/usePageData';
import { useErrorHandler } from '../hooks/useErrorHandler';
import { useContentUpdate } from '../hooks/useContentUpdate';
import { useAdmin } from '../contexts/AdminContext';
import EditableSection from '../components/EditableSection';
import type { BasePageContent } from '../types/content';
import aboutPageData from '../data/aboutPage';
import PageTitle from '../layouts/PageTitle'; // Adjust the path as necessary

export default function About() {
  const { data, isLoading } = usePageData<BasePageContent>('about');
  const { error, handleError } = useErrorHandler();
  const content = data || aboutPageData;
  const { isAdmin } = useAdmin();
  const { updateContent } = useContentUpdate('about');

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
            {isAdmin ? (
              <EditableSection
                content={content.description}
                onUpdate={(value: string) => isAdmin && updateContent('description', value)}
                className=""
                as="span"
                sectionKey="description"
                contentId="about-description"
                contentType="text"
              />
            ) : content.description}
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
                      {isAdmin ? (
                        <EditableSection
                          content={section.heading}
                          onUpdate={(value: string) => isAdmin && updateContent('sections.0.heading', value)}
                          className=""
                          as="span"
                          sectionKey="sections.0.heading"
                          contentId="about-section-0-heading"
                          contentType="text"
                        />
                      ) : section.heading}
                    </span>
                  </h3>

                  {section.text && (
                    <h3 className="text-black text-xl md:text-2xl relative leading-none md:leading-relaxed">
                      <span className="whitespace-pre-line text-green-800 font-semibold mb-2">
                        {isAdmin ? (
                          <EditableSection
                            content={section.text}
                            onUpdate={(value: string) => isAdmin && updateContent('sections.0.text', value)}
                            className="hidden md:inline"
                            as="span"
                            sectionKey="sections.0.text"
                            contentId="about-section-0-text"
                            contentType="text"
                          />
                        ) : section.text}
                      </span>
                    </h3>
                  )}
                </>
              )}

              {/* Additional sections, if any */}
              {Array.isArray(content) ? null : content.sections?.slice(1).map((additionalSection, idx) => {
                const sectionIndex = idx + 1; // Since we've already handled the first section
                return (
                  <h3 key={idx} className="text-black text-xl md:text-2xl relative leading-none md:leading-relaxed">
                    <span className="whitespace-pre-line text-green-800 font-semibold mb-2">
                      {isAdmin ? (
                        <>
                          <EditableSection
                            content={additionalSection.heading}
                            onUpdate={(value: string) => isAdmin && updateContent(`sections.${sectionIndex}.heading`, value)}
                            className=""
                            as="span"
                            sectionKey={`sections.${sectionIndex}.heading`}
                            contentId={`about-section-${sectionIndex}-heading`}
                            contentType="text"
                          />
                          {additionalSection.text && (
                            <EditableSection
                              content={additionalSection.text}
                              onUpdate={(value: string) => isAdmin && updateContent(`sections.${sectionIndex}.text`, value)}
                              className=""
                              as="span"
                              sectionKey={`sections.${sectionIndex}.text`}
                              contentId={`about-section-${sectionIndex}-text`}
                              contentType="text"
                            />
                          )}
                        </>
                      ) : (
                        <>
                          {additionalSection.heading}
                          {additionalSection.text && (
                            <span className="block mt-2">{additionalSection.text}</span>
                          )}
                        </>
                      )}
                    </span>
                  </h3>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
=======
import PageLayout from '../components/ui/PageLayout';
import { usePageData } from '../hooks/usePageData';
import { ContentItem } from '../types/content';

export default function About() {
  const { data, isLoading, error } = usePageData('about'); // Use the hook to fetch content

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
    <PageLayout 
      title={pageData.heading} 
      background="bg-white" 
      withRtl={true}
      maxWidth="md:max-w-[70%] lg:max-w-[75%]"
    >
      {/* Animated background gradient */}
      <div className="absolute inset-0 z-[-1] bg-gradient-radial from-green-900/80 via-green-800/70 to-green-950/90 animate-gradient-slow"></div>
      
      <h2 className="text-xl md:text-4xl font-bold text-black text-center mb-8 transition-transform duration-300 ease-in-out hover:scale-105">
        {pageData.body?.[0]?.title ?? 'No title available'}
      </h2>

      {/* Main content section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-start mb-0 md:mb-8">
        {pageData.body?.[0]?.image && (
          <>
            <div className="order-2 md:order-2 flex justify-center">
              <figure className="flex flex-col items-center">
                <img
                  src={pageData.body[0].image}
                  alt={pageData.body[0].title}
                  className="max-w-xs md:max-w-sm h-auto rounded-full shadow-xl transition-all duration-300 hover:shadow-2xl"
                />
              </figure>
            </div>
          </>
        )}
        <div className="order-1 md:order-1 text-right">
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
                <h3 className="text-gray-700 text-xl md:text-2xl leading-relaxed">
                  <span className="block text-green-800 font-semibold mb-2">
                    {item.title}
                  </span>
                  {item.description}
                </h3>
              </div>
            )
          ) ?? null}
        </div>
      </div>
    </PageLayout>
>>>>>>> 430a8d2625f8bfe902f04811e3d440f6634a849c
  );
}
