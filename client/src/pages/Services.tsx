import { usePageData } from '../hooks/usePageData';
import { ContentItem } from '../types/content';
import PageTitle from '../components/PageTitle';
import BodyContent from '../components/BodyContent'; // Ensure this path is correct

export default function Services() {
  const { data, isLoading, error } = usePageData('services');

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!data.length) return null;

  const pageData: ContentItem = data[0];

  return (
    <>
      <PageTitle title={pageData.heading} />
      <BodyContent>
        <div
          className="bg-white flex items-center justify-end h0.12455555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555
      68-full"
        >
          <div className="container mx-auto px-4 sm:px-6 md:max-w-[80%] lg:max-w-[90%]">
            <h3 className="md:text-nowrap  text-xl md:text-4xl font-bold text-black text-center mb-8 transition-transform duration-300 ease-in-out hover:scale-105">
              {pageData.subheading}
            </h3>
            <div className="flex flex-col md:flex-row items-center md:items-start justify-between gap-3 md:gap-8 mb-4">
              {/* Left Column: Main description content */}
              <div className="md:0 text-center md:text-left mb-4 md:mb-0">
                <p className="text-gray-700 text-sm md:text-lg">
                  {pageData.description}
                </p>
              </div>
              {/* Right Column: Additional content or image */}
            </div>
            <div className="grid grid-cols-3 md:grid-cols-3 lg:grid-cols-2 gap-4 sm:gap-6 lg:gap-8 mx-4">
              {pageData.body?.map((service, index) => (
                <div key={index} className="space-y-8 flex flex-auto">
                  <div className="bg-orange-400/35 hover:bg-orange-400/60 rounded-2xl shadow-xl px-4 py-4 sm:py-6 transition-all duration-300">
                    <div className="flex-auto text-right m-2">
                      {service.image && (
                        <div className="flex items-center">
                          <img
                            src={service.image}
                            alt={service.title}
                            className="w-12 h-12 object-cover rounded-full me-4"
                          />
                          <h3 className="md:text-nowrap text-xl md:text-xl font-bold text-black-800 mb-2">
                            {service.title}
                          </h3>
                        </div>
                      )}

                      <p className="text-gray-900 text-sm md:text-lg">
                        {service.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </BodyContent>
    </>
  );
}
