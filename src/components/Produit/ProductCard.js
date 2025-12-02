import React, { useState, useRef, useEffect } from 'react';
import { 
    faHeart, 
    faChevronLeft, 
    faChevronRight,
    faSearch,
    faShoppingCart,
    faTimes
} from '@fortawesome/free-solid-svg-icons';
import { useAuth } from '../../context/Authentification';
import { produitService } from '../../services/api';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import EmailSender from './EmailSender';
import { ProduitStyle } from './produitStyle';


function ProductCard() {
  const [produits, setProduits] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [recherche, setRecherche] = useState('');
  const [enRecherche, setEnRecherche] = useState(false);
  const [pagination, setPagination] = useState({
    page: 1,
    per_page: 12,
    total: 0,
    pages: 0,
    has_next: false,
    has_prev: false
  });
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    chargerProduits(1);
  }, []);

  const chargerProduits = async (page = 1) => {
    try {
      setLoading(true);
      const data = await produitService.getProduits(page, 12);
      setProduits(data.produits);
      setPagination(data.pagination);
      setEnRecherche(false);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const effectuerRecherche = async (page = 1) => {
    if (!recherche.trim()) {
      chargerProduits(1);
      return;
    }

    try {
      setLoading(true);
      const data = await produitService.rechercherProduits(recherche, page, 12);
      setProduits(data.produits);
      setPagination(data.pagination);
      setEnRecherche(true);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleRechercheSubmit = (e) => {
    e.preventDefault();
    effectuerRecherche(1);
  };

  const reinitialiserRecherche = () => {
    setRecherche('');
    chargerProduits(1);
  };

  const changerPage = (nouvellePage) => {
    if (nouvellePage >= 1 && nouvellePage <= pagination.pages) {
      if (enRecherche && recherche.trim()) {
        effectuerRecherche(nouvellePage);
      } else {
        chargerProduits(nouvellePage);
      }
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // Fonction ajouterAuPanier (inchangée)
  const ajouterAuPanier = async (produit) => {
    if (!isAuthenticated) {
      alert('Veuillez vous connecter pour ajouter des articles au panier');
      return;
    }

    try {
      const produitPanier = {
        produit_id: produit.id,
        quantite: 1
      };

      const token = localStorage.getItem('token') || localStorage.getItem('access_token');
      
      if (!token) {
        throw new Error('Token non trouvé - Veuillez vous reconnecter');
      }

      const response = await fetch('http://localhost:5000/api/panier/ajouter', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(produitPanier)
      });

      const result = await response.json();

      if (response.ok) {
        alert('✅ ' + (result.message || 'Produit ajouté au panier avec succès!'));
        
        if (window.refreshCartCount) {
          window.refreshCartCount();
        }
      } else {
        throw new Error(result.error || result.message || `Erreur ${response.status}`);
      }
      
    } catch (error) {
      console.error('❌ Erreur lors de l\'ajout au panier:', error);
      alert('❌ Erreur: ' + error.message);
    }
  };

  // Composant de recherche
  const BarreRecherche = () => (
    
    <div className="search-container mb-4">
      <form onSubmit={handleRechercheSubmit} className="search-form">
        <div className="search-input-group">
          <input
            type="text"
            className="search-input"
            placeholder="Rechercher un produit..."
            value={recherche}
            onChange={(e) => setRecherche(e.target.value)}
          />
          <button type="submit" className="search-btn">
            <FontAwesomeIcon icon={faSearch} />
          </button>
          {recherche && (
            <button 
              type="button" 
              className="clear-search-btn"
              onClick={reinitialiserRecherche}
            >
              <FontAwesomeIcon icon={faTimes} />
            </button>
          )}
        </div>
      </form>
      {enRecherche && (
        <div className="search-info">
          <span>
            Résultats pour "{recherche}" - {pagination.total} produit(s) trouvé(s)
          </span>
          <button 
            className="btn-clear-search"
            onClick={reinitialiserRecherche}
          >
            Afficher tous les produits
          </button>
        </div>
      )}
    </div>
  );

  // Composant Pagination (inchangé)
  const Pagination = () => {
    // ... (le code de pagination reste inchangé)
    if (pagination.pages <= 1) return null;

    const pages = [];
    const maxVisiblePages = 5;
    
    let startPage = Math.max(1, pagination.page - Math.floor(maxVisiblePages / 2));
    let endPage = Math.min(pagination.pages, startPage + maxVisiblePages - 1);
    
    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    if (pagination.has_prev) {
      pages.push(
        <button
          key="prev"
          className="page-btn"
          onClick={() => changerPage(pagination.page - 1)}
        >
          <FontAwesomeIcon icon={faChevronLeft} />
        </button>
      );
    }

    if (startPage > 1) {
      pages.push(
        <button
          key={1}
          className={`page-btn ${1 === pagination.page ? 'active' : ''}`}
          onClick={() => changerPage(1)}
        >
          1
        </button>
      );
      if (startPage > 2) {
        pages.push(<span key="ellipsis1" className="page-ellipsis">...</span>);
      }
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(
        <button
          key={i}
          className={`page-btn ${i === pagination.page ? 'active' : ''}`}
          onClick={() => changerPage(i)}
        >
          {i}
        </button>
      );
    }

    if (endPage < pagination.pages) {
      if (endPage < pagination.pages - 1) {
        pages.push(<span key="ellipsis2" className="page-ellipsis">...</span>);
      }
      pages.push(
        <button
          key={pagination.pages}
          className={`page-btn ${pagination.pages === pagination.page ? 'active' : ''}`}
          onClick={() => changerPage(pagination.pages)}
        >
          {pagination.pages}
        </button>
      );
    }

    if (pagination.has_next) {
      pages.push(
        <button
          key="next"
          className="page-btn"
          onClick={() => changerPage(pagination.page + 1)}
        >
          <FontAwesomeIcon icon={faChevronRight} />
        </button>
      );
    }

    return (
      <div className="pagination-container">
        <div className="pagination-info">
          Page {pagination.page} sur {pagination.pages} - {pagination.total} produit(s)
          {enRecherche && ` pour "${recherche}"`}
        </div>
        <div className="pagination">
          {pages}
        </div>
      </div>
    );
  };

  if (loading) return <div className="loading">Chargement des produits...</div>;
  if (error) return <div className="error">Erreur: {error}</div>;

  return (
    <ProduitStyle>
<div className='container'>
      {/* Barre de recherche */}
      <BarreRecherche />

      {/* Résultats */}
      {produits.length === 0 && enRecherche ? (
        <div className="no-results">
          <h3>Aucun produit trouvé pour "{recherche}"</h3>
          <p>Essayez avec d'autres termes de recherche</p>
          <button 
            className="btn-primary"
            onClick={reinitialiserRecherche}
          >
            Afficher tous les produits
          </button>
        </div>
      ) : (
        <>
          <div className="row" id="container_produit">  
            {produits.map(produit => (
              <div key={produit.id} className="col-lg-3 col-md-6 mb-4">
                <div className="product-card" id='product-card'>
                  <div className="wishlist-icon" id='wishlist-icon'>
                  <a href='#'>
                          <FontAwesomeIcon icon={faHeart} />
                    </a>
                  </div>
                  <div className="discount-badge discount-red">50%</div>
                  <img 
                    src={produitService.getImageUrl(produit.image)} 
                    alt={produit.nom} 
                    className="product-image" 
                  />
                  <div className="product-info" id='product-info'>
                    <div className="product-price">
                      <span className="current-price">{produit.prix}Ar</span>
                      <span className="price-unit">/Qty</span>
                    </div>
                    <div className="seller-info">
                      <i className="fas fa-briefcase"></i>
                      Chez Lazan'i Betsileo
                    </div>
                    <h3 className="product-title">{produit.nom}</h3>
                    <div className="product-rating">
                      <span className="stars">★ (174)</span>
                      <span className="sold-info">Stock: {produit.stock}</span>
                    </div>
                    <button 
                      className="btn-add-cart btn-add-cart-primary" 
                      onClick={() => ajouterAuPanier(produit)}
                      disabled={produit.stock <= 0}
                    >
                      {produit.stock <= 0 ? 'Stock épuisé' : 'Add To Cart'} 
                      
                      <FontAwesomeIcon icon={faShoppingCart} />
                    </button>
                  </div>
                </div>
              </div> 
            ))}
          </div>

          {/* Pagination */}
          <Pagination />
        </>
      )}
       <EmailSender/>
    </div>
    </ProduitStyle>
    
  );
}

export default ProductCard;