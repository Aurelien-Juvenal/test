// App.js
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/login/login';
import Dashboard from './components/dashboard';
import React from 'react';
import Navbar from './components/Navbar';
import { AuthProvider } from './context/Authentification';
import Produit from './components/Produit_image';
import Inscrire from './components/inscription/inscrire';
import { CartProvider } from './context/CartContext';
import Profil from './components/profil';
import Side from './components/Admin/interface/side';
import ProductCard from './components/Produit/ProductCard';
import Footer from './components/Footer';
import CartPage from './components/Panier/CartPage';
import Section from './components/Produit/Section';
import CategorySlider from './components/Produit/Categorie';
import { LanguageProvider } from './context/LanguageContext';
import { ThemeProvider } from './context/ThemeContext'; // Ajouter cette importation

function AppContent() {
  return (
    <div className="App">
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/inscrire" element={<Inscrire />} />
        <Route path="/profil" element={<Profil />} />
        <Route path="/side" element={<Side />} />
        <Route path="/panier" element={<CartPage />} />
        <Route path="*" element={
          <>
            <Navbar />
            <Section />
            <CategorySlider />
            <ProductCard/>
          </>
        } />
      </Routes>
    </div>
  );
}

function App() {
  return (
    <ThemeProvider> {/* Ajouter ThemeProvider */}
      <LanguageProvider>
        <AuthProvider>
          <CartProvider>
            <Router>
              <AppContent />
            </Router>
          </CartProvider>
        </AuthProvider>
      </LanguageProvider>
    </ThemeProvider>
  );
}

export default App;