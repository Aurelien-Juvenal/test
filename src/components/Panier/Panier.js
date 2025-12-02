// components/CartItem.jsx
import React from 'react';
import { produitService } from '../../services/api';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
    faStore, 
    faHome, 
    faBox, 
    faShoppingCart, 
    faUser, 
    faSignInAlt, 
    faSignOutAlt,
    faCog,
    faSearch,
    faInfoCircle,
    faEnvelope,
    faShoppingBag,
    faSun,
    faMoon,
    faWineGlass,
    faSignOut,
    faTimes,
    faQuestionCircle,
    faInbox,
    faCalendar,
    faPlus,
    faList,
    faPlusCircle,
    faFolder,
    faUserPlus,
    faExchangeAlt,
    faMinus,
    faTrash,
    
  } from '@fortawesome/free-solid-svg-icons';
import { PanierStyle } from './PanierStyle';


const CartItem = ({ item, onUpdateQuantity, onRemoveItem }) => {
    const isLowStock = item.quantite > item.produit.stock;

    const handleQuantityChange = (e) => {
        const quantity = parseInt(e.target.value);
        if (!isNaN(quantity) && quantity >= 1) {
            onUpdateQuantity(item.id, quantity);
        }
    };

    // URL d'image par défaut si non fournie
    const getImageUrl = (imageUrl) => {
        if (!imageUrl || imageUrl.includes('placeholder.com')) {
            return '/images/default-product.jpg';
        }
        return imageUrl;
    };

    return (
        
        <PanierStyle>
<div className="cart-item" id='cart-item' data-item-id={item.id}>
            <div className="item-image" id='item-image'>
                <img 
                    src={produitService.getImageUrl(item.produit.image_url)} 
                    alt={item.produit.nom}
                    onError={(e) => {
                        e.target.src = '/images/default-product.jpg';
                    }}
                />
            </div>
            <div className="item-details" id='item-details'>
                <div className="item-header" id='item-header'>
                    <div>
                        <div className="item-name" id='item-name'>{item.produit.nom}</div>
                        <div className="item-price" id='item-price'>
    {item.produit.prix_ttc?.toFixed(2) || '0.00'} Ar
</div>
                        {isLowStock && (
                            <div className="stock-warning text-warning" id='stock-warning'>
                                Stock limité: {item.produit.stock} disponible(s)
                            </div>
                        )}
                    </div>
                    <button 
                        className="remove-btn" id='remove-btn' 
                        onClick={() => onRemoveItem(item.id)}
                        title="Supprimer"
                    >
                        <i className="fas fa-trash"></i>
                    </button>
                </div>
                <div className="item-actions" id='item-actions'>
                    <div className="quantity-controls" id='quantity-controls'>
                        <button 
                            className="quantity-btn" id='quantity-btn'
                            onClick={() => onUpdateQuantity(item.id, item.quantite - 1)}
                            disabled={item.quantite <= 1}
                        >
                            <FontAwesomeIcon icon={faMinus} />
                        </button>
                        <input 
                            type="number" 
                            className="quantity-input" id='quantity-input' 
                            value={item.quantite} 
                            min="1"
                            max={item.produit.stock}
                            onChange={handleQuantityChange}
                        />
                        <button 
                            className="quantity-btn" id='quantity-btn'
                            onClick={() => onUpdateQuantity(item.id, item.quantite + 1)}
                            disabled={item.quantite >= item.produit.stock}
                        >
                            <FontAwesomeIcon icon={faPlus} />
                        </button>
                    </div>
                    <div className="item-subtotal" id='item-subtotal'>
    {item.sous_total_ttc?.toFixed(2) || '0.00'} Ar
</div>
                    <button class="delete-btn" onclick="deleteItem(${item.id})">
                    <FontAwesomeIcon icon={faTrash} />
                        </button>
                </div>
            </div>
        </div>
        </PanierStyle>
        
    );
};

export default CartItem;