// components/Paiement.js
import React, { useState } from 'react';
import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

const Paiement = ({ cartData, onPaymentSuccess, onPaymentError }) => {
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        cardNumber: '',
        cardExpiry: '',
        cardCVC: '',
        cardholderName: ''
    });

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
        return config;
    });

    const handleInputChange = (e) => {
        const { id, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [id]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!cartData || cartData.lignes.length === 0) {
            alert('Votre panier est vide');
            return;
        }

        setLoading(true);

        try {
            // Appeler l'API pour créer la commande
            const response = await api.post('/commandes/create', {
                payment_method: 'card',
                card_details: formData // En pratique, ces données devraient être envoyées à un processeur de paiement sécurisé
            });

            if (response.data.success) {
                // Succès du paiement
                if (onPaymentSuccess) {
                    onPaymentSuccess(response.data);
                }
                
                alert(`Commande créée avec succès! Numéro: ${response.data.numero_commande}`);
                
                // Rediriger vers la page de confirmation
                window.location.href = `/confirmation-commande/${response.data.commande_id}`;
            } else {
                throw new Error(response.data.message || 'Erreur lors de la création de la commande');
            }
            
        } catch (error) {
            console.error('Erreur lors du paiement:', error);
            
            let errorMessage = 'Erreur lors du traitement du paiement';
            if (error.response?.data?.message) {
                errorMessage = error.response.data.message;
            }
            
            if (onPaymentError) {
                onPaymentError(errorMessage);
            }
            
            alert(errorMessage);
        } finally {
            setLoading(false);
        }
    };

    // Formatage du numéro de carte
    const formatCardNumber = (value) => {
        return value.replace(/\s?/g, '').replace(/(\d{4})/g, '$1 ').trim();
    };

    // Formatage de la date d'expiration
    const formatExpiry = (value) => {
        return value.replace(/\//g, '').replace(/(\d{2})(\d)/, '$1/$2');
    };

    return (
        <div className="container">
            <section className="payment-section">
                <div className="payment-card">
                    <h2 className="section-title">Paiement</h2>
                    
                    <div className="payment-methods">
                        <div className="payment-method active" data-method="card">
                            <div className="method-icon">💳</div>
                            <div className="method-name">Carte Bancaire</div>
                        </div>
                    </div>

                    <form id="paymentForm" onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="cardNumber">Numéro de carte</label>
                            <input 
                                type="text" 
                                id="cardNumber" 
                                className="form-control" 
                                placeholder="1234 5678 9012 3456" 
                                maxLength="19" 
                                value={formData.cardNumber}
                                onChange={(e) => setFormData(prev => ({
                                    ...prev,
                                    cardNumber: formatCardNumber(e.target.value)
                                }))}
                                required 
                            />
                        </div>

                        <div className="form-row">
                            <div className="form-group">
                                <label htmlFor="cardExpiry">Date d'expiration</label>
                                <input 
                                    type="text" 
                                    id="cardExpiry" 
                                    className="form-control" 
                                    placeholder="MM/AA" 
                                    maxLength="5" 
                                    value={formData.cardExpiry}
                                    onChange={(e) => setFormData(prev => ({
                                        ...prev,
                                        cardExpiry: formatExpiry(e.target.value)
                                    }))}
                                    required 
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="cardCVC">CVC</label>
                                <input 
                                    type="text" 
                                    id="cardCVC" 
                                    className="form-control" 
                                    placeholder="123" 
                                    maxLength="3" 
                                    value={formData.cardCVC}
                                    onChange={handleInputChange}
                                    required 
                                />
                            </div>
                        </div>

                        <div className="form-group">
                            <label htmlFor="cardholderName">Nom du titulaire</label>
                            <input 
                                type="text" 
                                id="cardholderName" 
                                className="form-control" 
                                placeholder="Nom tel qu'affiché sur la carte" 
                                value={formData.cardholderName}
                                onChange={handleInputChange}
                                required 
                            />
                        </div>

                        <div className="order-summary">
                            <h4>Récapitulatif de la commande</h4>
                            <div className="summary-line">
                                <span>Sous-total:</span>
                                <span>{cartData?.panier?.total_ht?.toFixed(2) || '0.00'} Ar</span>
                            </div>
                            <div className="summary-line">
                                <span>Frais de livraison:</span>
                                <span>{cartData?.panier?.frais_livraison?.toFixed(2) || '0.00'} Ar</span>
                            </div>
                            <div className="summary-line total">
                                <span>Total:</span>
                                <span>{cartData?.panier?.total_ttc?.toFixed(2) || '0.00'} Ar</span>
                            </div>
                        </div>

                        <button 
                            type="submit" 
                            className="btn-submit"
                            disabled={loading || !cartData || cartData.lignes.length === 0}
                        >
                            {loading ? 'Traitement en cours...' : `Payer ${cartData?.panier?.total_ttc?.toFixed(2) || '0.00'} Ar`}
                        </button>
                    </form>

                    <div className="security-badge">
                        <span className="lock-icon">🔒</span>
                        Vos informations de paiement sont sécurisées et cryptées
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Paiement;