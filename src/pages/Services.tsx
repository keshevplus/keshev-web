import { useCmsTranslations } from '../hooks/useCmsTranslations';
import PageTitle from '../layouts/PageTitle';
import ServicesSection from '../components/ServicesSection';

export default function Services() {
  const { t } = useCmsTranslations();

  return (
    <div className="bg-white flex-grow">
      <PageTitle title={t('services.title', 'השירותים שלנו')} />
      <ServicesSection />
    </div>
  );
}
