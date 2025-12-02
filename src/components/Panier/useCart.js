// hooks/useCart.js
import { useState, useEffect } from 'react';
import axios from 'axios';
import { produitService } from '../../services/api';


const API_URL = 'http://localhost:5000/api';

export const useCart = () => {
    const [cartData, setCartData] = useState({
        panier: {
            id: 0,
            numero_commande: "",
            total_ht: 0,
            total_ttc: 0,
            frais_livraison: 0,
            remise: 0,
            nombre_articles: 0
        },
        lignes: []
    });
    const [loading, setLoading] = useState(false);
    const [promoMessage, setPromoMessage] = useState('');

    // Configuration axios avec le token
    const api = axios.create({
        baseURL: API_URL,
    });

    // Intercepteur pour ajouter le token
    api.interceptors.request.use((config) => {
        const token = localStorage.getItem('access_token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        console.log("token" + token);
        return config;
    });
    
// Avant d'appeler fetchCart(), vérifiez l'authentification
    useEffect(() => {
        const token = localStorage.getItem('access_token');
        if (token) {
            fetchCart();
        } else {
            setPromoMessage({ 
                text: 'Veuillez vous connecter pour voir votre panier', 
                type: 'error' 
            });
        }
    }, []);
        // Récupérer le panier depuis l'API
    const fetchCart = async () => {
        try {
            setLoading(true);
            const response = await api.get('/panier');
            
            if (response.data.success) {
                const transformedData = transformCartData(response.data);
                setCartData(transformedData);
                console.log('Panier chargé:', transformedData);
            } else {
                throw new Error(response.data.message || 'Erreur inconnue');
            }
        } catch (error) {
            console.error('Erreur lors du chargement du panier:', error);
            
            let errorMessage = 'Erreur lors du chargement du panier';
            if (error.response?.status === 401) {
                errorMessage = 'Veuillez vous reconnecter';
            } else if (error.response?.status === 404) {
                errorMessage = 'Panier non trouvé';
            } else if (error.response?.data?.message) {
                errorMessage = error.response.data.message;
            }
            
            setPromoMessage({ 
                text: errorMessage, 
                type: 'error' 
            });
        } finally {
            setLoading(false);
        }
    };
    // Transformer les données de l'API
    const transformCartData = (apiData) => {
        return {
            panier: {
                id: 1,
                numero_commande: "CMD-" + Date.now(),
                total_ht: parseFloat(apiData.total_price) || 0,
                total_ttc: parseFloat(apiData.total_price) || 0,
                frais_livraison: 0,
                remise: 0,
                nombre_articles: apiData.total_count || 0
            },
            lignes: apiData.items?.map((item, index) => {
                const prix = parseFloat(item.prix || item.produit?.prix || 0);
                const quantite = parseInt(item.quantite) || 1;
                
                return {
                    id: item.id || index + 1,
                    produit: {
                        id: item.produit_id || item.produit?.id,
                        nom: item.produit_nom || item.produit?.nom,
                        prix_ht: prix,
                        prix_ttc: prix,
                        image_url: item.produit_image || item.produit?.image || '/images/default-product.jpg',
                        stock: item.produit_stock || item.produit?.stock || 10
                    },
                    quantite: quantite,
                    prix_unitaire_ht: prix,
                    sous_total_ht: prix * quantite,
                    sous_total_ttc: prix * quantite
                };
            }) || []
        };
    };


    // Mettre à jour la quantité
    const updateQuantity = async (itemId, newQuantity) => {
        if (newQuantity < 1) return;
        
        setLoading(true);
        
        try {
            // Trouver l'item pour avoir le produit_id
            const item = cartData.lignes.find(item => item.id === itemId);
            if (!item) return;

            await api.put(`/panier/${item.produit.id}`, {
                quantite: newQuantity
            });

            // Recharger le panier après modification
            await fetchCart();
            setPromoMessage({ text: 'Quantité mise à jour', type: 'success' });
            
        } catch (error) {
            setPromoMessage({ text: 'Erreur lors de la mise à jour', type: 'error' });
            console.error('Error updating quantity:', error);
        } finally {
            setLoading(false);
        }
    };

    // Supprimer un article
    const removeItem = async (itemId) => {
        if (!window.confirm('Êtes-vous sûr de vouloir supprimer cet article du panier ?')) {
            return;
        }
        
        setLoading(true);
        
        try {
            // Trouver l'item pour avoir le produit_id
            const item = cartData.lignes.find(item => item.id === itemId);
            if (!item) return;

            await api.delete(`/panier/${item.produit.id}`);

            // Recharger le panier après suppression
            await fetchCart();
            setPromoMessage({ text: 'Article supprimé du panier', type: 'success' });
            
        } catch (error) {
            setPromoMessage({ text: 'Erreur lors de la suppression', type: 'error' });
            console.error('Error removing item:', error);
        } finally {
            setLoading(false);
        }
    };

    // Appliquer un code promo
    const applyPromoCode = (code) => {
        if (!code.trim()) {
            setPromoMessage({ text: 'Veuillez entrer un code promo', type: 'error' });
            return false;
        }
        
        // Logique de code promo côté client (temporaire)
        const promoCodes = {
            'REDUCTION10': 10.00,
            'SOLDES20': 20.00,
        };
        
        const discount = promoCodes[code];
        
        if (discount) {
            setCartData(prevData => {
                const newTotalTTC = Math.max(0, prevData.panier.total_ttc - discount);
                
                return {
                    ...prevData,
                    panier: {
                        ...prevData.panier,
                        remise: discount,
                        total_ttc: newTotalTTC
                    }
                };
            });
            
            setPromoMessage({ text: `Remise de ${discount}€ appliquée !`, type: 'success' });
            return true;
        } else {
            setPromoMessage({ text: 'Code promo invalide', type: 'error' });
            return false;
        }
    };

    // Procéder au paiement
    const proceedToCheckout = () => {
        if (cartData.lignes.length === 0) return;
        
        setLoading(true);
        setTimeout(() => {
            alert('Redirection vers la page de paiement...');
            setLoading(false);
        }, 1000);
    };

    // Effacer le message promo après 3 secondes
    useEffect(() => {
        if (promoMessage) {
            const timer = setTimeout(() => {
                setPromoMessage('');
            }, 3000);
            
            return () => clearTimeout(timer);
        }
    }, [promoMessage]);

    return {
        cartData,
        loading,
        promoMessage,
        updateQuantity,
        removeItem,
        applyPromoCode,
        proceedToCheckout,
        refreshCart: fetchCart
    };
};