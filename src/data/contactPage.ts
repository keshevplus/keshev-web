import { ContentItem } from '../types/content';
import { PageSection } from '../types/pages';

/**
 * Contact page data model
 */
export interface ContactPageData {
  id: string;
  title: string;
  subtitle?: string;
  heading?: string;
  description?: string;
  sections: ContactPageSection[];
  metaTitle?: string;
  metaDescription?: string;
  contactInfo: ContactInfo;
  formConfig: ContactFormConfig;
}

export interface ContactPageSection extends PageSection {
  type: 'hero' | 'form' | 'map' | 'info' | 'faq';
}

/**
 * Contact information structure
 */
export interface ContactInfo {
  address: string;
  phone: string;
  email: string;
  whatsapp?: string;
  socialMedia?: SocialMedia;
  location?: GeoLocation;
}

export interface SocialMedia {
  facebook?: string;
  instagram?: string;
  twitter?: string;
  linkedin?: string;
  youtube?: string;
}

export interface GeoLocation {
  lat: number;
  lng: number;
  zoom?: number;
}

/**
 * Contact form configuration
 */
export interface ContactFormConfig {
  id: string;
  title: string;
  heading?: string;
  subtitle?: string;
  fields: FormField[];
  submitButtonText: string;
  successMessage: string;
  errorMessage: string;
  redirect?: string;
}

export interface FormField {
  id: string;
  name: string;
  label: string;
  type: 'text' | 'email' | 'tel' | 'textarea' | 'select' | 'checkbox' | 'radio';
  placeholder?: string;
  required: boolean;
  options?: { value: string; label: string }[];
  validation?: {
    pattern?: string;
    minLength?: number;
    maxLength?: number;
    message?: string;
  };
}

// Default contact page data with proper DB-based structure
export const defaultContactPage: ContactPageData = {
  id: 'contact-page',
  title: 'יצירת קשר',
  subtitle: 'נשמח לענות על כל שאלה',
  sections: [
    {
      id: 'contact-hero',
      type: 'hero',
      title: 'יצירת קשר',
      subtitle: 'אנחנו כאן כדי לעזור לכם',
      content: 'אנחנו כאן כדי לענות על כל שאלה ולעזור לכם בכל נושא.',
      display_order: 1
    },
    {
      id: 'contact-form',
      type: 'form',
      title: 'שלחו לנו הודעה',
      content: 'מלאו את הטופס ונחזור אליכם בהקדם.',
      display_order: 2
    },
    {
      id: 'contact-map',
      type: 'map',
      title: 'המיקום שלנו',
      content: '',
      display_order: 3
    }
  ],
  contactInfo: {
    address: 'יגאל אלון 94 , מגדלי אלון 1, קומה 12, משרד 1202 תל אביב - יפו',
    phone: '055-27-399-27',
    email: 'dr@keshevplus.co.il',
    whatsapp: '972552739927',

    location: {
      lat: 32.0688715,
      lng: 34.7939972,
      zoom: 15
    }
  },
  formConfig: {
    id: 'contact-form',
    title: 'יצירת קשר',
    fields: [
      {
        id: 'name',
        name: 'name',
        label: 'שם מלא',
        type: 'text',
        placeholder: 'הכנס/י שם מלא',
        required: true
      },
      {
        id: 'email',
        name: 'email',
        label: 'דואר אלקטרוני',
        type: 'email',
        placeholder: 'דוא״ל שלך@דוגמה.com',
        required: true
      },
      {
        id: 'phone',
        name: 'phone',
        label: 'טלפון',
        type: 'tel',
        placeholder: '050-1234567',
        required: true
      },
      {
        id: 'message',
        name: 'message',
        label: 'תוכן הפנייה',
        type: 'textarea',
        placeholder: 'הכנס/י את תוכן הפנייה כאן...',
        required: true
      }
    ],
    submitButtonText: 'שלח פנייה',
    successMessage: 'ההודעה נשלחה בהצלחה! נחזור אליך בהקדם האפשרי',
    errorMessage: 'אירעה שגיאה בשליחת ההודעה. אנא נסה שנית או התקשר אלינו ישירות'
  }
};
