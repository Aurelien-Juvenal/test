import React, { useState,useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.js';
import { produitAPI } from '../services/api';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import  image1 from '../images/sans-bg/image1.png';
import  image2 from '../images/sans-bg/image2.jpg';
import { produitService } from '../services/api';
import { useAuth } from '../context/AuthContext';
import '../css/produit.css';
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
   
    const [formData, setFormData] = useState({
      nom: '',
      descrition: '',
      image: '',
      prix: ''
    });
  
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
                                <button type='submit' class="btn btn-add-cart flex-grow-1">
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