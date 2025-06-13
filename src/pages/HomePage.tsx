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
        <section className="w-full bg-gradient-to-br from-green-50 via-white to-orange-50 rtl min-h-screen">
            {/* Page Title - only show when not scrolled */}
            {!isScrolled && (
                <PageTitle title={title} isHomePage={true} />
            )}

            {/* Hero Section with Enhanced Layout */}
            <div className="container mx-auto px-4 py-8 md:py-16 lg:py-20">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center min-h-[70vh]">

                    {/* Right Side - Content (First on mobile, second on desktop) */}
                    <div className="order-1 lg:order-2 text-center lg:text-right space-y-6 lg:space-y-8">

                        {/* Welcome Message - Prominent and at the top */}
                        <div className="mb-6 lg:mb-8">
                            <h1 className="text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold text-green-800 leading-tight mb-4">
                                {title}
                            </h1>
                        </div>

                        {/* Doctor Name and Specialization - Now below welcome */}
                        {intro && (
                            <div className="space-y-4">
                                <h2 className="text-xl md:text-2xl lg:text-3xl xl:text-4xl font-bold text-gray-800 leading-tight">
                                    {intro.heading}
                                </h2>
                                
                                {/* Subtitle/Description */}
                                {intro.text && (
                                    <p className="text-lg md:text-xl lg:text-2xl text-gray-700 leading-relaxed max-w-3xl mx-auto lg:mx-0">
                                        {intro.text}
                                    </p>
                                )}
                            </div>
                        )}

                        {/* Dominant Logo */}
                        <div className="flex justify-center lg:justify-start py-4">
                            <img
                                src="/assets/images/logoSVG.svg"
                                alt="קשב פלוס לוגו"
                                className="h-20 md:h-28 lg:h-36 xl:h-44 w-auto drop-shadow-2xl hover:scale-105 transition-transform duration-500 filter brightness-110"
                            />
                        </div>

                        {/* Specialty Tags */}
                        {Array.isArray(listSec?.content) && (
                            <div className="space-y-4">
                                {listSec.heading && (
                                    <h3 className="text-lg md:text-xl font-semibold text-green-700">
                                        {listSec.heading}
                                    </h3>
                                )}
                                <div className="flex flex-wrap justify-center lg:justify-start gap-3">
                                    {listSec.content.map((item, idx) => (
                                        <span
                                            key={idx}
                                            className="bg-gradient-to-r from-green-100 to-green-200 text-green-800 px-4 py-2 rounded-full text-sm md:text-base font-medium shadow-sm hover:shadow-md transition-shadow duration-300"
                                        >
                                            {item}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* CTA Buttons */}
                        <div className="flex flex-col sm:flex-row justify-center lg:justify-start gap-4 pt-4">
                            {contactCta && (
                                <Link
                                    to="/contact"
                                    className={`inline-flex items-center justify-center gap-3 ${contactCta.bgColor || 'bg-green-700'} ${contactCta.textColor || 'text-white'} px-8 py-4 rounded-full shadow-lg font-semibold text-lg hover:scale-105 hover:shadow-xl transition-all duration-300 group`}
                                >
                                    {contactCta.heading}
                                    <img
                                        src="/assets/images/leafinverse.png"
                                        alt=""
                                        className="h-5 w-auto group-hover:rotate-12 transition-transform duration-300"
                                    />
                                </Link>
                            )}

                            {aboutCta && (
                                <Link
                                    to="/about"
                                    className={`inline-flex items-center justify-center gap-3 ${aboutCta.bgColor || 'bg-orange-500'} ${aboutCta.textColor || 'text-white'} px-8 py-4 rounded-full shadow-lg font-semibold text-lg hover:scale-105 hover:shadow-xl transition-all duration-300 group`}
                                >
                                    {aboutCta.heading}
                                    <img
                                        src="/assets/images/leaf.png"
                                        alt=""
                                        className="h-5 w-auto group-hover:rotate-12 transition-transform duration-300"
                                    />
                                </Link>
                            )}
                        </div>
                    </div>

                    {/* Left Side - Hero Image (Second on mobile, first on desktop) */}
                    {hero?.image && (
                        <div className="order-2 lg:order-1 flex justify-center items-center">
                            <div className="relative group">
                                <img
                                    src={hero.image}
                                    alt="רופא מומחה"
                                    className="w-full max-w-sm md:max-w-md lg:max-w-lg h-auto rounded-2xl shadow-2xl hover:scale-105 transition-transform duration-500"
                                />
                                {/* Decorative elements */}
                                <div className="absolute -top-4 -right-4 w-20 h-20 bg-green-200 rounded-full opacity-70 group-hover:scale-110 transition-transform duration-500"></div>
                                <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-orange-200 rounded-full opacity-70 group-hover:scale-110 transition-transform duration-500"></div>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* Additional sections with enhanced styling */}
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
                        className={`py-16 lg:py-20 ${index % 2 === 0 ? 'bg-gradient-to-r from-gray-50 to-green-50' : 'bg-gradient-to-r from-white to-orange-50'}`}
                    >
                        <div className="container mx-auto px-4">
                            <div className="max-w-4xl mx-auto text-center lg:text-right">
                                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-8 text-green-800 leading-tight">
                                    {section.heading}
                                </h2>
                                {section.text && (
                                    <p className="text-lg md:text-xl text-gray-700 leading-relaxed mb-10">
                                        {section.text}
                                    </p>
                                )}

                                {/* Content list items with enhanced styling */}
                                {Array.isArray(section.content) && (
                                    <ul className="mb-10 space-y-4 text-right max-w-2xl mx-auto lg:mx-0">
                                        {section.content.map((item, idx) => (
                                            <li key={idx} className="flex items-center justify-center lg:justify-start group">
                                                <span className="text-orange-500 ml-4 text-xl group-hover:scale-125 transition-transform duration-300">•</span>
                                                <span className="text-lg md:text-xl text-gray-800">{item}</span>
                                            </li>
                                        ))}
                                    </ul>
                                )}

                                {/* Section CTA buttons with enhanced styling */}
                                <div className="flex flex-col sm:flex-row justify-center lg:justify-start gap-4">
                                    <Link
                                        to="/contact"
                                        className="inline-flex items-center justify-center gap-3 bg-green-800 hover:bg-green-700 text-white px-8 py-4 rounded-full shadow-lg font-semibold text-lg hover:scale-105 hover:shadow-xl transition-all duration-300 group"
                                    >
                                        צור קשר לייעוץ
                                        <img
                                            src="/assets/images/leafinverse.png"
                                            alt=""
                                            className="h-4 w-auto group-hover:rotate-12 transition-transform duration-300"
                                        />
                                    </Link>

                                    <Link
                                        to="/about"
                                        className="inline-flex items-center justify-center gap-3 bg-orange-400 hover:bg-orange-500 text-white px-8 py-4 rounded-full shadow-lg font-semibold text-lg hover:scale-105 hover:shadow-xl transition-all duration-300 group"
                                    >
                                        קרא/י עוד
                                        <img
                                            src="/assets/images/leaf.png"
                                            alt=""
                                            className="h-4 w-auto group-hover:rotate-12 transition-transform duration-300"
                                        />
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                ))
            }
        </section>
    );
}