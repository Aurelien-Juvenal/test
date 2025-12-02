// Login.js

import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation, Link} from 'react-router-dom';
import { useAuth } from '../../context/Authentification';
import { useLanguage } from '../../context/LanguageContext';
import vin from "../../images/sans-bg/raisin.png"
import GoogleLoginButton from '../google';
import { ProductCardContainer } from './ProductCard.styled';


const Login = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
      });
    const { login, error, loading, isAuthenticated, isAuthenticated_goole } = useAuth();
    const { language, t } = useLanguage(); // ✅ Ajouter language ici
    
    const navigate = useNavigate();   

    // Rediriger si déjà connecté
    useEffect(() => {
        if (isAuthenticated) {
        navigate('/');
        }
    }, [isAuthenticated, navigate]);
  
    useEffect(() => {
        if (isAuthenticated_goole) {
        navigate('/');
        }
    }, [isAuthenticated_goole, navigate]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
          await login(formData.email, formData.password);
        } catch (error) {
          console.error('Erreur de connexion:', error);
        }
      };

    // Gérer les changements de formulaire
    const handleInputChange = (e) => {
      setFormData({
        ...formData,
        [e.target.name]: e.target.value
      });
    };
    
    const { login_google } = useAuth();

    return (
        <ProductCardContainer>
<div class="container">
            <div class="brand-section">
                <div class="brand-logo">Wine's commerce</div>
                <p class="brand-tagline">{t('welcome')} - Discover our exclusive collection of premium wines.</p>
                
                <img src={vin} className='w-50 h-70'/>
            </div>
            
            <div class="form-section">
                <div class="form-header">
                    <h1 class="form-title">{t('login')}</h1>
                    {error && <div className="error-message">❌ {error}</div>}
                    <p class="form-subtitle">{t('login')}</p>
                </div>
                
                <form onSubmit={handleSubmit} id="registerForm">
                    
                    <div class="form-group">
                        <label for="email">Email Address</label>
                        <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className='form-control'
                        required
                        />
                    </div>
                    
                    
                    <div class="form-group">
                        <label for="password">Password</label>
                        <input
                        type="password"
                        name="password"
                        className='form-control'
                        value={formData.password}
                        onChange={handleInputChange}
                        required
                        />
                    </div>
                    
                
                    
                    <button type="submit" class="btn">{t('login')}</button>
                </form>
                
                <div class="login-link">
                    {language === 'fr' && "Si vous n'avez pas de compte? "}
                    {language === 'en' && "Don't have an account? "}
                    {language === 'es' && "¿No tienes una cuenta? "}
                    <Link to="/inscrire">
                        {language === 'fr' && "S'inscrire"}
                        {language === 'en' && "Sign up"}
                        {language === 'es' && "Registrarse"}
                    </Link>
                </div>
                
               <GoogleLoginButton/>
                <div class="form-footer">
                    {language === 'fr' && "En créant un compte, vous acceptez nos Conditions d'utilisation et notre Politique de confidentialité."}
                    {language === 'en' && "By creating an account, you agree to our Terms of Service and Privacy Policy."}
                    {language === 'es' && "Al crear una cuenta, aceptas nuestros Términos de Servicio y Política de Privacidad."}
                </div>
            </div>
        </div>
        </ProductCardContainer>
        
    );
};

export default Login;