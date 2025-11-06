// context/AuthContext.js
import React, { createContext, useState, useContext, useEffect } from 'react';
import { authService } from '../services/AuthServices';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [client, setClient] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
// Fonction pour charger le profil
const loadProfile = async () => {
  try {
    const data = await authService.getProfile();
    setClient(data.client);
    return data.client;
  } catch (error) {
    console.error('Erreur chargement profil:', error);
    // Ne pas déconnecter ici, juste garder les données du localStorage
    const savedClient = authService.getCurrentClient();
    if (savedClient) {
      setClient(savedClient);
    }
    throw error;
  }
};

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
      }
    }
    setLoading(false);
  };

  initializeAuth();
}, []);

const updateProfile = async (profileData) => {
  try {
    setError(null);
    const data = await authService.updateProfile(profileData);
    setClient(data.client);
    return data;
  } catch (error) {
    setError(error.error || 'Erreur lors de la mise à jour du profil');
    throw error;
  }
};
const refreshProfile = async () => {
  try {
    const clientData = await loadProfile();
    return clientData;
  } catch (error) {
    throw error;
  }
};
  useEffect(() => {
    // Vérifier si l'utilisateur est déjà connecté au chargement
    const token = authService.getToken();
    const savedClient = authService.getCurrentClient();
    
    if (token && savedClient) {
      setClient(savedClient);
      
      // Vérifier la validité du token
      authService.getProfile()
        .then(data => {
          setClient(data.client);
        })
        .catch(() => {
          // Token invalide, déconnecter l'utilisateur
          authService.logout();
          setClient(null);
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  }, []);

  const login = async (email, password) => {
    try {
      setError(null);
      const data = await authService.login(email, password);
      setClient(data.client);
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
      return data;
    } catch (error) {
      setError(error.error || "Erreur lors de l'inscription");
      throw error;
    }
  };

  const logout = async () => {
    await authService.logout();
    setClient(null);
    setError(null);
  };

  const value = {
    client,
    login,
    register,
    logout,
    error,
    setError,
    loading,
    updateProfile,
    refreshProfile,
    isAuthenticated: !!client,
    isAdmin: client?.description === 'admin'
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};