import { usePageData } from '../hooks/usePageData';
import { PageContent } from '../types/content';

export default function About() {
  const { data, isLoading, error } = usePageData('about');

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!data.length) return null;

  const pageData: PageContent = data[0];

  return (
    <div>
      <div className="relative h-[150px] mt-12">
        <div className="text-justify py-16 inset-0 bg-gradient-to-b from-transparent bg-green-800 mx-auto px-8 h-full flex flex-col justify-center to-black/80">
          <div className="container py-0 font-bold">
            <h1 className="text-center text-5xl text-white mx-4">
              {pageData.heading}
            </h1>
          </div>
        </div>
      </div>

      <div className="bg-white py-12 px-8">
        <div className="container mx-auto">
          {pageData.body.map((item, index) => (
            <div
              key={index}
              className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start"
            >
              <div
                className={`order-first ${
                  index % 2 === 0 ? 'md:order-last' : 'md:order-first'
                } flex justify-center `}
              >
                <figure>
                  <figcaption className="md:text-2xl text-green-800 min-w-full ">
                    {typeof item === 'object' && 'title' in item
                      ? item.title
                      : ''}
                  </figcaption>
                  <img
                    src={
                      typeof item === 'object' && 'image' in item
                        ? item.image
                        : ''
                    }
                    alt={
                      typeof item === 'object' && 'title' in item
                        ? item.title
                        : ''
                    }
                    className="max-w-xs mb-12 md:max-w-xs h-auto rounded-full"
                  />
                </figure>
              </div>
              <div
                className={`text-center ${
                  index % 2 === 0 ? 'md:text-right' : 'md:text-left'
                }`}
              >
                <h3 className="text-2xl md:text-5xl font-semibold  text-green-950">
                  {data[0].subheading}
                </h3>

                <p className="text-gray-600 text-lg md:text-2xl mt-4">
                  {typeof item === 'object' && 'description' in item
                    ? item.description
                    : ''}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
