import { LocalPageContent } from '../types/content';

export const contactPageData: LocalPageContent = {
  heading: 'יצירת קשר',
  subheading: 'צוות המומחים שלנו ישמח לעמוד לרשותכם ולסייע בכל שאלה.',
  body: [
    {
      title: 'כתובת',
      description: 'רמת גן, ישראל',
      image: '/assets/images/icon.png',
      icon: '📍',
    },
    {
      title: 'טלפון',
      description: '054-4777469',
      image: '/assets/images/icon.png',
      icon: '📞',
    },
    {
      title: 'אימייל',
      description: 'dr@keshevplus.co.il',
      image: '/assets/images/icon.png',
      icon: '✉️',
    }
  ]
};

// Add default export to match pattern used by usePageData hook
export default contactPageData;
