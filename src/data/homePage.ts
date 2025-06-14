<<<<<<< HEAD

export interface HomePageContent {
  title: string;
  image: string;  
  sections: {
    id: string;
    heading: string;
    text?: string;
    content?: string | string[];
    image?: string;
    ctaButtonText?: string;
    bgColor?: string;
    textColor?: string;
  }[];
}

const homePageData: HomePageContent = {
  title: `ברוכים הבאים למרפאת "קשב פלוס"`,        //    pd.title
  image: '/assets/images/logoSVG.svg',              // Hero logo  pd.image
  sections: [
    {
      id: 'intro',
      heading: `ד"ר איירין כוכב רייפמן   
             מומחית לאבחון וטיפול בהפרעות קשב וריכוז`,
      text: `בקשב פלוס, תקבלו אבחון מדויק ותוכנית טיפול אישית`
    },
    {
      id: 'hero',
      heading: `הצעד הראשון מתחיל כאן`,
      text:`
       קבעו פגישת ייעוץ - ובואו לגלות את הדרך להצלחה
      `,      image: '/assets/images/doctor-hero.png', // Image for the hero section

    },
 
    {
      id: 'contact-cta', // Call-to-action: contact
      heading: 'התחל/י את האבחון ',
      bgColor: 'bg-green-800 hover:bg-green-600', // Background color for the section
      textColor: 'text-white', // Text color for the section
    },
    {
      id: 'about-cta', // Call-to-action: about
      heading: 'קרא/י עוד עלינו',
      bgColor: 'bg-orange-200 hover:bg-orange-500', // Background color for the section
      textColor: 'text-black', // Text color for the section
    },
    {
      id: 'list',
      heading: 'ב"קשב פלוס" תקבלו אבחון מדויק ותוכנית טיפול אישית',
      content: [
        'בילדים',
        'בנוער',
        'במבוגרים'
      ]
=======
import { HomePageContent } from '../types/content';

const homePageData: HomePageContent = {
  heading: 'מרפאה לאבחון וטיפול בהפרעות קשב ופעלתנות יתר',
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
>>>>>>> 430a8d2625f8bfe902f04811e3d440f6634a849c
    },
  ],
};

export default homePageData;
