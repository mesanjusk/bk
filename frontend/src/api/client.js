const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

async function request(path) {
  const response = await fetch(`${API_URL}${path}`);
  if (!response.ok) {
    throw new Error(`Request failed: ${response.status}`);
  }
  return response.json();
}

export function fetchScholars() {
  return request('/scholars');
}

export function fetchScholarsByYear(year) {
  return request(`/scholars/year/${year}`);
}

export function fetchYears() {
  return request('/scholars/years');
}

export async function submitContactMessage(payload) {
  const response = await fetch(`${API_URL}/contact`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  if (!response.ok) {
    const data = await response.json().catch(() => ({}));
    throw new Error(data.error || 'Failed to send message.');
  }
  return response.json();
}
