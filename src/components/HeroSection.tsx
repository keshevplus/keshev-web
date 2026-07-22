import { IoLeafOutline } from 'react-icons/io5';
import { useCmsTranslations } from '../hooks/useCmsTranslations';
import { useSectionId } from '../lib/sectionSlugs';
import CmsImage from './CmsImage';
import RotatingWords from './ui/RotatingWords';

export default function HeroSection() {
  const { t } = useCmsTranslations();
  const homeId = useSectionId('home');
  const aboutId = useSectionId('about');

  const typingItems = [
    t('hero.typing_children', 'בילדים'),
    t('hero.typing_teens', 'בבני נוער'),
    t('hero.typing_adults', 'במבוגרים'),
  ];

  return (
    <section id={homeId} className="relative bg-white overflow-x-hidden" dir="rtl">
      <div className="container mx-auto px-4 sm:px-6 flex flex-col sm:flex-row gap-8 sm:gap-10 items-center justify-between pb-10 sm:pb-14">
        <div className="flex flex-col w-full sm:w-[55%] order-2 sm:order-1 text-center sm:text-right animate-hero-fade-in-up">
          <h1 className="text-2xl sm:text-3xl font-bold text-green-800 mb-3">
            {t('hero.welcome_line1', 'ברוכים הבאים למרפאת')} {t('hero.welcome_line2', '"קשב פלוס"')}
          </h1>

          <CmsImage
            slot="logo"
            fallback="/assets/images/logoSVG.svg"
            alt="קשב פלוס"
            className="h-20 sm:h-24 md:h-28 w-auto ms-0 me-auto mb-4"
            loading="eager"
          />

          <p className="text-lg mb-2 text-gray-800 leading-relaxed">
            {t('hero.clinic_description', 'מרפאה לאבחון וטיפול של הפרעות קשב וריכוז')}{' '}
            <RotatingWords words={typingItems} className="font-semibold text-green-800" />
          </p>
          <p className="text-lg mb-4 text-gray-800 leading-relaxed">
            {t('hero.accurate_diagnosis', 'ב"קשב פלוס" תקבלו אבחון מדויק')} {t('hero.personal_plan', 'ותוכנית טיפול אישית')}
          </p>

          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">
            {t('hero.first_step', 'הצעד הראשון מתחיל כאן')}
          </h2>
          <p className="text-base mb-6 text-gray-600 leading-relaxed">
            {t('hero.schedule_consultation', 'קבעו פגישת ייעוץ - בואו לגלות את הדרך להצלחה')}
          </p>

          <div className="flex flex-wrap justify-center sm:justify-end gap-4">
            <a
              href="/contact"
              className="inline-flex items-center gap-2 rounded-full bg-green-800 hover:bg-green-700 text-white px-6 py-3 font-bold shadow-md hover:shadow-lg transition-all duration-200 hover:-translate-y-0.5"
            >
              {t('hero.start_now', 'התחל/י את האבחון עכשיו')}
              <IoLeafOutline className="h-4 w-4" aria-hidden="true" />
            </a>

            <button
              type="button"
              onClick={() => document.getElementById(aboutId)?.scrollIntoView({ behavior: 'smooth' })}
              className="inline-flex items-center gap-2 rounded-full bg-orange-400 hover:bg-orange-500 text-black px-6 py-3 font-bold shadow-md hover:shadow-lg transition-all duration-200 hover:-translate-y-0.5"
            >
              {t('hero.read_about_us', 'קראו עוד עלינו')}
              <IoLeafOutline className="h-4 w-4" aria-hidden="true" />
            </button>
          </div>
        </div>

        <div className="w-full sm:w-[45%] flex justify-center sm:justify-start order-1 sm:order-2 animate-hero-fade-in-side">
          <CmsImage
            slot="hero.image"
            fallback="/assets/images/doctor-hero.png"
            alt={t('hero.doctor_alt', 'ד"ר איירין כוכב-רייפמן')}
            className="w-full h-auto rounded-lg"
            loading="eager"
          />
        </div>
      </div>
    </section>
  );
}
