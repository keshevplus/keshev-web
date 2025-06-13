export interface PageItem {
  heading: string;
  text: string;
  image?: string;
  alt?: string;
  bgColor?: string;     // Added for card background
  textColor?: string;   // Added for card text styling
}

export interface ContentItem {
  title: string;
  subtitle?: string;
  heading?: string;
  subheading?: string;
  description?: string;
  image?: string;

  sections?: Array<{
    heading: string;
    text: string;
    image?: string;
    alt?: string;
    bgColor?: string;
    textColor?: string;
  }>;

  body?: Array<{
    title?: string;
    subtitle?: string;
    description?: string;
    image?: string;
    icon?: string;
    file?: string;
    subItems?: Array<{
      title: string;
      description: string;
    }>;
    bgColor?: string;
    textColor?: string;
  }>;

  additional?: Array<any>;
}

// Create a consistent base interface for all page content types
export interface BasePageContent {
  title: string;
  description?: string;
  image?: string;
  sections: Array<{
    id: string;
    heading: string;
    text?: string;
    content?: string | string[];
    image?: string;
    ctaButtonText?: string;
    bgColor?: string;
    textColor?: string;
  }>;
}

export interface HomePageContent {
  title: string;
  image: string; // Hero image or logo for homepage
  description?: string;
  sections: Array<{ // Section definitions for homepage content
    id: string;
    heading: string;
    text?: string;
    content?: string | string[];
    image?: string;
    ctaButtonText?: string;
    bgColor?: string;
    textColor?: string;
  }>;
}


// Dynamic import of page data files for lazy loading
const pageModules = import.meta.glob('../data/*Page.ts');

export const contentService = {
  /**
   * Lazily loads page content module matching the page key.
   * Drop a new data file in src/data named <page>Page.ts to auto-register.
   */
  async getPageContent(page: string): Promise<ContentItem[] | any> {
    const modulePath = `../data/${page}Page.ts`;
    const loader = pageModules[modulePath];
    if (!loader) {
      throw new Error(`Unknown page: ${page}`);
    }
    const mod = await loader();
    // default export should be the page's data object or array
    const data = (mod as { default: any }).default;
    // Ensure array return for consistency
    return Array.isArray(data) ? data : [data];
  }
};

// Deprecated synchronous loader, use contentService.getPageContent instead
export function getPageContent(): ContentItem[] {
  console.warn('getPageContent is deprecated, use contentService.getPageContent');
  return [];
}
