// Constants used throughout the application

// Determine environment to select appropriate API URL
const IS_DEV = import.meta.env.DEV;

// Bare origin of the keshevplus platform API. Individual call sites append
// their own path (e.g. `${API_URL}/api/contact`).
export const API_URL = import.meta.env.VITE_API_BASE_URL || (IS_DEV
  ? 'http://localhost:5000'
  : 'https://api.keshevplus.com');

// Where visitors are sent for anything admin-related; the admin dashboard
// lives entirely on the keshevplus platform, not in this frontend.
export const ADMIN_DASHBOARD_URL = import.meta.env.VITE_ADMIN_DASHBOARD_URL || 'https://admin.keshevplus.com';
