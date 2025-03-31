import { LocalPageContent } from '../types/content';

interface ContentSectionProps {
  items: LocalPageContent[];
  layout?: 'grid' | 'list';
  columns?: number;
}

export default function ContentSection({
  items,
  layout = 'list',
  columns = 1,
}: ContentSectionProps) {
  const gridCols = `md:grid-cols-${columns}`;

  return (
    <div
      className={`grid grid-cols-1 ${layout === 'grid' ? gridCols : ''} gap-8`}
    >
      {items.map((item, index) => (
        <div key={index} className="flex flex-row items-start gap-4">
          {item.image && (
            <img
              src={item.image}
              alt={item.title}
              className="w-16 h-16 object-cover"
            />
          )}
          <div className="flex-grow text-right">
            <h3 className="text-xl md:text-2xl font-semibold text-green-800 mb-2">
              {item.title}
            </h3>
            <p className="text-gray-900 text-md md:text-xl">
              {item.description}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
