import { useEffect } from 'react';
import { useErrorHandler } from '../hooks/useErrorHandler';
import { useTranslations } from '../hooks/useTranslations';
import type { BasePageContent } from '../types/content';
import PageRenderer from '../components/PageRenderer';
import PageTitle from '../layouts/PageTitle';

export default function ADHD() {
  const { handleError } = useErrorHandler();
  const { t } = useTranslations();

  useEffect(() => {
    handleError(() => { document.documentElement.dir = 'rtl'; });
  }, [handleError]);

  const symptomItems: string[] = (() => {
    try {
      return JSON.parse(t('keshevweb.adhd.symptoms.items'));
    } catch {
      return [];
    }
  })();

  const content: BasePageContent = {
    title: t('keshevweb.adhd.title'),
    description: t('keshevweb.adhd.description'),
    image: '/assets/images/icon.png',
    sections: [
      {
        id: 'overview',
        heading: t('keshevweb.adhd.overview.heading'),
        text: t('keshevweb.adhd.overview.text'),
        image: '/assets/images/adhd-brain.jpg',
      },
      {
        id: 'symptoms',
        heading: t('keshevweb.adhd.symptoms.heading'),
        content: symptomItems,
        bgColor: 'bg-gray-50',
      },
      {
        id: 'treatment',
        heading: t('keshevweb.adhd.treatment.heading'),
        text: t('keshevweb.adhd.treatment.text'),
        ctaButtonText: t('keshevweb.adhd.treatment.cta'),
        bgColor: 'bg-green-50',
      },
    ],
  };

  return (
    <div className="adhd-page bg-white">
      {/* Use PageTitle component with animation for non-homepage pages */}
      <PageTitle title={content.title} />

      {/* Content area with leaf bullet points in lists */}
      <div className="py-8">
        <PageRenderer content={content} className="bg-white pt-0" />
      </div>
    </div>
  );
}
