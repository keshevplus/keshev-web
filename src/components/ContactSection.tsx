import { Link } from 'react-router-dom';
import { useCmsTranslations } from '../hooks/useCmsTranslations';

export default function ContactSection() {
  const { t } = useCmsTranslations();
  const address = t('contact.address_line1', 'יגאל אלון 94, תל אביב');
  const wazeLink = `https://waze.com/ul?q=${encodeURIComponent(address)}&navigate=yes`;
  const googleMapsLink = `https://maps.google.com/?q=${encodeURIComponent(address)}`;

  return (
    <section id="contact" className="w-full bg-gray-50 rtl">
      <div className="max-w-6xl mx-auto px-4 py-10 md:py-14">
        <div className="text-center mb-10">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-green-800">
            {t('nav.contact', 'יצירת קשר')}
          </h2>
          <p className="text-base sm:text-lg text-gray-600 mt-2 max-w-2xl mx-auto">
            {t('contact.subtitle', 'השאירו פרטים ונחזור אליכם בהקדם האפשרי')}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start">
          <Link
            to="/contact"
            className="block bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow"
          >
            <p className="text-sm text-gray-500 text-center pb-3">
              {t('contact.click_to_open_form', 'לחצו לפתיחת טופס יצירת קשר')}
            </p>
            <div className="space-y-3">
              {[
                t('contact.name_placeholder', 'הכניסו את שמכם המלא'),
                t('contact.phone_placeholder', 'מספר טלפון'),
                t('contact.email_optional', 'דוא"ל (אופציונלי)'),
              ].map((placeholder) => (
                <div
                  key={placeholder}
                  className="h-12 rounded-md border border-gray-300 bg-gray-50 flex items-center px-3 text-gray-400 text-sm"
                >
                  {placeholder}
                </div>
              ))}
              <div className="h-20 rounded-md border border-gray-300 bg-gray-50 flex items-start px-3 pt-3 text-gray-400 text-sm">
                {t('contact.message_placeholder', 'ספרו לנו במה נוכל לעזור...')}
              </div>
            </div>
            <div className="mt-4 w-full min-h-[48px] bg-green-700 hover:bg-green-800 rounded-lg text-white font-bold flex items-center justify-center transition-colors">
              {t('contact.send_message', 'שליחת הודעה')}
            </div>
          </Link>

          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-green-800 text-center">
              {t('contact.details_title', 'פרטי התקשרות')}
            </h3>

            <div className="space-y-4 text-center">
              <div className="flex flex-col items-center gap-2">
                <p className="font-bold text-xl text-gray-900">{t('contact.address_label', 'כתובת:')}</p>
                <p className="text-green-800 font-bold text-lg leading-tight">{address}</p>
                <p className="text-green-800 font-bold text-lg leading-tight">
                  {t('contact.address_line2', 'מגדלי אלון 1, קומה 12, משרד 1202')}
                </p>
              </div>

              <div className="flex flex-col items-center gap-1">
                <p className="font-bold text-xl text-gray-900">{t('contact.email_label', 'דוא"ל:')}</p>
                <a href="mailto:dr@keshevplus.co.il" className="text-green-700 font-bold text-lg hover:underline">
                  dr@keshevplus.co.il
                </a>
              </div>

              <div className="flex flex-col items-center gap-1">
                <p className="font-bold text-xl text-gray-900">{t('contact.phone_label', 'טלפון')}</p>
                <a href="tel:055-27-399-27" className="text-gray-900 font-bold text-lg hover:underline">
                  055-27-399-27
                </a>
              </div>
            </div>

            <div className="pt-2 flex flex-wrap justify-center gap-3">
              <a
                href={wazeLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 max-w-[180px] flex items-center justify-center px-4 py-2 bg-[#33CCFF] text-white rounded-lg font-bold hover:opacity-90 transition-opacity min-h-[44px]"
              >
                Waze
              </a>
              <a
                href={googleMapsLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 max-w-[180px] flex items-center justify-center px-4 py-2 bg-[#4285F4] text-white rounded-lg font-bold hover:opacity-90 transition-opacity min-h-[44px]"
              >
                Google Maps
              </a>
            </div>
          </div>
        </div>

        <div className="mt-12 aspect-video w-full rounded-2xl overflow-hidden border shadow-inner">
          <iframe
            src={`https://maps.google.com/maps?q=${encodeURIComponent(address)}&t=&z=16&ie=UTF8&iwloc=&output=embed`}
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Clinic Location Map"
          />
        </div>
      </div>
    </section>
  );
}
