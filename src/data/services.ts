import { PageContent } from '../types/content';

const servicesData: PageContent[] = [
  {
    heading: 'השירותים שלנו',
    subheading: 'אנו מציעים מגוון רחב של שירותים מקצועיים',
    body: [
      {
        title: 'טיפול פרטני',
        description: 'טיפול אישי המותאם לצרכים הספציפיים של כל מטופל',
        image: '/images/individual-therapy.jpg',
      },
      {
        title: 'טיפול קבוצתי',
        description: 'טיפול בקבוצות קטנות המאפשר למידה ותמיכה הדדית',
        image: '/images/group-therapy.jpg',
      },
      // Add other services as needed
    ]
  }
];

export default servicesData;
