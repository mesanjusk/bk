const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://bk-vdkf.onrender.com/api';

async function request(path, { method = 'GET', body, token } = {}) {
  const headers = {};
  if (body) headers['Content-Type'] = 'application/json';
  if (token) headers.Authorization = `Bearer ${token}`;

  const response = await fetch(`${API_URL}${path}`, {
    method,
    headers,
    body: body ? JSON.stringify(body) : undefined,
  });

  if (!response.ok) {
    const data = await response.json().catch(() => ({}));
    throw new Error(data.error || `Request failed: ${response.status}`);
  }

  if (response.status === 204) return null;
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

export function fetchScholarById(id) {
  return request(`/scholars/${id}`);
}

export function submitContactMessage(payload) {
  return request('/contact', { method: 'POST', body: payload });
}

export function login(username, password) {
  return request('/auth/login', { method: 'POST', body: { username, password } });
}

export function createScholar(payload, token) {
  return request('/scholars', { method: 'POST', body: payload, token });
}

export function updateScholar(id, payload, token) {
  return request(`/scholars/${id}`, { method: 'PUT', body: payload, token });
}

export function deleteScholar(id, token) {
  return request(`/scholars/${id}`, { method: 'DELETE', token });
}

export function fetchStories() {
  return request('/stories');
}

export function fetchStoryById(id, token) {
  return request(`/stories/${id}`, { token });
}

export function createStory(payload, token) {
  return request('/stories', { method: 'POST', body: payload, token });
}

export function updateStory(id, payload, token) {
  return request(`/stories/${id}`, { method: 'PUT', body: payload, token });
}

export function deleteStory(id, token) {
  return request(`/stories/${id}`, { method: 'DELETE', token });
}

export function fetchSettings() {
  return request('/settings');
}

export function updateSettings(payload, token) {
  return request('/settings', { method: 'PUT', body: payload, token });
}

export async function uploadImage(file, token) {
  const formData = new FormData();
  formData.append('image', file);

  const response = await fetch(`${API_URL}/uploads`, {
    method: 'POST',
    headers: { Authorization: `Bearer ${token}` },
    body: formData,
  });

  if (!response.ok) {
    const data = await response.json().catch(() => ({}));
    throw new Error(data.error || `Upload failed: ${response.status}`);
  }

  return response.json();
}
