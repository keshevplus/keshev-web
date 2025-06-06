import React from 'react';
import diagnosisPageData from '../data/diagnosisPage';
import Card from './ui/Card';

const Diagnosis = () => {
    return (
        <div>
            {diagnosisPageData.sections.map((section, idx) => {
                if (section.cards) {
                    return (
                        <section key={idx} className="my-12">
                            <h2 className="text-2xl font-bold mb-6 text-center">
                                {section.heading}
                            </h2>
                            <div className="flex w-full justify-center items-start space-x-6">
                                {/* Left green card */}
                                <Card
                                    bgColor={section.cards[0].bgColor}
                                    textColor={section.cards[0].textColor}
                                    textSize="text-md"
                                    paraSize="text-sm"
                                    title={section.cards[0].heading}
                                    description={section.cards[0].text}
                                    image={section.cards[0].image}
                                    alt={section.cards[0].alt}
                                />
                                {/* Center orange card */}
                                <Card
                                    bgColor={section.bgColor}
                                    textColor={section.textColor}
                                    textSize="text-lg"
                                    paraSize="text-sm"
                                    title={section.heading}
                                    description={section.text}
                                    image={section.image}
                                    alt={section.alt}
                                />
                                {/* Right green card */}
                                <Card
                                    bgColor={section.cards[1].bgColor}
                                    textColor={section.cards[1].textColor}
                                    textSize="text-md"
                                    paraSize="text-sm"
                                    title={section.cards[1].heading}
                                    description={section.cards[1].text}
                                    image={section.cards[1].image}
                                    alt={section.cards[1].alt}
                                />
                            </div>
                        </section>
                    );
                }

                return (
                    <section key={idx}>
                        <h2 className="text-2xl font-bold mb-6">{section.heading}</h2>
                        <div className={`p-6 rounded-lg ${section.bgColor} ${section.textColor}`}>
                            <img src={section.image} alt={section.alt} className="mb-4" />
                            <div
                                className="text-sm"
                                dangerouslySetInnerHTML={{ __html: section.text }}
                            />
                        </div>
                    </section>
                );
            })}
        </div>
    );
};

export default Diagnosis;