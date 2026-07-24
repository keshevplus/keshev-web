// Constants used throughout the application.

const IS_DEV = import.meta.env.DEV;

// Main KeshevPlus platform/admin surface. The .co.il frontend shares content,
// forms, scheduling, chat, and CMS data through the API rewrite below.
export const PLATFORM_URL = (import.meta.env.VITE_PLATFORM_URL || 'https://admin.keshevplus.com').replace(/\/$/, '');

// Bare origin of the KeshevPlus platform API. Individual call sites append
// their own path (e.g. `${API_URL}/api/contact`). In deployed builds the
// app always uses same-origin so Vercel can proxy /api without CORS.
export const API_URL = (IS_DEV
  ? (import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000')
  : '').replace(/\/$/, '');

// Where visitors are sent for anything admin-related; the admin dashboard
// lives entirely on the KeshevPlus platform, not in this frontend.
export const ADMIN_DASHBOARD_URL = (import.meta.env.VITE_ADMIN_DASHBOARD_URL || 'https://admin.keshevplus.com').replace(/\/$/, '');
