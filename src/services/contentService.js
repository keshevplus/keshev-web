const API_URL = import.meta.env.DEV ? '/api' : 'https://api.keshevplus.co.il/api';

export default API_URL;

// Fetch page content by slug/endpoint
export async function getPageContent(page) {
  const res = await fetch(`${API_URL}/content/${page}`);
  if (!res.ok) {
    throw new Error(`Error fetching ${page} page content: ${res.statusText}`);
  }
  return await res.json();
}