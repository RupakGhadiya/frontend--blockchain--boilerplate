import { useAuthStore } from '@/state/authStore';

type Method = 'GET' | 'POST' | 'PUT' | 'DELETE';

interface RequestOptions {
  method?: Method;
  headers?: HeadersInit;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  body?: any;
  auth?: boolean;
}

const BASE_URL = import.meta.env.VITE_API_URL || 'https://jsonplaceholder.typicode.com';


export async function apiClient<T>(
  url: string,
  options: RequestOptions = {}
): Promise<T> {
  const { method = 'GET', body, headers = {}, auth = false } = options;
  const fullUrl = `${BASE_URL}${url}`;

  const token = useAuthStore.getState().token;

  const allHeaders: HeadersInit = {
    'Content-Type': 'application/json',
    ...(auth && token ? { Authorization: `Bearer ${token}` } : {}),
    ...headers,
  };

  const response = await fetch(fullUrl, {
    method,
    headers: allHeaders,
    ...(body && { body: JSON.stringify(body) }),
  });

  // Handle HTTP errors
  if (!response.ok) {
    const status = response.status;

    let errorBody;
    try {
      errorBody = await response.json();
    } catch {
      errorBody = { message: 'Unexpected error from server' };
    }

    const errorMessage = errorBody?.message || 'Unknown error';

    // change error handling logic as per need 
    // Handle token expiration or unauthorized
    if (status === 401) {
      useAuthStore.getState().clearAuth();
      window.location.href = '/login'; // or use a redirect function
      throw new Error('Unauthorized: Please login again.');
    }

    // Handle other status-specific errors
    if (status === 403) {
      throw new Error('Forbidden: You do not have access.');
    }

    if (status === 500) {
      throw new Error('Internal server error. Please try later.');
    }

    throw new Error(errorMessage);
  }

  // Parse and return JSON
  try {
    return await response.json();
  } catch {
    throw new Error('Invalid response format');
  }
}
