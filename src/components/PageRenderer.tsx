import { BasePageContent } from '../types/content';
import { Link } from 'react-router-dom';
import LeafList from './ui/LeafList';

interface PageRendererProps {
    content: BasePageContent;
    className?: string;
}

/**
 * Reusable component to render any page using BasePageContent structure
 */
export default function PageRenderer({ content, className = '' }: PageRendererProps) {
    // Create a sections map for easy access by ID
    // const sectionsMap = mapSectionsById(content.sections);

    return (
        <div className={`page-content rtl ${className}`}>
            <div className="container min-w-full  mx-auto px-4">
                {/* Page title and description with leaf icon */}
                <header className="mb-8 text-center w-full  max-w-3xl mx-auto">
                    <div className="flex justify-center items-center gap-3 mb-4">
                        <img
                            src="/assets/images/green-leaf-icon.png"
                            alt=""
                            className="h-8 w-auto opacity-90"
                        />
                        <h1 id="page-title" className="pt-0 text-xl md:text-xl font-bold bg-gradient-to-b from-green-800 to-green-950 text-white transition-all duration-300 ease-in-out relative shadow-md" style={{ height: '100px', fontSize: '2.2rem', top: '0px', display: 'flex', alignItems: 'center', justifyContent: 'start', padding: '0 20px', textAlign: 'center', lineHeight: '1.2', margin: '0 auto', maxWidth: '800px', borderRadius: '8px', boxShadow: 'rgba(0, 0, 0, 0.1) 0px 4px 6px -1px, rgba(0, 0, 0, 0.06) 0px 2px 4px -1px' }}>
                            {content.title}
                        </h1>
                    </div>

                    {content.description && (
                        <p className="text-xl text-gray-700">{content.description}</p>
                    )}
                    {content.image && (
                        <div className="my-6 flex justify-center">
                            <img
                                src={content.image}
                                alt={content.title}
                                className="rounded-lg shadow-lg max-h-64 w-auto"
                            />
                        </div>
                    )}
                </header>

                {/* Sections */}
                {
                    content.sections?.map((section, idx) => (
                        <div
                            key={section.id || idx}
                            id={section.id}
                            className={`section mb-12 p-6 rounded-lg ${section.bgColor || ''}`}
                        >
                            <div className="flex items-center gap-2 mb-4">
                                <h2 className={`text-2xl font-bold ${section.textColor || 'text-green-800'}`}>
                                    {section.heading}
                                </h2>
                                <img
                                    src="/assets/images/leaf.png"
                                    alt=""
                                    className="h-5 w-auto"
                                />
                            </div>

                            <div className="section-content grid grid-cols-1 md:grid-cols-[1fr_auto] gap-8">
                                {/* Section content */}
                                <div className={`section-text ${section.image ? '' : 'md:col-span-2'}`}>
                                    {section.text && (
                                        <p className="text-lg whitespace-pre-line mb-4">{section.text}</p>
                                    )}

                                    {/* List content using LeafList component */}
                                    {Array.isArray(section.content) && (
                                        <LeafList
                                            items={section.content}
                                            className="mb-4 pr-2"
                                            iconSize="medium"
                                        />
                                    )}

                                    {/* Single content if available */}
                                    {!Array.isArray(section.content) && section.content && (
                                        <p className="text-lg mb-4">{section.content}</p>
                                    )}

                                    {/* CTA Button if available */}
                                    {section.ctaButtonText && (
                                        <Link
                                            to={section.id?.includes('contact') ? '/contact' :
                                                section.id?.includes('about') ? '/about' :
                                                    section.id?.includes('form') ? '/forms' : '/contact'}
                                            className={`inline-flex items-center gap-2 px-6 py-1 rounded-full shadow-md font-semibold transition mt-0 ${section.bgColor?.includes('green') ? 'bg-green-800' : 'bg-green-800'
                                                } ${section.textColor || 'text-white'} hover:opacity-90`}
                                        >
                                            {section.ctaButtonText}
                                            <img
                                                src="/assets/images/leafinverse.png"
                                                alt=""
                                                className="h-4 w-auto"
                                            />
                                        </Link>
                                    )}
                                </div>

                                {/* Section image if available */}
                                {section.image && (
                                    <div className="section-image flex justify-center items-start md:justify-end">
                                        <img
                                            src={section.image}
                                            alt={section.heading}
                                            className="rounded-lg shadow-lg max-w-full h-auto"
                                        />
                                    </div>
                                )}
                            </div>
                        </div>
                    ))
                }
            </div >
        </div >
    );
}