import { Link } from 'react-router-dom';
import { useNavItems } from './Navbar';
import { useTranslations } from '../hooks/useTranslations';

export default function Footer() {
  const navItems = useNavItems();
  const { t } = useTranslations();
  const phone = t('keshevweb.contactInfo.phone');
  const email = t('keshevweb.contactInfo.email');

  return (
    <footer className="bg-gray-800 text-white py-6">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Column 1: Copyright and credits */}
          <div className="text-center md:text-right">
            <p className="text-lg font-semibold mb-1">
              &copy; {new Date().getFullYear()} {t('keshevweb.footer.copyright')}
            </p>
            <p className="text-sm text-gray-300">
              {t('keshevweb.footer.credit')}
            </p>
          </div>

          {/* Column 2: Navigation links */}
          <div className="md:text-right">
            <h3 className="text-xl font-bold mb-2">{t('keshevweb.footer.navHeading')}</h3>
            <nav aria-label="Footer navigation">
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-x-3 gap-y-1 text-right">
                {navItems.filter(item => !item.mobileOnly).map((item) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    className="text-sm md:text-base text-white hover:text-orange-400 transition-colors py-1"
                  >
                    {item.text}
                  </Link>
                ))}
              </div>
            </nav>
          </div>

          {/* Column 3: Contact info */}
          <div className="md:text-right">
            <h3 className="text-xl font-bold mb-2">{t('keshevweb.footer.contactHeading')}</h3>
            <div className="flex flex-wrap justify-center md:justify-end gap-x-6">
              <Link
                to={`tel:${phone}`}
                className="text-sm md:text-base text-white hover:text-orange-400 transition-colors"
              >
                {t('keshevweb.footer.phoneLabel')} {phone}
              </Link>
              {t('keshevweb.footer.emailLabel')}
              <Link
                to={`mailto:${email}`}
                className="text-sm md:text-base text-white hover:text-orange-400 transition-colors"
              >
                {email}
              </Link>
            </div>
          </div>

        </div>

        <div className="border-t border-gray-700 mt-4 pt-4 flex flex-wrap justify-center gap-x-6 gap-y-1">
          <Link to="/accessibility" className="text-sm text-gray-300 hover:text-orange-400 transition-colors">
            {t('keshevweb.footer.accessibilityLink')}
          </Link>
          <Link to="/privacy-policy" className="text-sm text-gray-300 hover:text-orange-400 transition-colors">
            {t('keshevweb.footer.privacyLink')}
          </Link>
          <Link to="/terms-of-use" className="text-sm text-gray-300 hover:text-orange-400 transition-colors">
            {t('keshevweb.footer.termsLink')}
          </Link>
        </div>
      </div>
    </footer>
  );
}
