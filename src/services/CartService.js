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

export const panierService = {
  baseURL: 'http://localhost:5000/api',
  getPanier: async () => {
    try {
      const response = await api.get('/panier/tous');
      const cartCount = response.data.count;
      
      // Mettre à jour le localStorage avec les nouvelles données

      
      return response.data;
    } catch (error) {
      // Si erreur d'authentification, déconnecter l'utilisateur
      throw error.response?.data || { error: 'Erreur lors de la récupération du panier' };
    }
  },// Ajouter un produit au panier
}