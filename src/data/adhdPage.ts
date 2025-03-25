import { PageContent } from '../types/content';

export const adhdPageData: PageContent = {
  heading: 'מהי ADHD?',
  subheading: 'הפרעת קשב וריכוז (ADHD) היא מצב נוירולוגי המשפיע על יכולת הריכוז, השליטה העצמית וההתנהגות. היא נפוצה בקרב ילדים ומבוגרים כאחד, ויכולה להשפיע על תחומי חיים רבים, כולל למידה, עבודה ומערכות יחסים.',
  body: [
    {
      title: 'חשוב להבין',
      description: 'ADHD אינו מעיד על חוסר אינטיליגנציה או יכולת. להפך, רבים מהאנשים עם ADHD מגלים יצירתיות, חשיבה ייחודית ואנרגיה גבוהה.',
      image: '',
    },
    {
      title: 'דרכי התמודדות וטיפול',
      description: '✅ ארגון וסדר: שימוש ביומנים, תזכורות וכלים לניהול זמן\n✅ פעילות גופנית: פעילויות ספורט לשיפור הריכוז\n✅ טיפול תרופתי: במקרים המתאימים\n✅ תמיכה מקצועית: ייעוץ והדרכה ממומחים',
      image: '',
    },
    {
      title: 'זיהוי מוקדם',
      description: 'זיהוי מוקדם של ADHD ופנייה לאבחון מקצועי יכולים לסייע בהתאמת הטיפול הנכון ולשפר את איכות החיים.',
      image: '',
    }
  ],
  additional: [
    {
      title: 'חוסר קשב',
      description: '🔵 קושי להתרכז, לשים לב לפרטים, לעקוב אחר הוראות ולסיים משימות.',
      image: '/assets/images/hero-about.jpeg',
    },
    {
      title: 'היפראקטיביות',
      description: '🟢 תנועתיות יתר, קושי לשבת בשקט, דיבור מופרז.',
      image: '/assets/images/hero-about.jpeg',
    },
    {
      title: 'אימפולסיביות',
      description: '🟠 פעולה ללא מחשבה מוקדמת, קושי להמתין בתור, התפרצות בשיחה.',
      image: '/assets/images/hero-about.jpeg',
    }
  ]
};

// Define or import the getPageContent function
function getPageContent(page: string): void {
  console.log(`Fetching content for page: ${page}`);
}

getPageContent('adhd');
