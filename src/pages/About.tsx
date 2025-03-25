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
      <div className="relative h-[100px] mt-12">
        <PageTitle title={pageData.heading} />
      </div>

      <div className="bg-white py-12 px-8">
        <div className="container mx-auto md:max-w-[70%]">
          {/* Main content section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start mb-12">
            {mainContent.image && (
              <div className="order-first md:order-last flex justify-center">
                <figure className="flex flex-col items-center">
                  <img
                    src={mainContent.image}
                    alt={mainContent.title}
                    className="max-w-xs mb-4 md:max-w-sm h-auto rounded-full"
                  />
                  <figcaption className="md:text-xl text-green-800 text-center">
                    {mainContent.title}
                  </figcaption>
                </figure>
              </div>
            )}
            <div
              className={`text-center ${
                mainContent.image ? 'md:text-right' : ''
              }`}
            >
              <h3 className="text-xl md:text-4xl font-semibold text-green-800">
                {mainContent.title}
              </h3>
              <p className="text-gray-900 text-md md:text-xl mt-4">
                {mainContent.description}
              </p>

              {/* Additional content */}
              {pageData.body.slice(1).map((item, index) => (
                <div key={index} className="mt-8">
                  <h3 className="text-xl md:text-3xl font-semibold text-green-800">
                    {item.title}
                  </h3>
                  <p className="text-gray-900 text-md md:text-xl mt-4">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
