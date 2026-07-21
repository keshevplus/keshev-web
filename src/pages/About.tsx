import { useEffect } from 'react';
import { useErrorHandler } from '../hooks/useErrorHandler';
import { useCmsTranslations } from '../hooks/useCmsTranslations';
import PageTitle from '../layouts/PageTitle';
import AboutSection from '../components/AboutSection';

export default function About() {
  const { handleError } = useErrorHandler();
  const { t } = useCmsTranslations();

  useEffect(() => {
    handleError(() => { document.documentElement.dir = 'rtl'; });
  }, [handleError]);

  return (
    <div className="bg-white flex-grow pb-0 animate-slide-in">
      <PageTitle title={t('about.title', 'אודות המרפאה')} />
      <AboutSection />
    </div>
  );
}
