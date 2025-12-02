// src/hooks/useAuth.js
import { useState, useEffect } from 'react';
import axios from 'axios';

export const useAuth = () => {
  const [user, setUser] = useState(null);
  const [client, setClient] = useState(null);
  const [loading, setLoading] = useState(true);
  const [cartCount, setCartCount] = useState(0);
  const api = axios.create({
    baseURL: 'http://localhost:5000/api',
  });
  useEffect(() => {
    const token = localStorage.getItem('jwt_token');
    if (token) {
      verifyToken();
    } else {
      setLoading(false);
    }
  }, []);

  const verifyToken = async () => {
    try {
      const response = await api.get('/api/protected');
      setUser(response.data.user);
      
      // Si le client existe, récupérer son profil complet
      if (response.data.user.client_id) {
        const clientResponse = await api.get('/api/client/profile');
        setClient(clientResponse.data.client);
      }
    } catch (error) {
      localStorage.removeItem('jwt_token');
    } finally {
      setLoading(false);
    }
  };

  const login_google = (token, userInfo) => {
    localStorage.setItem('jwt_token', token);
    setUser(userInfo);
    if (userInfo.client) {
      setClient(userInfo.client);
    }
  };

  const logout = () => {
    localStorage.removeItem('jwt_token');
    setUser(null);
    setClient(null);
  };

  return {
    user,
    client,
    loading,
    login_google,
    logout,
    isAuthenticated: !!user,
    isAdmin: user?.is_admin || false
  };
};