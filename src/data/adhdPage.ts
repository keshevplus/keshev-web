import { PageContent } from '../types/content';

export const adhdPageData: PageContent = {
  heading: 'מהי הפרעת קשב ופעלתנות יתר?',
  body: {
    paragraphs: [
    {
      title: 'Attention Deficit Hyperactivity Disorder',
      description: 'הפרעת קשב ופעלתנות יתר היא מצב נוירולוגי המשפיע על יכולת הריכוז, השליטה העצמית וההתנהגות. היא נפוצה בקרב ילדים ומבוגרים כאחד, ויכולה להשפיע על תחומי חיים רבים, כולל למידה, עבודה ומערכות יחסים.',
      image: '',
    },
    {
      title: 'האם יש טיפול להפרעת קשב ופעלתנות יתר?',
      description: 'טיפול בהפרעת קשב ופעלתנות יתר כולל תרופות, טיפול תקשורתי, טיפול תזונתי וטיפול פסיכולוגי. כל טיפול יכול להיות יעיל בהתאם לצרכי המטופל.',
      image: '',
    },
    
    {
      title: 'חשוב להבין',
      description: 'ADHD אינו מעיד על חוסר אינטיליגנציה או יכולת. להפך, רבים מהאנשים עם ADHD מגלים יצירתיות, חשיבה ייחודית ואנרגיה גבוהה.',
      image: '',
    }
    ,
    {
      title: 'זיהוי מוקדם',
      description: 'אבחון מוקדם של ADHD יכול לסייע במתן כלים ותמיכה מתאימים להתמודדות עם האתגרים היומיומיים. טיפול מותאם יכול לשפר את איכות החיים של ילדים ומבוגרים עם ההפרעה, ולמנוע קשיים נוספים בעתיד.',
      image: '',
    }
  ]
},
  additional: {

    heading: 'התסמינים העיקריים',
    subheading: 'ADHD : Attention Deficit Hyperactivity Disorder',
    body: [
    {
      title: 'חוסר קשב',
      description: 'קושי להתרכז, לשים לב לפרטים, לעקוב אחר הוראות ולסיים משימות.',
      image: '/assets/images/icon.png',
    },
    {
      title: 'היפראקטיביות',
      description: 'תנועתיות יתר, קושי לשבת בשקט, דיבור מופרז.',
      image: '/assets/images/icon.png',
    },
    {
      title: 'אימפולסיביות',
      description: 'פעולה ללא מחשבה מוקדמת, קושי להמתין בתור, התפרצות בשיחה.',
      image: '/assets/images/icon.png',
    }
  ]
}
};

// Define or import the getPageContent function
function getPageContent(page: string): void {
  console.log(`Fetching content for page: ${page}`);
}

export default getPageContent('adhd');
