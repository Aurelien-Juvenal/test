// App.js
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.js';
import '../css/panier.css'
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
    faSun,
    faMoon,
    faWineGlass,
    faSignOut,
    faTimes,
    faQuestionCircle,
    faTruck,
    faShieldAlt,
    faLock
    
  } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


function Panier() {
  return (
    <div className="">

    <header class="header">
        <div class="container">
            <nav class="navbar">
                <div class="nav-brand">
                    <h1><FontAwesomeIcon icon={faShoppingBag} /> E-Shop</h1>
                </div>
                <div class="nav-links">
                    <a href="/" class="nav-link"><FontAwesomeIcon icon={faHome}  /> Accueil</a>
                    <a href="/boutique" class="nav-link"><FontAwesomeIcon icon={faStore} />Boutique</a>
                    <a href="/panier" class="nav-link active">
                    <FontAwesomeIcon icon={faShoppingCart} />Panier
                        <span id="cart-count" class="cart-count">0</span>
                    </a>
                    <a href="/compte" class="nav-link"><FontAwesomeIcon icon={faUser} /> Mon Compte</a>
                </div>
            </nav>
        </div>
    </header>

    <main class="main">
        <div class="container">
            
            <div class="page-header">
                <h1><FontAwesomeIcon icon={faShoppingCart} /> Mon Panier</h1>
                <p>Gérez vos articles et passez à la caisse</p>
            </div>

            
            <div class="cart-layout">
                
                <div class="cart-items-section">
                   
                    <div id="empty-cart" class="empty-cart hidden">
                        <div class="empty-icon">
                        <FontAwesomeIcon icon={faShoppingCart} />
                        </div>
                        <h2>Votre panier est vide</h2>
                        <p>Découvrez nos produits et ajoutez-les à votre panier</p>
                        <a href="/boutique" class="btn btn-primary">
                        <FontAwesomeIcon icon={faStore} />Découvrir la boutique
                        </a>
                    </div>

                    
                    <div id="cart-items" class="cart-items">
                        <div class="cart-header">
                            <h3>Articles dans votre panier</h3>
                            <span id="items-count">0 articles</span>
                        </div>

                        <div id="cart-items-list" class="cart-items-list">
                            
                        </div>
                    </div>
                </div>

                
                <div class="cart-summary-section">
                    <div class="cart-summary">
                        <h3>Récapitulatif</h3>
                        
                        <div class="summary-details">
                            <div class="summary-row">
                                <span>Sous-total</span>
                                <span id="subtotal">0,00 €</span>
                            </div>
                            <div class="summary-row">
                                <span>Frais de livraison</span>
                                <span id="shipping">0,00 €</span>
                            </div>
                            <div class="summary-row">
                                <span>Remise</span>
                                <span id="discount">-0,00 €</span>
                            </div>
                            <div class="summary-divider"></div>
                            <div class="summary-row total">
                                <strong>Total TTC</strong>
                                <strong id="total">0,00 €</strong>
                            </div>
                        </div>

                        <div class="shipping-info">
                        <FontAwesomeIcon icon={faTruck} />
                            <span>Livraison gratuite à partir de 50€ d'achat</span>
                        </div>

                        <button id="checkout-btn" class="btn btn-primary btn-checkout" disabled>
                        <FontAwesomeIcon icon={faLock} /> Procéder au paiement
                        </button>

                        <div class="security-info">
                        <FontAwesomeIcon icon={faShieldAlt} />
                            <span>Paiement sécurisé SSL</span>
                        </div>
                    </div>

                    
                    <div class="promo-code">
                        <h4>Code promo</h4>
                        <div class="promo-input-group">
                            <input 
                                type="text" 
                                id="promo-code" 
                                placeholder="Entrez votre code promo"
                                class="promo-input"
                            />
                            <button id="apply-promo" class="btn btn-outline">Appliquer</button>
                        </div>
                        <div id="promo-message" class="promo-message"></div>
                    </div>
                </div>
            </div>

            
            <section class="recommended-section">
                <h2>Vous aimerez aussi</h2>
                <div class="recommended-products">
                    
                </div>
            </section>
        </div>
    </main>
   </div>
  );
}

export default Panier;