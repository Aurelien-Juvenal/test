// components/Auth.js
import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/Authentification';
import './Auth.css';

const Auth = () => {
  const [activeTab, setActiveTab] = useState('login');
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    rememberMe: false
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const navigate = useNavigate();
  const location = useLocation();
  const { login, isAuthenticated } = useAuth();

  // Rediriger si déjà connecté
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard');
    }
  }, [isAuthenticated, navigate]);

  // Gérer les paramètres d'URL pour les onglets
  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const tab = searchParams.get('tab');
    if (tab === 'register') {
      setActiveTab('register');
    }
  }, [location]);

  // Gérer les changements de formulaire
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  // Soumission connexion
  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      // Validation
      if (!formData.username || !formData.password) {
        throw new Error('Veuillez remplir tous les champs');
      }

      // Simulation connexion
      const userData = {
        id: 1,
        username: formData.username,
        email: `${formData.username}@noel.com`,
        avatar: '🎅'
      };

      await login(userData);
      navigate('/dashboard');
      
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  // Soumission inscription
  const handleRegister = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      // Validation
      if (!formData.username || !formData.email || !formData.password) {
        throw new Error('Veuillez remplir tous les champs');
      }

      if (formData.password !== formData.confirmPassword) {
        throw new Error('Les mots de passe ne correspondent pas');
      }

      // Simulation inscription
      const userData = {
        id: Date.now(),
        username: formData.username,
        email: formData.email,
        avatar: '🎄'
      };

      await login(userData);
      navigate('/dashboard');
      
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-container">
        {/* En-tête */}
        <div className="auth-header">
          <div className="logo">🎄</div>
          <h1>Joyeux Noël !</h1>
          <p>Rejoignez la magie de Noël</p>
        </div>

        {/* Onglets */}
        <div className="auth-tabs">
          <button 
            className={`tab ${activeTab === 'login' ? 'active' : ''}`}
            onClick={() => setActiveTab('login')}
          >
            Connexion
          </button>
          <button 
            className={`tab ${activeTab === 'register' ? 'active' : ''}`}
            onClick={() => setActiveTab('register')}
          >
            Inscription
          </button>
        </div>

        {/* Formulaire de connexion */}
        {activeTab === 'login' && (
          <form onSubmit={handleLogin} className="auth-form">
            {error && <div className="error-message">❌ {error}</div>}

            <div className="input-group">
              <label>🎄 Nom d'utilisateur ou Email</label>
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleInputChange}
                placeholder="Entrez votre identifiant"
                disabled={isLoading}
              />
            </div>

            <div className="input-group">
              <label>🎁 Mot de passe</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                placeholder="Entrez votre mot de passe"
                disabled={isLoading}
              />
            </div>

            <div className="form-options">
              <label className="checkbox-label">
                <input
                  type="checkbox"
                  name="rememberMe"
                  checked={formData.rememberMe}
                  onChange={handleInputChange}
                />
                Se souvenir de moi
              </label>
              <button type="button" className="forgot-link">
                Mot de passe oublié ?
              </button>
            </div>

            <button 
              type="submit" 
              className="auth-submit-btn"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <div className="spinner"></div>
                  Connexion...
                </>
              ) : (
                '🎅 Se Connecter'
              )}
            </button>
          </form>
        )}

        {/* Formulaire d'inscription */}
        {activeTab === 'register' && (
          <form onSubmit={handleRegister} className="auth-form">
            {error && <div className="error-message">❌ {error}</div>}

            <div className="input-group">
              <label>🎄 Nom d'utilisateur</label>
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleInputChange}
                placeholder="Choisissez un nom d'utilisateur"
                disabled={isLoading}
              />
            </div>

            <div className="input-group">
              <label>📧 Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="votre@email.com"
                disabled={isLoading}
              />
            </div>

            <div className="input-group">
              <label>🎁 Mot de passe</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                placeholder="Créez un mot de passe"
                disabled={isLoading}
              />
            </div>

            <div className="input-group">
              <label>🔒 Confirmer le mot de passe</label>
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleInputChange}
                placeholder="Confirmez votre mot de passe"
                disabled={isLoading}
              />
            </div>

            <button 
              type="submit" 
              className="auth-submit-btn"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <div className="spinner"></div>
                  Inscription...
                </>
              ) : (
                '🎄 Créer mon compte'
              )}
            </button>
          </form>
        )}

        {/* Lien vers l'autre onglet */}
        <div className="auth-switch">
          {activeTab === 'login' ? (
            <p>
              Pas de compte ?{' '}
              <button 
                onClick={() => setActiveTab('register')}
                className="switch-link"
              >
                Inscrivez-vous
              </button>
            </p>
          ) : (
            <p>
              Déjà un compte ?{' '}
              <button 
                onClick={() => setActiveTab('login')}
                className="switch-link"
              >
                Connectez-vous
              </button>
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Auth;