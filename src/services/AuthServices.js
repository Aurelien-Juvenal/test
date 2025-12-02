// services/authService.js
import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

// Configuration d'axios
const api = axios.create({
  baseURL: API_URL,
});

// Intercepteur pour ajouter le token aux requêtes
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('access_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export const authService = {
  getCartCount: async () => {
    try {
      const response = await api.get('/panier');
      
      if (response.data.success) {
        return {
          count: response.data.total_count || 0,
          success: true
        };
      } else {
        throw new Error(response.data.message || 'Erreur inconnue');
      }
    } catch (error) {
      console.error('Erreur récupération compteur panier:', error);
      
      // Si erreur 401 (non authentifié), retourner 0 sans erreur
      if (error.response?.status === 401) {
        return { count: 0, success: false };
      }
      
      throw {
        error: error.response?.data?.error || 'Erreur lors de la récupération du panier',
        status: error.response?.status
      };
    }
  },

  // NOUVELLE MÉTHODE : Récupérer le panier complet
  getCart: async () => {
    try {
      const response = await api.get('/panier');
      return response.data;
    } catch (error) {
      console.error('Erreur récupération panier:', error);
      
      if (error.response?.status === 401) {
        return { success: false, items: [], total_count: 0, total_price: 0 };
      }
      
      throw error;
    }
  },
  // Connexion
  login: async (email, password) => {
    try {
      const response = await api.post('/login', { email, password });
      
      if (response.data.access_token) {
        localStorage.setItem('access_token', response.data.access_token);
        localStorage.setItem('client', JSON.stringify(response.data.client));
      }
      
      return response.data;
    } catch (error) {
      throw error.response?.data || { error: 'Erreur de connexion' };
    }
  },

  // Inscription
  register: async (clientData) => {
    try {
      const response = await api.post('/register', clientData);
      
      if (response.data.access_token) {
        localStorage.setItem('access_token', response.data.access_token);
        localStorage.setItem('client', JSON.stringify(response.data.client));
      }
      
      return response.data;
    } catch (error) {
      throw error.response?.data || { error: "Erreur lors de l'inscription" };
    }
  },

  // Déconnexion
  logout: async () => {
    try {
      await api.post('/logout');
    } catch (error) {
      console.error('Erreur lors de la déconnexion:', error);
    } finally {
      localStorage.removeItem('access_token');
      localStorage.removeItem('client');
    }
  },

  // Récupérer le profil
   
   getProfile: async () => {
    try {
      const response = await api.get('/profil');
      const clientData = response.data.client;
      
      
      
      // Mettre à jour le localStorage avec les nouvelles données
      localStorage.setItem('client', JSON.stringify(clientData));
      
      return response.data;
    } catch (error) {
      // Si erreur d'authentification, déconnecter l'utilisateur
      if (error.response?.status === 401) {
        authService.logout();
      }
      throw error.response?.data || { error: 'Erreur lors de la récupération du profil' };
    }
  },

   // Mettre à jour le profil
   updateProfile: async (profileData) => {
    try {
      const response = await api.put('/auth/profile', profileData);
      const clientData = response.data.client;
      
      // Mettre à jour le localStorage
      localStorage.setItem('client', JSON.stringify(clientData));
      
      return response.data;
    } catch (error) {
      throw error.response?.data || { error: 'Erreur lors de la mise à jour du profil' };
    }
  },

  // Rafraîchir les données du client
  refreshClientData: async () => {
    try {
      const response = await api.get('/auth/profile');
      const clientData = response.data.client;
      localStorage.setItem('client', JSON.stringify(clientData));
      return clientData;
    } catch (error) {
      throw error;
    }
  },
  // Vérifier si l'utilisateur est connecté
  isAuthenticated: () => {
    return !!localStorage.getItem('access_token');
  },

  // Récupérer les informations du client
  getCurrentClient: () => {
    const clientStr = localStorage.getItem('client');
    return clientStr ? JSON.parse(clientStr) : null;
  },

  // Récupérer le token
  getToken: () => {
    return localStorage.getItem('access_token');
  }
};