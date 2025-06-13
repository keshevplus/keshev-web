import { useState, useEffect, useRef, memo } from 'react';
import Home from './Home';
import About from './About';
import Services from './Services';
import ADHD from './ADHD';
import Diagnosis from './Diagnosis';
import Forms from './Forms';
import Contact from './Contact';
import { FiArrowLeft, FiArrowRight } from 'react-icons/fi';
import { useDispatch } from 'react-redux';
import { setIsScrolled } from '../store/sharedStateSlice';

// Define the pages to include in the horizontal swipe
const pages = [
    { id: 'home', component: Home, title: 'בית' },
    { id: 'about', component: About, title: 'אודות' },
    { id: 'services', component: Services, title: 'שירותים' },
    { id: 'adhd', component: ADHD, title: 'ADHD' },
    { id: 'diagnosis', component: Diagnosis, title: 'אבחון' },
    { id: 'forms', component: Forms, title: 'שאלונים' },
    { id: 'contact', component: Contact, title: 'צור קשר' },
];

// Memoize the page components to prevent unnecessary re-renders
const MemoizedPageComponent = memo(({ PageComponent }: { PageComponent: React.ComponentType }) => {
    return <PageComponent />;
});

export default function SpaPage() {
    const [currentPageIndex, setCurrentPageIndex] = useState(0);
    const [touchStartX, setTouchStartX] = useState(0);
    const [isTransitioning, setIsTransitioning] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);
    const dispatch = useDispatch();

    // Set RTL direction when component mounts
    useEffect(() => {
        document.documentElement.dir = 'rtl';

        // Reset scroll position when component mounts
        window.scrollTo(0, 0);

        // Reset isScrolled when SpaPage mounts
        dispatch(setIsScrolled(false));

        return () => {
            // Clean up when component unmounts
            setIsTransitioning(false);
        };
    }, [dispatch]);

    // Handle touch events for swiping with better performance
    const handleTouchStart = (e: React.TouchEvent) => {
        setTouchStartX(e.touches[0].clientX);
    };

    const handleTouchEnd = (e: React.TouchEvent) => {
        const touchEndX = e.changedTouches[0].clientX;
        const difference = touchStartX - touchEndX;

        // In RTL mode, swiping left (negative difference) shows previous page
        if (difference < -75 && currentPageIndex > 0) {
            navigateToPage(currentPageIndex - 1);
        }
        // In RTL mode, swiping right (positive difference) shows next page
        else if (difference > 75 && currentPageIndex < pages.length - 1) {
            navigateToPage(currentPageIndex + 1);
        }
    };

    // Handle keyboard navigation
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'ArrowLeft' && currentPageIndex < pages.length - 1) {
                navigateToPage(currentPageIndex + 1); // In RTL, left arrow moves to next page
            } else if (e.key === 'ArrowRight' && currentPageIndex > 0) {
                navigateToPage(currentPageIndex - 1); // In RTL, right arrow moves to previous page
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [currentPageIndex]);

    // Improved navigation with scroll reset and smoother transitions
    const navigateToPage = (index: number) => {
        if (isTransitioning) return;

        setIsTransitioning(true);
        setCurrentPageIndex(index);

        // Reset scroll position on page change
        window.scrollTo(0, 0);

        // Reset isScrolled when changing pages
        dispatch(setIsScrolled(false));

        // Reset transition state after animation completes
        setTimeout(() => {
            setIsTransitioning(false);
        }, 500);
    };

    // Generate navigation dots with improved accessibility
    const renderNavigationDots = () => {
        return (
            <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-50 flex space-x-2 rtl:space-x-reverse bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full shadow-lg">
                {pages.map((page, index) => (
                    <button
                        key={page.id}
                        onClick={() => navigateToPage(index)}
                        className={`w-10 h-3 rounded-full transition-all duration-300 ${currentPageIndex === index
                            ? 'bg-green-600 scale-125'
                            : 'bg-gray-300 hover:bg-gray-400'
                            }`}
                        aria-label={`עבור לדף ${page.title}`}
                        aria-current={currentPageIndex === index ? 'page' : undefined}
                    />
                ))}
            </div>
        );
    };

    // Render navigation arrows with improved accessibility
    const renderNavigationArrows = () => {
        return (
            <>
                {currentPageIndex > 0 && (
                    <button
                        onClick={() => navigateToPage(currentPageIndex - 1)}
                        className="fixed top-1/2 right-4 transform -translate-y-1/2 z-50 bg-white/90 backdrop-blur-sm p-3 rounded-full shadow-lg hover:bg-green-100 transition-colors"
                        aria-label="הדף הקודם"
                    >
                        <FiArrowRight className="text-green-800 text-2xl" />
                    </button>
                )}

                {currentPageIndex < pages.length - 1 && (
                    <button
                        onClick={() => navigateToPage(currentPageIndex + 1)}
                        className="fixed top-1/2 left-4 transform -translate-y-1/2 z-50 bg-white/90 backdrop-blur-sm p-3 rounded-full shadow-lg hover:bg-green-100 transition-colors"
                        aria-label="הדף הבא"
                    >
                        <FiArrowLeft className="text-green-800 text-2xl" />
                    </button>
                )}
            </>
        );
    };

    return (
        <div
            className="spa-container h-screen w-screen overflow-hidden"
            ref={containerRef}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
        >
            {/* Page title indicator */}
            <div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 bg-green-800 text-white px-6 py-2 rounded-full shadow-lg text-lg font-bold transition-all duration-300 hover:bg-green-700">
                {pages[currentPageIndex].title}
            </div>

            {/* Navigation dots */}
            {renderNavigationDots()}

            {/* Navigation arrows */}
            {renderNavigationArrows()}

            {/* Page content with improved transition effect for RTL */}
            <div
                className="transition-all duration-500 ease-in-out h-full w-full"
                style={{
                    transform: `translateX(${currentPageIndex * -100}%)`, // Negative for RTL direction
                }}
            >
                {/* Render all pages in a row with proper RTL direction */}
                <div className="flex flex-row-reverse h-full" style={{ width: `${pages.length * 100}%` }}>
                    {pages.map((page, index) => {
                        const PageComponent = page.component;
                        return (
                            <div
                                key={page.id}
                                className="h-full overflow-y-auto"
                                style={{ width: `${100 / pages.length}%` }}
                            >
                                {/* Only render current page and adjacent pages to improve performance */}
                                {Math.abs(index - currentPageIndex) <= 1 && (
                                    <MemoizedPageComponent PageComponent={PageComponent} />
                                )}
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}