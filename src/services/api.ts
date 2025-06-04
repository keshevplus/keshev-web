// TypeScript declaration for Vite's import.meta.env
declare interface ImportMeta {
  readonly env: {
    readonly DEV: boolean;
    readonly PROD: boolean;
    readonly MODE: string;
    readonly VITE_DEV_ADMIN_EMAIL?: string;
    [key: string]: string | boolean | undefined;
  };
}

// In development, use the local proxy server to bypass CORS issues
const IS_DEV = import.meta.env.DEV;

// Local proxy server that forwards requests to the real API but bypasses CORS issues
const PROXY_URL = import.meta.env.VITE_PROXY_URL || 'http://localhost:3000/api';

// Choose API URL based on environment - proxy for dev, real API for production
export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL as string;
export const DEV_ADMIN_TOKEN = 'dev-admin-token-xyz'; // The token set by AuthContext for the dev admin

// Log API configuration on startup
console.log(`[API Config] Using API at: ${API_BASE_URL} (${IS_DEV ? 'Development' : 'Production'} mode)`);

// Export all services
export * from './services/PagesService';
export * from './services/ServicesService';
export * from './services/FormsService';
export * from './services/ContentService';
export * from './services/MessagesService';
export * from './services/LeadsService';
export * from './services/AuthService';
