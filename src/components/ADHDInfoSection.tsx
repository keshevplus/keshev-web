import { useState } from 'react';
import {
  IoBulbOutline,
  IoFlashOutline,
  IoLocateOutline,
  IoHeartOutline,
  IoPeopleOutline,
  IoSearchOutline,
  IoChevronDownOutline,
} from 'react-icons/io5';
import { Link } from 'react-router-dom';
import { useCmsTranslations } from '../hooks/useCmsTranslations';

const SYMPTOM_ICONS = [IoBulbOutline, IoFlashOutline, IoLocateOutline];
const DEFAULT_SYMPTOMS = [
  { title: 'קשיי ריכוז', desc: 'קושי לשמור על ריכוז לאורך זמן, הסחת דעת קלה ושכחנות' },
  { title: 'היפראקטיביות', desc: 'חוסר שקט, קושי לשבת במקום ותחושת אי-מנוחה פנימית' },
  { title: 'אימפולסיביות', desc: 'קושי בבקרה עצמית, קבלת החלטות מהירות ללא מחשבה מוקדמת' },
];

const INFO_ICONS = [IoHeartOutline, IoPeopleOutline, IoSearchOutline];
const DEFAULT_INFO = [
  { title: 'ADHD ניתן לטיפול!', desc: 'עם אבחון מדויק ותוכנית טיפול מותאמת אישית, ניתן לשפר משמעותית את איכות החיים. הצעד הראשון הוא פנייה למומחה.' },
  { title: 'קשיים חברתיים', desc: 'קושי בתקשורת חברתית, ביצירת קשרים ובשמירה עליהם' },
  { title: 'זיהוי מוקדם', desc: 'אבחון מוקדם של ADHD יכול לסייע בהתמודדות טובה יותר עם האתגרים ובמציאת דרכים מתאימות להצלחה בלימודים ובחיים.' },
];

const DEFAULT_FAQ = [
  { q: 'מהו ADHD?', a: 'ADHD (הפרעת קשב וריכוז) היא הפרעה נוירו-התפתחותית המשפיעה על יכולת הריכוז, השליטה בדחפים וויסות הפעילות. היא נפוצה בילדים ומבוגרים כאחד ומשפיעה על תפקוד יומיומי, לימודים ועבודה.' },
  { q: 'כמה זמן לוקח תהליך האבחון?', a: 'תהליך האבחון המלא כולל מספר פגישות ואורך בממוצע 2-4 שבועות. התהליך כולל ריאיון קליני מעמיק, מבחנים ממוחשבים (MOXO), שאלונים ובדיקת מסמכים רפואיים רלוונטיים.' },
  { q: 'האם האבחון מתאים לכל הגילאים?', a: 'כן, אנו מספקים אבחון מקצועי לילדים מגיל 6, בני נוער ומבוגרים. לכל קבוצת גיל יש פרוטוקול אבחון מותאם המתחשב במאפיינים הייחודיים של אותו גיל.' },
  { q: 'מה כלול בתוכנית הטיפול?', a: 'תוכנית הטיפול מותאמת אישית וכוללת: המלצות לטיפול תרופתי (במידת הצורך), הדרכת הורים, כלים מעשיים להתמודדות יומיומית, הפניות לטיפולים משלימים ומעקב מתמשך.' },
  { q: 'האם יש צורך בהפניה מרופא?', a: 'לא, אין צורך בהפניה. ניתן לפנות ישירות למרפאה לקביעת תור לאבחון. עם זאת, אם יש מסמכים רפואיים קודמים, מומלץ להביא אותם לפגישה הראשונה.' },
  { q: 'מה ההבדל בין ADD ל-ADHD?', a: 'ADD הוא המונח הישן להפרעת קשב ללא היפראקטיביות. כיום משתמשים במונח ADHD עם שלושה תת-סוגים: חוסר קשב בעיקר, היפראקטיביות-אימפולסיביות בעיקר, או משולב.' },
];

function FaqItem({ question, answer }: { question: string; answer: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="bg-white rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-shadow overflow-hidden">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between gap-4 px-4 sm:px-6 py-4 sm:py-5 text-right min-h-[56px]"
        aria-expanded={open}
      >
        <span className="text-base sm:text-lg font-medium text-gray-900 leading-snug">{question}</span>
        <IoChevronDownOutline className={`w-5 h-5 shrink-0 text-green-800 transition-transform ${open ? 'rotate-180' : ''}`} />
      </button>
      {open && (
        <div className="px-4 sm:px-6 pb-4 sm:pb-6">
          <p className="text-sm sm:text-base text-gray-600 leading-relaxed">{answer}</p>
        </div>
      )}
    </div>
  );
}

export default function ADHDInfoSection() {
  const { t } = useCmsTranslations();

  const symptoms = DEFAULT_SYMPTOMS.map((d, i) => ({
    title: t(`adhd.symptom${i + 1}_title`, d.title),
    desc: t(`adhd.symptom${i + 1}_desc`, d.desc),
  }));

  const info = [
    { title: t('adhd.treatable_title', DEFAULT_INFO[0].title), desc: t('adhd.treatable_desc', DEFAULT_INFO[0].desc) },
    { title: t('adhd.symptom4_title', DEFAULT_INFO[1].title), desc: t('adhd.symptom4_desc', DEFAULT_INFO[1].desc) },
    { title: t('adhd.early_title', DEFAULT_INFO[2].title), desc: t('adhd.early_desc', DEFAULT_INFO[2].desc) },
  ];

  const faq = DEFAULT_FAQ.map((d, i) => ({
    q: t(`faq.q${i + 1}`, d.q),
    a: t(`faq.a${i + 1}`, d.a),
  }));

  return (
    <section id="adhd" className="w-full bg-gray-50 rtl">
      <div className="max-w-6xl mx-auto px-4 py-10 md:py-14">
        <div className="text-center mb-8 sm:mb-12">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-green-800">
            {t('nav.adhd', 'מה זה ADHD?')}
          </h2>
          <p className="text-base sm:text-lg text-gray-600 mt-2 max-w-2xl mx-auto">
            {t('adhd.subtitle', 'הפרעת קשב וריכוז (ADHD) היא הפרעה נוירו-התפתחותית שמשפיעה על ילדים ומבוגרים כאחד')}
          </p>
        </div>

        <div className="text-center mb-6 sm:mb-8">
          <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-green-800 mb-2">
            {t('adhd.definition_title', 'ADHD = Attention Deficit Hyperactivity Disorder')}
          </h3>
          <h4 className="text-base sm:text-lg md:text-xl font-semibold text-gray-800">
            {t('adhd.definition_subtitle', 'מהי הפרעת קשב ופעלתנות יתר (ADHD)')}
          </h4>
        </div>

        <div className="text-center mb-6 sm:mb-8">
          <h3 className="text-xl sm:text-2xl md:text-3xl font-bold mb-2 sm:mb-3 text-gray-900">
            {t('adhd.symptoms_title', 'התסמינים של ADHD')}
          </h3>
          <p className="text-gray-600 text-sm sm:text-base max-w-2xl mx-auto">
            {t('adhd.symptoms_subtitle', 'הפרעת קשב ופעלתנות יתר מתאפיינת בשלושה סוגי תסמינים עיקריים:')}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-6 mb-8 sm:mb-12">
          {symptoms.map((symptom, index) => {
            const Icon = SYMPTOM_ICONS[index] || IoBulbOutline;
            return (
              <div key={symptom.title} className="h-full text-center shadow-md border-0 bg-white rounded-xl p-4 sm:p-6">
                <div className="w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16 mx-auto mb-3 md:mb-4 bg-green-800 rounded-2xl flex items-center justify-center">
                  <Icon className="w-5 h-5 sm:w-6 sm:h-6 md:w-8 md:h-8 text-white" />
                </div>
                <h4 className="font-bold text-sm sm:text-base md:text-lg mb-1 sm:mb-2 text-gray-900">{symptom.title}</h4>
                <p className="text-gray-600 text-xs sm:text-sm leading-relaxed">{symptom.desc}</p>
              </div>
            );
          })}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-6 mb-8 sm:mb-12">
          {info.map((card, index) => {
            const Icon = INFO_ICONS[index] || IoHeartOutline;
            return (
              <div key={card.title} className="h-full text-center shadow-md border-0 bg-white rounded-xl p-4 sm:p-6">
                <div className="w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16 mx-auto mb-3 md:mb-4 bg-green-800 rounded-2xl flex items-center justify-center">
                  <Icon className="w-5 h-5 sm:w-6 sm:h-6 md:w-8 md:h-8 text-white" />
                </div>
                <h4 className="font-bold text-sm sm:text-base md:text-lg mb-1 sm:mb-2 text-gray-900">{card.title}</h4>
                <p className="text-gray-600 text-xs sm:text-sm leading-relaxed">{card.desc}</p>
              </div>
            );
          })}
        </div>

        <div id="faq" className="mt-12 sm:mt-16">
          <div className="text-center mb-8 sm:mb-10">
            <h3 className="text-2xl sm:text-3xl font-bold mb-3 sm:mb-4 text-green-800">
              {t('faq.title', 'שאלות נפוצות')}
            </h3>
            <p className="text-gray-600 text-sm sm:text-base lg:text-lg max-w-2xl mx-auto">
              {t('faq.subtitle', 'תשובות לשאלות הנפוצות ביותר')}
            </p>
          </div>

          <div className="max-w-3xl mx-auto space-y-3 sm:space-y-4">
            {faq.map((item) => (
              <FaqItem key={item.q} question={item.q} answer={item.a} />
            ))}
          </div>

          <div className="text-center mt-10 sm:mt-12">
            <Link
              to="/contact"
              className="inline-flex items-center justify-center text-green-800 font-medium underline underline-offset-4 hover:text-green-600 transition-colors min-h-[44px]"
            >
              {t('faq.no_answer', 'לא מצאתם תשובה? צרו איתנו קשר')}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
