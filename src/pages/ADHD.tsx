import { usePageData } from '../hooks/usePageData';
import PageTitle from '../components/PageTitle';
import { useEffect } from 'react';

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
  if (!data || !data.length) return null;

  const pageData = data[0] as {
    heading: string;
    subheading: string;
    body: { title: string; description: string }[];
    additional?: AdditionalItem[];
  };

  return (
    <div className="rtl">
      <PageTitle title={pageData.heading} />
      <div className="bg-white flex items-center justify-end h-full">
        <div className="container mx-auto md:max-w-[70%]">
          <div className="flex flex-col items-center justify-center">
            <div className="text-right items-start ">
              <h2 className="md:whitespace-nowrap text-2xl md:text-3xl font-bold text-black text-center mb-2">
                {pageData.body[0].title} = {pageData.subheading}
              </h2>
              <h3 className="text-xl md:text-2xl font-bold text-black mb-2"></h3>
              <p className="text-gray-700 text-lg md:text-lg mb-4">
                {pageData.body[0].description}
              </p>
            </div>
            {/* Symptoms Title */}
            <div className="w-full text-right">
              <h2 className="text-xl md:text-3xl font-bold text-black ">
                {pageData.body[2].title}
              </h2>
              <p className="text-gray-700 text-xl md:text-xl mb-2">
                {pageData.body[2].description}
              </p>
            </div>
            {/* Symptoms Grid Container */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full mb-2">
              {pageData.additional?.map((item, index) => (
                <div key={index} className="md:space-y-8 flex flex-auto">
                  <div className="bg-orange-400/35 hover:bg-orange-400/60 rounded-2xl shadow-xl md:px-4 transition-all duration-300">
                    <div className="col-span-1">
                      {/* Content for left column */}
                      <div className="p-0 text-right">
                        <div className="flex flex-row items-center">
                          {item.image && (
                            <img
                              src={item.image}
                              alt={item.title}
                              className="w-12 h-12 object-cover rounded-full"
                            />
                          )}

                          {/* Title and description */}
                          <h3 className="text-2xl md:text-2xl font-bold mx-4">
                            {item.title}
                          </h3>
                        </div>
                        <p className="text-xl md:text-lg px-2 md:px-0">
                          {item.description}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            {/* Grid End */}

            <div className="grid grid-cols-1 md:grid-cols-2 text-right">
              <h2 className="text-xl md:text-3xl font-bold text-black ">
                {' '}
                ddd
              </h2>
              <p className="text-gray-700 text-xl md:text-xl mb-2">
                {pageData.body[3].description}
              </p>
              <p className="text-gray-700 text-xl md:text-xl mb-2">
                {pageData.body[4].description}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
