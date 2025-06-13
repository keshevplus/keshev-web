import { ReactNode, Children } from 'react';
import Navbar from '../layouts/Navbar';
import Footer from '../layouts/Footer';

export default function Layout({ children }: { children: ReactNode }) {
    return (
        <>
            <Navbar />
            <main
                className="
          mx-auto
          flex 
          touch-pan-x 
          snap-x snap-mandatory 
          scrollbar-hide
        "
            >
                {Children.map(children, (child, idx) => (
                    <section key={idx} className="snap-start flex-shrink-0 w-full">
                        {child}
                    </section>
                ))}
            </main>
            <Footer />
        </>
    );
}
