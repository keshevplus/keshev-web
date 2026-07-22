import {
  IoPulseOutline,
  IoMedicalOutline,
  IoDesktopOutline,
  IoClipboardOutline,
  IoPeopleOutline,
} from 'react-icons/io5';
import { useCmsTranslations } from '../hooks/useCmsTranslations';
import SectionHeader from './SectionHeader';

const SERVICE_ICONS = [IoPulseOutline, IoMedicalOutline, IoDesktopOutline, IoClipboardOutline, IoPeopleOutline];

const DEFAULT_SERVICES = [
  { title: 'אבחון מקיף', desc: 'אבחון מותאם אישית באמצעות כלים מתקדמים, ראיונות קליניים ומבחנים ממוחשבים' },
  { title: 'התאמת טיפול תרופתי', desc: 'התאמת טיפול תרופתי אישי עם מעקב בטיחות מתמשך' },
  { title: 'מבחן MOXO ממוחשב', desc: 'הערכה אובייקטיבית של תפקודי הקשב והריכוז' },
  { title: 'ייעוץ ומעקב', desc: 'תמיכה מקצועית מתמשכת ומעקב אחר הטיפול' },
  { title: 'הפניות לטיפולים משלימים', desc: 'הפניות לריפוי בעיסוק, טיפול רגשי ותמיכה פסיכולוגית' },
];

export default function ServicesSection() {
  const { t } = useCmsTranslations();

  const services = DEFAULT_SERVICES.map((d, i) => ({
    title: t(`services.service${i + 1}_title`, d.title),
    desc: t(`services.service${i + 1}_desc`, d.desc),
  }));

  return (
    <section id="services" className="w-full bg-white rtl">
      <SectionHeader
        title={t('services.title', 'השירותים שלנו')}
        subtitle={t('services.subtitle', 'אנו מציעים מגוון רחב של שירותים מקצועיים בתחום אבחון וטיפול בהפרעות קשב')}
      />
      <div className="max-w-6xl mx-auto px-4 pt-8 md:pt-10 lg:pt-12 pb-10 md:pb-14">
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
      </div>
    </section>
  );
}
