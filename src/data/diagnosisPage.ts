import { ContentItem } from '../types/content';

const diagnosisPageData: ContentItem = {
  heading: 'תהליך האבחון',	
  subheading: 'תהליך אבחון מקצועי ומקיף',
  body: [
    {
      title: 'שיחה ראשונית',
      description: 'מפגש אישי עם המטופל והמשפחה להבנת ההיסטוריה ההתפתחותית וההתנהגותית.',
      image: '/assets/images/icon.png',
    },
    {
      title: 'שאלונים מובנים',
      description: 'שימוש בכלים אבחוניים בינלאומיים מתוקפים, כמו סולם הערכה NICHQ Vanderbilt.',
      image: '/assets/images/icon.png',
    },
    {
      title: 'דו"ח אבחון מקצועי',
      description: 'תוצאות מפורטות לצד המלצות מותאמות אישית להמשך הטיפול.',
      image: '/assets/images/icon.png',
    },
    {
      title: 'אבחון למבוגרים',
      description: 'תהליך אבחון מותאם למבוגרים עם התייחסות לאתגרים הייחודיים בגיל הבוגר.',
      image: '/assets/images/plus.png',
    },
    {
      title: 'מעקב רפואי',
      description: 'ליווי מקצועי לאורך כל הדרך ומעקב אחר יעילות הטיפול.',
      image: '/assets/images/plus.png',
    },
    {
      title: 'התאמות חינוכיות',
      description: 'המלצות להתאמות במסגרות החינוכיות והאקדמיות.',
      image: '/assets/images/plus.png',
    },
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
