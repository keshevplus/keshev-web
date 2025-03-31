import { usePageData } from '../hooks/usePageData';
import PageTitle from '../components/PageTitle';
import { useEffect } from 'react';

export default function Diagnosis() {
  const { data, isLoading, error } = usePageData('diagnosis');

  // Set RTL direction for the document
  useEffect(() => {
    document.documentElement.dir = 'rtl';
  }, []);

  if (isLoading)
    return (
      <div className="container mx-auto md:max-w-[70%] py-8 loading">
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

  return (
    <div className="rtl">
      <PageTitle title={pageData.heading} />
      <div className="bg-white flex items-center justify-end h-full">
        <div className="container mx-auto md:max-w-[70%]">
          <div className="text-center md:text-right grid grid-cols-1 md:grid-cols-2 gap-8">
            <h3 className="text-2xl font-bold mb-4">
              איך מתבצע האבחון במרפאה שלנו?
            </h3>
            <p className="text-black text-xl mb-4">{pageData.subheading}</p>
            <ul className="list-none space-y-4">
              {pageData.body.map((item, index) => (
                <li
                  key={index}
                  className="bg-orange-400/40 rounded-lg shadow-md mx-4 p-4 transition-all duration-300 hover:bg-orange-400/60"
                >
                  <div className="flex flex-row-reverse items-start">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-16 h-16 object-cover ms-4"
                    />
                    <div className="text-right">
                      <h3 className="text-xl md:text-2xl font-semibold text-green-800">
                        {item.title}
                      </h3>
                      <p className="text-gray-900 text-md md:text-xl">
                        {item.description}
                      </p>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
          <div>
            {pageData.additionalInfo && (
              <div className="bg-green-50 p-6 rounded-lg shadow-md">
                <h2 className="text-2xl font-bold mb-4 text-green-800">
                  {pageData.additionalInfo.heading}
                </h2>
                <p className="text-gray-800 leading-relaxed">
                  {pageData.additionalInfo.description}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
