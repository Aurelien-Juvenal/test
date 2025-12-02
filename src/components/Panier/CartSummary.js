// components/CartSummary.jsx
import React, { useState } from 'react';

const CartSummary = ({ cartData, onApplyPromoCode, onCheckout, disabled }) => {
    const [promoCode, setPromoCode] = useState('');

    const handleApplyPromo = () => {
        const success = onApplyPromoCode(promoCode);
        if (success) {
            setPromoCode('');
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleApplyPromo();
        }
    };

    return (
        <div className="cart-summary-section">
            <div className="cart-summary">
                <h3>Récapitulatif</h3>
                
                <div className="summary-details">
                    <div className="summary-row">
                        <span>Sous-total</span>
                        <span id="subtotal">{cartData.panier.total_ht.toFixed(2)} Ar</span>
                    </div>
                    <div className="summary-row">
                        <span>Frais de livraison</span>
                        <span id="shipping">
                            {cartData.panier.frais_livraison > 0 ? 
                                `${cartData.panier.frais_livraison.toFixed(2)} €` : 'Gratuit'}
                        </span>
                    </div>
                    <div className="summary-row">
                        <span>Remise</span>
                        <span id="discount">
                            {cartData.panier.remise > 0 ? 
                                `-${cartData.panier.remise.toFixed(2)} €` : '0,00 €'}
                        </span>
                    </div>
                    <div className="summary-divider"></div>
                    <div className="summary-row total">
                        <strong>Total TTC</strong>
                        <strong id="total">{cartData.panier.total_ttc} Ar</strong>
                    </div>
                </div>

                <div className="shipping-info">
                    <i className="fas fa-truck"></i>
                    <span>Livraison gratuite à partir de 50€ d'achat</span>
                </div>

                <button 
                    className="btn btn-primary btn-checkout" 
                    onClick={onCheckout}
                    disabled={disabled}
                >
                    <i className="fas fa-lock"></i> Procéder au paiement
                </button>

                <div className="security-info">
                    <i className="fas fa-shield-alt"></i>
                    <span>Paiement sécurisé SSL</span>
                </div>
            </div>

            {/* Promo Code */}
            <div className="promo-code">
                <h4>Code promo</h4>
                <div className="promo-input-group">
                    <input 
                        type="text" 
                        value={promoCode}
                        onChange={(e) => setPromoCode(e.target.value)}
                        onKeyPress={handleKeyPress}
                        placeholder="Entrez votre code promo"
                        className="promo-input"
                    />
                    <button 
                        className="btn btn-outline"
                        onClick={handleApplyPromo}
                    >
                        Appliquer
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CartSummary;