<<<<<<< HEAD
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
=======
import { ContentItem } from '../types/content';

const aboutPageData: ContentItem = {
    heading: 'אודותינו',
    subheading: 'קשב פלוס, נעים להכיר',
    body: [
        {
            title: "קשב פלוס, נעים להכיר",
            subtitle: "מרפאה לאבחון וטיפול הפרעות קשב ופעלתנות יתר בילדים ובמבוגרים",
            description: "רופאה מומחית לאבחון וטיפול בהפרעות קשב ופעלתנות יתר בילדים, בנוער ובמבוגרים. בעלת ניסיון רב בתחום הטיפולי, מאבחנת ומטפלת תוך שימוש בגישות טיפוליות מגוונות ומתקדמות.",
            image: '/assets/images/hero-about.jpeg',
        },
        {
            title: "דר' איירין כוכב-רייפמן",
            description: `רופאה מומחית לאבחון וטיפול בהפרעות קשב ופעלתנות יתר בילדים, נוער ומבוגרים. בעלת ניסיון רב בתחום תוך שימוש בגישות טיפוליות מגוונות ומתקדמות.`,
            image: '',
        },
        {
            title: "קצת על עצמי",
            description: "מומחית ברפואת משפחה, בעלת הסמכה לאבחון וטיפול בהפרעות קשב ופעלתנות יתר של משרד הבריאות.",
            image: '',
        }

    ],
}
>>>>>>> 430a8d2625f8bfe902f04811e3d440f6634a849c

export default aboutPageData;
