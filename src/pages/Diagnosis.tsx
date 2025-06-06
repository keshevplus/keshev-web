import React from 'react';
import PageLayout from '../layouts/PageLayout';
import Card from '../components/ui/Card';
import { usePageData } from '../hooks/usePageData';

const Diagnosis: React.FC = () => {
  const [data] = usePageData('diagnosis');
  if (!data) return null;

  return (
    <PageLayout
      title={data.title}
      background="rgb(255, 255, 255, 0.9) bg-opacity-90 backdrop-blur-sm"
      description={data.description}
      withRtl
      maxWidth="max-w-[95%] lg:max-w-[75%]"
    >
      {/* subtitle/intro text */}
      {data.subheading && (
        <p className="text-center text-white mb-6">{data.subheading}</p>
      )}

      {/* grid of cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {data.sections?.map((section, idx) => (
          <Card
            key={idx}
            bgcolor={section.bgColor || 'defaultColor'}
            textColor={section.textColor || 'defaultTextColor'}
            textSize="text-lg"
            paraSize="text-md"
            title={section.heading}
            description={section.text}
            image={section.image}
            alt={section.alt}
            customClass={section.heading === 'לאחר האבחון' ? 'lg:col-span-3' : undefined} // Pass custom class conditionally
          />
        ))}
      </div>
    </PageLayout>
  );
};

export default Diagnosis;
