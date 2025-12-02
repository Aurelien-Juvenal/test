// context/AuthContext.js
import React, { createContext, useState, useContext, useEffect } from 'react';
import { authService } from '../services/AuthServices';

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [client, setClient] = useState(null);
  const [cartCount, setCartCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fonction pour récupérer le compteur du panier
  const fetchCartCount = async () => {
    try {
      const data = await authService.getCartCount();
      setCartCount(data.count || 0);
      return data.count;
    } catch (error) {
      console.error('Erreur récupération compteur panier:', error);
      setCartCount(0);
      return 0;
    }
  };

  // Fonction pour charger le profil
  const loadProfile = async () => {
    try {
      const data = await authService.getProfile();
      setClient(data.client);
      
      // Récupérer le compteur du panier après le profil
      await fetchCartCount();
      
      return data.client;
    } catch (error) {
      console.error('Erreur chargement profil:', error);
      // En cas d'erreur, utiliser les données sauvegardées
      const savedClient = authService.getCurrentClient();
      if (savedClient) {
        setClient(savedClient);
      }
      throw error;
    }
  };

  // UN SEUL useEffect pour l'initialisation
  useEffect(() => {
    const initializeAuth = async () => {
      const token = authService.getToken();
      const savedClient = authService.getCurrentClient();
      
      if (token && savedClient) {
        setClient(savedClient);
        
        // Essayer de rafraîchir les données depuis l'API
        try {
          await loadProfile();
        } catch (error) {
          console.warn('Impossible de rafraîchir le profil, utilisation des données sauvegardées');
          // Essayer quand même de récupérer le compteur
          await fetchCartCount();
        }
      }
      setLoading(false);
    };

    initializeAuth();
  }, []);

  const login = async (email, password) => {
    try {
      setError(null);
      const data = await authService.login(email, password);
      setClient(data.client);
      // Après login, charger le profil pour avoir le cartCount
      await loadProfile();
      return data;
    } catch (error) {
      setError(error.error || 'Erreur de connexion');
      throw error;
    }
  };

  const register = async (clientData) => {
    try {
      setError(null);
      const data = await authService.register(clientData);
      setClient(data.client);
      // Après register, charger le profil pour avoir le cartCount
      await loadProfile();
      return data;
    } catch (error) {
      setError(error.error || "Erreur lors de l'inscription");
      throw error;
    }
  };

  const logout = async () => {
    await authService.logout();
    setClient(null);
    setCartCount(0); // Réinitialiser le compteur
    setError(null);
  };

  const refreshProfile = async () => {
    try {
      const clientData = await loadProfile();
      return clientData;
    } catch (error) {
      throw error;
    }
  };

  // Fonction pour mettre à jour manuellement le compteur
  const updateCartCount = (newCount) => {
    setCartCount(newCount);
  };

  // Fonction pour rafraîchir le compteur
  const refreshCartCount = async () => {
    return await fetchCartCount();
  };

  const value = {
    client,
    cartCount,
    login,
    register,
    logout,
    error,
    setError,
    loading,
    refreshProfile,
    updateCartCount,
    refreshCartCount,
    isAuthenticated: !!client,
    isAdmin: client?.description === 'admin'
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};