import { usePageData } from '../hooks/usePageData';
import { LocalPageContent } from '../types/content';
import PageTitle from '../components/PageTitle';

export default function Services() {
  const { data, isLoading, error } = usePageData('services');

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!data.length) return null;

  const pageData: LocalPageContent = data[0];

  return (
    <>
      <PageTitle title={pageData.heading} />
      <div
        className="bg-white flex items-center justify-end h0.12455555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555
      68-full"
      >
        <div className="container mx-auto md:max-w-[70%]">
          <h3 className="md:text-nowrap  text-xl md:text-4xl font-bold text-black text-center mb-8 transition-transform duration-300 ease-in-out hover:scale-105">
            {pageData.subheading}
          </h3>
          {/* Left Column: Main description content */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mx-2">
            {pageData.body.map((service, index) => (
              <div key={index} className="space-y-8 flex flex-auto">
                <div className="bg-orange-400/35 hover:bg-orange-400/60 rounded-2xl shadow-xl px-4 transition-all duration-300">
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
    </>
  );
}
