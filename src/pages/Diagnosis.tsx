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
    <div className="rtl">
      <PageTitle title={pageData.heading} />
      <div className="items-center justify-center h-full">
        <div className="container mx-auto md:max-w-[90%] lg:max-w-[70%] px-4 sm:px-6">
          <div className="text-center">
            <h3 className="md:text-3xl font-bold mb-4">
              {pageData.body?.[0]?.title ?? ''}
            </h3>
            <h3 className="md:text-3xl font-bold mb-4">
              {pageData.subheading}
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 text-right">
              <div>
                <h4 className="md:text-2xl text-2xl mb-4">ילדים / בני נוער</h4>
                <ul className="list-none space-y-4">
                  {pageData.body?.slice(1, 4)?.map((item, index) => (
                    <li key={item.title}>
                      <Card
                        bgcolor="bg-orange-400/35 hover:bg-orange-400/60"
                        textColor="text-black font-bold"
                        textSize="text-xl md:text-2xl"
                        paraSize="text-md md:text-xl"
                        title={item.title ?? ''}
                        description={item.description ?? ''}
                        image={item.image}
                      />
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h4 className="md:text-2xl text-2xl mb-4 ">מבוגרים</h4>
                <ul className="list-none space-y-4">
                  {pageData.body?.slice(4, 7)?.map((item, index) => (
                    <li key={item.title}>
                      <Card
                        bgcolor="bg-green-800/90 hover:bg-green-900/100"
                        textColor="text-white font-bold"
                        textSize="text-xl md:text-2xl"
                        paraSize="text-md md:text-xl"
                        title={item.title ?? ''}
                        description={item.description ?? ''}
                        image={item.image}
                      />
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="text-center md:text-right mt-8">
              <p className="text-2xl md:text-xl font-bold my-4">
                {additionalData?.title}
              </p>
              <ul className="list-none grid grid-cols-1 md:grid-cols-2 gap-4">
                {Array.isArray((additionalData as ContentItem)?.body) &&
                  (additionalData as ContentItem).body.map((item) => (
                    <li key={item.title}>
                      <Card
                        bgcolor="bg-orange-400/35 hover:bg-orange-400/60"
                        textColor="text-black font-bold"
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
