import { SiWhatsapp } from 'react-icons/si';
import { useWidgetSettings } from '../hooks/useWidgetSettings';

// Same clinic WhatsApp number used throughout the site (055-27-399-27).
const CLINIC_WHATSAPP = '972552739927';

export default function WhatsAppButton() {
  const { showWhatsApp } = useWidgetSettings();
  if (!showWhatsApp) return null;

  return (
    <a
      href={`https://wa.me/${CLINIC_WHATSAPP}`}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="שלחו הודעה בוואטסאפ"
      className="fixed bottom-5 left-5 z-[9999] w-12 h-12 rounded-full bg-[#25D366] text-white shadow-lg hover:scale-110 transition-transform duration-200 flex items-center justify-center"
    >
      <SiWhatsapp className="w-6 h-6" />
    </a>
  );
}
