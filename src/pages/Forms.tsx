import { useEffect } from 'react';
import { useErrorHandler } from '../hooks/useErrorHandler';
import { useTranslations } from '../hooks/useTranslations';
import type { BasePageContent } from '../types/content';
import PageRenderer from '../components/PageRenderer';
import PageTitle from '../layouts/PageTitle';

export default function Forms() {
  const { handleError } = useErrorHandler();
  const { t } = useTranslations();

  useEffect(() => {
    handleError(() => { document.documentElement.dir = 'rtl'; });
  }, [handleError]);

  const content: BasePageContent = {
    title: t('keshevweb.forms.title'),
    description: t('keshevweb.forms.description'),
    image: '/assets/images/forms-hero.jpg',
    sections: [
      {
        id: 'parents',
        heading: t('keshevweb.forms.parents.heading'),
        text: t('keshevweb.forms.parents.text'),
        image: '/assets/images/icon.png',
        bgColor: 'bg-orange-50',
        textColor: 'text-black',
        ctaButtonText: t('keshevweb.forms.parents.cta'),
      },
      {
        id: 'teachers',
        heading: t('keshevweb.forms.teachers.heading'),
        text: t('keshevweb.forms.teachers.text'),
        image: '/assets/images/icon.png',
        bgColor: 'bg-blue-50',
        textColor: 'text-black',
        ctaButtonText: t('keshevweb.forms.teachers.cta'),
      },
      {
        id: 'adults',
        heading: t('keshevweb.forms.adults.heading'),
        text: t('keshevweb.forms.adults.text'),
        image: '/assets/images/icon.png',
        bgColor: 'bg-green-50',
        textColor: 'text-black',
        ctaButtonText: t('keshevweb.forms.adults.cta'),
      },
      {
        id: 'instructions',
        heading: t('keshevweb.forms.instructions.heading'),
        text: t('keshevweb.forms.instructions.text'),
        bgColor: 'bg-yellow-50',
      },
      {
        id: 'cta',
        heading: t('keshevweb.forms.cta.heading'),
        text: t('keshevweb.forms.cta.text'),
        ctaButtonText: t('keshevweb.forms.cta.button'),
        bgColor: 'bg-green-100',
        textColor: 'text-green-800',
      },
    ],
  };

  return (
    <>
      <PageTitle title={content.title} />
      <PageRenderer content={content} className="bg-white py-16" />
    </>
  );
}
