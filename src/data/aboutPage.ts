import { ContentItem } from '../types/content';

const aboutPageData: ContentItem = {
    title: 'אודותנו',
    heading: 'קשב פלוס, נעים להכיר',
    body: [
        {
            title: "דר' איירין כוכב-רייפמן",
            subtitle: "רופאה מומחית בתחום האבחון והטיפול של הפרעות קשב וריכוז",
            description: `
            בעלת ניסיון עשיר באבחון של ילדים, מתבגרים ובוגרים
            במהלך השנים ליוותה ד"ר כוכב-רייפמן מטופלים רבים במסע להגשמה אישית, תפקוד יומיומי מיטבי ושיפור איכות החיים
            `,
            image: '/assets/images/hero-about.jpeg',
            bgColor: '#ffffff',
            textColor: '#000000',
            file: '/assets/files/sample.pdf',
        }
        // {
            // title: "דר' איירין כוכב-רייפמן",
            // subtitle: "מרפאה לאבחון וטיפול הפרעות קשב ופעלתנות יתר בילדים ובמבוגרים",
            // description: "רופאה מומחית לאבחון וטיפול בהפרעות קשב ופעלתנות יתר בילדים, בנוער ובמבוגרים. בעלת ניסיון רב בתחום הטיפולי, מאבחנת ומטפלת תוך שימוש בגישות טיפוליות מגוונות ומתקדמות.",
            // image: '/assets/images/hero-about.jpeg',
        // }

        // }
    ]
}

export default aboutPageData;
