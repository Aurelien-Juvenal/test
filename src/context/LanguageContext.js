
import React, { createContext, useState, useContext } from 'react';

const LanguageContext = createContext();

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState('fr'); // fr, en, es

  const translations = {
    fr: {
      home: "Accueil",
      products: "Produits",
      cart: "Panier",
      contact: "Contact",
      profile: "Profil",
      orders: "Commandes",
      logout: "Déconnexion",
      login: "Se connecter",
      cartItems: "article(s)",
      adminManagement: "Gestion de ventes et clients",
      welcome: "Bienvenue",
      darkMode: 'Mode sombre',
      lightMode: 'Mode clair',
      switchToDark: 'Passer en mode sombre',
      switchToLight: 'Passer en mode clair',
    },
    en: {
      home: "Home",
      products: "Products",
      cart: "Cart",
      contact: "Contact",
      profile: "Profile",
      orders: "Orders",
      logout: "Logout",
      login: "Login",
      cartItems: "item(s)",
      adminManagement: "Sales and Clients Management",
      welcome: "Welcome",
      darkMode: 'Dark Mode',
      lightMode: 'Light Mode',
      switchToDark: 'Switch to dark mode',
      switchToLight: 'Switch to light mode',
    },
    es: {
      home: "Inicio",
      products: "Productos",
      cart: "Carrito",
      contact: "Contacto",
      profile: "Perfil",
      orders: "Pedidos",
      logout: "Cerrar sesión",
      login: "Iniciar sesión",
      cartItems: "artículo(s)",
      adminManagement: "Gestión de ventas y clientes",
      welcome: "Bienvenido",
      darkMode: 'Modo oscuro',
      lightMode: 'Modo claro',
      switchToDark: 'Cambiar a modo oscuro',
      switchToLight: 'Cambiar a modo claro',
    }
  };

  const changeLanguage = (lang) => {
    setLanguage(lang);
    localStorage.setItem('preferredLanguage', lang);
  };

  const t = (key) => {
    return translations[language][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, changeLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};