import styled from 'styled-components';

export const ProduitStyle = styled.div`
:root {
    --primary-blue: #4F46E5;
    --light-bg: #F8F9FA;
    --discount-red: #E83E6D;
    --discount-yellow: #FFC107;
}
[data-theme="dark"] {
    --primary-blue: #1a1a1a;
    --light-bg: #2d2d2d;
    --text-primary: #ffffff;
    --text-secondary: #b0b0b0;
    --border-color: #404040;
    --shadow: 0 0.125rem 0.25rem rgba(0, 0, 0, 0.5);
  }
#container_produit {
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    background-color: var(--light-bg);
}

/* Header */




/* Product Grid */
.products-section {
    padding: 40px 0;
}

.product-card {
    background: white;
    border-radius: 8px;
    overflow: hidden;
    transition: all 0.3s ease;
    position: relative;
    height: 100%;
    display: flex;
    flex-direction: column;
    box-shadow: 0 1px 3px rgba(0,0,0,0.1);
}

.product-card:hover {
    box-shadow: 0 4px 12px rgba(0,0,0,0.15);
    transform: translateY(-4px);
}

/* Wishlist Icon */
.wishlist-icon {
    position: absolute;
    top: 15px;
    left: 15px;
    width: 40px;
    height: 40px;
    background-color: #E8E8F5;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    z-index: 10;
    transition: all 0.3s;
}

.wishlist-icon a:hover {
    background-color: #D0D0E8;
    color: #ca3838;
}

.wishlist-icon a {
    background-color: transparent;
    text-decoration: none;
    color: #696868;
    font-size: 18px;
}

/* Discount Badge */
.discount-badge {
    position: absolute;
    top: 15px;
    right: 15px;
    padding: 5px 12px;
    border-radius: 20px;
    font-weight: bold;
    font-size: 12px;
    color: white;
    z-index: 10;
}

.discount-red {
    background-color: var(--discount-red);
}

.discount-yellow {
    background-color: var(--discount-yellow);
    color: #333;
}

/* Product Image */
.product-image {
    width: 100%;
    height: 220px;
    object-fit: contain;
    padding: 30px 20px;
    background-color: #F5F5F5;
}

/* Product Info */
.product-info {
    padding: 20px;
    flex-grow: 1;
    display: flex;
    flex-direction: column;
}

.product-price {
    display: flex;
    align-items: center;
    gap: 8px;
    margin-bottom: 8px;
}

.original-price {
    color: #999;
    text-decoration: line-through;
    font-size: 13px;
}

.current-price {
    font-size: 18px;
    font-weight: bold;
    color: #333;
}

.price-unit {
    color: #999;
    font-size: 12px;
}

.seller-info {
    color: #999;
    font-size: 13px;
    margin-bottom: 8px;
    display: flex;
    align-items: center;
    gap: 5px;
}

.seller-info i {
    color: #4F46E5;
}

.product-title {
    font-size: 14px;
    font-weight: 600;
    color: #333;
    margin-bottom: 12px;
    line-height: 1.4;
    min-height: 42px;
}

.product-rating {
    display: flex;
    align-items: center;
    gap: 8px;
    margin-bottom: 12px;
    font-size: 13px;
}

.stars {
    color: #FFC107;
}

.sold-info {
    color: #999;
    font-size: 12px;
}

/* Add to Cart Button */
.btn-add-cart {
    width: 100%;
    padding: 12px;
    border: none;
    border-radius: 5px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
}

.btn-add-cart-primary {
    background-color: var(--primary-blue);
    color: white;
}

.btn-add-cart-primary:hover {
    background-color: #4338CA;
}

.btn-add-cart-light {
    background-color: #E8E8F5;
    color: var(--primary-blue);
}

.btn-add-cart-light:hover {
    background-color: #D0D0E8;
}

@media (max-width: 768px) {
    .product-card {
        margin-bottom: 20px;
    }

}
/* Pagination Styles */
.pagination-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 2rem 0;
    gap: 1rem;
  }
  
  .pagination-info {
    color: #666;
    font-size: 0.9rem;
  }
  
  .pagination {
    display: flex;
    gap: 0.5rem;
    align-items: center;
  }
  
  .page-btn {
    padding: 0.5rem 1rem;
    border: 1px solid #ddd;
    background: white;
    color: #333;
    cursor: pointer;
    border-radius: 4px;
    transition: all 0.3s ease;
    min-width: 40px;
    text-align: center;
  }
  
  .page-btn:hover {
    background: #f8f9fa;
    border-color: #007bff;
  }
  
  .page-btn.active {
    background: #007bff;
    color: white;
    border-color: #007bff;
  }
  
  .page-btn:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
  
  .page-ellipsis {
    padding: 0.5rem;
    color: #666;
  }
  
  /* Responsive */
  @media (max-width: 768px) {
    .pagination-container {
      flex-direction: column;
    }
    
    .pagination {
      flex-wrap: wrap;
      justify-content: center;
    }
    
    .page-btn {
      padding: 0.4rem 0.8rem;
      min-width: 35px;
    }
  }

/* Styles pour la barre de recherche */
.search-container {
    margin-top: 20px;
  }
  
  .search-form {
    max-width: 600px;
    margin: 0 auto;
  }
  
  .search-input-group {
    position: relative;
    display: flex;
    align-items: center;
  }
  
  .search-input {
    flex: 1;
    padding: 12px 50px 12px 20px;
    border: 2px solid #e0e0e0;
    border-radius: 25px;
    font-size: 16px;
    transition: all 0.3s ease;
  }
  
  .search-input:focus {
    outline: none;
    border-color: #007bff;
    box-shadow: 0 0 0 3px rgba(0, 123, 255, 0.1);
  }
  
  .search-btn {
    position: absolute;
    right: 40px;
    background: none;
    border: none;
    color: #666;
    cursor: pointer;
    padding: 10px;
  }
  
  .clear-search-btn {
    position: absolute;
    right: 10px;
    background: none;
    border: none;
    color: #999;
    cursor: pointer;
    padding: 10px;
  }
  
  .clear-search-btn:hover {
    color: #666;
  }
  
  .search-info {
    text-align: center;
    margin-top: 10px;
    color: #666;
  }
  
  .btn-clear-search {
    background: #6c757d;
    color: white;
    border: none;
    padding: 5px 15px;
    border-radius: 15px;
    cursor: pointer;
    margin-left: 10px;
    font-size: 14px;
  }
  
  .btn-clear-search:hover {
    background: #5a6268;
  }
  
  /* Styles pour les résultats vides */
  .no-results {
    text-align: center;
    padding: 60px 20px;
    color: #666;
  }
  
  .no-results h3 {
    margin-bottom: 10px;
    color: #333;
  }
  
  .no-results p {
    margin-bottom: 20px;
  }







  
`;