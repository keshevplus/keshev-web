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

  ]
};

export default formsPageData;
