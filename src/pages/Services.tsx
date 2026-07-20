import { usePageData } from '../hooks/usePageData';
import PageLayout from '../components/ui/PageLayout';
import Card from '../components/ui/Card';
import servicesPageData from '../data/servicesPage';
import type { ContentItem } from '../types/content';

const customLeafIcon = <img src="/assets/images/green-leaf-icon.png" alt="Green Leaf" className="w-12 h-auto" />;

export default function Services() {
  const { data, isLoading } = usePageData<ContentItem>('services');
  const pageData = data?.[0] || servicesPageData;

  if (isLoading) {
    return (
      <div className="container mx-auto max-w-full md:max-w-[75%] py-8 loading">
        <div className="animate-pulse">Loading...</div>
      </div>
    );
  }

  return (
    <PageLayout
      title={pageData.title || 'שירותינו במרפאה'}
      background="bg-white"
      withRtl={true}
      maxWidth="md:max-w-[90%] lg:max-w-[85%]"
    >
      <h3 className="text-xl md:text-3xl font-bold text-black text-center mb-8">
        {pageData.heading || 'שירותינו במרפאה'}
      </h3>
      <div className="rtl-container" dir="rtl">
        <ul className="grid grid-cols-1 gap-8 w-full max-w-full md:max-w-[75%] mx-auto">
          {pageData.body?.map((item, index) => (
            <li key={index} className="items-start justify-start">
              <Card
                bgColor={item.bgColor || 'bg-orange-400/35 hover:bg-orange-400/60 text-right'}
                textColor="text-black font-bold"
                textSize="text-xl md:text-2xl"
                paraSize="text-md md:text-lg whitespace-pre-line"
                title={item.title || ''}
                description={item.description || ''}
                icon={customLeafIcon}
              />
            </li>
          ))}
        </ul>
      </div>
    </PageLayout>
  );
}
