import { BasePageContent } from '../types/content';

const aboutPageData: BasePageContent = {
    title: 'אודותנו',
    description: 'קשב פלוס, נעים להכיר',
    image: '/assets/images/hero-about.jpeg',
    sections: [
        {
            id: 'doctor',
            heading: "דר' איירין כוכב-רייפמן",
            text: `רופאה מומחית בתחום האבחון והטיפול של הפרעות קשב וריכוז

            בעלת ניסיון עשיר באבחון של ילדים, מתבגרים ובוגרים
            במהלך השנים ליוותה ד"ר כוכב-רייפמן מטופלים רבים במסע להגשמה אישית, תפקוד יומיומי מיטבי ושיפור איכות החיים`,
            image: '/assets/images/hero-about.jpeg',
            bgColor: '#ffffff',
            textColor: '#000000',
        }
        // Additional sections can be added here
    ]
};

export default aboutPageData;
