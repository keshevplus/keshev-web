<<<<<<< HEAD
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

=======
import { ContentItem } from '../types/content';

const diagnosisPageData: ContentItem = {
  heading: 'תהליך האבחון',	
  subheading: 'במרפאתנו אנו מקפידים על תהליך אבחון יסודי ומעמיק, שכולל:',
  body: [
    {
      title: 'איך מתבצע האבחון במרפאה שלנו?',
      description: 'במרפאתנו אנו מקפידים על תהליך אבחון יסודי ומעמיק, שכולל:',
      image: '/assets/images/icon.png',
    },
    {
      title: 'שיחה ראשונית',
      description: 'מפגש אישי עם ההורים והילד להבנת ההיסטוריה ההתפתחותית והתנהגותו.',
      image: '/assets/images/icon.png',
    },
    {
      title: 'שאלונים מובנים',
      description: 'שימוש בכלים אבחוניים בינלאומיים, כמו סולם הערכה ע"ש NICHQ Vanderbilt.',
      image: '/assets/images/icon.png',
    },

    {
      title: 'דו"ח אבחון מקצועי',
      description: 'תוצאות מפורטות לצד המלצות מותאמות אישית להמשך הדרך.',
      image: '/assets/images/icon.png',
    },
    {
      title: 'שיחה ראשונית',
      description: 'מפגש אישי עם ההורים והילד להבנת ההיסטוריה ההתפתחותית והתנהגותו.',
      image: '/assets/images/plus.png',
    },
    {
      title: 'שאלונים מובנים',
      description: 'שימוש בכלים אבחוניים בינלאומיים, כמו סולם הערכה ע"ש NICHQ Vanderbilt.',
      image: '/assets/images/plus.png',
    },

    {
      title: 'דו"ח אבחון מקצועי',
      description: 'תוצאות מפורטות לצד המלצות מותאמות אישית להמשך הדרך.',
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
>>>>>>> 430a8d2625f8bfe902f04811e3d440f6634a849c
