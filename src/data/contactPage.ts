import { ContentItem } from '../types/content';

const contactPageData: ContentItem = {
  heading: 'יצירת קשר',
  subheading: 'צוות המומחים שלנו ישמח לעמוד לרשותכם ולסייע בכל שאלה.',
  body: [
    {
      title: 'כתובת',
      description: 'רמת גן, ישראל',
      image: '/assets/images/icon.png',
      icon: '🏠',
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

export default contactPageData;
