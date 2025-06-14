<<<<<<< HEAD
import { BasePageContent } from '../types/content';

const formsPageData: BasePageContent = {
  title: 'שאלונים',
  description: 'שאלונים לזיהוי סימנים של הפרעת קשב וריכוז (ADHD)',
  image: '/assets/images/forms-hero.jpg',
  sections: [
    {
      id: 'parents',
      heading: 'שאלון להורים',
      text: 'שאלון זה מיועד להורים ומספק תובנות על התנהגות הילד בבית ובסביבה המשפחתית.',
      image: '/assets/images/icon.png',
      bgColor: 'bg-orange-50',
      textColor: 'text-black',
      ctaButtonText: 'הורדת שאלון'
    },
    {
      id: 'teachers',
      heading: 'שאלון למורים',
      text: 'שאלון זה מיועד למורים ואנשי חינוך ומספק מידע על תפקוד הילד בסביבה הלימודית.',
      image: '/assets/images/icon.png',
      bgColor: 'bg-blue-50',
      textColor: 'text-black',
      ctaButtonText: 'הורדת שאלון'
    },
    {
      id: 'adults',
      heading: 'שאלון למבוגרים',
      text: 'שאלון זה מיועד למבוגרים המעוניינים לבדוק אם יש להם סימנים המעידים על הפרעת קשב.',
      image: '/assets/images/icon.png',
      bgColor: 'bg-green-50',
      textColor: 'text-black',
      ctaButtonText: 'הורדת שאלון'
    },
    {
      id: 'instructions',
      heading: 'הנחיות למילוי השאלונים',
      text: `אנא מלאו את השאלונים בכנות ובדייקנות רבה ככל האפשר.
      יש למלא את כל השאלות בשאלון.
      לאחר מילוי השאלון, ניתן להביאו לפגישת האבחון או לשלוח אותו מראש במייל.`,
      bgColor: 'bg-yellow-50'
    },
    {
      id: 'cta',
      heading: 'צריכים עזרה?',
      text: 'אם יש לכם שאלות לגבי מילוי השאלונים או אם אתם מתקשים בהורדה שלהם, צרו איתנו קשר',
      ctaButtonText: 'צרו קשר',
      bgColor: 'bg-green-100',
      textColor: 'text-green-800'
    }
=======
import { ContentItem } from '../types/content';

const formsPageData: ContentItem = {
  heading: 'שאלונים',
  subheading: 'טפסים ושאלוני הערכה',
  body: [
    {
      title: 'שאלון להורים',
      // subtitle: 'למילוי על ידי הורה',
      description: 'שאלון להערכת ADHD. - NICHQ Vanderbilt',
      image: '/assets/images/icon.png',
      file: '/assets/forms/vanderbilt_parent_form'
    },
    {
      title: 'שאלון למורה',
      // subtitle: 'למילוי על ידי מורה',
      description: 'שאלון להערכת ADHD. - NICHQ Vanderbilt',
      image: '/assets/images/icon.png',
      file: '/assets/forms/vanderbilt_teacher_form'
    },
    {
      title: 'שאלון דיווח עצמי',
      // subtitle: 'למילוי על ידי ילד או מבוגר',
      description: 'שאלון להערכת ADHD - NICHQ Vanderbilt',
      image: '/assets/images/icon.png',
      file: '/assets/forms/vanderbilt_self_form'
    }
    // Uncomment the following block if you want to include the SCARED form
    // 
    // {
    //   title: 'שאלון דיווח עצמי SCARED',
    //   subtitle: 'למילוי על ידי ילד או הורה',
    //   description: 'שאלון להערכת קשב וריכוז. - NICHQ Vanderbilt',
    //   image: '/assets/images/icon.png',
    //   file: 'scared_self_form'
    // }

>>>>>>> 430a8d2625f8bfe902f04811e3d440f6634a849c
  ]
};

export default formsPageData;
