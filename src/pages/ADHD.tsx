import { usePageData } from '../hooks/usePageData';
import { PageContent } from '../types/content';
import PageTitle from '../components/PageTitle';

export default function ADHD() {
  const { data, isLoading, error } = usePageData('adhd');

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!data.length) return null;

  const pageData: PageContent = data[0];

  return (
    <>
      <PageTitle title={pageData.heading} />
      <div className="bg-white py-8 px-8">
        <div className="container mx-auto max-w-full md:max-w-[100%]">
          <h3 className="text-lg md:text-2xl text-gray-700 text-center mb-0 md:mb-0">
            {pageData.subheading}
          </h3>
        </div>
      </div>
      <div className="bg-white">
        <div className="container mx-auto max-w-full md:max-w-[80%]">
          {/* Main content grid */}
          <div className="grid grid-cols-1 md:grid-cols-5 gap-12 mb-0 md:mb-0">
            {/* Left Column: Main description content */}
            <div className="md:col-span-3 space-y-2">
              {pageData.body.paragraphs.map((item, index) => (
                <div
                  key={index}
                  className="flex flex-auto bg-white rounded-lg shadow-lg px-8 py-2"
                >
                  {item.image && (
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-12 h-12 object-cover my-0 mx-4"
                    />
                  )}
                  <div className="flex-grow text-right">
                    <h3 className="text-xl md:text-2xl font-semibold text-green-800 mb-2">
                      {item.title}
                    </h3>
                    <p className="text-gray-900 text-md md:text-xl">
                      {item.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            {/* Right Column: Additional information section */}
            {pageData.additional &&
              pageData.additional.heading &&
              pageData.additional.body &&
              pageData.additional.body.length > 0 && (
                <div className="md:col-span-2 mt-0 md:mt-0">
                  <h2 className="text-2xl md:text-3xl font-semibold text-green-800 text mb-2">
                    {pageData.additional.heading}
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-1 gap-4">
                    {pageData.additional.body.map((item, index) => (
                      <div
                        key={index}
                        className="flex flex-col bg-orange-400/20 rounded-lg shadow-lg p-1 md:p-4"
                      >
                        <div className="flex flex-row items-center justify-start pr-4 py-0">
                          <img
                            src={item.image || ''}
                            alt={item.title}
                            className="w-12 h-12 object-contain"
                          />
                          <h4 className="text-xl md:text-2xl font-semibold text-black text-center px-8">
                            {item.title}
                          </h4>
                        </div>
                        <p className="text-gray-700 text-right text-md md:text-md pr-24 pb-4">
                          {item.description}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
          </div>
        </div>
      </div>
    </>
  );
}
