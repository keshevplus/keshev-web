interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  titleId?: string;
}

// Full-width green banner with white title text, matching keshevplus.com's
// SectionHeader. Titles carry data-sticky-title so StickySectionTitle can
// track which section is in view and mirror it in a small sticky bar.
export default function SectionHeader({ title, subtitle, titleId }: SectionHeaderProps) {
  return (
    <div className="w-full bg-gradient-to-b from-green-800 to-green-950 px-4 sm:px-6 lg:px-8 py-5 md:py-6 text-center">
      <h2 id={titleId} data-sticky-title={title} className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white">
        {title}
      </h2>
      {subtitle && (
        <p className="text-base sm:text-lg text-white/80 mt-2 max-w-2xl leading-relaxed mx-auto">
          {subtitle}
        </p>
      )}
    </div>
  );
}
