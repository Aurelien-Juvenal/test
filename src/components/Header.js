import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
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


const Header = () => {
  return (
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
                        
                          <FontAwesomeIcon icon={faShoppingCart} />
                            <span class="badge bg-danger badge-notification"></span>
                            
                        
                        </a>
                        
                    </li>
                    <li class="nav-item dropdown">
                        <a class="nav-link position-relative" href="#" id="panierDropdown" role="button" data-bs-toggle="dropdown">
                        <FontAwesomeIcon icon={faSun} />
                          
                        </a>
                    </li>
                    
                    <li class="nav-item dropdown" >
                    <a class="nav-link dropdown-toggle" href="#" id="userDropdown" role="button" data-bs-toggle="dropdown">
                        <FontAwesomeIcon icon={faUser} />
                        </a>
                        <ul class="dropdown-menu dropdown-menu-end">
                            <li><a class="dropdown-item text-decoration-none" href="#">
                            <FontAwesomeIcon icon={faUser} />Profil
                            </a></li>
                            <li><a class="dropdown-item" href="#">
                            <FontAwesomeIcon icon={faShoppingBag} />Commandes
                            </a></li>
                            
                    
                            
                            
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
  );
};

export default Header;