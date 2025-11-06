import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Intercepteur pour ajouter automatiquement le token JWT
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

export const itemsAPI = {
  getAll: () => api.get('/client'),
  getById: (id) => api.get(`/client/${id}`),
  create: (data) => api.post('/clien', data),
  update: (id, data) => api.put(`/client/${id}`, data),
  delete: (id) => api.delete(`/client/${id}`),
};
export const produitAPI = {
  getAll: () => api.get('/produits'),
  getById: (id) => api.get(`/produits/${id}`),
  create: (data) => api.post('/produits', data),
  update: (id, data) => api.put(`/produits/${id}`, data),
  delete: (id) => api.delete(`/produits/${id}`),
};
export const profilAPI = {
  // Récupérer les données du profil
  getProfil: async () => {
    try {
      const response = await api.get('/profil');
      return response.data;
    } catch (error) {
      throw error;
    }
  },
};
export const createProduit = (formData) => api.post('/produits', formData, {
  headers: {
    'Content-Type': 'multipart/form-data'
  }
});
export const getProduits = () => api.get('/produits');

export const produitService = {
  // Récupérer tous les produits
  async getProduits() {
    try {
      const response = await fetch(`${API_BASE_URL}/produits`);
      if (!response.ok) {
        throw new Error('Erreur lors de la récupération des produits');
      }
      return await response.json();
    } catch (error) {
      console.error('Erreur:', error);
      throw error;
    }
  },

  // Récupérer un produit par ID
  async getProduit(id) {
    try {
      const response = await fetch(`${API_BASE_URL}/produits/${id}`);
      if (!response.ok) {
        throw new Error('Produit non trouvé');
      }
      return await response.json();
    } catch (error) {
      console.error('Erreur:', error);
      throw error;
    }
  },

  // Méthode pour construire l'URL de l'image
  getImageUrl(imageFilename) {
    if (!imageFilename) return '/placeholder-image.jpg';
    return `${API_BASE_URL}/media/${imageFilename}`;
  }
};

export default api;