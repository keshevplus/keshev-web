export interface ContentItem {
  title: string;
  description?: string;
  heading: string; // Added heading property
  subheading?: string;
  body: Array<{
    title: string;
    description: string;
    image: string;
    subItems?: Array<{
      title: string;
      description: string;
    }>;
    bgColor?: string;
    textColor?: string;
  }>;
}

export const adhdPageData: ContentItem = {
  // Define the structure of the page data
  title: 'מהי הפרעת קשב וריכוז ?',
  heading: 'ADHD = Attention Deficit Hyperactivity Disorder',
  subheading: 'הפרעת קשב ופעלתנות יתר (ADHD) היא הפרעה נוירולוגית המשפיעה על יכולת הריכוז וההתנהגות',
  body: [
    {
      title: 'מהי הפרעת קשב ופעלתנות יתר (ADHD)',
      description: `הפרעת קשב ופעלתנות יתר היא מצב נוירולוגי המשפיע על יכולת הריכוז, השליטה העצמית וההתנהגות
      היא נפוצה בקרב ילדים ומבוגרים כאחד, ויכולה להשפיע על תחומי חיים רבים, כולל למידה, עבודה ומערכות יחסים
      `
      ,
      image: '/assets/images/icon.png',
      bgColor: 'bg-orange-400/15 hover:bg-orange-400/40 text-right',
      textColor: 'text-black font-bold'
    },
    // 1
    {
      title: 'התסמינים של ADHD',
      description: 'הפרעת קשב ופעלתנות יתר מתאפיינת בשלושה סוגי תסמינים עיקריים:',
      image: '/assets/images/icon.png',
      
      subItems: [
        {
          title: 'קשיי קשב וריכוז',
          description: `קושי להתמקד במשימות לאורך זמן, נטייה לשכוח פרטים או לדלג על שלבים במשימות,  קלות בהיסח הדעת מגירויים חיצוניים.`
        },
        {
          title: 'היפראקטיביות',
          description: `תנועתיות מוגברת, כגון תזוזה בלתי פוסקת של רגליים או ידיים, תחושת חוסר שקט מתמדת, קושי לשבת במקום זמן ממושך, במיוחד במצבים "רשמיים" כמו בכיתה או בעבודה`
        },
        {
          title: "אימפולסיביות",
          description: `קבלת החלטות מהירה מבלי לשקול את ההשלכות, נטייה להתפרץ לדבריהם של אחרים או להפריע, קושי בהמתנה לתור או בסבלנות במצבים יומיומיים`
        }
      ],
      bgColor: 'bg-orange-400/15 hover:bg-orange-400/40 text-right',
      textColor: 'text-black font-bold',

    },
    {
      title: 'האם יש טיפול להפרעת קשב ופעלתנות יתר?',
      description: 'טיפול בהפרעת קשב ופעלתנות יתר כולל תרופות, טיפול תקשורתי, טיפול תזונתי וטיפול פסיכולוגי. כל טיפול יכול להיות יעיל בהתאם לצרכי המטופל.',
      image: '/assets/images/icon.png',
      bgColor: 'bg-orange-400/15 hover:bg-orange-400/40 text-right',
      textColor: 'text-black font-bold'
    },
    {
      title: 'חשוב להבין',
      description: `ADHD אינה מעידה על חוסר אינטיליגנציה או יכולת. להפך, רבים מהאנשים עם ADHD מגלים יצירתיות, חשיבה ייחודית ואנרגיה גבוהה.`,
      image: '/assets/images/plus.png',
      bgColor: 'bg-green-800 hover:bg-green-700',
      textColor: 'text-white hover:text-white',
    },
    {
      title: 'זיהוי מוקדם',
      description: 'אבחון מוקדם של ADHD יכול לסייע בהתמודדות טובה יותר עם האתגרים ובמציאת דרכים מתאימות להצלחה בלימודים ובחיים.',
      image: '/assets/images/plus.png',
      bgColor: 'bg-green-800 hover:bg-green-700',
      textColor: 'text-white hover:text-white',
    }
  ],

};

export default adhdPageData;
