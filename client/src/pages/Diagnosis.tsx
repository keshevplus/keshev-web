import { usePageData } from '../hooks/usePageData';
import PageTitle from '../components/PageTitle';
import BodyContent from '../components/BodyContent';

import { useEffect } from 'react';

export default function Diagnosis() {
  const { data, isLoading, error } = usePageData('diagnosis');

  // Set RTL direction for the document
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
      <div className="container mx-auto max-w-full md:max-w-[70%]py-8 error">
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
      <BodyContent>
        <div className="bg-white flex  items-center justify-end h-full">
          <div className="container mx-auto md:max-w-[80%]">
            {/* start content */}

            <div className="text-center md:text-right ">
              <h3 className="text-2xl font-bold mb-4 ">
                {pageData.subheading}
              </h3>
              <ul className="list-none space-y-0gap-4 md:gap-8">
                {pageData.body?.map((item, index) => (
                  <li
                    key={index}
                    className="bg-orange-400/40 rounded-lg shadow-md transition-all duration-300 hover:bg-orange-400/60"
                  >
                    <div className="flex flex-auto items-start justify-start py-2 px-2">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-12 h-12 object-cover mx-2 rounded-full"
                      />
                      <div className="text-right">
                        <p className="text-lg md:text-xl font-semibold text-green-800">
                          {item.title}
                        </p>
                        <p className="text-gray-900 text-md md:text-lg">
                          {item.description}
                        </p>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
            <div className="text-center md:text-right ">
              <p className="text-2xl  md:text-xl font-bold my-4 md:my-4">
                {additionalData?.title}
                {additionalData?.subtitle}
              </p>
              <ul className="list-none space-y-0 grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8">
                {additionalData?.body?.map((item, index) => (
                  <li
                    key={index}
                    className="bg-orange-400/40 rounded-lg shadow-md transition-all duration-300 hover:bg-orange-400/60"
                  >
                    <div className="flex flex-auto items-start justify-start py-2 px-2">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-12 h-12 object-cover mx-2 rounded-full"
                      />
                      <div className="text-right">
                        <p className="text-lg md:text-xl font-semibold text-green-800">
                          {item.title}
                        </p>
                        <p className="text-gray-900 text-md md:text-lg">
                          {item.description}
                        </p>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
            {/* end content */}
          </div>
        </div>
      </BodyContent>
    </div>
  );
}
