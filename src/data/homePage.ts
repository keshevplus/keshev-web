import { HomePageContent } from '../types/content';

const homePageData: HomePageContent = {
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
  ],
};

export default homePageData;
