import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { sectionKeyForPath } from '../../lib/sectionSlugs';

export default function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    // Section routes (/, /about, /services, ...) render the homepage and
    // scroll themselves to the matching anchor - resetting to (0,0) here
    // would fight that.
    if (sectionKeyForPath(pathname)) return;
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}
