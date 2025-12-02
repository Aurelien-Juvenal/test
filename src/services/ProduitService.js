// services/produitService.js
import axios from 'axios';

const API_URL = 'http://localhost:5000/api/produits';

class ProduitService {
  // Récupérer tous les produits avec filtres
  async getProduits(params = {}) {
    try {
      const response = await axios.get(API_URL, { params });
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  }
  async deleteProduit(id) {
    try {
      const response = await axios.delete(`${API_URL}/${id}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  }

  // Récupérer un produit par ID
  async getProduit(id) {
    try {
      const response = await axios.get(`${API_URL}/${id}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  }

  // Créer un nouveau produit
  async createProduit(produitData) {
    try {
      const formData = new FormData();
      
      // Ajouter les champs texte
      Object.keys(produitData).forEach(key => {
        if (key !== 'image') {
          formData.append(key, produitData[key]);
        }
      });
      
      // Ajouter le fichier image si présent
      if (produitData.image) {
        formData.append('image', produitData.image);
      }

      const response = await axios.post(API_URL, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  }

  // Modifier un produit
  async updateProduit(id, produitData) {
    try {
      const formData = new FormData();
      
      Object.keys(produitData).forEach(key => {
        if (key !== 'image') {
          formData.append(key, produitData[key]);
        }
      });
      
      if (produitData.image) {
        formData.append('image', produitData.image);
      }

      const response = await axios.put(`${API_URL}/${id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  }

  // Supprimer un produit


  // Mettre à jour le stock
  async updateStock(id, stock) {
    try {
      const response = await axios.patch(`${API_URL}/${id}/stock`, { stock });
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  }
}

export default new ProduitService();