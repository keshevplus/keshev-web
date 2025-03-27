import { usePageData } from '../hooks/usePageData';
import { PageContent } from '../types/content';
import PageTitle from '../components/PageTitle';

export default function Services() {
  const { data, isLoading, error } = usePageData('services');

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!data.length) return null;

  const pageData: PageContent = data[0];

  return (
    <>
      <PageTitle title={pageData.heading} />
      <div className="bg-white py-8">
        <div className="container mx-auto max-w-full md:max-w-[75%]">
          {/* Main content grid */}
          <h3 className="text-xl md:text-2xl font-semibold text-black text-right mb-8 ">
            {pageData.subheading}
          </h3>
          {/* Left Column: Main description content */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-4">
            {pageData.body.map((service, index) => (
              <div className="space-y-4 flex flex-wrap">
                <div
                  key={index}
                  className="flex flex-row bg-orange-400/20 rounded-lg shadow-lg p-1 md:p-4"
                >
                  {service.image && (
                    <img
                      src={service.image}
                      alt={service.title}
                      className="w-12 h-12 object-cover my-0 mx-4"
                    />
                  )}
                  <div className="flex-auto text-right m-2">
                    <h3 className="text-lg md:text-xl font-bold text-green-800 mb-2">
                      {service.title}
                    </h3>
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
    </>
  );
}
