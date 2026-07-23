import { useTranslation } from 'react-i18next';

// Section keys map to a stable route path (for SEO/direct links) and a
// per-language in-page anchor id (what actually becomes the DOM element's
// id and the #fragment used to scroll to it). Route paths stay fixed
// English so URLs don't change per language; anchors localize because
// they're purely an in-page navigation detail.
export const SECTION_KEYS = ['home', 'about', 'services', 'adhd', 'diagnosis', 'questionnaires', 'contact'] as const;
export type SectionKey = typeof SECTION_KEYS[number];

export const ROUTE_BY_SECTION: Record<SectionKey, string> = {
  home: '/',
  about: '/about',
  services: '/services',
  adhd: '/adhd',
  diagnosis: '/diagnosis',
  questionnaires: '/forms',
  contact: '/contact',
};

const ANCHOR_SLUGS: Record<SectionKey, Record<string, string>> = {
  home: { he: 'בית', en: 'home' },
  about: { he: 'אודות', en: 'about' },
  services: { he: 'שירותים', en: 'services' },
  adhd: { he: 'מהי-adhd', en: 'adhd' },
  diagnosis: { he: 'תהליך-ההערכה', en: 'diagnosis' },
  questionnaires: { he: 'שאלונים', en: 'questionnaires' },
  contact: { he: 'יצירת-קשר', en: 'contact' },
};

export function anchorIdFor(key: SectionKey, language: string): string {
  const slugs = ANCHOR_SLUGS[key];
  return slugs[language] || slugs.en;
}

// Current-language anchor id for a section, reactive to language changes.
export function useSectionId(key: SectionKey): string {
  const { i18n } = useTranslation();
  return anchorIdFor(key, i18n.language || 'he');
}

export function useAllSectionIds(): Record<SectionKey, string> {
  const { i18n } = useTranslation();
  const language = i18n.language || 'he';
  return SECTION_KEYS.reduce((acc, key) => {
    acc[key] = anchorIdFor(key, language);
    return acc;
  }, {} as Record<SectionKey, string>);
}

export function sectionKeyForPath(pathname: string): SectionKey | null {
  const entry = (Object.entries(ROUTE_BY_SECTION) as [SectionKey, string][]).find(([, path]) => path === pathname);
  return entry ? entry[0] : null;
}

