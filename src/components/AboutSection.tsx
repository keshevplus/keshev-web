import {
  IoHeartOutline,
  IoRibbonOutline,
  IoShieldCheckmarkOutline,
  IoCheckmarkCircleOutline,
} from 'react-icons/io5';
import { useCmsTranslations } from '../hooks/useCmsTranslations';
import { useSectionId } from '../lib/sectionSlugs';
import CmsImage from './CmsImage';
import SectionHeader from './SectionHeader';

const VALUE_ICONS = [IoHeartOutline, IoRibbonOutline, IoShieldCheckmarkOutline];

const DEFAULT_CREDENTIALS = [
  'בוגרת לימודי רפואה, אוניברסיטת בולוניה, איטליה',
  'התמחות ברפואת משפחה, קופת חולים מאוחדת',
  'הסמכה לאבחון וטיפול בהפרעות קשב וריכוז, משרד הבריאות',
];

const DEFAULT_VALUES = [
  { title: 'אכפתיות', desc: 'ליווי אישי וחם לאורך כל תהליך האבחון והטיפול' },
  { title: 'מקצועיות', desc: 'שימוש בכלי אבחון מתקדמים ומבוססי מחקר' },
  { title: 'אמינות', desc: 'שקיפות מלאה והתאמת הטיפול לצרכי המטופל' },
];

/**
 * About section — matches keshevplus.com's AboutSection layout (green banner
 * header, photo + credentials card, mission quote, values grid), content
 * pulled from the shared platform CMS (/api/translations, /api/images).
 */
export default function AboutSection() {
  const { t } = useCmsTranslations();
  const sectionId = useSectionId('about');

  const credentials = [
    t('about.credential1', DEFAULT_CREDENTIALS[0]),
    t('about.credential2', DEFAULT_CREDENTIALS[1]),
    t('about.credential3', DEFAULT_CREDENTIALS[2]),
  ];

  const values = [
    { title: t('about.value1_title', DEFAULT_VALUES[0].title), desc: t('about.value1_desc', DEFAULT_VALUES[0].desc) },
    { title: t('about.value2_title', DEFAULT_VALUES[1].title), desc: t('about.value2_desc', DEFAULT_VALUES[1].desc) },
    { title: t('about.value3_title', DEFAULT_VALUES[2].title), desc: t('about.value3_desc', DEFAULT_VALUES[2].desc) },
  ];

  return (
    <section id={sectionId} className="w-full bg-gray-50 rtl">
      <SectionHeader
        title={t('about.title', 'אודות המרפאה')}
        subtitle={t('about.subtitle', 'ליווי מקצועי ואישי באבחון וטיפול בהפרעות קשב וריכוז')}
      />

      <div className="max-w-6xl mx-auto px-4 py-10 md:py-14">
        <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center mb-12">
          <div className="order-2 md:order-2 flex justify-center">
            <div className="relative max-w-xs sm:max-w-sm w-full">
              <div className="absolute -inset-3 bg-gradient-to-br from-green-800/20 to-orange-400/20 rounded-2xl transform rotate-2" />
              <CmsImage
                slot="about.photo"
                fallback="/assets/images/hero-about.jpeg"
                alt={t('about.doctor_alt', 'ד"ר איירין כוכב-רייפמן')}
                className="relative rounded-xl shadow-xl w-full object-cover aspect-[4/5]"
              />
            </div>
          </div>

          <div className="order-1 md:order-1 text-right">
            <div className="bg-white rounded-xl shadow-lg p-6 md:p-8">
              <h3 className="text-2xl md:text-3xl font-bold text-green-800 mb-1">
                {t('about.doctor_name', 'ד"ר איירין כוכב-רייפמן')}
              </h3>
              <p className="text-lg text-green-800/80 font-medium mb-4">
                {t('about.doctor_title', 'רופאה מומחית')}
              </p>
              <p className="text-gray-700 leading-relaxed mb-6">
                {t('about.doctor_desc', 'בעלת ניסיון עשיר באבחון של ילדים, מתבגרים ובוגרים. ליוותה מטופלים רבים במסע להגשמה אישית ותפקוד מיטבי.')}
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
          &quot;{t('about.mission', 'לתת לכל מטופל את הכלים להצלחה, באבחון מדויק ותוכנית טיפול המותאמת אישית')}&quot;
        </p>

        <div className="grid sm:grid-cols-3 gap-6">
          {values.map(({ title, desc }, index) => {
            const Icon = VALUE_ICONS[index] || IoHeartOutline;
            return (
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
            );
          })}
        </div>
      </div>
    </section>
  );
}
