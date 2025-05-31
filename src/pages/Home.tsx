import { usePageData } from '../hooks/usePageData';
import PageLayout from '../components/ui/PageLayout';
import Card from '../components/ui/Card';

// Hard-coded fallback until real data arrives
const fallbackData = [
  {
    heading: 'ברוכים הבאים לקשב פלוס',
    subheading: 'פתרונות למיקוד וריכוז',
    body: [
      {
        image: '/images/icon1.png',
        title: 'אבחון מקיף',
        description: 'תיאור אבחון מקצועי כולל בדיקות שונות.',
      },
      {
        image: '/images/icon2.png',
        title: 'התאמה אישית',
        description: 'תוכנית טיפול אישית בהתאם לצרכים.',
      },
      {
        image: '/images/icon3.png',
        title: 'מעקב לאחר הטיפול',
        description: 'שירותי ליווי ומעקב מקצועיים.',
      },
    ],
  },
];

export default function Home() {
  const { data, isLoading, error } = usePageData('home');

  // until fetch completes, use our fallback
  const pages = isLoading ? fallbackData : data;
  const pageData = pages?.[0];

  if (error)
    return <div className="text-red-600">Error loading content.</div>;
  if (!pageData)
    return <div className="py-8">No content available.</div>;

  return (
    <PageLayout title={pageData.heading} background="bg-white">
      <h2 className="text-3xl font-bold mb-4 text-center">
        {pageData.subheading}
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {pageData.body?.map((item) => (
          <Card
            key={item.title}
            image={item.image}
            title={item.title || 'Default Title'}
            description={item.description}
            bgcolor="bg-gray-100" // Default background color
            textColor="text-black" // Default text color
            textSize="text-base" // Default text size
          />
        ))}
      </div>
    </PageLayout>
  );
}