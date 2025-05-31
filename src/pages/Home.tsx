import { usePageData } from '../hooks/usePageData';
import PageLayout from '../components/ui/PageLayout';
import Card from '../components/ui/Card';

// Hard-coded fallback until real data arrives
const fallbackData = [
  {
  heading: `ברוכים הבאים 
  למרפאת "קשב פלוס"
  `,
  image: '/assets/images/logo.png',
  subheading: ` ב"קשב פלוס" תקבלו אבחון מדויק
  ותוכנית טיפול אישית
  `,
  list: [
    'ילדים',
    'בני נוער',
    'מבוגרים'
],  
  body: [
    {
      heading: 'קשב פלוס',
      title: 'קשב פלוס',
      description: 'אבחון וטיפול מקצועי בהפרעות קשב וריכוז',
      image: '/assets/images/doctor-hero.png'
    }
  ],
  subTitle: `הצעד הראשון מתחיל כאן`,
  heroText: `קבעו פגישת ייעוץ - בואו לגלות את הדרך להצלחה`,
  ctaButtonText: 'יצירת קשר',   
  ctaHeading: 'זימנו היום תור לפגישת ייעוץ והתאמה אישית',
  ctaSubheading: 'אנחנו כאן בשבילכם',
  servicesHeading: 'השירותים שלנו',
  servicesSubheading: 'אנו מציעים מגוון שירותים מקצועיים',
  
  // You can use list for words if needed
  
  // Alternative: define a custom words object outside the HomePageContent interface
  // words: {
  //   kids: 'ילדים',
  //   teens: 'בני נוער',
  //   adults: 'מבוגרים'
  // },
  
  services: [
    {
      title: 'אבחון מקיף',
      description: 'אבחון מקיף של הפרעות קשב ופעלתנות יתר',
      icon: '🔍',
    },
    {
      title: 'טיפול מותאם',
      description: 'טיפול תרופתי מותאם למטופל, יחד עם שיתוף עפ פסיכולוגי פרטני ומשפחתי',
      icon: '💭',
    },
    {
      title: 'הדרכת הורים',
      description: 'הדרכה וכלים להתמודדות עם אתגרי ההורות',
      icon: '👨‍👩‍👧‍👦',
    },
  ] 
 
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