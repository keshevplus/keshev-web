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
          w-full
          flex-col
          overflow-x-hidden
        "
            >
                {Children.map(children, (child, idx) => (
                    <section key={idx} className="w-full">
                        {child}
                    </section>
                ))}
            </main>
            <Footer />
        </>
    );
}
