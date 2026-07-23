import { Link } from 'react-router-dom';
import PageTitle from '../layouts/PageTitle';

export default function TermsOfUse() {
  return (
    <>
      <PageTitle title="תנאי שימוש" />
      <div className="terms-of-use container mx-auto px-4 py-8 bg-gray-50" dir="rtl">
        <p className="text-lg mb-6 leading-relaxed">
          השימוש באתר קשב פלוס (&quot;האתר&quot;) כפוף לתנאים המפורטים להלן. גלישה באתר ו/או שימוש בשירותיו מהווים הסכמה לתנאים אלה.
        </p>

        <h2 className="text-2xl font-semibold mb-4 text-green-600">אופי השירות</h2>
        <p className="text-lg mb-2 leading-relaxed">
          האתר מספק מידע כללי על הערכה וטיפול בהפרעת קשב וריכוז (ADHD), וכן כלים מקוונים לתיאום פגישות ולמילוי שאלוני סינון ראשוניים.
        </p>
        <p className="text-lg mb-6 leading-relaxed font-medium">
          שאלוני הסינון המקוונים אינם מהווים הערכה רפואית ואינם תחליף לייעוץ, הערכה או טיפול על ידי איש מקצוע מוסמך. תוצאות השאלון מיועדות לסייע לצוות המרפאה בהערכה הראשונית בלבד, והערכה סופית ניתנת אך ורק במסגרת בדיקה קלינית.
        </p>

        <h2 className="text-2xl font-semibold mb-4 text-green-600">שימוש הוגן באתר</h2>
        <p className="text-lg mb-6 leading-relaxed">
          אין להשתמש באתר לכל מטרה בלתי חוקית, ואין לנסות לפגוע בפעילותו התקינה, לרבות ניסיונות פריצה, גישה לא מורשית למידע, או שימוש אוטומטי לאיסוף תוכן (scraping) ללא אישור מראש.
        </p>

        <h2 className="text-2xl font-semibold mb-4 text-green-600">קניין רוחני</h2>
        <p className="text-lg mb-6 leading-relaxed">
          כל הזכויות בתכני האתר, לרבות טקסטים, עיצוב, לוגו ותמונות, שייכות לקשב פלוס או לצדדים שלישיים שהעניקו לה רישיון שימוש, ואין להעתיקם או להשתמש בהם ללא אישור בכתב.
        </p>

        <h2 className="text-2xl font-semibold mb-4 text-green-600">הגבלת אחריות</h2>
        <p className="text-lg mb-6 leading-relaxed">
          המידע באתר מוצג לצרכי מידע כללי בלבד ואינו מהווה ייעוץ רפואי. קשב פלוס אינה אחראית לכל נזק שייגרם כתוצאה מהסתמכות על תוכן האתר ללא ייעוץ מקצועי מתאים. קישורים לאתרים ולשירותים חיצוניים (כגון WhatsApp ורשתות חברתיות) כפופים לתנאי השימוש ומדיניות הפרטיות של אותם צדדים שלישיים, ואיננו אחראים לתוכנם.
        </p>

        <h2 className="text-2xl font-semibold mb-4 text-green-600">דין וסמכות שיפוט</h2>
        <p className="text-lg mb-6 leading-relaxed">
          על תנאים אלה יחולו דיני מדינת ישראל, וסמכות השיפוט הבלעדית בכל עניין הנוגע להם נתונה לבתי המשפט המוסמכים במחוז תל אביב.
        </p>

        <h2 className="text-2xl font-semibold mb-4 text-green-600">שינויים בתנאים</h2>
        <p className="text-lg mb-6 leading-relaxed">
          אנו רשאים לעדכן תנאים אלה מעת לעת. המשך השימוש באתר לאחר פרסום שינויים מהווה הסכמה לתנאים המעודכנים.
        </p>

        <h2 className="text-2xl font-semibold mb-4 text-green-600">יצירת קשר</h2>
        <ul className="list-disc pl-5 mb-6 text-lg leading-relaxed">
          <li>טלפון: <Link to="tel:0552739927" className="text-blue-500 hover:underline">055-27-399-27</Link></li>
          <li>דוא&quot;ל: <Link to="mailto:office@keshevplus.co.il" className="text-blue-500 hover:underline">office@keshevplus.co.il</Link></li>
        </ul>

        <h2 className="text-2xl font-semibold mb-4 text-green-600">תאריך עדכון אחרון</h2>
        <p className="text-lg leading-relaxed">תנאים אלה עודכנו לאחרונה בתאריך: 15 ביולי 2026.</p>
      </div>
    </>
  );
}
