// context/PanierContext.js
import React, { createContext, useContext, useReducer, useEffect } from 'react';
import axios from 'axios';

const PanierContext = createContext();

const panierReducer = (state, action) => {
  switch (action.type) {
    case 'SET_PANIER':
      return { ...state, items: action.payload, loading: false };
    case 'AJOUTER_ITEM':
      return { ...state, items: [...state.items, action.payload] };
    case 'MODIFIER_QUANTITE':
      return {
        ...state,
        items: state.items.map(item =>
          item.produit.id === action.payload.produitId
            ? { ...item, quantite: action.payload.quantite }
            : item
        )
      };
    case 'SUPPRIMER_ITEM':
      return {
        ...state,
        items: state.items.filter(item => item.produit.id !== action.payload)
      };
    case 'SET_LOADING':
      return { ...state, loading: action.payload };
    case 'VIDER_PANIER':
      return { ...state, items: [] };
    default:
      return state;
  }
};

export const PanierProvider = ({ children }) => {
  const [state, dispatch] = useReducer(panierReducer, {
    items: [],
    loading: true
  });

  const chargerPanier = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('/api/panier', {
        headers: { Authorization: `Bearer ${token}` }
      });
      dispatch({ type: 'SET_PANIER', payload: response.data });
    } catch (error) {
      console.error('Erreur chargement panier:', error);
      dispatch({ type: 'SET_PANIER', payload: [] });
    }
  };

  const ajouterAuPanier = async (produitId= 1, quantite = 1) => {
    try {
      const token = localStorage.getItem('token');
      await axios.post('/api/panier', 
        { produit_id: produitId, quantite },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      await chargerPanier(); // Recharger le panier
    } catch (error) {
      console.error('Erreur ajout panier:', error);
      throw error;
    }
  };

  const modifierQuantite = async (produitId, quantite) => {
    try {
      const token = localStorage.getItem('token');
      await axios.put(`/api/panier/${produitId}`, 
        { quantite },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      await chargerPanier();
    } catch (error) {
      console.error('Erreur modification quantité:', error);
      throw error;
    }
  };

  const supprimerDuPanier = async (produitId) => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`/api/panier/${produitId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      await chargerPanier();
    } catch (error) {
      console.error('Erreur suppression panier:', error);
      throw error;
    }
  };

  const calculerTotal = () => {
    return state.items.reduce((total, item) => {
      return total + (item.produit.prix * item.quantite);
    }, 0);
  };

  useEffect(() => {
    chargerPanier();
  }, []);

  return (
    <PanierContext.Provider value={{
      items: state.items,
      loading: state.loading,
      ajouterAuPanier,
      modifierQuantite,
      supprimerDuPanier,
      calculerTotal,
      rechargerPanier: chargerPanier
    }}>
      {children}
    </PanierContext.Provider>
  );
};

export const usePanier = () => {
  const context = useContext(PanierContext);
  if (!context) {
    throw new Error('usePanier must be used within a PanierProvider');
  }
  return context;
};