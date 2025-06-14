<<<<<<< HEAD
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
=======
import { ContentItem } from '../types/content';

export const adhdPageData: ContentItem = {
  heading: 'מהי ADHD?',
  subheading: 'Attention Deficit Hyperactivity Disorder',
  body: [
    {
      title: 'מהי הפרעת קשב ופעלתנות יתר (ADHD)',
      description: 'הפרעת קשב ופעלתנות יתר היא מצב נוירולוגי המשפיע על יכולת הריכוז, השליטה העצמית וההתנהגות. היא נפוצה בקרב ילדים ומבוגרים כאחד, ויכולה להשפיע על תחומי חיים רבים, כולל למידה, עבודה ומערכות יחסים.',
      image: '/assets/images/icon.png',
    },

    {
      title: 'התסמינים של ADHD',
      description: 'הפרעת קשב ופעלתנות יתר מתאפיינת בשלושה סוגי תסמינים עיקריים:',
      image: '/assets/images/icon.png',
    },
    {
      title: 'האם יש טיפול להפרעת קשב ופעלתנות יתר?',
      description: 'טיפול בהפרעת קשב ופעלתנות יתר כולל תרופות, טיפול תקשורתי, טיפול תזונתי וטיפול פסיכולוגי. כל טיפול יכול להיות יעיל בהתאם לצרכי המטופל.',
      image: '/assets/images/icon.png',
    },
    {
      title: 'חשוב להבין',
      description: `ADHD אינה מעידה על חוסר אינטיליגנציה או יכולת. להפך, רבים מהאנשים עם ADHD מגלים יצירתיות, חשיבה ייחודית ואנרגיה גבוהה.`,
      image: '/assets/images/plus.png',
    },
    {
      title: 'זיהוי מוקדם',
      description: 'אבחון מוקדם של ADHD יכול לסייע בהתמודדות טובה יותר עם האתגרים ובמציאת דרכים מתאימות להצלחה בלימודים ובחיים.',
      image: '/assets/images/plus.png',
    }
  ],
  additional:[
    {
      title: 'קשיי קשב וריכוז',
      description: `קושי להתמקד במשימות לאורך זמן, נטייה לשכוח פרטים או לדלג על שלבים במשימות,  קלות בהיסח הדעת מגירויים חיצוניים.`,
      image: '/assets/images/icon.png'
    },
    {
      title: 'היפראקטיביות',
      description: `תנועתיות מוגברת, כגון תזוזה בלתי פוסקת של רגליים או ידיים, תחושת חוסר שקט מתמדת, קושי לשבת במקום זמן ממושך, במיוחד במצבים "רשמיים" כמו בכיתה או בעבודה`,
      image: '/assets/images/icon.png',
    },
    {
      title: "אימפולסיביות",
      description: `קבלת החלטות מהירה מבלי לשקול את ההשלכות, נטייה להתפרץ לדבריהם של אחרים או להפריע, קושי בהמתנה לתור או בסבלנות במצבים יומיומיים`,
      image: '/assets/images/icon.png',
>>>>>>> 430a8d2625f8bfe902f04811e3d440f6634a849c
    }
  ]
};

export default adhdPageData;
