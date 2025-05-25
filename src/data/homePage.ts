import { HomePageContent } from '../types/content';

const homePageData: HomePageContent = {
  heading: 'ברוכים הבאים למרפאת "קשב פלוס"',
  image: '/assets/images/hero-home.jpeg',
  subheading: `
אבחון וטיפול מקצועי בהפרעות קשב וריכוז c
`,
  heroText: 'ב"קשב פלוס" תקבלו אבחון מדויק ותוכנית טיפול אישית',
  
  heroSubText: `הצעד הראשון מתחיל כאן.`,
  heroBody: `
קבעו פגישת ייעוץ -ובואו לגלות את הדרך להצלחה.
 `,
  ctaButtonText: 'צרו קשר',
 
  ctaHeading: 'זימנו היום תור לפגישת ייעוץ והתאמה אישית',
  ctaSubheading: 'אנחנו כאן בשבילכם',
  
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
