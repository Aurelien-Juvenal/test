import React from 'react';

const Footer = () => {
  return (
    <footer>
      <div className="container">
        <div className="footer-content">
          <div className="footer-section">
            <h3 className="footer-title">Zay</h3>
            <p>Your premier eCommerce destination for quality products and exceptional service.</p>
          </div>
          <div className="footer-section">
            <h3 className="footer-title">Categories</h3>
            <ul className="footer-links">
              <li><a href="#">Watches</a></li>
              <li><a href="#">Shoes</a></li>
              <li><a href="#">Accessories</a></li>
              <li><a href="#">Clothing</a></li>
            </ul>
          </div>
          <div className="footer-section">
            <h3 className="footer-title">Support</h3>
            <ul className="footer-links">
              <li><a href="#">FAQ</a></li>
              <li><a href="#">Shipping</a></li>
              <li><a href="#">Returns</a></li>
              <li><a href="#">Contact Us</a></li>
            </ul>
          </div>
        </div>
        <div className="copyright">
          &copy; 2025 Zay eCommerce. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;