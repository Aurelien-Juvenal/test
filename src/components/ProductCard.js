import React from 'react';

const ProductCard = ({ product }) => {
  const getImageText = () => {
    switch (product.category) {
      case 'watches': return 'Watch Image';
      case 'shoes': return 'Shoe Image';
      case 'accessories': return 'Accessory Image';
      default: return 'Product Image';
    }
  };

  return (
    <div className="product-card">
      <div className="product-image">
        <span>{getImageText()}</span>
      </div>
      <div className="product-info">
        <h3 className="product-name">{product.name}</h3>
        <div className="product-price">${product.price.toFixed(2)}</div>
      </div>
    </div>
  );
};

export default ProductCard;