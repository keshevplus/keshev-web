import { usePageData } from '../hooks/usePageData';
import PageLayout from '../components/ui/PageLayout';
import Card from '../components/ui/Card';

// Custom leaf icon image for all service cards
const customLeafIcon = <img src="/assets/images/green-leaf-icon.png" alt="Green Leaf" className="w-12 h-auto" />;

export default function Services() {
  const { data, isLoading, error } = usePageData('services');

  if (isLoading)
    return (
      <div className="container mx-auto max-w-full md:max-w-[75%] py-8 loading">
        <div className="animate-pulse">Loading...</div>
      </div>
    );

  if (error)
    return (
      <div className="container mx-auto max-w-full md:max-w-[85%] py-8 error">
        <div className="text-red-600">Error: {error}</div>
      </div>
    );

  if (!data?.length)
    return (
      <div className="container mx-auto max-w-full md:max-w-[85%] py-8 error">
        <div className="text-red-600">No services data found.</div>
      </div>
    );

  const pageData = data[0];

  return (
    <PageLayout
      title={pageData.heading || 'Services'}
      background="bg-white"
      withRtl={true}
      maxWidth="md:max-w-[90%] lg:max-w-[85%]"
    >
      <h3 className="text-xl md:text-3xl font-bold text-black text-center mb-8">
        {pageData.subheading || 'Our Services'}
      </h3>
      <div className="rtl-container" dir="rtl">
        <ul className="grid grid-cols-1 gap-8 w-full max-w-full md:max-w-[60%] mx-auto">
          {/* All service cards from data */}
          {pageData.body?.map((item, index) => (
            <li key={index} className="items-start justify-start">
              <Card
                bgcolor="bg-orange-400/35 hover:bg-orange-400/60 text-right"
                textColor="text-black font-bold"
                textSize="text-2xl md:text-3xl" /* Bigger title font */
                paraSize="text-md md:text-md whitespace-pre-line" /* Smaller content font */
                title={item.title || 'Untitled'}
                description={item.description || ''}
                icon={customLeafIcon} /* Use custom green leaf icon for all cards */
                // isRtl={true} /* Enable RTL for Hebrew content */
              />
            </li>
          ))}
        </ul>
      </div>
    </PageLayout>
  );
}
