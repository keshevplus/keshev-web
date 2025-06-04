import { ContentItem } from '../types/content';

const diagnosisPageData: ContentItem = {
  title: 'תהליך האבחון והטיפול',
  heading: 'כך מאבחנים ADHD – שלב אחר שלב',
  subheading: 'תהליך אבחון מקצועי ומקיף',
  body: [
    {
      title: 'שיחה ראשונית',
      description: 'מפגש אישי עם המטופל והמשפחה להבנת ההיסטוריה ההתפתחותית וההתנהגותית.',
      image: '/assets/images/icon.png',
      bgColor: 'bg-orange-400/15 hover:bg-orange-400/40 text-right',
      textColor: 'text-black font-bold',
    },
    {
      title: 'שאלונים מובנים',
      description: 'שאלוני קשב הם כלים מובנים להערכת תסמינים',
      image: '/assets/images/icon.png',
      bgColor: 'bg-orange-400/15 hover:bg-orange-400/40 text-right',
      textColor: 'text-black font-bold',
    },
    {
      title: 'מבחן ממוחשב (MOXO)',
      description: `
      מבחן MOXO הוא מבחן ממוחשב להערכת תפקודי קשב, אשר נמצא בשימוש נרחב בישראל ובעולם. המבחן משמש ככלי תומך לאבחון. החו מספק מידע אובייקטיבי להערכת תפקודי הקשב
      `,
      image: '/assets/images/icon.png',
      bgColor: 'bg-orange-400/15 hover:bg-orange-400/40 text-right',
      textColor: 'text-black font-bold',
    }

    // {
    //   title: 'דו"ח אבחון מקצועי',
    //   description: 'תוצאות מפורטות לצד המלצות מותאמות אישית להמשך הטיפול.',
    //   image: '/assets/images/icon.png',
    // },
    // {
    //   title: 'אבחון למבוגרים',
    //   description: 'תהליך אבחון מותאם למבוגרים עם התייחסות לאתגרים הייחודיים בגיל הבוגר.',
    //   image: '/assets/images/plus.png',
    // },
    // {
    //   title: 'מעקב רפואי',
    //   description: 'ליווי מקצועי לאורך כל הדרך ומעקב אחר יעילות הטיפול.',
    //   image: '/assets/images/plus.png',
    // },
    // {
    //   title: 'התאמות חינוכיות',
    //   description: 'המלצות להתאמות במסגרות החינוכיות והאקדמיות.',
    //   image: '/assets/images/plus.png',
    // },
  ],
  additional: [
    {
      title: 'לאחר האבחון נציע תוכנית טיפול אישית שתתאים לצרכים הייחודיים של ילדכם.',
      subtitle: 'התוכנית עשויה לכלול:',
      description: 'התוכנית עשויה לכלול:',
      body: [
        {
          title: 'ייעוץ והדרכה להורים',
          description: 'כלים שיעזרו לכם להבין ולתמוך בילדכם.',
          image: '/assets/images/icon.png',
        },
        {
          title: 'טיפול תרופתי (במידת הצורך)',
          description: 'לייצוב הריכוז והפחתת הפעלתנות.',
          image: '/assets/images/icon.png',
        },
        {
          title: 'טיפול התנהגותי',
          description: 'סיוע לילד לרכוש כלים להתמודדות יומיומית',
          image: '/assets/images/icon.png',
        }
      ],
    },
  ]
};

export default diagnosisPageData;
