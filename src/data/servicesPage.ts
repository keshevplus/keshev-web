import { BasePageContent } from '../types/content';

const servicesPageData: BasePageContent = {
  title: 'שירותינו במרפאה',
  description: 'אנו מציעים מגוון רחב של שירותים מקצועיים בתחום אבחון וטיפול בהפרעות קשב',
  image: '/assets/images/icon.png',
  sections: [
    {
      id: 'diagnosis',
      heading: 'אבחון מקיף',
      text: `הליך האבחון במרפאה מתבצע ביסודיות ומותאם באופן אישי לכל מטופל/ת. 
      האבחון כולל שיחת היכרות מעמיקה, שאלונים מובנים, מבחני קשב ממוחשבים, ובמידת הצורך הערכות נוספות. 
      בסיום התהליך מתקבלת אבחנה מדויקת והמלצות טיפוליות.`,
      image: '/assets/images/diagnosis-service.jpg',
      bgColor: 'bg-blue-50'
    },
    {
      id: 'treatment',
      heading: 'טיפול תרופתי',
      text: `הטיפול התרופתי בהפרעת קשב הוא אחד הכלים המשמעותיים ביותר לשיפור איכות החיים. 
      בקשב פלוס, אנו מאמינים בהתאמה אישית של הטיפול התרופתי תוך מעקב רפואי צמוד, 
      התחשבות בתופעות לוואי ובחינת האפקטיביות של הטיפול לאורך זמן.`,
      image: '/assets/images/medication.jpg',
      bgColor: 'bg-green-50'
    },
    {
      id: 'guidance',
      heading: 'הדרכת הורים',
      text: `הדרכת הורים לילדים עם הפרעת קשב היא חלק חיוני מהטיפול הכולל. 
      בפגישות ההדרכה נלמד אסטרטגיות יעילות להתמודדות עם אתגרי ההפרעה, 
      שיטות לשיפור התקשורת המשפחתית וכלים מעשיים לניהול יומיומי מיטבי.`,
      image: '/assets/images/parent-guidance.jpg',
      bgColor: 'bg-yellow-50'
    },
    {
      id: 'behavioral',
      heading: 'טיפול התנהגותי',
      text: `הטיפול ההתנהגותי-קוגניטיבי מסייע בפיתוח מיומנויות חיוניות להתמודדות עם הפרעת קשב. 
      במסגרת הטיפול נלמדות טכניקות לשיפור ארגון וניהול זמן, התמודדות עם דחיינות, 
      ויסות רגשי ופיתוח מיומנויות חברתיות.`,
      image: '/assets/images/therapy.jpg',
      bgColor: 'bg-purple-50'
    },
    {
      id: 'cta',
      heading: 'מעוניינים בייעוץ?',
      text: 'צרו קשר עוד היום לקביעת פגישת ייעוץ וקבלת מידע נוסף על השירותים שלנו',
      ctaButtonText: 'צרו קשר עכשיו',
      bgColor: 'bg-green-100',
      textColor: 'text-green-800'
    }
  ]
};

export default servicesPageData;
