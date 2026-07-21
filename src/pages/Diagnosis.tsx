import { useEffect } from 'react';
import { useErrorHandler } from '../hooks/useErrorHandler';
import { useTranslations } from '../hooks/useTranslations';
import type { BasePageContent } from '../types/content';
import PageRenderer from '../components/PageRenderer';
import PageTitle from '../layouts/PageTitle';

export default function Diagnosis() {
  const { handleError } = useErrorHandler();
  const { t } = useTranslations();

  useEffect(() => {
    handleError(() => { document.documentElement.dir = 'rtl'; });
  }, [handleError]);

  const content: BasePageContent = {
    title: t('keshevweb.diagnosis.title'),
    description: t('keshevweb.diagnosis.description'),
    image: '/assets/images/diagnosis-hero.jpg',
    sections: [
      {
        id: 'first-meeting',
        heading: t('keshevweb.diagnosis.firstMeeting.heading'),
        text: t('keshevweb.diagnosis.firstMeeting.text'),
        image: '/assets/images/icon.png',
        bgColor: 'bg-orange-50',
        textColor: 'text-black',
      },
      {
        id: 'questionnaires',
        heading: t('keshevweb.diagnosis.questionnaires.heading'),
        text: t('keshevweb.diagnosis.questionnaires.text'),
        image: '/assets/images/icon.png',
        bgColor: 'bg-blue-50',
        textColor: 'text-black',
      },
      {
        id: 'testing',
        heading: t('keshevweb.diagnosis.testing.heading'),
        text: t('keshevweb.diagnosis.testing.text'),
        image: '/assets/images/icon.png',
        bgColor: 'bg-green-50',
        textColor: 'text-black',
      },
      {
        id: 'diagnosis',
        heading: t('keshevweb.diagnosis.diagnosis.heading'),
        text: t('keshevweb.diagnosis.diagnosis.text'),
        image: '/assets/images/icon.png',
        bgColor: 'bg-purple-50',
        textColor: 'text-black',
      },
      {
        id: 'treatment',
        heading: t('keshevweb.diagnosis.treatment.heading'),
        text: t('keshevweb.diagnosis.treatment.text'),
        image: '/assets/images/icon.png',
        bgColor: 'bg-yellow-50',
        textColor: 'text-black',
      },
      {
        id: 'cta',
        heading: t('keshevweb.diagnosis.cta.heading'),
        text: t('keshevweb.diagnosis.cta.text'),
        ctaButtonText: t('keshevweb.diagnosis.cta.button'),
        bgColor: 'bg-green-100',
        textColor: 'text-green-800',
      },
    ],
  };

  return (
    <>
      <PageTitle title={content.title} />
      <PageRenderer content={content} className="absolute inset-0 z-[-1]" />
    </>
  );
}
