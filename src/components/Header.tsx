import { usePageData } from '../hooks/usePageData';
import { PageContent } from '../types/content';
import PageTitle from '../components/PageTitle';

export default function Diagnosis() {
  const { data, isLoading, error } = usePageData('diagnosis');

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!data.length || !data[0].body.length) return null;

  const pageData = data[0];
  const mainContent = pageData.body[0]; // Main content is mandatory

  return (
    <div>
      <div className="bg-white py-16 px-4">
        <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="text-center md:text-right">
            <h3 className="text-2xl font-bold mb-4">
              איך מתבצע האבחון במרפאה שלנו?
            </h3>
            <p className="text-black text-xl mb-4">{pageData.subheading}</p>
            <ul className="list-none gap-4">
              {pageData.body.map((item, index) => (
                <li
                  key={index}
                  className="bg-orange-400/40 rounded-lg shadow-md mx-4"
                >
                  <span className="mx-0 p-4">
                    <div className="flex items-start">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-16 h-16 object-cover mx-4"
                      />
                      <div>
                        <h3 className="text-xl md:text-2xl font-semibold text-green-800">
                          {item.title}
                        </h3>
                        <p className="text-gray-900 text-md md:text-xl">
                          {item.description}
                        </p>
                      </div>
                    </div>
                  </span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            {pageData.additionalInfo && (
              <>
                <h2 className="text-2xl font-bold mb-4">
                  {pageData.additionalInfo.heading}
                </h2>
                <p className="text-gray-600">
                  {pageData.additionalInfo.description}
                </p>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// or wherever your phone icon is being used
// ...existing code...
<svg
  // ...existing attributes...
  fill="#166534" // Change to green-800
  // or use Tailwind classes:
  className="text-green-800 fill-current"
>
  {/* ...existing code... */}
</svg>;
// ...existing code...
