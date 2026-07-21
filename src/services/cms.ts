import { API_URL } from '../config/constants';

export type HomeSectionType =
  | 'legacy:about'
  | 'legacy:services'
  | 'legacy:adhdInfo'
  | 'legacy:questionnaires'
  | 'legacy:contact'
  | 'richText'
  | 'cards'
  | 'faq'
  | 'testimonials'
  | 'gallery'
  | 'cta';

export interface HomeSection {
  id: string;
  type: HomeSectionType;
  enabled: boolean;
  config: Record<string, unknown>;
}

export interface WidgetSettings {
  showChat: boolean;
  showAccessibility: boolean;
  showWhatsApp: boolean;
}

export const DEFAULT_HOME_SECTIONS: HomeSection[] = [
  { id: 'about', type: 'legacy:about', enabled: true, config: {} },
  { id: 'services', type: 'legacy:services', enabled: true, config: {} },
  { id: 'adhd-info', type: 'legacy:adhdInfo', enabled: true, config: {} },
  { id: 'questionnaires', type: 'legacy:questionnaires', enabled: true, config: {} },
  { id: 'contact', type: 'legacy:contact', enabled: true, config: {} },
];

export const DEFAULT_WIDGET_SETTINGS: WidgetSettings = {
  showChat: true,
  showAccessibility: true,
  showWhatsApp: true,
};

async function getJson<T>(path: string, fallback: T): Promise<T> {
  try {
    const response = await fetch(`${API_URL}${path}`);
    if (!response.ok) return fallback;
    return (await response.json()) as T;
  } catch {
    return fallback;
  }
}

export const fetchTranslations = (lang: string): Promise<Record<string, string>> =>
  getJson(`/api/translations?lang=${encodeURIComponent(lang)}`, {});

export const fetchHomeSections = (): Promise<HomeSection[]> =>
  getJson('/api/home-sections', DEFAULT_HOME_SECTIONS);

export const fetchWidgetSettings = (): Promise<WidgetSettings> =>
  getJson('/api/settings/widgets', DEFAULT_WIDGET_SETTINGS);

// Admin-managed image, served by slot name (e.g. "hero.image"). Callers
// should render an <img onError> fallback since a slot may not be filled in.
export const imageSlotUrl = (slot: string): string =>
  `${API_URL}/api/images/${encodeURIComponent(slot)}`;
