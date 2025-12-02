// components/Navbar.js
import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/Authentification';
import { useCart } from '../context/CartContext';
import { useLanguage } from '../context/LanguageContext';
import { useTheme } from '../context/ThemeContext'; // Ajouter cette importation
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
    faSun, // Icône soleil (mode clair)
    faMoon, // Icône lune (mode sombre)
    faWineGlass,
    faSignOut,
    faTimes,
    faQuestionCircle,
    faHeart,
    faGlobe,
} from '@fortawesome/free-solid-svg-icons';

const Navbar = () => {
  const navigate = useNavigate();
  const { client, cartCount, logout, isAuthenticated } = useAuth();
  const { language, changeLanguage, t } = useLanguage();
  const { isDarkMode, toggleTheme } = useTheme(); // Utiliser le contexte du thème
  const [loading, setLoading] = useState(false);
  const [showLanguageDropdown, setShowLanguageDropdown] = useState(false);

  const handleLoginClick = () => {
    navigate('/login');
  };

  const handlePanierClick = () => {
    navigate('/panier');
  };

  const API_URL = 'http://localhost:5000/api';

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const handleLanguageChange = (lang) => {
    changeLanguage(lang);
    setShowLanguageDropdown(false);
  };

  const renderAdminItems = () => {
    if (client.description === 'admin') return (
      <>
        <Link to="/side"><li>
          <a className="dropdown-item" href="/admin_dashboard">
            <FontAwesomeIcon icon={faCog} className="me-2" />
            {t('adminManagement')}
          </a>
        </li></Link>
      </>
    );
    else return null;
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm">
      <div className="container">
        <a className="navbar-brand" href="#">
          <FontAwesomeIcon icon={faWineGlass} /> MonSite
        </a>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item"><a className="nav-link active" href="#">{t('home')}</a></li>
            <li className="nav-item"><a className="nav-link" href="#">{t('products')}</a></li>
            
            <Link to="/panier">
            <li className="nav-item">
              <a className="nav-link position-relative">
                <FontAwesomeIcon icon={faShoppingCart} />
                
                {cartCount > 0 && (
                  <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                    {cartCount}
                    <span className="visually-hidden">{t('cartItems')}</span>
                  </span>
                )}
              </a>
            </li>
            </Link>

            <li className="nav-item"><a className="nav-link" href="#">{t('contact')}</a></li>
            
            {/* Toggle du mode sombre */}
            <li className="nav-item">
              <a 
                className="nav-link" 
                href="#" 
                onClick={toggleTheme}
                title={isDarkMode ? t('switchToLight') : t('switchToDark')}
              >
                <FontAwesomeIcon icon={isDarkMode ? faSun : faMoon} />
               
              </a>
            </li>
            
            {/* Sélecteur de langue */}
            <li className="nav-item dropdown">
              <a 
                className="nav-link dropdown-toggle" 
                href="#" 
                role="button" 
                onClick={() => setShowLanguageDropdown(!showLanguageDropdown)}
              >
                <FontAwesomeIcon icon={faGlobe} /> 
                {language.toUpperCase()}
              </a>
              <ul className={`dropdown-menu ${showLanguageDropdown ? 'show' : ''}`}>
                <li>
                  <a className="dropdown-item" href="#" onClick={() => handleLanguageChange('fr')}>
                    🇫🇷 Français
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="#" onClick={() => handleLanguageChange('en')}>
                    🇺🇸 English
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="#" onClick={() => handleLanguageChange('es')}>
                    🇪🇸 Español
                  </a>
                </li>
              </ul>
            </li>

            {isAuthenticated ? (
              <li className="nav-item dropdown">
                <a className="nav-link dropdown-toggle" href="#" role="button" id="userDropdown" data-bs-toggle="dropdown">
                  <FontAwesomeIcon icon={faUser} /> {client.nom}
                 
                </a>
                <ul className="dropdown-menu dropdown-menu-end">
                  <Link to="/profil">
                    <li>
                      <a className="dropdown-item" href="#" role='button'>
                        <FontAwesomeIcon icon={faUser} /> {t('profile')}
                      </a>
                    </li>
                  </Link>
                  {renderAdminItems()}
                  <li>
                    <a className="dropdown-item" href="/commandes">
                      <FontAwesomeIcon icon={faShoppingBag} /> {t('orders')}
                    </a>
                  </li>
                  <li><hr className="dropdown-divider" /></li>
                  <li>
                    <a className="dropdown-item" href="#" onClick={handleLogout}>
                      <FontAwesomeIcon icon={faSignOut} /> {t('logout')}
                    </a>
                  </li>
                </ul>
              </li>
            ) : (
              <li className="nav-item">
                <a className="nav-link" href="#" onClick={handleLoginClick}>
                  <FontAwesomeIcon icon={faUser} /> {t('login')}
                </a>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;