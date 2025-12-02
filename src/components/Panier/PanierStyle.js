import styled from 'styled-components';

export const PanierStyle = styled.div`
:root {
    --primary-color: #3498db;
    --primary-dark: #2980b9;
    --secondary-color: #2ecc71;
    --danger-color: #e74c3c;
    --warning-color: #f39c12;
    --text-color: #333;
    --text-light: #666;
    --border-color: #e0e0e0;
    --bg-light: #f8f9fa;
    --shadow: 0 2px 10px rgba(0,0,0,0.1);
    --radius: 8px;
}




/* Main Content */
.main {
    padding: 2rem 0;
}

.page-header {
    text-align: center;
    margin-bottom: 3rem;
}

.page-header h1 {
    font-size: 2.5rem;
    margin-bottom: 0.5rem;
    color: var(--text-color);
}

.page-header p {
    color: var(--text-light);
    font-size: 1.1rem;
}

/* Cart Layout */
.cart-layout {
    display: grid;
    grid-template-columns: 1fr 400px;
    gap: 2rem;
    margin-bottom: 4rem;
}

/* Empty Cart */
.empty-cart {
    text-align: center;
    padding: 4rem 2rem;
    background: white;
    border-radius: var(--radius);
    box-shadow: var(--shadow);
}

.empty-icon {
    font-size: 4rem;
    color: var(--border-color);
    margin-bottom: 1rem;
}

.empty-cart h2 {
    margin-bottom: 1rem;
    color: var(--text-light);
}

.empty-cart p {
    color: var(--text-light);
    margin-bottom: 2rem;
}

/* Cart Items */
.cart-items {
    background: white;
    border-radius: var(--radius);
    box-shadow: var(--shadow);
    overflow: hidden;
}

.cart-header {
    padding: 1.5rem;
    border-bottom: 1px solid var(--border-color);
    display: flex;
    justify-content: space-between;
    align-items: center;
}

#cart-header h3 {
    font-size: 1.3rem;
}

#items-count {
    color: var(--text-light);
    font-size: 0.9rem;
}

#cart-items-list {
    padding: 0;
}

#cart-item {
    display: flex;
    padding: 1.5rem;
    border-bottom: 1px solid var(--border-color);
    transition: background-color 0.3s;
}

#cart-item:hover {
    background-color: var(--bg-light);
}

#cart-item:last-child {
    border-bottom: none;
}

/* panier.css - Ajouts pour les images */
#item-image {
    width: 100px;
    height: 100px;
    border-radius: var(--radius);
    overflow: hidden;
    margin-right: 1.5rem;
    flex-shrink: 0;
    background-color: #f8f9fa;
    display: flex;
    align-items: center;
    justify-content: center;
}

#item-image img {
    width: 100%;
    height: 100%;
    object-fit: cover;
}

/* Image par défaut */
.item-image img[src*="default-product.jpg"] {
    padding: 20px;
    background-color: #e9ecef;
}

/* Responsive */
@media (max-width: 768px) {
    #item-image {
        width: 80px;
        height: 80px;
        margin-right: 1rem;
    }
}

#item-details {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
}

#item-header {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    margin-bottom: 1rem;
}

#item-name {
    font-weight: 600;
    font-size: 1.1rem;
    margin-bottom: 0.5rem;
}

#item-price {
    font-weight: 600;
    color: var(--primary-color);
    font-size: 1.1rem;
}

#item-actions {
    display: flex;
    align-items: center;
    gap: 1rem;
}

#quantity-controls {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    border: 1px solid var(--border-color);
    border-radius: var(--radius);
    padding: 0.25rem;
}

#quantity-btn {
    
    border: none;
    width: 32px;
    height: 32px;
    border-radius: 4px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: background-color 0.3s;
    color: var(--text-color);
}



#quantity-input {
    width: 50px;
    text-align: center;
    border: none;
    background: none;
    font-weight: 600;
    font-size: 1rem;
}

#quantity-input:focus {
    outline: none;
}

#remove-btn {
    background: none;
    border: none;
    color: var(--danger-color);
    cursor: pointer;
    padding: 0.5rem;
    border-radius: 4px;
    transition: background-color 0.3s;
}

#remove-btn:hover {
    background-color: rgba(231, 76, 60, 0.1);
}

#item-subtotal {
    text-align: right;
    font-weight: 600;
    color: var(--text-color);
}

#stock-warning {
    color: var(--warning-color);
    font-size: 0.9rem;
    margin-top: 0.5rem;
}
.delete-btn {
    background: none;
    border: none;
    color: #e74c3c;
    cursor: pointer;
    font-size: 16px;
}

.delete-btn:hover {
    color: #c0392b;
}

/* Cart Summary */
.cart-summary {
    background: white;
    border-radius: var(--radius);
    box-shadow: var(--shadow);
    padding: 1.5rem;
    position: sticky;
    top: 100px;
}

.cart-summary h3 {
    margin-bottom: 1.5rem;
    font-size: 1.3rem;
}

.summary-details {
    margin-bottom: 1.5rem;
}

.summary-row {
    display: flex;
    justify-content: space-between;
    margin-bottom: 1rem;
    color: var(--text-light);
}

.summary-row.total {
    font-size: 1.2rem;
    color: var(--text-color);
    margin-bottom: 0;
}

.summary-divider {
    height: 1px;
    background: var(--border-color);
    margin: 1rem 0;
}

.shipping-info {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    color: var(--text-light);
    font-size: 0.9rem;
    margin-bottom: 1.5rem;
    padding: 0.75rem;
    background: var(--bg-light);
    border-radius: var(--radius);
}

.btn-checkout {
    width: 100%;
    padding: 1rem;
    font-size: 1.1rem;
    margin-bottom: 1rem;
}

.security-info {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    justify-content: center;
    color: var(--text-light);
    font-size: 0.9rem;
}

/* Promo Code */
.promo-code {
    background: white;
    border-radius: var(--radius);
    box-shadow: var(--shadow);
    padding: 1.5rem;
    margin-top: 1rem;
}

.promo-code h4 {
    margin-bottom: 1rem;
}

.promo-input-group {
    display: flex;
    gap: 0.5rem;
}

.promo-input {
    flex: 1;
    padding: 0.75rem;
    border: 1px solid var(--border-color);
    border-radius: var(--radius);
    font-size: 1rem;
}

.promo-input:focus {
    outline: none;
    border-color: var(--primary-color);
}

.promo-message {
    margin-top: 0.5rem;
    font-size: 0.9rem;
    min-height: 20px;
}

.promo-message.success {
    color: var(--secondary-color);
}

.promo-message.error {
    color: var(--danger-color);
}

/* Recommended Section */
.recommended-section {
    margin-top: 3rem;
}

.recommended-section h2 {
    margin-bottom: 1.5rem;
    text-align: center;
}

.recommended-products {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 1.5rem;
}

/* Buttons */
.btn {
    padding: 0.75rem 1.5rem;
    border: none;
    border-radius: var(--radius);
    font-weight: 600;
    cursor: pointer;
    text-decoration: none;
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    transition: all 0.3s;
    font-size: 1rem;
}


.btn-primary:hover:not(:disabled) {
  
    transform: translateY(-2px);
}

.btn-primary:disabled {
 
    cursor: not-allowed;
    transform: none;
}

.btn-outline {
    background: white;
    color: var(--primary-color);
    border: 1px solid var(--primary-color);
}

.btn-outline:hover {
    background: var(--primary-color);
    color: white;
}

/* Footer */
.footer {
    background: white;
    padding: 2rem 0;
    text-align: center;
    color: var(--text-light);
    border-top: 1px solid var(--border-color);
}

/* Loading Overlay */
.loading-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(255, 255, 255, 0.9);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 2000;
}

.loading-spinner {
    text-align: center;
    background: white;
    padding: 2rem;
    border-radius: var(--radius);
    box-shadow: var(--shadow);
}

.loading-spinner i {
    font-size: 2rem;
    color: var(--primary-color);
    margin-bottom: 1rem;
}

/* Utility Classes */
.hidden {
    display: none !important;
}

.text-success {
    color: var(--secondary-color);
}

.text-danger {
    color: var(--danger-color);
}

.text-warning {
    color: var(--warning-color);
}

/* Responsive */
@media (max-width: 968px) {
    .cart-layout {
        grid-template-columns: 1fr;
    }
    
    .cart-summary {
        position: static;
    }
}

@media (max-width: 768px) {
    .navbar {
        flex-direction: column;
        gap: 1rem;
    }
    
    .nav-links {
        gap: 1rem;
    }
    
    .cart-item {
        flex-direction: column;
    }
    
    .item-image {
        margin-right: 0;
        margin-bottom: 1rem;
        align-self: center;
    }
    
    .item-header {
        flex-direction: column;
        align-items: flex-start;
    }
    
    .item-price {
        margin-top: 0.5rem;
    }
    
    .item-actions {
        justify-content: space-between;
        margin-top: 1rem;
    }
    
    .promo-input-group {
        flex-direction: column;
    }
}
/* styles/Cart.css */
/* Copiez tout le CSS de votre fichier html.css existant */
/* Ajoutez ces styles supplémentaires pour React */

.toast-message {
    position: fixed;
    top: 20px;
    right: 20px;
    padding: 1rem 1.5rem;
    border-radius: 8px;
    box-shadow: 0 4px 12px rgba(0,0,0,0.15);
    z-index: 3000;
    border: 1px solid;
    font-weight: 500;
}

.toast-message.success {
    background: #d4edda;
    color: #155724;
    border-color: #c3e6cb;
}

.toast-message.error {
    background: #f8d7da;
    color: #721c24;
    border-color: #f5c6cb;
}

.cart-page {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
}

.cart-page .main {
    flex: 1;
}

.payment-methods {
    display: flex;
    gap: 15px;
    margin-top: 20px;
}

.payment-method {
    flex: 1;
    text-align: center;
    padding: 15px;
    border: 2px solid #eee;
    border-radius: 8px;
    cursor: pointer;
    transition: all 0.3s ease;
}

.payment-method:hover {
    border-color: #1a2a57;
}

.payment-method.active {
    border-color: #1a2a57;
    background-color: #f8f9ff;
}

.method-icon {
    font-size: 24px;
    margin-bottom: 8px;
}

.method-name {
    font-size: 14px;
    font-weight: 500;
}
.btn-submit {
    background: #27ae60;
    color: white;
    border: none;
    padding: 15px 30px;
    border-radius: 8px;
    font-size: 16px;
    font-weight: 600;
    cursor: pointer;
    transition: background 0.3s ease;
    width: 100%;
    margin-top: 10px;
}

.btn-submit:hover {
    background: #219653;
}
.order-summary {
    background: #f8f9fa;
    padding: 15px;
    border-radius: 8px;
    margin: 20px 0;
}

.order-summary h4 {
    margin-bottom: 15px;
    color: #333;
}

.summary-line {
    display: flex;
    justify-content: space-between;
    margin-bottom: 10px;
}

.summary-line.total {
    border-top: 1px solid #ddd;
    padding-top: 10px;
    font-weight: bold;
    font-size: 1.1em;
}

.btn-submit:disabled {
    opacity: 0.6;
    cursor: not-allowed;
}

.payment-section {
    max-width: 500px;
    margin: 0 auto;
}
`;