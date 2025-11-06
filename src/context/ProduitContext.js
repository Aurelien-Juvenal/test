// context/ProduitContext.js
import React, { createContext, useContext, useReducer, useCallback } from 'react';
import ProduitService from '../services/ProduitService';

const ProduitContext = createContext();

const produitReducer = (state, action) => {
  switch (action.type) {
    case 'SET_LOADING':
      return { ...state, loading: action.payload };
    case 'SET_PRODUITS':
      return { 
        ...state, 
        produits: action.payload.produits,
        total: action.payload.total,
        page: action.payload.page,
        pages: action.payload.pages,
        loading: false 
      };
    case 'SET_PRODUIT':
      return { ...state, currentProduit: action.payload, loading: false };
    case 'ADD_PRODUIT':
      return { 
        ...state, 
        produits: [action.payload, ...state.produits],
        total: state.total + 1
      };
    case 'UPDATE_PRODUIT':
      return {
        ...state,
        produits: state.produits.map(p =>
          p.id === action.payload.id ? action.payload : p
        ),
        currentProduit: action.payload
      };
    case 'DELETE_PRODUIT':
      return {
        ...state,
        produits: state.produits.filter(p => p.id !== action.payload),
        total: state.total - 1
      };
    case 'SET_FILTERS':
      return { ...state, filters: { ...state.filters, ...action.payload } };
    case 'SET_ERROR':
      return { ...state, error: action.payload, loading: false };
    default:
      return state;
  }
};

const initialState = {
  produits: [],
  currentProduit: null,
  loading: false,
  error: null,
  total: 0,
  page: 1,
  pages: 1,
  filters: {
    search: '',
    categorie_id: '',
    fournisseur_id: '',
    actif: true
  }
};

export const ProduitProvider = ({ children }) => {
  const [state, dispatch] = useReducer(produitReducer, initialState);

  const getProduits = useCallback(async (filters = {}) => {
    dispatch({ type: 'SET_LOADING', payload: true });
    try {
      const params = { ...state.filters, ...filters };
      const data = await ProduitService.getProduits(params);
      dispatch({ type: 'SET_PRODUITS', payload: data });
      dispatch({ type: 'SET_FILTERS', payload: filters });
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: error.message });
    }
  }, [state.filters]);

  const getProduit = useCallback(async (id) => {
    dispatch({ type: 'SET_LOADING', payload: true });
    try {
      const data = await ProduitService.getProduit(id);
      dispatch({ type: 'SET_PRODUIT', payload: data });
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: error.message });
    }
  }, []);

  const createProduit = async (produitData) => {
    dispatch({ type: 'SET_LOADING', payload: true });
    try {
      const data = await ProduitService.createProduit(produitData);
      dispatch({ type: 'ADD_PRODUIT', payload: data.produit });
      return data;
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: error.message });
      throw error;
    }
  };

  const updateProduit = async (id, produitData) => {
    dispatch({ type: 'SET_LOADING', payload: true });
    try {
      const data = await ProduitService.updateProduit(id, produitData);
      dispatch({ type: 'UPDATE_PRODUIT', payload: data.produit });
      return data;
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: error.message });
      throw error;
    }
  };

  const deleteProduit = async (id) => {
    dispatch({ type: 'SET_LOADING', payload: true });
    try {
      await ProduitService.deleteProduit(id);
      dispatch({ type: 'DELETE_PRODUIT', payload: id });
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: error.message });
      throw error;
    }
  };

  const updateStock = async (id, stock) => {
    try {
      const data = await ProduitService.updateStock(id, stock);
      // Recharger la liste pour mettre à jour les stocks
      await getProduits();
      return data;
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: error.message });
      throw error;
    }
  };

  const clearError = () => {
    dispatch({ type: 'SET_ERROR', payload: null });
  };

  const clearCurrentProduit = () => {
    dispatch({ type: 'SET_PRODUIT', payload: null });
  };

  return (
    <ProduitContext.Provider value={{
      ...state,
      getProduits,
      getProduit,
      createProduit,
      updateProduit,
      deleteProduit,
      updateStock,
      clearError,
      clearCurrentProduit
    }}>
      {children}
    </ProduitContext.Provider>
  );
};

export const useProduit = () => {
  const context = useContext(ProduitContext);
  if (!context) {
    throw new Error('useProduit must be used within a ProduitProvider');
  }
  return context;
};