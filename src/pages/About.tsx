import { usePageData } from '../hooks/usePageData';
import { PageContent } from '../types/content';
import PageTitle from '../components/PageTitle';

export default function About() {
  const { data, isLoading, error } = usePageData('about');

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!data.length || !data[0].body.length) return null;

  const pageData: PageContent = data[0];
  const mainContent = pageData.body[0]; // Main content is mandatory

  return (
    <>
      <PageTitle title={pageData.heading} />

      <div className="bg-white py-12 px-8">
        <div className="container mx-auto md:max-w-[80%]">
          <h2 className="sm:text-4xl md:text-4xl font-bold text-green-850 text-center mb-0">
            {mainContent.title}
          </h2>

          {/* Main content section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start mb-0 md:mb-0">
            <div
              className={`text-right ${
                mainContent.image ? 'order-2 md:order-1 md:text-right' : ''
              }`}
            >
              <h2 className="text-2xl md:text-2xl text-green text-bold">
                {pageData.body[1].title}
              </h2>
              {/* Additional content */}
              {pageData.body.slice(1).map((item, index) => (
                <div key={index} className="mt-0 md:mt-2">
                  <p className="text-gray-900 text-md md:text-xl mt-4">
                    <span className="block md:hidden text-green-800 font-semibold text-lg mb-2"></span>
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
            {mainContent.image && (
              <div className="order-1 md:order-2 flex justify-center">
                <figure className="flex flex-col items-center">
                  <img
                    src={mainContent.image}
                    alt={mainContent.title}
                    className="max-w-xs mb-0 md:max-w-sm h-auto rounded-full"
                  />
                </figure>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
