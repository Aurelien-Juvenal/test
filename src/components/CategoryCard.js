import React, { useState, useEffect, useRef } from 'react';

const CategoryCard = ({ category }) => {
  const [productCount, setProductCount] = useState(category.stats.products);
  const cardRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.1 }
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => {
      if (cardRef.current) {
        observer.unobserve(cardRef.current);
      }
    };
  }, []);

  // Simuler les mises à jour en temps réel
  useEffect(() => {
    const interval = setInterval(() => {
      const randomIncrement = Math.floor(Math.random() * 10);
      setProductCount(prev => prev + randomIncrement);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const handleCardClick = () => {
    window.location.href = `products.html?category=${category.id}`;
  };

  return (
    <div 
      ref={cardRef}
      className="category-card fade-in-up" 
      data-category={category.id}
      onClick={handleCardClick}
    >
      <div 
        className="category-image" 
        style={{ backgroundImage: `url(${category.image})` }}
      >
        <div className="category-overlay">
          <h2 className="category-name">{category.name}</h2>
        </div>
      </div>
      <div className="category-info">
        <p className="category-description">{category.description}</p>
        <a href="#" className="btn-explore" onClick={(e) => e.stopPropagation()}>
          Explore {category.name}
        </a>
        <div className="category-stats">
          <div className="stat">
            <div className="stat-value">{productCount}+</div>
            <div className="stat-label">Products</div>
          </div>
          <div className="stat">
            <div className="stat-value">{category.stats.brands}</div>
            <div className="stat-label">Brands</div>
          </div>
          <div className="stat">
            <div className="stat-value">{category.stats.rating}</div>
            <div className="stat-label">Rating</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryCard;