import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Intercepteur pour ajouter automatiquement le token JWT
// Dans api.js - modifier l'intercepteur pour utiliser le même token
api.interceptors.request.use(
  (config) => {
    // Essayer d'abord access_token, puis token comme fallback
    const token = localStorage.getItem('access_token') || localStorage.getItem('token');
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
  // Dans api.js - ajouter à produitService
  async rechercherProduits(terme, page = 1, perPage = 12, categorieId = null) {
    try {
      let url = `${API_BASE_URL}/produits/recherche?q=${encodeURIComponent(terme)}&page=${page}&per_page=${perPage}`;
      
      if (categorieId) {
        url += `&categorie_id=${categorieId}`;
      }
      
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error('Erreur lors de la recherche des produits');
      }
      return await response.json();
    } catch (error) {
      console.error('Erreur recherche:', error);
      throw error;
    }
  },
  // Récupérer tous les produits
  async getProduits(page = 1, perPage = 12) {
    try {
      const response = await fetch(`${API_BASE_URL}/produits?page=${page}&per_page=${perPage}`);
      if (!response.ok) {
        throw new Error('Erreur lors de la récupération des produits');
      }
      return await response.json();
    } catch (error) {
      console.error('Erreur:', error);
      throw error;
    }
  },

  // Récupérer tous les produits (sans pagination - pour l'admin)


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
  async deleteProduit(id) {
    try {
      const response = await fetch(`${API_BASE_URL}/produits/${id}`, {
        method: 'DELETE',
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Erreur lors de la suppression');
      }
      
      return await response.json();
    } catch (error) {
      console.error('Erreur suppression:', error);
      throw error;
    }
  },

  // NOUVELLE MÉTHODE : Modifier un produit
  async updateProduit(id, formData) {
    try {
      const response = await fetch(`${API_BASE_URL}/produits/${id}`, {
        method: 'PUT',
        body: formData, // FormData pour gérer les fichiers
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Erreur lors de la modification');
      }
      
      return await response.json();
    } catch (error) {
      console.error('Erreur modification:', error);
      throw error;
    }
  },
  // Méthode pour construire l'URL de l'image
  getImageUrl(imageFilename) {
    if (!imageFilename) return '/placeholder-image.jpg';
    return `${API_BASE_URL}/media/${imageFilename}`;
  }
};

export const panierAPI = {
  baseURL: 'http://localhost:5000/api',
  getPanier: async () => {
    try {
      const response = await api.get('/panier/tous');
      const clientData = response.data.count;
      
      // Mettre à jour le localStorage avec les nouvelles données
      localStorage.setItem('client', JSON.stringify(clientData));
      
      return response.data;
    } catch (error) {
      // Si erreur d'authentification, déconnecter l'utilisateur
      throw error.response?.data || { error: 'Erreur lors de la récupération du panier' };
    }
  },
  
// Dans panierAPI, modifiez la fonction makeAuthenticatedRequest
async makeAuthenticatedRequest(url, options = {}) {
  // CORRECTION: Utiliser le même token que l'intercepteur axios
  const token = localStorage.getItem('token') || localStorage.getItem('access_token');
  
  console.log('Token utilisé dans la requête:', token);
  
  if (!token) {
    throw new Error('Token d\'accès non trouvé');
  }

  const headers = {
    'Content-Type': 'application/json',
    ...options.headers,
  };
  
  // CORRECTION: S'assurer que l'Authorization est bien formatée
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const config = {
    method: options.method || 'GET',
    headers: headers,
    body: options.body
  };

  try {
    console.log('Envoi de la requête à:', `${this.baseURL}${url}`);
    const response = await fetch(`${this.baseURL}${url}`, config);
    
    console.log('Statut de la réponse:', response.status);
    
    if (!response.ok) {
      const errorText = await response.text();
      console.log('Réponse erreur:', errorText);
      throw new Error(`Erreur ${response.status}: ${errorText}`);
    }

    return response;
  } catch (error) {
    console.error('Erreur API complète:', error);
    throw error;
  }
},
};
export default api;