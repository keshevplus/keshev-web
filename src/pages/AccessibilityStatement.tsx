import { Link } from 'react-router-dom';
import PageTitle from '../layouts/PageTitle';
import { useCmsTranslations } from '../hooks/useCmsTranslations';

function parseJsonList(value: string): string[] {
    try {
        return JSON.parse(value);
    } catch {
        return [];
    }
}

const DEFAULT_ADAPTATIONS = JSON.stringify(['התאמת האתר לתצוגה במכשירים ניידים.', 'שימוש בניגודיות צבעים גבוהה לשיפור הקריאות.', 'אפשרות להגדלת טקסטים ולשינוי מרווחים בין שורות.', 'שימוש בתפריט נגישות המאפשר התאמות אישיות.', 'תמיכה בניווט באמצעות מקלדת.', 'שימוש בתיאורי טקסט לתמונות (alt).']);
const DEFAULT_MENU_ITEMS = JSON.stringify(['הגדלת והקטנת טקסטים.', 'שינוי מרווחים בין שורות וטקסטים.', 'שימוש במדריך קריאה.', 'הפיכת צבעים לגווני אפור.', 'ביטול אנימציות.']);

export default function AccessibilityPage() {
    const { t } = useCmsTranslations();
    const phone = t('contact.phone', '055-27-399-27');
    const email = t('contact.email', 'dr@keshevplus.co.il');
    const whatsapp = '972552739927';
    const adaptations = parseJsonList(t('a11y_statement.adaptations_items', DEFAULT_ADAPTATIONS));
    const menuItems = parseJsonList(t('a11y_statement.menu_items', DEFAULT_MENU_ITEMS));

    return (
        <>
            <PageTitle title={t('a11y_statement.title', 'הצהרת נגישות')} />

            <div className="accessibility-statement container mx-auto px-4 py-8 bg-gray-50" dir="rtl">
                <h2 className="text-4xl font-bold text-center mb-8 text-green-700">{t('a11y_statement.title', 'הצהרת נגישות')}</h2>
                <p className="text-lg mb-6 leading-relaxed" dangerouslySetInnerHTML={{ __html: t('a11y_statement.commitment_text', 'אנו ב-<strong>קשב פלוס</strong> מחויבים להנגשת האתר שלנו לכלל האוכלוסייה, כולל אנשים עם מוגבלויות. אנו רואים חשיבות רבה במתן שירות שוויוני לכלל המשתמשים, ולכן השקענו מאמצים רבים בהנגשת האתר בהתאם לתקנות שוויון זכויות לאנשים עם מוגבלות (התאמות נגישות לשירות), התשע"ג-2013.') }} />

                <h2 className="text-2xl font-semibold mb-4 text-green-600">{t('a11y_statement.adaptations_heading', 'התאמות נגישות שבוצעו באתר')}</h2>
                <ul className="list-disc pl-5 mb-6 text-lg leading-relaxed">
                    {adaptations.map((item) => <li key={item}>{item}</li>)}
                </ul>

                <h2 className="text-2xl font-semibold mb-4 text-green-600">{t('a11y_statement.menu_heading', 'תפריט נגישות')}</h2>
                <p className="text-lg mb-4 leading-relaxed">
                    {t('a11y_statement.menu_intro', 'באתר קיים תפריט נגישות המאפשר לבצע התאמות אישיות כגון:')}
                </p>
                <ul className="list-disc pl-5 mb-6 text-lg leading-relaxed">
                    {menuItems.map((item) => <li key={item}>{item}</li>)}
                </ul>

                <h2 className="text-2xl font-semibold mb-4 text-green-600">{t('a11y_statement.contact_heading', 'פנייה בנושא נגישות')}</h2>
                <p className="text-lg mb-4 leading-relaxed">
                    {t('a11y_statement.contact_intro', 'אם נתקלתם בבעיה כלשהי בנגישות האתר או אם יש לכם הצעות לשיפור, נשמח לשמוע מכם. ניתן לפנות אלינו בדרכים הבאות:')}
                </p>
                <ul className="list-disc pl-5 mb-6 text-lg leading-relaxed">
                    <li>{t('contact.address_label', 'כתובת:')} {t('contact.address_line1', 'יגאל אלון 94, מגדלי אלון 1, קומה 12, משרד 1202, תל אביב - יפו')}</li>
                    <li>{t('contact.phone_label', 'טלפון:')} <Link to={`tel:${phone.replace(/-/g, '')}`} className="text-blue-500 hover:underline">{phone}</Link></li>
                    <li>{t('contact.email_label', 'דוא"ל:')} <Link to={`mailto:${email}`} className="text-blue-500 hover:underline">{email}</Link></li>
                    <li>{t('a11y_statement.whatsapp_label', 'וואטסאפ:')} <Link to={`https://wa.me/${whatsapp}`} className="text-blue-500 hover:underline">{t('a11y_statement.whatsapp_link_text', 'לחצו כאן לשליחת הודעה')}</Link></li>
                </ul>

                <h2 className="text-2xl font-semibold mb-4 text-green-600">{t('a11y_statement.last_updated_heading', 'תאריך עדכון אחרון')}</h2>
                <p className="text-lg leading-relaxed">
                    {t('a11y_statement.last_updated_prefix', 'הצהרת הנגישות עודכנה לאחרונה בתאריך:')} <strong>{t('a11y_statement.last_updated_date', '3 ביוני 2025')}</strong>.
                </p>
            </div>
        </>
    );
}
