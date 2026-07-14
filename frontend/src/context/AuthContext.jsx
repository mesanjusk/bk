'use client';

import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { login as loginRequest } from '../api/client.js';

const AuthContext = createContext(null);
const STORAGE_KEY = 'mita_admin_token';

export function AuthProvider({ children }) {
  const [token, setToken] = useState(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setToken(localStorage.getItem(STORAGE_KEY));
    setReady(true);
  }, []);

  async function login(username, password) {
    const { token: newToken } = await loginRequest(username, password);
    localStorage.setItem(STORAGE_KEY, newToken);
    setToken(newToken);
  }

  function logout() {
    localStorage.removeItem(STORAGE_KEY);
    setToken(null);
  }

  const value = useMemo(
    () => ({ token, isAuthenticated: Boolean(token), ready, login, logout }),
    [token, ready]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
