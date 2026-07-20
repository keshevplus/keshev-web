import {
  IoHeartOutline,
  IoRibbonOutline,
  IoShieldCheckmarkOutline,
  IoCheckmarkCircleOutline,
} from 'react-icons/io5';

const values = [
  { Icon: IoHeartOutline, title: 'יחס אישי', desc: 'כל מטופל מקבל יחס אישי ומותאם לצרכיו הייחודיים' },
  { Icon: IoRibbonOutline, title: 'מקצועיות', desc: 'צוות מומחים עם ניסיון רב ועדכון מתמיד' },
  { Icon: IoShieldCheckmarkOutline, title: 'דיסקרטיות', desc: 'שמירה על פרטיות מלאה וסביבה בטוחה' },
];

const credentials = [
  'מומחית באבחון וטיפול ב-ADHD',
  'ניסיון של למעלה מ-15 שנה',
  'התמחות בילדים, נוער ומבוגרים',
];

/**
 * About section — styled to match keshevplus.com's AboutSection (green banner
 * header, photo + credentials card, mission quote, values grid), rebuilt with
 * keshev-web's own stack (plain Tailwind + react-icons, no framer-motion/shadcn).
 */
export default function AboutSection() {
  return (
    <section id="about" className="w-full bg-gray-50 rtl">
      <div className="w-full bg-gradient-to-b from-green-800 to-green-950 px-4 py-6 md:py-8 text-center">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white">אודותינו</h2>
        <p className="text-base sm:text-lg text-white/80 mt-2 max-w-2xl mx-auto">
          מומחים באבחון וטיפול בהפרעות קשב וריכוז
        </p>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-10 md:py-14">
        <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center mb-12">
          <div className="order-2 md:order-2 flex justify-center">
            <div className="relative max-w-xs sm:max-w-sm w-full">
              <div className="absolute -inset-3 bg-gradient-to-br from-green-800/20 to-orange-400/20 rounded-2xl transform rotate-2" />
              <img
                src="/assets/images/hero-about.jpeg"
                alt='ד"ר איירין כוכב-רייפמן'
                className="relative rounded-xl shadow-xl w-full object-cover aspect-[4/5]"
              />
            </div>
          </div>

          <div className="order-1 md:order-1 text-right">
            <div className="bg-white rounded-xl shadow-lg p-6 md:p-8">
              <h3 className="text-2xl md:text-3xl font-bold text-green-800 mb-1">
                ד&quot;ר איירין כוכב-רייפמן
              </h3>
              <p className="text-lg text-green-800/80 font-medium mb-4">רופאה מומחית</p>
              <p className="text-gray-700 leading-relaxed mb-6">
                בעלת ניסיון עשיר באבחון של ילדים, מתבגרים ובוגרים. ליוותה מטופלים רבים במסע להגשמה אישית ותפקוד מיטבי.
              </p>
              <ul className="space-y-3">
                {credentials.map((c) => (
                  <li key={c} className="flex items-center justify-end gap-3">
                    <span className="text-gray-800">{c}</span>
                    <IoCheckmarkCircleOutline className="w-5 h-5 text-green-800 shrink-0" />
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <p className="text-center text-lg md:text-xl text-gray-600 italic max-w-3xl mx-auto mb-12">
          &quot;המשימה שלנו היא לספק אבחון מדויק ותוכניות טיפול מותאמות אישית, המאפשרים למטופלים שלנו להגיע למיצוי הפוטנציאל האישי שלהם.&quot;
        </p>

        <div className="grid sm:grid-cols-3 gap-6">
          {values.map(({ Icon, title, desc }) => (
            <div
              key={title}
              className="bg-white rounded-xl shadow-md p-6 text-center hover:shadow-lg transition-shadow duration-300"
            >
              <div className="w-14 h-14 mx-auto mb-4 bg-green-800/10 rounded-full flex items-center justify-center">
                <Icon className="w-7 h-7 text-green-800" />
              </div>
              <h4 className="text-lg font-semibold text-gray-900 mb-2">{title}</h4>
              <p className="text-gray-600 text-sm leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
