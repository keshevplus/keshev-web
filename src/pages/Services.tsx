import { usePageData } from '../hooks/usePageData';
import PageLayout from '../components/ui/PageLayout';
import Card from '../components/ui/Card';
// Import icons for service cards
import { 
  FaBrain, 
  FaUserGraduate, 
  FaUsers, 
  FaSchool, 
  FaBookReader, 
  FaComments,
  FaClipboardCheck,
  FaClipboardList
} from 'react-icons/fa';

// Map of service icons - these will be matched by the index of services
const serviceIcons = [
  <FaBrain size={36} />,          // Neuropsychological assessment
  <FaUserGraduate size={36} />,  // Academic counseling
  <FaUsers size={36} />,         // Group therapy
  <FaSchool size={36} />,        // School consultations
  <FaBookReader size={36} />,    // Cognitive training
  <FaComments size={36} />,      // Family therapy
  <FaClipboardCheck size={36} />, // MOXO Tests
  <FaClipboardList size={36} />  // Additional assessments
];

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
      <h3 className="text-xl md:text-4xl font-bold text-black text-center mb-8">
        {pageData.subheading || 'Our Services'}
      </h3>
      <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {/* Add MOXO Testing card */}
        <li className="items-start justify-start">
          <Card
            bgcolor="bg-orange-400/35 hover:bg-orange-400/60 text-right"
            textColor="text-black font-bold"
            textSize="text-xl md:text-xl"
            paraSize="text-xl md:text-2xl"
            title="בדיקות MOXO"
            description="בדיקה ממוחשבת לאבחון קשב וריכוז המסייעת באיתור וטיפול בהפרעות קשב, מותאמת לילדים ומבוגרים"
            icon={<FaClipboardCheck size={36} />}
          />
        </li>
        {/* Original service cards from data */}
        {pageData.body?.map((item, index) => (
          <li key={index} className="items-start justify-start">
            <Card
              bgcolor="bg-orange-400/35 hover:bg-orange-400/60 text-right"
              textColor="text-black font-bold"
              textSize="text-xl md:text-xl"
              paraSize="text-xl md:text-2xl"
              title={item.title || 'Untitled'}
              description={item.description || ''}
              image={item.image}
              icon={serviceIcons[index % serviceIcons.length]} // Use the icon that corresponds to this service
            />
          </li>
        ))}
      </ul>
    </PageLayout>
  );
}
