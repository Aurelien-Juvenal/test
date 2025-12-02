// components/CartPage.jsx
import React, { useEffect,useState } from 'react';
import { useCart } from './useCart';
import CartItem from './Panier';
import CartSummary from './CartSummary';
import LoadingOverlay from './LoadingOverlay';
import { PanierStyle } from './PanierStyle';
import Paiement from './Paiement';


const CartPage = () => {
    const {
        cartData,
        loading,
        promoMessage,
        updateQuantity,
        removeItem,
        applyPromoCode,
        proceedToCheckout,
        refreshCart
    } = useCart();

    const [showPayment, setShowPayment] = useState(false);


    const hasItems = cartData.lignes && cartData.lignes.length > 0;
    const handlePaymentSuccess = (response) => {
        console.log('Paiement réussi:', response);
        setShowPayment(false);
        refreshCart(); // Recharger le panier (qui devrait être vide maintenant)
    };

    const handlePaymentError = (error) => {
        console.error('Erreur de paiement:', error);
    };

    const handleProceedToPayment = () => {
        setShowPayment(true);
        window.scrollTo(0, 0);
    };
    // Recharger le panier périodiquement (optionnel)
    useEffect(() => {
        const interval = setInterval(() => {
            refreshCart();
        }, 30000); // Toutes les 30 secondes

        return () => clearInterval(interval);
    }, [refreshCart]);

    return (

       <PanierStyle>
       <div className="cart-page">
           <main className="main">
               <div className="container">
                   {/* Page Header */}
                   <div className="page-header">
                       <h1><i className="fas fa-shopping-cart"></i> 
                           {showPayment ? 'Paiement' : 'Mon Panier'}
                       </h1>
                       <p>
                           {showPayment 
                               ? 'Finalisez votre commande en toute sécurité' 
                               : 'Gérez vos articles et passez à la caisse'
                           }
                       </p>
                   </div>

                   {showPayment ? (
                       <Paiement 
                           cartData={cartData}
                           onPaymentSuccess={handlePaymentSuccess}
                           onPaymentError={handlePaymentError}
                       />
                   ) : (
                       <div className="cart-layout">
                           {/* Cart Items */}
                           <div className="cart-items-section">
                               {/* ... (le reste de votre code existant) ... */}
                               
                    {/* Empty State */}
                    {!hasItems && !loading && (
                        <div className="empty-cart">
                            <div className="empty-icon">
                                <i className="fas fa-shopping-cart"></i>
                            </div>
                            <h2>Votre panier est vide</h2>
                            <p>Découvrez nos produits et ajoutez-les à votre panier</p>
                            <a href="/boutique" className="btn btn-primary">
                                <i className="fas fa-store"></i> Découvrir la boutique
                            </a>
                        </div>
                    )}

                    {/* Cart Items List */}
                    {hasItems && (
                        <div className="cart-items">
                            <div className="cart-header">
                                <h3>Articles dans votre panier</h3>
                                <span className="items-count">
                                    {cartData.panier.nombre_articles} 
                                    article{cartData.panier.nombre_articles > 1 ? 's' : ''}
                                </span>
                            </div>

                            <div className="cart-items-list">
                                {cartData.lignes.map(item => (
                                    <CartItem
                                        key={item.id}
                                        item={item}
                                        onUpdateQuantity={updateQuantity}
                                        onRemoveItem={removeItem}
                                    />
                                ))}
                            </div>
                        </div>
                    )}
                
                           </div>

                           {/* Cart Summary */}
                           {hasItems && (
                               <CartSummary
                                   cartData={cartData}
                                   onApplyPromoCode={applyPromoCode}
                                   onCheckout={handleProceedToPayment} // Modifié ici
                                   disabled={!hasItems}
                               />
                           )}
                       </div>
                   )}

                   {/* Message Toast */}
                   {promoMessage && (
                       <div className={`toast-message ${promoMessage.type}`}>
                           {promoMessage.text}
                       </div>
                   )}
               </div>
           </main>

           <footer className="footer">
               <div className="container">
                   <p>&copy; 2024 E-Shop. Tous droits réservés.</p>
               </div>
           </footer>

           <LoadingOverlay show={loading} />
       </div>
   </PanierStyle>
    );
};

export default CartPage;