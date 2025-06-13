// Constants used throughout the application

// Determine environment to select appropriate API URL
const IS_DEV = import.meta.env.DEV;

// API URL based on environment
export const API_URL = import.meta.env.VITE_API_BASE_URL || (IS_DEV 
  ? 'http://localhost:3001/api' 
  : 'https://api.keshevplus.co.il/api');

// Log API configuration on startup
console.log(`[API Config] Using API at: ${API_URL} (${IS_DEV ? 'Development' : 'Production'} mode)`);