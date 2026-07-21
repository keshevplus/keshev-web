import { useEffect } from 'react';
import { useErrorHandler } from '../hooks/useErrorHandler';
import { useCmsTranslations } from '../hooks/useCmsTranslations';
import PageTitle from '../layouts/PageTitle';
import DiagnosisSection from '../components/DiagnosisSection';

export default function Diagnosis() {
  const { handleError } = useErrorHandler();
  const { t } = useCmsTranslations();

  useEffect(() => {
    handleError(() => { document.documentElement.dir = 'rtl'; });
  }, [handleError]);

  return (
    <>
      <PageTitle title={t('diagnosis.title', 'תהליך האבחון והטיפול')} />
      <DiagnosisSection />
    </>
  );
}
