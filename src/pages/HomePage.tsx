import { useEffect } from 'react';
import { usePageData } from '../hooks/usePageData';
import type { HomePageContent } from '../types/content';
import homePageData from '../data/homePage';
import { Link } from 'react-router-dom';
import PageTitle from '../layouts/PageTitle';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';

export default function HomePage() {
    const { data, isLoading, error } = usePageData<HomePageContent>('home');
    const content = data || homePageData;
    const { title, sections } = Array.isArray(content) ? content[0] : content;

    // Access isScrolled from global state
    const { isScrolled } = useSelector((state: RootState) => state.sharedState);

    // Map sections by id
    const sectionsMap = Array.isArray(sections)
        ? sections.reduce((map: Record<string, typeof sections[0]>, section: typeof sections[0]) => {
            if (section?.id) {
                map[section.id] = section;
            }
            return map;
        }, {} as Record<string, typeof sections[0]>)
        : {};

    const hero = sectionsMap['hero'];
    const intro = sectionsMap['intro'];
    const contactCta = sectionsMap['contact-cta'];
    const aboutCta = sectionsMap['about-cta'];
    const listSec = sectionsMap['list'];

    useEffect(() => {
        document.documentElement.dir = 'rtl';
    }, []);

    if (isLoading) return <div className="container mx-auto py-8 loading"><div className="animate-pulse">Loading...</div></div>;
    if (error) return <div className="container mx-auto py-8 error text-red-600">Error: {error}</div>;

    return (
        <section className="w-full bg-white rtl">
            {/* Page Title - only show when not scrolled */}
            {!isScrolled && (
                <PageTitle title={title} isHomePage={true} />
            )}

            {/* Main Hero Section */}
            <div className="flex flex-col md:flex-row items-center justify-between max-w-6xl mx-auto px-4 py-8 gap-8">

                {/* Text Content Side - Right on desktop, matches keshevplus.co.il */}
                <div className="xl:w-full md:w-2/7 order-1 px-2 sm:px-4 flex flex-col items-center text-center">

                    {/* Welcome Title - Prominent at top */}
                    <h1 className="text-2xl md:text-4xl font-bold text-green-800 mb-4 whitespace-pre-line">
                        {title}
                    </h1>

                    {/* Logo - Dominant size like keshevplus.co.il */}
                    <img
                        alt="קשב פלוס"
                        className="w-48 sm:w-64 md:w-72 lg:w-72 mb-2 md:mb-2 drop-shadow-lg mx-auto"
                        src="/assets/images/logo.png"
                    />

                    {/* Doctor Name with Rotating Specialties */}
                    {intro && (
                        <p className="flex justify-start text-lg sm:text-lg md:text-2xl lg:text-3xl mb-3 md:mb-3 text-gray-700 flex-wrap text-center leading-3">
                            {intro.heading}
                            {Array.isArray(listSec?.content) && (
                                <span className="relative inline-block whitespace-nowrap">
                                    {listSec.content.map((item, idx) => (
                                        <span
                                            key={idx}
                                            className="absolute top-0 right-0 font-bold opacity-0 animate-typing"
                                            style={{
                                                animationDelay: `${idx * 3000}ms`,
                                                animationDuration: `${listSec?.content?.length ? listSec.content.length * 3000 : 0}ms`
                                            }}
                                        >
                                            {item}
                                        </span>
                                    ))}
                                </span>
                            )}
                        </p>
                    )}

                    {/* Main Description */}
                    {listSec?.heading && (
                        <p className="whitespace-pre-line text-lg sm:text-xl md:text-2xl lg:text-3xl mb-3 text-gray-700 text-center">
                            {listSec.heading}
                        </p>
                    )}

                    {/* Hero Call to Action */}
                    {hero && (
                        <>
                            <p className="font-bold text-xl sm:text-2xl md:text-2xl lg:text-3xl mb-3 text-gray-700 text-center leading-relaxed">
                                {hero.heading}
                            </p>
                            <p className="whitespace-pre-line text-lg sm:text-xl md:text-2xl lg:text-3xl mb-3 text-gray-700 text-center">
                                {hero.text}
                            </p>
                        </>
                    )}

                    {/* CTA Buttons - Full width like keshevplus.co.il */}
                    <div className="flex flex-col md:flex-row justify-center items-stretch gap-4 w-full mt-4 px-4">
                        {contactCta && (
                            <Link
                                to="/contact"
                                className="w-full md:w-1/2 bg-green-800 hover:bg-green-600 text-white px-6 py-4 rounded-md text-xl font-bold text-center transition-colors duration-300 shadow-md hover:shadow-lg flex items-center justify-center"
                            >
                                {contactCta.heading}
                            </Link>
                        )}

                        {aboutCta && (
                            <Link
                                to="/about"
                                className="w-full md:w-1/2 bg-orange-400 hover:bg-orange-600 hover:text-white text-black px-6 py-4 rounded-md text-xl font-bold text-center transition-colors duration-300 shadow-md hover:shadow-lg flex items-center justify-center"
                            >
                                {aboutCta.heading}
                            </Link>
                        )}
                    </div>
                </div>

                {/* Doctor Image Side - Left on desktop */}
                {hero?.image && (
                    <div className="w-full md:w-[40%] flex justify-center order-2">
                        <img
                            src={hero.image}
                            alt="רופא מומחה"
                            className="w-full max-w-md h-auto rounded-lg shadow-xl"
                        />
                    </div>
                )}
            </div>

            {/* Additional sections */}
            {Array.isArray(sections) && sections
                .filter(section =>
                    section.id !== 'hero' &&
                    section.id !== 'intro' &&
                    section.id !== 'list' &&
                    section.id !== 'contact-cta' &&
                    section.id !== 'about-cta'
                )
                .map((section, index) => (
                    <div
                        key={section.id}
                        className={`py-16 ${index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}`}
                    >
                        <div className="max-w-3xl mx-auto px-4 text-center">
                            <h2 className="text-3xl font-bold mb-6 text-green-800">{section.heading}</h2>
                            {section.text && <p className="text-lg mb-8">{section.text}</p>}

                            {/* Content list items */}
                            {Array.isArray(section.content) && (
                                <ul className="mb-8 space-y-3 text-center">
                                    {section.content.map((item, idx) => (
                                        <li key={idx} className="flex items-center justify-center">
                                            <span className="text-orange-500 mr-2">•</span>
                                            <span>{item}</span>
                                        </li>
                                    ))}
                                </ul>
                            )}

                            {/* Section CTA buttons */}
                            <div className="flex flex-wrap justify-center gap-4">
                                <Link
                                    to="/contact"
                                    className="inline-flex items-center gap-2 bg-green-800 hover:bg-green-700 text-white px-6 py-3 rounded-full shadow-md font-semibold transition"
                                >
                                    צור קשר לייעוץ
                                    <img src="/assets/images/leafinverse.png" alt="" className="h-4 w-auto" />
                                </Link>

                                <Link
                                    to="/about"
                                    className="inline-flex items-center gap-2 bg-orange-400 hover:bg-orange-500 text-white px-6 py-3 rounded-full shadow-md font-semibold transition"
                                >
                                    קרא/י עוד
                                    <img src="/assets/images/leaf.png" alt="" className="h-4 w-auto" />
                                </Link>
                            </div>
                        </div>
                    </div>
                ))
            }
        </section>
    );
}