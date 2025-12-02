import axios from 'axios';

const API_URL = 'http://localhost:5000';  // ← ENLEVEZ '/api/auth' d'ici

// Créer une instance axios avec la configuration par défaut
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Intercepteur pour ajouter le token aux requêtes
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Intercepteur pour gérer les erreurs
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API Error:', error.response?.status, error.response?.data || error.message);
    
    if (error.response && error.response.status === 401) {
      // Token expiré ou invalide
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export const authService = {
  // Test API connection
  testConnection: async () => {
    try {
      const response = await api.get('/api/auth/test');
      return response.data;
    } catch (error) {
      console.error('API test failed:', error);
      throw error;
    }
  },

  // Connexion avec Google
  loginWithGoogle: async (googleToken) => {
    try {
      console.log('Sending request to /api/auth/google...');
      
      const response = await api.post('/api/auth/google', { 
        token: googleToken 
      });
      
      console.log('Login response:', response.data);
      
      if (response.data.token) {
        // Stocker le token et les infos utilisateur
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('user', JSON.stringify(response.data.userInfo));
      }
      
      return response.data;
    } catch (error) {
      console.error('Google login error:', error);
      
      // Afficher plus de détails sur l'erreur
      if (error.response) {
        console.error('Response status:', error.response.status);
        console.error('Response data:', error.response.data);
      } else if (error.request) {
        console.error('No response received. Is Flask running?');
      }
      
      throw error;
    }
  },

  // Vérifier l'authentification
  verifyToken: async () => {
    try {
      const response = await api.get('/api/auth/verify');
      return response.data;
    } catch (error) {
      console.error('Token verification error:', error);
      // Nettoyer le localStorage si le token est invalide
      if (error.response && error.response.status === 401) {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
      }
      throw error;
    }
  },

  // Récupérer les infos de l'utilisateur connecté
  getCurrentUser: async () => {
    try {
      const response = await api.get('/api/auth/me');
      return response.data;
    } catch (error) {
      console.error('Get current user error:', error);
      throw error;
    }
  },

  // Déconnexion
  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    // Rediriger vers la page de login
    window.location.href = '/login';
  },

  // Vérifier si l'utilisateur est connecté
  isAuthenticated: () => {
    return !!localStorage.getItem('token');
  },

  // Récupérer le token
  getToken: () => {
    return localStorage.getItem('token');
  },

  // Récupérer les infos utilisateur
  getUser: () => {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  }
};