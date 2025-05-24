import { HomePageContent } from '../types/content';

const homePageData: HomePageContent = {
  heading: 'ברוכים הבאים למרפאת "קשב פלוס"',
  body: [
    {
      heading: 'אבחון וטיפול מקצועי בהפרעות קשב וריכוז',
      body: [
        {
          title: 'ילדים',
          description: 'ילדים'
        },
        {
          title: 'בני נוער',
          description: 'בני נוער'
        },
        {
          title: 'מבוגרים',
          description: 'מבוגרים'
        }
      ],
      icon: '/assets/images/icon.png'
    }
  ],
  subheading: 'בילדים, בני נוער ומבוגרים',
  image: '/assets/images/hero-image.jpg',
  heroText: 'מרפאה לאבחון וטיפול בהפרעות קשב ופעלתנות יתר בילדים ומבוגרים',
  ctaButtonText: 'צור קשר',
  servicesHeading: 'השירותים שלנו',
  servicesSubheading: 'אנו מציעים מגוון רחב של שירותים מקצועיים בתחום אבחון וטיפול בהפרעות קשב',
  ctaHeading: 'זימנו היום תור לפגישת ייעוץ והתאמה אישית',
  ctaSubheading: 'צוות המומחים שלנו ישמח לעמוד לרשותכם ולסייע בכל שאלה',
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
  ],
};

export default homePageData;
