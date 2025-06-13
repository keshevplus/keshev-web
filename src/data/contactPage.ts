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
    }
  ]
};

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

export default contactPageData;
