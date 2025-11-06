import React, { useState,useEffect } from 'react';
import ClientForm from './ItemForm';
import ItemList from './ItemList';
import ProduitList from './List_produit';
import Produit from './Produit_image';
import { useAuth } from '../context/AuthContext';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.js';
import { AuthProvider } from '../context/AuthContext';
import { CartProvider } from '../context/CartContext';
import vin from '../images/sans-bg/raisin.png';
import '../index.css';
import AjoutProduit from './ajout_produits';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { BrowserRouter as Router, Routes, Route, Navigate,Link } from 'react-router-dom';
import ProduitForm from './ProduitForm';
import Profil from './profil';
import Panier from './Panier';
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
  
} from '@fortawesome/free-solid-svg-icons';

function Dashboard() {
    const { client, logout, updateProfile, refreshProfile } = useAuth();
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({
      nom: '',
      prenom: '',
      email: '',
      telephone: ''
    });
    const [message, setMessage] = useState('');
  
    // Initialiser le formulaire avec les données du client
    useEffect(() => {
      if (client) {
        setFormData({
          nom: client.nom || '',
          prenom: client.prenom || '',
          email: client.email || '',
          description: client.description || '', 
          telephone: client.telephone || ''
        });
      }
    }, [client]);
  
    const handleLogout = async () => {
      try {
        await logout();
      } catch (error) {
        console.error('Erreur lors de la déconnexion:', error);
      }
    };
  
    const handleEditToggle = () => {
      setIsEditing(!isEditing);
      setMessage('');
    };
  
    const handleChange = (e) => {
      setFormData({
        ...formData,
        [e.target.name]: e.target.value
      });
    };
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      try {
        await updateProfile(formData);
        setMessage('Profil mis à jour avec succès!');
        setIsEditing(false);
      } catch (error) {
        setMessage('Erreur lors de la mise à jour: ' + (error.error || 'Erreur inconnue'));
      }
    };
  
    const handleRefresh = async () => {
      try {
        await refreshProfile();
        setMessage('Profil rafraîchi avec succès!');
      } catch (error) {
        setMessage('Erreur lors du rafraîchissement du profil');
      }
    };
  
    if (!client) {
      return (
        <div className="dashboard">
          <div className="loading">Chargement du profil...</div>
        </div>
      );
    }
  
  
  const navItems = [
  { label: "Accueil", href: "#" },
  { label: "Produits", href: "#" },
  { label: "Contact", href: "#" },
  { label: "Traduction", href: "#" },
];
const renderAdminItems = () => {
  if (client.description==='admin') return (
<>
      <li>
        <a className="dropdown-item" href="/admin_dashboard">
          <FontAwesomeIcon icon={faCog} className="me-2" />
          Gestion de ventes et clients
        </a>
      </li>
      
    </>
  );
  
  else return null;
};
const isAdmin = () => {
    return client.description==='admin'
};
  const thème = ['dark','light'];
 
 
  
  return (
    <div className="min-h-screen py-8">

     <nav class="navbar navbar-expand-lg navbar navbar-custom fixed-top">
        <div class="container">
        
            <a class="navbar-brand" href="#">
            <FontAwesomeIcon icon={faWineGlass} />MonSite
            </a>
            
            
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarContent">
                <span class="navbar-toggler-icon"></span>
            </button>
            
            
            <div class="collapse navbar-collapse" id="navbarContent">
                
                <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                    <li class="nav-item">
                        <a class="nav-link active" href="#">
                        <FontAwesomeIcon icon={faHome} />Accueil
                        </a>
                    </li>
                    
                    <li class="nav-item dropdown">
                        <a class="nav-link dropdown-toggle" href="#" id="produitsDropdown" role="button" data-bs-toggle="dropdown">
                        <FontAwesomeIcon icon={faShoppingBag} />Produits
                        </a>
                        <ul class="dropdown-menu">
                            <li><a class="dropdown-item" href="#">Tous les produits</a></li>
                            <li><a class="dropdown-item" href="#">Nouveautés</a></li>
                            <li><a class="dropdown-item" href="#">Promotions</a></li>
                            <li><hr class="dropdown-divider" /></li>
                            <li><a class="dropdown-item" href="#">Par catégorie</a></li>
                        </ul>
                    </li>
                    
                    <li class="nav-item">
                        <a class="nav-link" href="#">
                        <FontAwesomeIcon icon={faInfoCircle} />À propos
                        </a>
                    </li>
                    
                    <li class="nav-item">
                        <a class="nav-link" href="#">
                        <FontAwesomeIcon icon={faEnvelope} />Contact
                        </a>
                    </li>
                </ul>
                
                
                <form class="d-flex me-3">
                    <div class="input-group">
                        <input type="text" class="form-control" placeholder="Rechercher..." />
                        <button class="btn btn-outline-light" type="submit">
                        <FontAwesomeIcon icon={faSearch} />
                        </button>
                    </div>
                </form>
                
                <ul class="navbar-nav">
                    <li class="nav-item dropdown">
                        <a class="nav-link position-relative" >
                        <Link to="/panier">
                          <FontAwesomeIcon icon={faShoppingCart} />
                            <span class="badge bg-danger badge-notification"></span>
                            
                        </Link>
                        </a>
                        
                    </li>
                    <li class="nav-item dropdown">
                        <a class="nav-link position-relative" href="#" id="panierDropdown" role="button" data-bs-toggle="dropdown">
                        <FontAwesomeIcon icon={faSun} />
                          
                        </a>
                    </li>
                    
                    <li class="nav-item dropdown" >
                    <a class="nav-link dropdown-toggle" href="#" id="userDropdown" role="button" data-bs-toggle="dropdown">
                        <FontAwesomeIcon icon={faUser} />{client.nom} {client.prenom}
                        </a>
                        <ul class="dropdown-menu dropdown-menu-end">
                            <li><a class="dropdown-item text-decoration-none" href="#">
                            <Link to="/profil"><FontAwesomeIcon icon={faUser} />Profil</Link>
                            </a></li>
                            <li><a class="dropdown-item" href="#">
                            <FontAwesomeIcon icon={faShoppingBag} />Commandes
                            </a></li>
                            
                            {/* Éléments admin conditionnels */}
      {renderAdminItems()}
                            
                            
                            
                            <li><hr class="dropdown-divider" /></li>
                            <li><a class="dropdown-item" href="#" data-bs-toggle="modal" data-bs-target="#logoutModal">
                            <FontAwesomeIcon icon={faSignOut} />
                               Déconnexion
                            </a></li>
                        </ul>
                    </li>
                </ul>
            </div>
        </div>
    </nav>
      <div class="container-fluid deepwine-container">
        <div class="row">
          <div class="col-lg-6 col-md-12 deepwine-left">
            <div class="wine-bottle-group">
              <img src={vin} alt="Bouteille de vin" class="img-fluid wine-bottle" />
              <img src="" alt="Verre de vin" class="img-fluid wine-glass" />
              <img src="" alt="Morceau de fromage" class="img-fluid cheese" />
            </div>
          </div>

          <div class="col-lg-6 col-md-12 deepwine-right">
            <div class="right-content">
              <h1 class="wine-title">Wine</h1>
              <p class="collection-text">COLLECTION</p>
              <h2 class="section-title-best">THE BEST GRADES</h2>
              <p class="section-text">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco.</p>
              
              <img src={vin} alt="Grappe de raisins" class="img-fluid grapes" />
              
              <h2 class="section-title-unique">UNIQUE TASTE</h2>
              <p class="section-text">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco.</p>
              
              <img src="splash.png" alt="Éclaboussure de vin" class="img-fluid wine-splash" />
              
              <div class="limited-edition">
                <p>LIMITED EDITION</p>
                <p>ONLY IN OUR SHOP</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div>
        <p></p>
      </div>

      <div class="modal fade" id="loginModal" tabindex="-1">
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">
                        <i class="fas fa-sign-in-alt me-2"></i>Connexion
                    </h5>
                    <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal"></button>
                </div>
                <div class="modal-body">
                    <form id="loginForm">
                        <div class="mb-3">
                            <label for="loginEmail" class="form-label">Email</label>
                            <input type="email" class="form-control" id="loginEmail" required />
                        </div>
                        <div class="mb-3">
                            <label for="loginPassword" class="form-label">Mot de passe</label>
                            <input type="password" class="form-control" id="loginPassword" required />
                        </div>
                        <div class="form-check mb-3">
                            <input class="form-check-input" type="checkbox" id="rememberMe"/>
                            <label class="form-check-label" for="rememberMe">Se souvenir de moi</label>
                        </div>
                        <div class="d-grid">
                            <button type="submit" class="btn btn-gradient btn-lg">
                                <i class="fas fa-sign-in-alt me-2"></i>Se connecter
                            </button>
                        </div>
                    </form>
                    
                    <div class="text-center mt-3">
                        <a href="#" class="text-decoration-none">Mot de passe oublié ?</a>
                    </div>
                    
                    
                    
                    <div class="text-center">
                        <p class="mb-2">Ou connectez-vous avec</p>
                        <div class="d-grid gap-2">
                            <button class="btn btn-outline-primary">
                                <i class="fab fa-google me-2"></i>Google
                            </button>
                            <button class="btn btn-outline-dark">
                                <i class="fab fa-github me-2"></i>GitHub
                            </button>
                        </div>
                    </div>
                </div>
                <div class="modal-footer justify-content-center">
                    <span>Pas de compte ? <a href="#" class="text-decoration-none" data-bs-toggle="modal" data-bs-target="#registerModal">S'inscrire</a></span>
                </div>
            </div>
        </div>
    </div>

    
    <div class="modal fade" id="registerModal" tabindex="-1">
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">
                        <FontAwesomeIcon icon={faUser} />Inscription
                    </h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                </div>
                <div class="modal-body">
                    <form id="registerForm">
                        <div class="row">
                            <div class="col-md-6 mb-3">
                                <label for="firstName" class="form-label">Prénom</label>
                                <input type="text" class="form-control" id="firstName" required />
                            </div>
                            <div class="col-md-6 mb-3">
                                <label for="lastName" class="form-label">Nom</label>
                                <input type="text" class="form-control" id="lastName" required />
                            </div>
                        </div>
                        <div class="mb-3">
                            <label for="registerEmail" class="form-label">Email</label>
                            <input type="email" class="form-control" id="registerEmail" required />
                        </div>
                        <div class="mb-3">
                            <label for="registerPassword" class="form-label">Mot de passe</label>
                            <input type="password" class="form-control" id="registerPassword" required />
                        </div>
                        <div class="mb-3">
                            <label for="confirmPassword" class="form-label">Confirmer le mot de passe</label>
                            <input type="password" class="form-control" id="confirmPassword" required />
                        </div>
                        <div class="form-check mb-3">
                            <input class="form-check-input" type="checkbox" id="acceptTerms" required />
                            <label class="form-check-label" for="acceptTerms">
                                J'accepte les <a href="#" class="text-decoration-none">conditions d'utilisation</a>
                            </label>
                        </div>
                        <div class="d-grid">
                            <button type="submit" class="btn btn-gradient btn-lg">
                            <FontAwesomeIcon icon={faUser} />S'inscrire
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>


    
    <div class="modal fade" id="logoutModal" tabindex="-1">
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title text-warning">
                    <FontAwesomeIcon icon={faSignOut} />Déconnexion
                    </h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                </div>
                <div class="modal-body text-center">
                <FontAwesomeIcon icon={faQuestionCircle} />
                    <h5>Êtes-vous sûr de vouloir vous déconnecter ?</h5>
                    <p class="text-muted">Vous devrez vous reconnecter pour accéder à votre compte.</p>
                </div>
                <div class="modal-footer justify-content-center">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">
                    <FontAwesomeIcon icon={faTimes} />Annuler
                    </button>
                    <button type="button" class="btn btn-warning text-white" onClick={handleLogout} id="confirmLogout">
                    <FontAwesomeIcon icon={faSignOut} />Se déconnecter
                    </button>
                </div>
            </div>
        </div>
    </div>
      <div className="container mx-auto px-4 max-w-4xl">
        
          
          <AuthProvider>
     
        <div className="App">
          
          <main className="space-y-6">
          <Produit />
          </main>
        </div>
      
    </AuthProvider>
          
        

        <footer className="text-center mt-12 text-gray-500">
          <p>© 2023 Mon Projet Fullstack</p>
        </footer>
      </div>
    
    </div>
  );
}

export default Dashboard;