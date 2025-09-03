import { useEffect, useState } from 'react';
import { login as doLogin, fetchMe } from '../services/auth';
import { AuthContext } from './AuthContext';

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    async function init() {
      try {
        if (token) {
          const me = await fetchMe();
          setUser(me);
        }
      } catch {
        // token inválido
        localStorage.removeItem('accessToken');
      } finally {
        setLoading(false);
      }
    }
    init();
  }, []);

  async function login(credentials) {
    await doLogin(credentials);
    const me = await fetchMe();
    setUser(me);
  }

  function logout() {
    localStorage.removeItem('accessToken');
    setUser(null);
  }

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
}
