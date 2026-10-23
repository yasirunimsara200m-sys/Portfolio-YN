const API_URL = process.env.NEXT_PUBLIC_API_URL || '/api';

export function getAuthToken(): string | null {
  if (typeof window !== 'undefined') {
    return localStorage.getItem('portfolio_token');
  }
  return null;
}

export function setAuthToken(token: string) {
  if (typeof window !== 'undefined') {
    localStorage.setItem('portfolio_token', token);
  }
}

export function removeAuthToken() {
  if (typeof window !== 'undefined') {
    localStorage.removeItem('portfolio_token');
  }
}

export async function fetchApi(endpoint: string, options: RequestInit = {}) {
  const token = getAuthToken();
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...(options.headers as Record<string, string>),
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  // Ensure clean path resolution whether API_URL is absolute ('https://...') or relative ('/api')
  let cleanEndpoint = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;
  let url: string;

  if (API_URL.startsWith('http://') || API_URL.startsWith('https://')) {
    url = `${API_URL.replace(/\/$/, '')}${cleanEndpoint}`;
  } else {
    // Relative route for direct Vercel Serverless API execution
    const base = API_URL.replace(/\/$/, '');
    url = cleanEndpoint.startsWith(base) ? cleanEndpoint : `${base}${cleanEndpoint}`;
  }

  try {
    const res = await fetch(url, {
      ...options,
      headers,
    });

    if (!res.ok) {
      const errorData = await res.json().catch(() => ({ message: res.statusText }));
      throw new Error(errorData.message || `Request failed with status ${res.status}`);
    }

    return await res.json();
  } catch (error: any) {
    console.warn(`API call notice on ${endpoint}:`, error.message || error);
    throw error;
  }
}
