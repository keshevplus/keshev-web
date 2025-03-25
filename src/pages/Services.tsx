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
      <div className="bg-white py-16">
        <div className="container mx-auto px-4 md:max-w-[75%]">
          <h3 className="text-xl md:text-3xl font-semibold text-black text-center mb-8 ">
            {pageData.subheading}
          </h3>
          <div className="space-y-8">
            {pageData.body.map((service, index) => (
              <div
                key={index}
                className="flex flex-auto bg-white rounded-lg shadow-lg px-8 py-2"
              >
                {service.image && (
                  <img
                    src={service.image}
                    alt={service.title}
                    className="w-24 h-24 object-cover ml-6"
                  />
                )}
                <div className="flex-grow text-right">
                  <h3 className="text-xl   md:text-2xl font-semibold text-green-800 mb-2">
                    {service.title}
                  </h3>
                  <p className="text-gray-900 text-md md:text-xl">
                    {service.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
