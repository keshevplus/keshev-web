import { ContentItem } from '../types/content';

const formsPageData: ContentItem = {
  title: 'שאלונים',
  heading: 'שאלונים לזיהוי סימנים של הפרעת קשב וריכוז (ADHD)',
  body: [
    {
      title: 'שאלון להורים',
      description: 'שאלון זה מיועד להורים ומספק תובנות על התנהגות הילד בבית ובסביבה המשפחתית.',
      image: '/assets/images/icon.png',
      bgColor: 'bg-orange-400/15 hover:bg-orange-400/40 text-right',
      textColor: 'text-black font-bold',
      subtitle: 'קבצים להורדה',
      file: '/assets/forms/vanderbilt_parent_form'
    },
    {
      title: 'שאלון למורה',
      // subtitle: 'למילוי על ידי מורה',
      description: 'שאלון זה מיועד למורים ומספק תובנות על התנהגות הילד בכיתה ובסביבה החינוכית.',
      image: '/assets/images/icon.png',
      bgColor: 'bg-orange-400/15 hover:bg-orange-400/40 text-right',
      textColor: 'text-black font-bold',
      subtitle: 'קבצים להורדה',
      file: '/assets/forms/vanderbilt_teacher_form',
    },
    {
      title: 'שאלון דיווח עצמי',
      // subtitle: 'למילוי על ידי ילד או מבוגר',
      description: 'שאלון זה מיועד למילוי על ידי מבוגר מעל גיל 18 להערכת הפרעות קשב ופעלתנות יתר.',
      image: '/assets/images/icon.png',
      bgColor: 'bg-orange-400/15 hover:bg-orange-400/40 text-right',
      textColor: 'text-black font-bold',
      subtitle: 'קבצים להורדה',
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

  ]
};

export default formsPageData;
