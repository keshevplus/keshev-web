import { useEffect } from 'react';
import { useErrorHandler } from '../hooks/useErrorHandler';
import { useCmsTranslations } from '../hooks/useCmsTranslations';
import PageTitle from '../layouts/PageTitle';
import QuestionnairesSection from '../components/QuestionnairesSection';

export default function Forms() {
  const { handleError } = useErrorHandler();
  const { t } = useCmsTranslations();

  useEffect(() => {
    handleError(() => { document.documentElement.dir = 'rtl'; });
  }, [handleError]);

  return (
    <>
      <PageTitle title={t('questionnaires.title', 'שאלונים')} />
      <QuestionnairesSection />
    </>
  );
}
