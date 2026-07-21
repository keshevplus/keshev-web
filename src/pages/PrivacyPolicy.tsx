import { Link } from 'react-router-dom';
import PageTitle from '../layouts/PageTitle';

export default function PrivacyPolicy() {
  return (
    <>
      <PageTitle title="מדיניות פרטיות" />
      <div className="privacy-policy container mx-auto px-4 py-8 bg-gray-50" dir="rtl">
        <p className="text-lg mb-6 leading-relaxed">
          קשב פלוס (&quot;אנחנו&quot;, &quot;המרפאה&quot;) מכבדת את פרטיותכם. מדיניות זו מסבירה אילו נתונים אנו אוספים דרך האתר, לשם מה אנו משתמשים בהם וכיצד ניתן לפנות אלינו בנושא. המדיניות פועלת בהתאם לחוק הגנת הפרטיות, התשמ&quot;א-1981, ותקנות הגנת הפרטיות (אבטחת מידע), התשע&quot;ז-2017.
        </p>

        <h2 className="text-2xl font-semibold mb-4 text-green-600">המידע שאנו אוספים</h2>
        <ul className="list-disc pl-5 mb-6 text-lg leading-relaxed">
          <li>פרטי יצירת קשר: שם, כתובת דוא&quot;ל ומספר טלפון, כאשר אתם פונים אלינו, קובעים תור או משתמשים בטופס יצירת קשר.</li>
          <li>נתוני שאלוני סינון ADHD: שם הילד/ה, גיל, מין וקרבה למשיב, יחד עם התשובות לשאלון. מדובר במידע רגיש הקשור להערכה קלינית ראשונית, ואנו מטפלים בו בזהירות מוגברת.</li>
          <li>עוגיות (cookies) הכרחיות, סטטיסטיות ולהעדפות, כמפורט בבאנר העוגיות באתר.</li>
          <li>נתוני שימוש טכניים בסיסיים (כגון סוג דפדפן ומכשיר) הנאספים באופן אוטומטי לצורך תפעול האתר.</li>
        </ul>

        <h2 className="text-2xl font-semibold mb-4 text-green-600">מטרות השימוש במידע</h2>
        <ul className="list-disc pl-5 mb-6 text-lg leading-relaxed">
          <li>תיאום וניהול פגישות ותורים.</li>
          <li>עיבוד שאלוני הסינון לצורך הערכה קלינית ראשונית על ידי הצוות המטפל.</li>
          <li>מענה לפניות ולבקשות מידע.</li>
          <li>שיפור השירות והאתר וניתוח שימוש סטטיסטי כללי.</li>
          <li>עמידה בחובות חוקיות ורגולטוריות החלות עלינו.</li>
        </ul>

        <h2 className="text-2xl font-semibold mb-4 text-green-600">שיתוף מידע</h2>
        <p className="text-lg mb-6 leading-relaxed">
          איננו מוכרים את המידע האישי שלכם. המידע נגיש לצוות המרפאה לצורך מתן הטיפול בלבד, ועשוי להיחשף לפי דרישת הדין או רשות מוסמכת. פנייה בוואטסאפ מפנה לאפליקציית WhatsApp החיצונית, הכפופה למדיניות הפרטיות שלה.
        </p>

        <h2 className="text-2xl font-semibold mb-4 text-green-600">אבטחת מידע ושמירתו</h2>
        <p className="text-lg mb-6 leading-relaxed">
          אנו נוקטים באמצעים טכניים וארגוניים סבירים להגנה על המידע שנאסף. המידע נשמר למשך הזמן הנדרש למתן השירות ולעמידה בחובות שמירת רשומות רפואיות/עסקיות החלות עלינו, ולאחר מכן נמחק או הופך לאנונימי.
        </p>

        <h2 className="text-2xl font-semibold mb-4 text-green-600">הזכויות שלכם</h2>
        <p className="text-lg mb-6 leading-relaxed">
          בהתאם לחוק הגנת הפרטיות, זכותכם לעיין במידע שנשמר עליכם, לבקש את תיקונו, ובנסיבות מסוימות את מחיקתו. לצורך מימוש זכויות אלה, פנו אלינו בפרטי הקשר המפורטים למטה.
        </p>

        <h2 className="text-2xl font-semibold mb-4 text-green-600">יצירת קשר בנושא פרטיות</h2>
        <ul className="list-disc pl-5 mb-6 text-lg leading-relaxed">
          <li>טלפון: <Link to="tel:0552739927" className="text-blue-500 hover:underline">055-27-399-27</Link></li>
          <li>דוא&quot;ל: <Link to="mailto:dr@keshevplus.co.il" className="text-blue-500 hover:underline">dr@keshevplus.co.il</Link></li>
        </ul>

        <h2 className="text-2xl font-semibold mb-4 text-green-600">תאריך עדכון אחרון</h2>
        <p className="text-lg leading-relaxed">מדיניות זו עודכנה לאחרונה בתאריך: 15 ביולי 2026.</p>
      </div>
    </>
  );
}
