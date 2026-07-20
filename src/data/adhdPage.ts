import { BasePageContent } from '../types/content';

const adhdPageData: BasePageContent = {
  title: 'מהי הפרעת קשב וריכוז?',
  description: 'ADHD = Attention Deficit Hyperactivity Disorder',
  image: '/assets/images/icon.png',
  sections: [
    {
      id: 'overview',
      heading: 'מהי הפרעת קשב ופעלתנות יתר (ADHD)',
      text: `הפרעת קשב ופעלתנות יתר (ADHD) היא הפרעה נוירולוגית המשפיעה על יכולת הריכוז וההתנהגות. הפרעה זו נוטה להתבטא בקשיים בריכוז, קושי בהתארגנות, פעלתנות-יתר ולעיתים גם אימפולסיביות.`,
      image: '/assets/images/adhd-brain.jpg'
    },
    {
      id: 'symptoms',
      heading: 'סימנים שכיחים',
      content: [
        'קשיי קשב וריכוז',
        'היפראקטיביות',
        'אימפולסיביות',
        'קשיי התארגנות',
        'דחיינות',
        'שכחה'
      ],
      bgColor: 'bg-gray-50',
    },
    {
      id: 'treatment',
      heading: 'גישות טיפול',
      text: 'הטיפול בהפרעת קשב משלב בדרך כלל טיפול תרופתי, טיפול התנהגותי ואסטרטגיות למידה מותאמות אישית. הגישה הטיפולית המומלצת היא רב-מקצועית.',
      ctaButtonText: 'לקביעת פגישת אבחון',
      bgColor: 'bg-green-50'
    }
  ]
};

export default adhdPageData;
