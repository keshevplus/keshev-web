import { usePageData } from '../hooks/usePageData';
import PageLayout from '../components/PageLayout';
import { useEffect } from 'react';
import BodyContent from '../components/BodyContent'; // Adjust the path as needed

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
    body: { title: string; description: string }[];
    additional?: AdditionalItem[];
  };

  return (
    <div className="rtl">
      <PageLayout title={pageData.heading} children={undefined} />
      <>
        <div className="bg-white flex flex-auto items-center justify-center h-full">
          <div className="container mx-auto px-4 sm:px-6 max-w-full md:max-w-[75%] lg:max-w-[70%]">
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
              <div className="w-full text-center mb-4">
                <h2 className="text-2xl md:text-3xl font-bold text-black  ">
                  {pageData.body[1].title}
                </h2>
                <p className="text-gray-700 text-xl md:text-xl mb-2">
                  {pageData.body[1].description}
                </p>
              </div>
              {/* Symptoms Grid Container */}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 md:gap-8 w-full mb-4">
                {pageData.additional?.map((item, index) => (
                  <div key={index} className="md:space-y-8 flex flex-auto">
                    <div className="bg-orange-400/35 hover:bg-orange-400/60 rounded-2xl shadow-xl px-4 py-4 sm:px-6 sm:py-6 transition-all duration-300">
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
                            <h4 className="text-3xl md:text-2xl font-bold mx-4">
                              {item.title}
                            </h4>
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

              <div className="grid grid-cols-1 md:grid-cols-2 text-right gap-4 ">
                {pageData.body.slice(3).map((item, index) => (
                  <div
                    key={index}
                    className="bg-green-800 col-span-1  px-4 py-4 rounded-3xl  shadow-xl sm:px-6 sm:py-6 transition-all duration-300"
                  >
                    <div className="flex flex-row items-center">
                      {item.image && (
                        <img
                          src={item.image}
                          alt={item.title}
                          className="w-12 h-12 object-cover rounded-full mx-4"
                        />
                      )}

                      <h4 className="text-3xl md:text-4xl font-bold text-white ">
                        {item.title}
                      </h4>
                    </div>

                    <p className=" text-white text-xl md:text-xl mx-2">
                      {item.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </>
    </div>
  );
}
