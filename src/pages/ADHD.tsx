import { useEffect } from 'react';
import { useErrorHandler } from '../hooks/useErrorHandler';
import { useCmsTranslations } from '../hooks/useCmsTranslations';
import PageTitle from '../layouts/PageTitle';
import ADHDInfoSection from '../components/ADHDInfoSection';

export default function ADHD() {
  const { handleError } = useErrorHandler();
  const { t } = useCmsTranslations();

  useEffect(() => {
    handleError(() => { document.documentElement.dir = 'rtl'; });
  }, [handleError]);

  return (
    <div className="adhd-page bg-white">
      <PageTitle title={t('nav.adhd', 'מה זה ADHD?')} />
      <ADHDInfoSection />
    </div>
  );
}
