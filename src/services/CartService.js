// src/services/panierService.js
const API_BASE_URL = 'http://localhost:5000/api';

export const panierService = {
  // Ajouter un produit au panier
  async ajouterAuPanier(produitId, quantite = 1) {
    try {
      const response = await fetch(`${API_BASE_URL}/panier/ajouter`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          produit_id: produitId,
          quantite: quantite
        }),
        credentials: 'include' // Important pour les sessions
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Erreur lors de l\'ajout au panier');
      }

      return await response.json();
    } catch (error) {
      console.error('Erreur:', error);
      throw error;
    }
  },

  // Récupérer le panier
  async getPanier() {
    try {
      const response = await fetch(`${API_BASE_URL}/panier`, {
        credentials: 'include'
      });
      if (!response.ok) {
        throw new Error('Erreur lors de la récupération du panier');
      }
      return await response.json();
    } catch (error) {
      console.error('Erreur:', error);
      throw error;
    }
  },

  // Supprimer un item du panier
  async supprimerDuPanier(itemId) {
    try {
      const response = await fetch(`${API_BASE_URL}/panier/${itemId}`, {
        method: 'DELETE',
        credentials: 'include'
      });
      if (!response.ok) {
        throw new Error('Erreur lors de la suppression du panier');
      }
      return await response.json();
    } catch (error) {
      console.error('Erreur:', error);
      throw error;
    }
  },

  // Récupérer le nombre d'items dans le panier
  async getPanierCount() {
    try {
      const response = await fetch(`${API_BASE_URL}/panier/count`, {
        credentials: 'include'
      });
      if (!response.ok) {
        throw new Error('Erreur lors de la récupération du count panier');
      }
      return await response.json();
    } catch (error) {
      console.error('Erreur:', error);
      throw error;
    }
  }
};