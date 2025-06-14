<<<<<<< HEAD
import { BasePageContent } from '../types/content';

// Simple contact info interface - only what's actually needed
export interface ContactInfo {
  address: string;
  phone: string;
  email: string;
  whatsapp?: string;
  location?: {
    lat: number;
    lng: number;
    zoom?: number;
  };
}

// Contact page following the same pattern as other pages
const contactPageData: BasePageContent = {
  title: 'יצירת קשר',
  description: 'נשמח לענות על כל שאלה ולעזור לכם בכל נושא',
  sections: [
    {
      id: 'contact-hero',
      heading: 'יצירת קשר',
      text: 'אנחנו כאן כדי לענות על כל שאלה ולעזור לכם בכל נושא.',
    },
    {
      id: 'contact-form',
      heading: 'שלחו לנו הודעה',
      text: 'מלאו את הטופס ונחזור אליכם בהקדם.',
    },
    {
      id: 'contact-info',
      heading: 'פרטי התקשרות',
      text: 'יגאל אלון 94, מגדלי אלון 1, קומה 12, משרד 1202, תל אביב - יפו',
=======
import { ContentItem } from '../types/content';

const contactPageData: ContentItem = {
  heading: 'יצירת קשר',
  subheading: 'השאירו פרטים ואחד מנציגנו יחזור אליכם בהקדם',
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
>>>>>>> 430a8d2625f8bfe902f04811e3d440f6634a849c
    }
  ]
};

<<<<<<< HEAD
// Contact info data
export const contactInfo: ContactInfo = {
  address: 'יגאל אלון 94, מגדלי אלון 1, קומה 12, משרד 1202, תל אביב - יפו',
  email: 'dr@keshevplus.co.il',
  phone: '055-27-399-27',
  whatsapp: '972552739927',
  location: {
    lat: 32.0688715,
    lng: 34.7939972,
    zoom: 15
  }
};

=======
>>>>>>> 430a8d2625f8bfe902f04811e3d440f6634a849c
export default contactPageData;
