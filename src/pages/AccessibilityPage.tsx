import React from 'react';
import PageLayout from '../layouts/PageLayout';

const AccessibilityPage: React.FC = () => {
    return (
        <PageLayout>
            <div className="accessibilityPage container mx-auto px-4 py-8 bg-gray-50" dir="rtl">
                <h1 className="text-4xl font-bold text-center mb-8 text-green-700">הצהרת נגישות</h1>
                <p className="text-lg mb-6 leading-relaxed">
                    אנו ב-<strong>קשב פלוס</strong> מחויבים להנגשת האתר שלנו לכלל האוכלוסייה, כולל אנשים עם מוגבלויות. אנו רואים חשיבות רבה במתן שירות שוויוני לכלל המשתמשים, ולכן השקענו מאמצים רבים בהנגשת האתר בהתאם לתקנות שוויון זכויות לאנשים עם מוגבלות (התאמות נגישות לשירות), התשע"ג-2013.
                </p>

                <h2 className="text-2xl font-semibold mb-4 text-green-600">התאמות נגישות שבוצעו באתר</h2>
                <ul className="list-disc pl-5 mb-6 text-lg leading-relaxed">
                    <li>התאמת האתר לתצוגה במכשירים ניידים.</li>
                    <li>שימוש בניגודיות צבעים גבוהה לשיפור הקריאות.</li>
                    <li>אפשרות להגדלת טקסטים ולשינוי מרווחים בין שורות.</li>
                    <li>שימוש בתפריט נגישות המאפשר התאמות אישיות.</li>
                    <li>תמיכה בניווט באמצעות מקלדת.</li>
                    <li>שימוש בתיאורי טקסט לתמונות (alt).</li>
                </ul>

                <h2 className="text-2xl font-semibold mb-4 text-green-600">תפריט נגישות</h2>
                <p className="text-lg mb-4 leading-relaxed">
                    באתר קיים תפריט נגישות המאפשר לבצע התאמות אישיות כגון:
                </p>
                <ul className="list-disc pl-5 mb-6 text-lg leading-relaxed">
                    <li>הגדלת והקטנת טקסטים.</li>
                    <li>שינוי מרווחים בין שורות וטקסטים.</li>
                    <li>שימוש במדריך קריאה.</li>
                    <li>הפיכת צבעים לגווני אפור.</li>
                    <li>ביטול אנימציות.</li>
                </ul>

                <h2 className="text-2xl font-semibold mb-4 text-green-600">פנייה בנושא נגישות</h2>
                <p className="text-lg mb-4 leading-relaxed">
                    אם נתקלתם בבעיה כלשהי בנגישות האתר או אם יש לכם הצעות לשיפור, נשמח לשמוע מכם. ניתן לפנות אלינו בדרכים הבאות:
                </p>
                <ul className="list-disc pl-5 mb-6 text-lg leading-relaxed">
                    <li>כתובת: יגאל אלון 94, מגדלי אלון 1, קומה 12, משרד 1202, תל אביב - יפו</li>
                    <li>טלפון: <a href="tel:0552739927" className="text-blue-500 hover:underline">055-27-399-27</a></li>
                    <li>דוא"ל: <a href="mailto:dr@keshevplus.co.il" className="text-blue-500 hover:underline">dr@keshevplus.co.il</a></li>
                    <li>וואטסאפ: <a href="https://wa.me/972552739927" className="text-blue-500 hover:underline">לחצו כאן לשליחת הודעה</a></li>
                </ul>

                <h2 className="text-2xl font-semibold mb-4 text-green-600">תאריך עדכון אחרון</h2>
                <p className="text-lg leading-relaxed">
                    הצהרת הנגישות עודכנה לאחרונה בתאריך: <strong>3 ביוני 2025</strong>.
                </p>
            </div>
        </PageLayout>
    );
};

export default AccessibilityPage;