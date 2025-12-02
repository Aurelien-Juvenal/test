// App.js

import { BrowserRouter as Router, Routes, Route, Navigate,Link } from 'react-router-dom';
import Login from './login';
import ItemList from './ItemList';
import ProtectedRoute from './ProtectedRoute';
import Dashboard from './dashboard';
import { PanierProvider } from '../context/CartContext';
import Panier from './Panier';
import ClientForm from './ItemForm';

import ProduitList from './List_produit';
import Profil from './profil';
import React, { useState, useEffect } from 'react';
import Header from './Header';
import PageHeader from './PageHeader';
import CategoriesSection from './CategoriesSection';
import FeaturedProducts from './FeaturedProducts';
import Footer from './Footer';
import Produit from './Produit_image';
import produitService from '../services/api';
import axios from 'axios';
import AjoutProduit from './ajout_produits';


function Body() {
  const [produits, setProduits] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {
    chargerProduits();
  }, []);

  const chargerProduits = async () => {
    try {
      setLoading(true);
      const data = await produitService.getProduits();
      setProduits(data);
      alert(data);
    } catch (err) {
      setError(err.message);
      
    } finally {
      setLoading(false);
    }
  };
  
  const [categories] = useState([
    {
      id: 'watches',
      name: 'Watches',
      image: 'https://images.unsplash.com/photo-1523170335258-f5ed11844a49?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
      description: 'Discover our exclusive collection of premium watches from leading brands. From classic designs to modern smartwatches.',
      stats: { products: 150, brands: 12, rating: 4.8 }
    },
    {
      id: 'shoes',
      name: 'Shoes',
      image: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
      description: 'Step into style with our curated collection of footwear. From casual sneakers to formal shoes for every occasion.',
      stats: { products: 200, brands: 15, rating: 4.7 }
    },
    {
      id: 'accessories',
      name: 'Accessories',
      image: 'https://images.unsplash.com/photo-1594223274512-ad4803739b7c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
      description: 'Complete your look with our selection of premium accessories including bags, belts, and jewelry.',
      stats: { products: 80, brands: 8, rating: 4.9 }
    }
  ]);

  const [featuredProducts] = useState([
    {
      id: 1,
      name: 'Luxury Chronograph Watch',
      price: 450.00,
      category: 'watches'
    },
    {
      id: 2,
      name: 'Premium Leather Shoes',
      price: 120.00,
      category: 'shoes'
    },
    {
      id: 3,
      name: 'Designer Leather Bag',
      price: 280.00,
      category: 'accessories'
    },
    {
      id: 4,
      name: 'Smart Fitness Watch',
      price: 199.00,
      category: 'watches'
    }
  ]);
  return (

    
    <div className="App">
      <Header />
      <PageHeader 
        title="Categories"
        description="Discover our wide range of premium products organized by category"
      />
      <CategoriesSection categories={categories} />
      <Produit />
      <AjoutProduit/>
      <Footer />
      
    </div>
    

    
    
  );
}

export default Body;