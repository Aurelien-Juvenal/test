import React, { useState,useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.js';
import { panierAPI, produitAPI } from '../services/api';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { produitService } from '../services/api';
import { useAuth } from '../context/Authentification';

import { 
  faStore, 
  faHome, 
  faBox, 
  faShoppingCart, 
  faUser, 
  faSignInAlt, 
  faSignOutAlt,
  faCog,
  faSearch,
  faInfoCircle,
  faEnvelope,
  faShoppingBag,
  faCheck,
  faTimes,
  faStar
} from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';




function Produit() {
   

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
    const [panierItems, setPanierItems] = useState([]);
    const ajouterAuPanier = async () => {
      try {
        const produitPanier = {
            produit_id: produits.id,
            nom_produit: produits.nom,
            prix: produits.prix,
            quantite: 1
        };

        const response = await panierAPI.makeAuthenticatedRequest('http://localhost:5000/api/panier/ajouter', {
            method: 'POST',
            body: JSON.stringify(produitPanier),
        });

        const data = await response.json();
        
        if (response.ok) {
            alert('Produit ajouté au panier avec succès!');
            // Vous pouvez aussi mettre à jour un compteur de panier global ici
        } else {
            alert('Erreur: ' + data.message);
        }
    } catch (error) {
        console.error('Erreur lors de l\'ajout au panier:', error);
        alert('Erreur lors de l\'ajout au panier');
    }
  };
  
    const [formData, setFormData] = useState({
      nom: '',
      descrition: '',
      image: '',
      prix: ''
    });
  

    
    const { client, logout, isAuthenticated } = useAuth();   
    if (loading) return <div className="loading">Chargement des produits...</div>;
    if (error) return <div className="error">Erreur: {error}</div>;

  
  
  return (
    <div className="min-h-screen bg-dark-100 py-8">   
  
            <div class="row">
                {produits.map(produit => (
                    
                    <div class="col-lg-3 col-md-6 col-sm-12">
                    <div class="card product-card">
                        <div class="product-image navy-bg">
                            <img src={produitService.getImageUrl(produit.image)}/>
                        </div>
                        <div class="card-body">
                            <h5 class="card-title fw-bold">{produit.nom}</h5>
                            <p class="price">{produit.prix}MGA</p>
                            <p class="card-text text-muted">Premium sound quality with noise cancellation</p>
                            <input type="text"  value={produit.id} name="" id="id" hidden />
                           
                            <div class="timer d-flex">
                            <FontAwesomeIcon icon={faStar} />
                            <FontAwesomeIcon icon={faStar} />
                            <FontAwesomeIcon icon={faStar} />
                            <FontAwesomeIcon icon={faStar} />
                            <FontAwesomeIcon icon={faStar} />
                            </div>
                            
                            
                            <div class="action-buttons">
                                <button type='submit' class="btn btn-add-cart flex-grow-1" onClick={() => ajouterAuPanier(produit)}  >
                                <FontAwesomeIcon icon={faShoppingCart} />Ajouter au panier
                                </button>
                          
                            </div>
                        </div>
                    </div>
                    
                </div>
                ))}
            </div>
                    
                
    </div>

  );
}

export default Produit;