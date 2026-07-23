import {
  IoChatbubblesOutline,
  IoDocumentTextOutline,
  IoDesktopOutline,
  IoClipboardOutline,
  IoMedicalOutline,
} from 'react-icons/io5';
import { Link } from 'react-router-dom';
import { useCmsTranslations } from '../hooks/useCmsTranslations';
import { useSectionId } from '../lib/sectionSlugs';
import SectionHeader from './SectionHeader';

const STEP_ICONS = [IoChatbubblesOutline, IoDocumentTextOutline, IoDesktopOutline, IoClipboardOutline, IoMedicalOutline];

const DEFAULT_STEPS = [
  { title: 'שיחה ראשונית', desc: 'מפגש אישי עם המטופל והמשפחה להבנת ההיסטוריה ההתפתחותית וההתנהגותית.' },
  { title: 'שאלונים מובנים', desc: 'איסוף מידע באמצעות שאלונים מתוקפים להורים, למורים ולמטופל.' },
  { title: 'בדיקות ממוחשבות', desc: 'ביצוע מבחני קשב ממוחשבים להערכה אובייקטיבית של יכולות הקשב והריכוז.' },
  { title: 'אבחנה וסיכום', desc: 'פגישת סיכום והסברת האבחנה, כולל המלצות טיפוליות מותאמות אישית.' },
  { title: 'תכנית טיפול', desc: 'בניית תכנית טיפול מקיפה הכוללת התערבות תרופתית, פסיכולוגית, חינוכית והתנהגותית לפי הצורך.' },
];

// keshev-web-specific section (no equivalent on keshevplus.com's own homepage) —
// keys live under their own "diagnosis.*" namespace rather than reusing
// shared platform keys, since this content has no production counterpart.
export default function DiagnosisSection() {
  const { t } = useCmsTranslations();
  const sectionId = useSectionId('diagnosis');

  const steps = DEFAULT_STEPS.map((d, i) => ({
    title: t(`diagnosis.step${i + 1}_title`, d.title),
    desc: t(`diagnosis.step${i + 1}_desc`, d.desc),
  }));

  return (
    <section id={sectionId} className="w-full bg-white rtl">
      <SectionHeader
        title={t('diagnosis.title', 'תהליך ההערכה והטיפול')}
        subtitle={t('diagnosis.subtitle', 'תהליך הערכת הפרעת קשב מקצועי ואיכותי')}
      />
      <div className="max-w-6xl mx-auto px-4 pt-8 md:pt-10 lg:pt-12 pb-10 md:pb-14">
        <ol className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
          {steps.map((step, index) => {
            const Icon = STEP_ICONS[index] || IoMedicalOutline;
            return (
              <li key={step.title} className="relative text-center">
                <div className="w-14 h-14 sm:w-16 sm:h-16 mx-auto mb-4 bg-gradient-to-br from-green-700 to-green-900 rounded-2xl flex items-center justify-center shadow-md">
                  <Icon className="w-7 h-7 sm:w-8 sm:h-8 text-white" />
                </div>
                <h3 className="font-bold text-base sm:text-lg mb-2 text-gray-900">{step.title}</h3>
                <p className="text-sm text-gray-600 leading-relaxed">{step.desc}</p>
              </li>
            );
          })}
        </ol>

        <div className="text-center mt-10 sm:mt-12">
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 bg-green-800 hover:bg-green-700 text-white px-6 py-3 rounded-full shadow-md font-semibold transition-all duration-200 hover:shadow-lg hover:-translate-y-0.5"
          >
            {t('diagnosis.cta_button', 'צרו קשר עכשיו')}
          </Link>
        </div>
      </div>
    </section>
  );
}


