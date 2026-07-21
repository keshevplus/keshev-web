import {
  IoPulseOutline,
  IoMedicalOutline,
  IoDesktopOutline,
  IoClipboardOutline,
  IoPeopleOutline,
} from 'react-icons/io5';
import { useCmsTranslations } from '../hooks/useCmsTranslations';

const SERVICE_ICONS = [IoPulseOutline, IoMedicalOutline, IoDesktopOutline, IoClipboardOutline, IoPeopleOutline];

const DEFAULT_SERVICES = [
  { title: 'אבחון מקיף', desc: 'אבחון מותאם אישית באמצעות כלים מתקדמים, ראיונות קליניים ומבחנים ממוחשבים' },
  { title: 'התאמת טיפול תרופתי', desc: 'התאמת טיפול תרופתי אישי עם מעקב בטיחות מתמשך' },
  { title: 'מבחן MOXO ממוחשב', desc: 'הערכה אובייקטיבית של תפקודי הקשב והריכוז' },
  { title: 'ייעוץ ומעקב', desc: 'תמיכה מקצועית מתמשכת ומעקב אחר הטיפול' },
  { title: 'הפניות לטיפולים משלימים', desc: 'הפניות לריפוי בעיסוק, טיפול רגשי ותמיכה פסיכולוגית' },
];

const DEFAULT_STEPS = [
  { title: 'יצירת קשר', desc: 'פנייה ראשונית טלפונית או באמצעות הטופס באתר' },
  { title: 'פגישת היכרות', desc: 'שיחה ראשונית, איסוף היסטוריה רפואית ומילוי שאלונים' },
  { title: 'אבחון מקיף', desc: 'ביצוע מבחנים ממוחשבים והערכה קלינית מעמיקה' },
  { title: 'דוח ותוכנית טיפול', desc: 'קבלת דוח מפורט והמלצות לתוכנית טיפול אישית' },
];

export default function ServicesSection() {
  const { t } = useCmsTranslations();

  const services = DEFAULT_SERVICES.map((d, i) => ({
    title: t(`services.service${i + 1}_title`, d.title),
    desc: t(`services.service${i + 1}_desc`, d.desc),
  }));

  const steps = DEFAULT_STEPS.map((d, i) => ({
    title: t(`services.step${i + 1}_title`, d.title),
    desc: t(`services.step${i + 1}_desc`, d.desc),
  }));

  return (
    <section id="services" className="w-full bg-white rtl">
      <div className="max-w-6xl mx-auto px-4 py-10 md:py-14">
        <div className="text-center mb-10">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-green-800">
            {t('services.title', 'השירותים שלנו')}
          </h2>
          <p className="text-base sm:text-lg text-gray-600 mt-2 max-w-2xl mx-auto">
            {t('services.subtitle', 'אנו מציעים מגוון רחב של שירותים מקצועיים בתחום אבחון וטיפול בהפרעות קשב')}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6" role="list">
          {services.map((service, index) => {
            const Icon = SERVICE_ICONS[index] || IoPulseOutline;
            return (
              <div
                key={service.title}
                role="listitem"
                className="h-full text-center bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 p-6"
              >
                <div className="w-14 h-14 sm:w-16 sm:h-16 mx-auto mb-4 rounded-2xl flex items-center justify-center bg-gradient-to-br from-green-700 to-green-900 shadow-md">
                  <Icon className="w-7 h-7 sm:w-8 sm:h-8 text-white" />
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2">{service.title}</h3>
                <p className="text-base text-gray-600 leading-relaxed">{service.desc}</p>
              </div>
            );
          })}
        </div>

        <div className="mt-16 sm:mt-20">
          <h3 className="text-xl sm:text-2xl font-bold text-center mb-8 sm:mb-12 text-gray-900">
            {t('services.process_steps', 'שלבי תהליך האבחון')}
          </h3>

          <ol className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {steps.map((step, index) => (
              <li key={step.title} className="relative text-center">
                <div className="w-12 h-12 sm:w-14 sm:h-14 mx-auto mb-3 sm:mb-4 bg-gradient-to-br from-green-700 to-green-800 rounded-full flex items-center justify-center shadow-md">
                  <span className="text-lg sm:text-xl font-bold text-white">{index + 1}</span>
                </div>
                <h4 className="font-semibold text-base sm:text-lg mb-1 sm:mb-2 text-gray-900">{step.title}</h4>
                <p className="text-sm text-gray-600 leading-relaxed">{step.desc}</p>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
