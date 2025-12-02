// contexts/CartContext.js
import React, { createContext, useContext, useState, useEffect } from 'react';
import { panierService } from '../services/CartService';
import { panierAPI } from '../services/api';



const CartContext = createContext();

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

export const CartProvider = ({ children }) => {
  const [cartCount, setCartCount] = useState(0);
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Vérifier si l'utilisateur est connecté
  const isAuthenticated = () => {
    return !!localStorage.getItem('authToken');
  };

  // Récupérer le nombre d'articles dans le panier
  const fetchCartCount = async () => {
    if (!isAuthenticated()) {
      setCartCount(0);
      return;
    }

    try {
      setLoading(true);
      const response = await panierService.getPanier();
      if (response.success) {
        setCartCount(response.count);
      }
    } catch (err) {
      console.error('Erreur lors du chargement du panier:', err);
      setError(err.response?.data?.message || 'Erreur de chargement du panier');
    } finally {
      setLoading(false);
    }
  };

  // Récupérer le panier complet
  const fetchCart = async () => {
    if (!isAuthenticated()) {
      setCartItems([]);
      return;
    }

    try {
      setLoading(true);
      const response = await panierAPI.getPanier();
      if (response.success) {
        setCartItems(response.items);
        setCartCount(response.total_count);
      }
    } catch (err) {
      console.error('Erreur lors du chargement du panier:', err);
      setError(err.response?.data?.message || 'Erreur de chargement du panier');
    } finally {
      setLoading(false);
    }
  };

  // Ajouter au panier
  const addToCart = async (produitId, quantite = 1) => {
    if (!isAuthenticated()) {
      setError('Veuillez vous connecter pour ajouter au panier');
      return false;
    }

    try {
      const response = await panierAPI.ajouter(produitId, quantite);
      if (response.success) {
        setCartCount(response.count);
        await fetchCart(); // Recharger les détails du panier
        return true;
      }
      return false;
    } catch (err) {
      setError(err.response?.data?.message || 'Erreur lors de l\'ajout au panier');
      return false;
    }
  };

  // Supprimer du panier
  const removeFromCart = async (panierId) => {
    try {
      const response = await panierAPI.supprimer(panierId);
      if (response.success) {
        setCartCount(response.count);
        setCartItems(prev => prev.filter(item => item.id !== panierId));
        return true;
      }
      return false;
    } catch (err) {
      setError(err.response?.data?.message || 'Erreur lors de la suppression');
      return false;
    }
  };

  // Rafraîchir le panier quand l'authentification change
  useEffect(() => {
    fetchCartCount();
    fetchCart();
  }, []);

  const value = {
    cartCount,
    cartItems,
    loading,
    error,
    addToCart,
    removeFromCart,
    refreshCart: fetchCart,
    refreshCartCount: fetchCartCount,
    clearError: () => setError(null)
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};