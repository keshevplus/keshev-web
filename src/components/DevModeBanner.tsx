import { useState } from 'react';
import { IoClose, IoWarningOutline } from 'react-icons/io5';

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
  const [dismissed, setDismissed] = useState(false);

  if (dismissed || !shouldShowDevBanner()) {
    return null;
  }

  return (
    <div
      className="fixed bottom-0 left-0 right-0 z-[99999] flex items-center justify-center gap-3 bg-orange-500 px-4 py-2 text-center text-xs font-extrabold text-orange-950 shadow-[0_-2px_8px_rgba(0,0,0,0.15)] sm:text-sm"
      role="status"
      aria-live="polite"
      dir="rtl"
      data-testid="banner-dev-environment"
    >
      <IoWarningOutline className="h-4 w-4 shrink-0" aria-hidden="true" />
      <span>
        סביבת פיתוח (dev) - לא אתר הייצור · Development environment - do not use with real data
      </span>
      <button
        type="button"
        onClick={() => setDismissed(true)}
        className="shrink-0 rounded-full p-1 hover:bg-orange-600/40"
        aria-label="Dismiss"
        data-testid="button-dismiss-dev-banner"
      >
        <IoClose className="h-4 w-4" />
      </button>
    </div>
  );
}
