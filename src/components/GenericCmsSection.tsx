import { useCmsTranslations } from '../hooks/useCmsTranslations';
import CmsImage from './CmsImage';
import type { HomeSection } from '../services/cms';

interface SectionItem {
  id: string;
  hidden?: boolean;
}

function sectionItems(section: HomeSection): SectionItem[] {
  const items = (section.config as { items?: unknown })?.items;
  return Array.isArray(items) ? (items as SectionItem[]).filter((item) => !item.hidden) : [];
}

// Renders admin-authored generic CMS sections (testimonials today; other
// generic types like cards/faq/gallery/cta fall back to nothing rather than
// showing broken/empty markup, until they're actually used on the site).
export default function GenericCmsSection({ section }: { section: HomeSection }) {
  const { t } = useCmsTranslations();

  if (section.type !== 'testimonials') return null;

  const id = section.id;
  const heading = t(`section.${id}.heading`, '');
  const items = sectionItems(section);
  if (!heading && items.length === 0) return null;

  return (
    <section id={id} className="w-full bg-gray-50 rtl">
      <div className="max-w-6xl mx-auto px-4 py-10 md:py-14">
        {heading && (
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-green-800 text-center mb-10">
            {heading}
          </h2>
        )}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((item) => {
            const quote = t(`section.${id}.items.${item.id}.quote`, '');
            const name = t(`section.${id}.items.${item.id}.name`, '');
            const role = t(`section.${id}.items.${item.id}.role`, '');
            if (!quote && !name) return null;
            return (
              <div key={item.id} className="h-full border-0 shadow-md bg-white rounded-xl p-6">
                <p className="text-gray-600 italic leading-relaxed mb-4">&quot;{quote}&quot;</p>
                <div className="flex items-center gap-3">
                  <CmsImage
                    slot={`section.${id}.items.${item.id}.image`}
                    fallback="/assets/images/icon.png"
                    alt={name}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <div>
                    <p className="font-semibold text-gray-900 text-sm">{name}</p>
                    {role && <p className="text-gray-500 text-xs">{role}</p>}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
