import { BasePageContent } from '../types/content';

const diagnosisPageData: BasePageContent = {
  title: 'תהליך האבחון והטיפול',
  description: 'תהליך אבחון הפרעת קשב מקצועי ואיכותי',
  image: '/assets/images/diagnosis-hero.jpg',
  sections: [
    {
      id: 'first-meeting',
      heading: 'שיחה ראשונית',
      text: 'מפגש אישי עם המטופל והמשפחה להבנת ההיסטוריה ההתפתחותית וההתנהגותית.',
      image: '/assets/images/icon.png',
      bgColor: 'bg-orange-50',
      textColor: 'text-black'
    },
    {
      id: 'questionnaires',
      heading: 'שאלונים מובנים',
      text: 'איסוף מידע באמצעות שאלונים מתוקפים להורים, למורים ולמטופל.',
      image: '/assets/images/icon.png',
      bgColor: 'bg-blue-50',
      textColor: 'text-black'
    },
    {
      id: 'testing',
      heading: 'בדיקות ממוחשבות',
      text: 'ביצוע מבחני קשב ממוחשבים להערכה אובייקטיבית של יכולות הקשב והריכוז.',
      image: '/assets/images/icon.png',
      bgColor: 'bg-green-50',
      textColor: 'text-black'
    },
    {
      id: 'diagnosis',
      heading: 'אבחנה וסיכום',
      text: 'פגישת סיכום והסברת האבחנה, כולל המלצות טיפוליות מותאמות אישית.',
      image: '/assets/images/icon.png',
      bgColor: 'bg-purple-50',
      textColor: 'text-black'
    },
    {
      id: 'treatment',
      heading: 'תכנית טיפול',
      text: 'בניית תכנית טיפול מקיפה הכוללת התערבות תרופתית, פסיכולוגית, חינוכית והתנהגותית לפי הצורך.',
      image: '/assets/images/icon.png',
      bgColor: 'bg-yellow-50',
      textColor: 'text-black'
    },
    {
      id: 'cta',
      heading: 'מעוניינים לקבוע פגישה?',
      text: 'צרו קשר עוד היום לקביעת פגישת אבחון מקיפה',
      ctaButtonText: 'צרו קשר עכשיו',
      bgColor: 'bg-green-100',
      textColor: 'text-green-800'
    }
  ]
};

export default diagnosisPageData;

