import { Link } from 'react-router-dom';
import { useNavItems } from './Navbar';
import { useCmsTranslations } from '../hooks/useCmsTranslations';

export default function Footer() {
  const navItems = useNavItems();
  const { t } = useCmsTranslations();
  const phone = t('contact.phone', '055-27-399-27');
  const email = t('contact.email', 'office@keshevplus.co.il');

  return (
    <footer className="bg-gray-800 text-white py-6">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Column 1: Copyright and credits */}
          <div className="text-center md:text-right">
            <p className="text-lg font-semibold mb-1">
              {t('footer.rights', '© 2025 All rights reserved to Keshev Plus').replace('2025', new Date().getFullYear().toString())}
            </p>
            <p className="text-sm text-gray-300">
              נבנה על ידי aloncode
            </p>
          </div>

          {/* Column 2: Navigation links */}
          <div className="md:text-right">
            <h3 className="text-xl font-bold mb-2">{t('footer.quick_links', 'תפריט ניווט')}</h3>
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
            <h3 className="text-xl font-bold mb-2">{t('footer.contact_info', 'פרטי התקשרות')}</h3>
            <div className="flex flex-wrap justify-center md:justify-end gap-x-6">
              <Link
                to={`tel:${phone.replace(/-/g, '')}`}
                className="text-sm md:text-base text-white hover:text-orange-400 transition-colors"
              >
                {phone}
              </Link>
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
            {t('footer.accessibility_statement', 'הצהרת נגישות')}
          </Link>
          <Link to="/privacy-policy" className="text-sm text-gray-300 hover:text-orange-400 transition-colors">
            {t('footer.privacy_policy', 'מדיניות פרטיות')}
          </Link>
          <Link to="/terms-of-use" className="text-sm text-gray-300 hover:text-orange-400 transition-colors">
            {t('footer.terms_of_use', 'תנאי שימוש')}
          </Link>
        </div>
      </div>
    </footer>
  );
}
