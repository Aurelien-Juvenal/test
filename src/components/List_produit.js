// components/ProduitList.js
// src/components/ProduitList.js
import React, { useState, useEffect } from 'react';
import { produitService } from '../services/api';
import '../css/ProduitList.css'

const ProduitList = () => {
  const [produits, setProduits] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    chargerProduits();
  }, []);

  const chargerProduits = async () => {
    try {
      setLoading(true);
      const data = await produitService.getProduits();
      setProduits(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="loading">Chargement des produits...</div>;
  if (error) return <div className="error">Erreur: {error}</div>;

  return (
    <div className="produit-list">
      <h2>Liste des Produits</h2>
      <div className="produits-grid">
        {produits.map(produit => (
          <div key={produit.id} className="produit-card">
            <div className="produit-image">
              <img 
                src={produitService.getImageUrl(produit.image)} 
                alt={produit.nom}
                onError={(e) => {
                  e.target.src = '/placeholder-image.jpg';
                }}
              />
            </div>
            <div className="produit-info">
              <h3>{produit.nom}</h3>
              <p className="reference">Réf: {produit.reference}</p>
              <p className="description">{produit.description}</p>
              <div className="prix-stock">
                <span className="prix">{produit.prix} €</span>
                <span className={`stock ${produit.stock <= produit.stock_alerte ? 'stock-faible' : ''}`}>
                  Stock: {produit.stock}
                </span>
              </div>
              {produit.stock <= produit.stock_alerte && (
                <div className="alerte">Stock faible!</div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProduitList;