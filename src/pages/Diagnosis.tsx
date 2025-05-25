import { usePageData } from '../hooks/usePageData';
import PageTitle from '../components/ui/PageTitle';
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
      <PageTitle title={pageData.heading} />
      
      {/* Gradient background */}
      <div className="absolute inset-0 z-[-1] bg-gradient-radial from-blue-700/80 via-blue-600/60 to-blue-800/90 animate-gradient-slow"></div>
      
      <h2 className="text-xl md:text-4xl font-bold text-white text-center mb-8 transition-transform duration-300 ease-in-out hover:scale-105">
        {/* Fallback text: תהליך האבחון */}
        {pageData.subheading ?? 'תהליך אבחון מקצועי ומקיף'}
      </h2>
      
      <div className="items-center justify-center h-full">
        <div className="container mx-auto md:max-w-[90%] lg:max-w-[60%] px-4 sm:px-6">
          <div className="text-center">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-right mb-8">
              {/* First three items - תהליך האבחון הבסיסי */}
              <div className="bg-white/10 backdrop-blur-sm p-6 rounded-lg shadow-xl hover:shadow-2xl transition-all duration-300">
                <h3 className="text-xl md:text-2xl font-bold text-white mb-4 border-b border-blue-300/50 pb-2">
                  תהליך האבחון הבסיסי
                </h3>
                <ul className="list-none space-y-4">
                  {pageData.body?.slice(0, 3)?.map((item, index) => (
                    <li key={item.title} className="backdrop-blur-sm bg-blue-50/10 p-4 rounded-lg shadow hover:shadow-md transition-all duration-300">
                      <Card
                        bgcolor="bg-transparent"
                        textColor="text-white font-bold"
                        textSize="text-lg md:text-xl"
                        paraSize="text-md md:text-lg whitespace-pre-line"
                        title={item.title ?? ''}
                        description={item.description ?? ''}
                        image={item.image}
                      />
                    </li>
                  ))}
                </ul>
              </div>
              
              {/* Last three items - שירותים נוספים */}
              <div className="bg-white/10 backdrop-blur-sm p-6 rounded-lg shadow-xl hover:shadow-2xl transition-all duration-300">
                <h3 className="text-xl md:text-2xl font-bold text-white mb-4 border-b border-blue-300/50 pb-2">
                  שירותים נוספים
                </h3>
                <ul className="list-none space-y-4">
                  {pageData.body?.slice(3, 6)?.map((item, index) => (
                    <li key={item.title} className="backdrop-blur-sm bg-blue-50/10 p-4 rounded-lg shadow hover:shadow-md transition-all duration-300">
                      <Card
                        bgcolor="bg-transparent"
                        textColor="text-white font-bold"
                        textSize="text-lg md:text-xl"
                        paraSize="text-md md:text-lg"
                        title={item.title ?? ''}
                        description={item.description ?? ''}
                        image={item.image}
                      />
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm p-6 rounded-lg shadow-xl hover:shadow-2xl transition-all duration-300 mt-10">
              <h3 className="text-xl md:text-2xl font-bold text-white mb-4 border-b border-blue-300/50 pb-2 text-center">
                {additionalData?.title || 'טיפול מקצועי מותאם אישית'}
              </h3>
              <p className="text-lg text-white mb-6 text-center">
                {additionalData?.subtitle || additionalData?.description || 'לאחר האבחון ניתן להתאים תוכנית טיפול אישית שתתאים לצרכים הייחודיים שלכם'}
              </p>
              <ul className="list-none grid grid-cols-1 md:grid-cols-3 gap-4">
                {Array.isArray((additionalData as ContentItem)?.body) &&
                  (additionalData as ContentItem).body.map((item) => (
                    <li key={item.title} className="backdrop-blur-sm bg-blue-50/10 p-4 rounded-lg shadow hover:shadow-md transition-all duration-300">
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
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
