import React from 'react';
import ProductCard from './ProductCard';

const FeaturedProducts = ({ products }) => {
  return (
    <section className="featured-section">
      <div className="container">
        <h2 className="section-title">Featured Products</h2>
        <div className="products-grid">
          {products.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;