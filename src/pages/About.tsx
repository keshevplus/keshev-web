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
      maxWidth="sm:max-w-[90%] lg:max-w-[75%]"
    >
      {/* Animated background gradient */}
      <div className="absolute inset-0 z-[-1] bg-gradient-radial from-green-900/80 via-green-800/70 to-green-950/90 animate-gradient-slow"></div>
      
      <h2 className="text-xl md:text-4xl font-bold text-black text-center mb-8 transition-transform duration-300 ease-in-out hover:scale-105">
        {/*  Fallback text : subheading: 'קשב פלוס, נעים להכיר', */}
        {pageData.subheading ?? 'קשב פלוס, נעים להכיר'}
      </h2>

      {/* Main content section */}
      <div className="grid grid-cols-1 md:grid-cols-2 items-start mb-0 md:mb-4">
     {/*  Fallback text : pageData.body?.[0] */}

        {pageData.body?.[0]?.image && (
          <>
            <div className="order-2 md:order-2 flex justify-center">
              <figure className="flex flex-col items-center">
                <img
                  src={pageData.body[0].image}
                  alt={pageData.body[0].title}
                  className="max-w-xs h-auto rounded-full shadow-xl transition-all duration-300 hover:shadow-2xl"
                />
               
              </figure>
            </div>
          </>
        )}
        <div className="order-1 md:order-1 text-right">
          {/* Additional content */}
          {pageData.body?.map(
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
                <h3 className="text-black text-xl md:text-2xl relative leading-none md:leading-relaxed">
                  <span className="whitespace-pre-line text-green-800 font-semibold mb-2">
                    {item.subtitle}
                  </span>
                </h3>
                <h3 className="text-black text-xl md:text-2xl relative leading-none md:leading-relaxed">
                  <span className="whitespace-pre-line text-green-800 font-semibold mb-2">
                    {item.description}
                  </span>
                </h3>
              </div>
            )
          ) ?? null
          }
        </div>
        
      </div>
    </PageLayout>
  );
}
