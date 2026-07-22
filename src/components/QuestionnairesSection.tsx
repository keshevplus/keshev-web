import { IoPeopleOutline, IoDocumentTextOutline, IoPersonOutline } from 'react-icons/io5';
import { useCmsTranslations } from '../hooks/useCmsTranslations';
import { useSectionId } from '../lib/sectionSlugs';
import SectionHeader from './SectionHeader';

const QUESTIONNAIRE_ICONS = [IoPeopleOutline, IoDocumentTextOutline, IoPersonOutline];

const DEFAULT_QUESTIONNAIRES = [
  {
    title: 'שאלון להורים',
    desc: 'שאלון זה מיועד להורים ומספק תובנות על התנהגות הילד בבית ובסביבה המשפחתית.',
    pdf: '/assets/forms/vanderbilt_parent_form.pdf',
    docx: '/assets/forms/vanderbilt_parent_form.docx',
  },
  {
    title: 'שאלון למורה',
    desc: 'שאלון זה מיועד למורים ומספק תובנות על התנהגות הילד בכיתה ובסביבה החינוכית.',
    pdf: '/assets/forms/vanderbilt_teacher_form.pdf',
    docx: '/assets/forms/vanderbilt_teacher_form.docx',
  },
  {
    title: 'שאלון דיווח עצמי',
    desc: 'שאלון זה מיועד למילוי על ידי מבוגר מעל גיל 18 להערכת הפרעות קשב ופעלתנות יתר.',
    pdf: '/assets/forms/vanderbilt_self_form.pdf',
    docx: '/assets/forms/vanderbilt_self_form.docx',
  },
];

export default function QuestionnairesSection() {
  const { t } = useCmsTranslations();
  const sectionId = useSectionId('questionnaires');

  const questionnaires = DEFAULT_QUESTIONNAIRES.map((d, i) => ({
    title: t(`questionnaires.${['parent_form', 'teacher_form', 'self_report'][i]}`, d.title),
    desc: t(`questionnaires.${['parent_form_desc', 'teacher_form_desc', 'self_report_desc'][i]}`, d.desc),
    pdf: d.pdf,
    docx: d.docx,
  }));

  return (
    <section id={sectionId} className="w-full bg-white rtl">
      <SectionHeader
        title={t('questionnaires.title', 'שאלונים')}
        subtitle={t('questionnaires.subtitle', 'שאלונים לזיהוי סימנים של הפרעת קשב וריכוז (ADHD)')}
      />
      <div className="max-w-6xl mx-auto px-4 pt-8 md:pt-10 lg:pt-12 pb-10 md:pb-14">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {questionnaires.map((item, index) => {
            const Icon = QUESTIONNAIRE_ICONS[index] || IoDocumentTextOutline;
            return (
              <div key={item.title} className="h-full shadow-md border-0 bg-white rounded-xl p-5 sm:p-6 flex flex-col items-center text-center">
                <div className="w-16 h-16 bg-green-800/10 rounded-full flex items-center justify-center shrink-0 mb-4">
                  <Icon className="w-8 h-8 text-green-800" />
                </div>
                <h3 className="font-bold text-base sm:text-lg mb-2 text-gray-900">{item.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed mb-4">{item.desc}</p>

                <div className="w-full space-y-3">
                  <p className="text-sm font-medium text-gray-800 text-center">
                    {t('questionnaires.download_files', 'קבצים להורדה')}
                  </p>
                  <div className="flex items-center justify-center gap-4">
                    <a
                      href={item.docx}
                      download
                      className="flex flex-col items-center gap-1 group"
                      title={t('questionnaires.download_word', 'הורדת Word')}
                    >
                      <div className="w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center rounded-lg bg-[#2B579A]/10 group-hover:bg-[#2B579A]/20 transition-colors">
                        <svg viewBox="0 0 32 32" className="w-6 h-6 sm:w-8 sm:h-8" fill="none">
                          <rect x="2" y="2" width="28" height="28" rx="4" fill="#2B579A" />
                          <text x="16" y="21" textAnchor="middle" fill="white" fontSize="13" fontWeight="bold" fontFamily="Arial, sans-serif">W</text>
                        </svg>
                      </div>
                    </a>
                    <a
                      href={item.pdf}
                      download
                      className="flex flex-col items-center gap-1 group"
                      title={t('questionnaires.download_pdf', 'הורדת PDF')}
                    >
                      <div className="w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center rounded-lg bg-[#D32F2F]/10 group-hover:bg-[#D32F2F]/20 transition-colors">
                        <svg viewBox="0 0 32 32" className="w-6 h-6 sm:w-8 sm:h-8" fill="none">
                          <rect x="2" y="2" width="28" height="28" rx="4" fill="#D32F2F" />
                          <text x="16" y="21" textAnchor="middle" fill="white" fontSize="11" fontWeight="bold" fontFamily="Arial, sans-serif">PDF</text>
                        </svg>
                      </div>
                    </a>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <p className="text-center text-gray-600 text-sm sm:text-base mt-8">
          {t('questionnaires.note', 'ניתן להוריד את השאלונים ולמלא אותם לפני הפגישה במרפאה')}
        </p>
      </div>
    </section>
  );
}
