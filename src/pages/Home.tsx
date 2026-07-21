import { useEffect } from 'react';
import { useHomeSections } from '../hooks/useHomeSections';
import HeroSection from '../components/HeroSection';
import AboutSection from '../components/AboutSection';
import ServicesSection from '../components/ServicesSection';
import ADHDInfoSection from '../components/ADHDInfoSection';
import DiagnosisSection from '../components/DiagnosisSection';
import QuestionnairesSection from '../components/QuestionnairesSection';
import ContactSection from '../components/ContactSection';
import GenericCmsSection from '../components/GenericCmsSection';
import type { HomeSection } from '../services/cms';

const LEGACY_SECTIONS: Record<string, React.ComponentType> = {
  'legacy:about': AboutSection,
  'legacy:services': ServicesSection,
  'legacy:adhdInfo': ADHDInfoSection,
  'legacy:questionnaires': QuestionnairesSection,
  'legacy:contact': ContactSection,
};

function RenderedSection({ section }: { section: HomeSection }) {
  const LegacyComponent = LEGACY_SECTIONS[section.type];
  if (LegacyComponent) return <LegacyComponent />;
  return <GenericCmsSection section={section} />;
}

export default function Home() {
  const sections = useHomeSections();

  useEffect(() => {
    document.documentElement.dir = 'rtl';
  }, []);

  return (
    <div className="relative">
      <HeroSection />
      {sections.map((section) => (
        <>
          <RenderedSection key={section.id} section={section} />
          {/* Diagnosis is keshev-web-only (no equivalent on keshevplus.com),
              so it isn't part of the shared home_sections CMS list — it's
              pinned right after ADHD info, before the questionnaires. */}
          {section.type === 'legacy:adhdInfo' && <DiagnosisSection key="diagnosis" />}
        </>
      ))}
    </div>
  );
}
