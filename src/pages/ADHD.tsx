import { usePageData } from '../hooks/usePageData';
import PageLayout from '../components/PageLayout';
import { PageContent } from '../types/content';

export default function ADHD() {
  const { data, isLoading, error } = usePageData('adhd');

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!data.length) return null;

  const pageData = data[0];

  return (
    <PageLayout title={pageData.heading}>
      {/* Two column grid section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
        {/* Left Column: Main Description */}
        <div className="text-right space-y-6">
          <h2 className="text-2xl md:text-3xl font-semibold text-green-800">
            הבנת ADHD
          </h2>
          <p className="text-gray-900 text-lg leading-relaxed">
            {pageData.subheading}
          </p>
        </div>

        {/* Right Column: Symptoms */}
        <div className="space-y-8">
          {pageData.body.map((service, index) => (
            <div
              key={index}
              className="flex flex-auto bg-white rounded-lg shadow-lg px-8 py-2"
            >
              {page.image && (
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
        <div className="space-y-6">
          <h2 className="text-2xl md:text-3xl font-semibold text-green-800 text-right">
            התסמינים העיקריים
          </h2>
          <div className="space-y-2">
            {pageData.additional?.map((item, index) => (
              <div
                key={index}
                className="bg-orange-50 rounded-lg p-4 shadow-sm"
              >
                <h3 className="text-xl font-semibold text-green-800 mb-2 text-right">
                  {item.title}
                </h3>
                <p className="text-gray-700 text-right leading-relaxed">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Additional Information */}
      <div className="mt-16 space-y-8">
        {pageData.body.map((item, index) => (
          <div
            key={index}
            className="bg-white rounded-lg p-8 shadow-sm border border-gray-100"
          >
            <h3 className="text-xl md:text-2xl font-semibold text-green-800 mb-4 text-right">
              {item.title}
            </h3>
            <p className="text-gray-700 text-right leading-relaxed whitespace-pre-line">
              {item.description}
            </p>
          </div>
        ))}
      </div>
    </PageLayout>
  );
}
