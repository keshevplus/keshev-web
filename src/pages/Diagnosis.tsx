import { usePageData } from '../hooks/usePageData';
import PageTitle from '../layouts/PageTitle';
import { useEffect } from 'react';
import Card from '../components/ui/Card';

type ContentItem = {
  body: Array<{
    image: string;
    title: string;
    description: string;
  }>;
};

export default function Diagnosis() {
  const { data, isLoading, error } = usePageData('diagnosis');

  useEffect(() => {
    document.documentElement.dir = 'rtl';
  }, []);

  if (isLoading)
    return (
      <div className="container mx-auto md:max-w-[70%] lg:max-w-[90%] py-8 loading">
        <div className="animate-pulse">Loading...</div>
      </div>
    );
  if (error)
    return (
      <div className="container mx-auto max-w-full md:max-w-[70%] py-8 error">
        <div className="text-red-600">Error: {error}</div>
      </div>
    );
  if (!data?.length || !data[0]?.body?.length) {
    return (
      <div className="container mx-auto py-8">No diagnosis data available.</div>
    );
  }

  const pageData = data[0];
  const additionalData = data[0]?.additional?.[0] || null;

  return (
    <div className="rtl relative overflow-hidden">
      <PageTitle title={pageData.title} />

      {/* Gradient background */}
      <div className="absolute inset-0 z-[-1] bg-gradient-radial from-green-700/80 via-green-600/60 to-green-800/90 animate-gradient-slow"></div>

      <div className="rtl-container" dir="rtl">
        <div className="container mx-auto sm:max-w-[90%] lg:max-w-[60%] px-4 sm:px-6">
          <div className="text-center">
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

            {/* <div className="bg-white/10 backdrop-blur-sm p-6 rounded-lg  hover:shadow-2xl transition-all duration-300 mt-10">
              <h3 className="text-xl md:text-2xl font-bold text-white mb-4 border-b border-green-300/50 pb-2 text-center">
                {additionalData?.title || 'טיפול מקצועי מותאם אישית'}
              </h3>
              <p className="text-lg text-white mb-6 text-center">
                {additionalData?.subtitle || additionalData?.description || 'לאחר האבחון ניתן להתאים תוכנית טיפול אישית שתתאים לצרכים הייחודיים שלכם'}
              </p>
              <ul className="list-none grid grid-cols-1 gap-4">
                {Array.isArray((additionalData as ContentItem)?.body) &&
                  (additionalData as ContentItem).body.map((item) => (
                    <li key={item.title} className="backdrop-blur-sm bg-orange-500 p-4 rounded-lg shadow hover:shadow-md transition-all duration-300">
                      <Card
                        bgcolor="bg-transparent"
                        textColor="text-white font-bold"
                        textSize="text-lg md:text-xl"
                        paraSize="text-md md:text-lg"
                        title={item.title}
                        description={item.description}
                        image={item.image}
                      />
                    </li>
                  ))}
              </ul>
            </div> */}
          </div>
        </div>
      </div>
    </div>
  );
}
