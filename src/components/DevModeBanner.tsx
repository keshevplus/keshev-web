function shouldShowDevBanner() {
  if (import.meta.env.VITE_SHOW_DEV_BANNER === 'true') {
    return true;
  }

  if (typeof window === 'undefined') {
    return false;
  }

  const hostname = window.location.hostname.toLowerCase();

  return (
    hostname === 'dev.keshevplus.co.il' ||
    hostname.includes('-git-dev-') ||
    hostname.includes('keshev-web-git-dev') ||
    hostname.startsWith('localhost') ||
    hostname === '127.0.0.1'
  );
}

export default function DevModeBanner() {
  if (!shouldShowDevBanner()) {
    return null;
  }

  return (
    <div
      className="dev-mode-banner"
      role="status"
      aria-live="polite"
      dir="rtl"
    >
      סביבת פיתוח - זהו אתר בדיקות, לא אתר הייצור
    </div>
  );
}
