import { Link } from 'react-router-dom';
import PageTitle from '../layouts/PageTitle';
import { useTranslations } from '../hooks/useTranslations';

function parseJsonList(value: string): string[] {
    try {
        return JSON.parse(value);
    } catch {
        return [];
    }
}

export default function AccessibilityPage() {
    const { t } = useTranslations();
    const phone = t('keshevweb.contactInfo.phone');
    const email = t('keshevweb.contactInfo.email');
    const whatsapp = t('keshevweb.contactInfo.whatsapp');
    const adaptations = parseJsonList(t('keshevweb.a11yStatement.adaptations.items'));
    const menuItems = parseJsonList(t('keshevweb.a11yStatement.menu.items'));

    return (
        <>
            <PageTitle title={t('keshevweb.a11yStatement.title')} />

            <div className="accessibility-statement container mx-auto px-4 py-8 bg-gray-50" dir="rtl">
                <h2 className="text-4xl font-bold text-center mb-8 text-green-700">{t('keshevweb.a11yStatement.title')}</h2>
                <p className="text-lg mb-6 leading-relaxed" dangerouslySetInnerHTML={{ __html: t('keshevweb.a11yStatement.commitment.text') }} />

                <h2 className="text-2xl font-semibold mb-4 text-green-600">{t('keshevweb.a11yStatement.adaptations.heading')}</h2>
                <ul className="list-disc pl-5 mb-6 text-lg leading-relaxed">
                    {adaptations.map((item) => <li key={item}>{item}</li>)}
                </ul>

                <h2 className="text-2xl font-semibold mb-4 text-green-600">{t('keshevweb.a11yStatement.menu.heading')}</h2>
                <p className="text-lg mb-4 leading-relaxed">
                    {t('keshevweb.a11yStatement.menu.intro')}
                </p>
                <ul className="list-disc pl-5 mb-6 text-lg leading-relaxed">
                    {menuItems.map((item) => <li key={item}>{item}</li>)}
                </ul>

                <h2 className="text-2xl font-semibold mb-4 text-green-600">{t('keshevweb.a11yStatement.contact.heading')}</h2>
                <p className="text-lg mb-4 leading-relaxed">
                    {t('keshevweb.a11yStatement.contact.intro')}
                </p>
                <ul className="list-disc pl-5 mb-6 text-lg leading-relaxed">
                    <li>{t('keshevweb.a11yStatement.contact.addressLabel')} {t('keshevweb.contactInfo.address')}</li>
                    <li>{t('keshevweb.a11yStatement.contact.phoneLabel')} <Link to={`tel:${phone.replace(/-/g, '')}`} className="text-blue-500 hover:underline">{phone}</Link></li>
                    <li>{t('keshevweb.a11yStatement.contact.emailLabel')} <Link to={`mailto:${email}`} className="text-blue-500 hover:underline">{email}</Link></li>
                    <li>{t('keshevweb.a11yStatement.contact.whatsappLabel')} <Link to={`https://wa.me/${whatsapp}`} className="text-blue-500 hover:underline">{t('keshevweb.a11yStatement.contact.whatsappLinkText')}</Link></li>
                </ul>

                <h2 className="text-2xl font-semibold mb-4 text-green-600">{t('keshevweb.a11yStatement.lastUpdated.heading')}</h2>
                <p className="text-lg leading-relaxed">
                    {t('keshevweb.a11yStatement.lastUpdated.prefix')} <strong>{t('keshevweb.a11yStatement.lastUpdated.date')}</strong>.
                </p>
            </div>
        </>
    );
}