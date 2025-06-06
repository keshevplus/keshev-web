import { ContentItem } from '../types/content';

const diagnosisPageData: ContentItem = {
  title: 'תהליך האבחון והטיפול',
  sections: [
    {
      heading: 'שיחה ראשונית',
      text: `
        מפגש אישי עם המטופל והמשפחה להבנת ההיסטוריה ההתפתחותית וההתנהגותית.
      `,
      image: '/assets/images/icon.png',
      alt: 'שיחה ראשונית',
      bgColor: 'bg-orange-400/15 hover:bg-orange-400/40 text-right',
      textColor: 'text-black font-bold'
    },
    {
      heading: 'שאלונים מובנים',
      text: `
        שאלוני קשב הם כלים מובנים להערכת תסמינים.
      `,
      image: '/assets/images/icon.png',
      alt: 'שאלונים מובנים',
      bgColor: 'bg-orange-400/15 hover:bg-orange-400/40 text-right',
      textColor: 'text-black font-bold'
    },
    {
      heading: 'מבחן ממוחשב (MOXO)',
      text: `
        מבחן MOXO הוא מבחן ממוחשב להערכת תפקודי קשב, אשר נמצא בשימוש נרחב בישראל ובעולם.
        המבחן משמש ככלי תומך לאבחון ומספק מידע אובייקטיבי להערכת תפקודי הקשב.
      `,
      image: '/assets/images/icon.png',
      alt: 'מבחן ממוחשב (MOXO)',
      bgColor: 'bg-orange-400/15 hover:bg-orange-400/40 text-right',
      textColor: 'text-black font-bold'
    },
    {
      heading: 'לאחר האבחון',
      text: `
        לאחר האבחון נציע תוכנית טיפול אישית שתתאים לצרכים הייחודיים של ילדכם.
      `,
      image: '/assets/images/icon.png',
      alt: 'לאחר האבחון',
      bgColor: 'bg-orange-400/15 hover:bg-orange-400/40 text-right',
      textColor: 'text-black font-bold',
      cards: [
        {
          heading: 'ייעוץ והדרכה להורים',
          text: 'כלים שיעזרו לכם להבין ולתמוך בילדכם.',
          image: '/assets/images/icon.png',
          alt: 'ייעוץ להורים',
          bgColor: 'bg-green-400/15 hover:bg-green-400/40 text-right',
          textColor: 'text-black font-bold'
        },
        {
          heading: 'טיפול תרופתי',
          text: 'תרופות שיכולות לסייע לייצוב הריכוז והפחתת הפעלתנות.',
          image: '/assets/images/icon.png',
          alt: 'טיפול תרופתי',
          bgColor: 'bg-green-400/15 hover:bg-green-400/40 text-right',
          textColor: 'text-black font-bold'
        },
        {
          heading: 'טיפול התנהגותי',
          text: 'סיוע לילד לרכוש כלים להתמודדות יומיומית.',
          image: '/assets/images/icon.png',
          alt: 'טיפול התנהגותי',
          bgColor: 'bg-green-400/15 hover:bg-green-400/40 text-right',
          textColor: 'text-black font-bold'
        }
      ]
    }
  ]
};

export default diagnosisPageData;