// components/Navbar.js
import React from 'react';
import vin from "../../images/sans-bg/raisin.png"
import { ProductCardContainer } from '../login/ProductCard.styled';

const Inscrire = () => {

  
  
  return (
    <ProductCardContainer>
 <div class="container" id='container'>
        <div class="brand-section">
            <div class="brand-logo">Zay</div>
            <p class="brand-tagline">Create your account and discover our exclusive collection of premium watches.</p>
            
            <ul class="brand-features">
                <li>Premium watch collections</li>
                <li>Fast and secure checkout</li>
                <li>Exclusive member discounts</li>
                <li>24/7 customer support</li>
            </ul>
        </div>
        
        <div class="form-section">
            <div class="form-header">
                <h1 class="form-title">Register</h1>
                <p class="form-subtitle">Sign up to create account</p>
            </div>
            
            <form id="registerForm">
                <div class="form-group">
                    <label for="name">Name</label>
                    <input type="text" id="name" class="form-control" placeholder="Enter your full name" required />
                </div>
                
                <div class="form-group">
                    <label for="email">Email Address</label>
                    <input type="email" id="email" class="form-control" placeholder="Enter your email address" required />
                </div>
                
                <div class="form-group">
                    <label for="issued">Issued</label>
                    <div class="select-wrapper">
                        <select id="issued" class="form-control" required>
                            <option value="" disabled selected>Select issuing country</option>
                            <option value="US">United States</option>
                            <option value="UK">United Kingdom</option>
                            <option value="FR">France</option>
                            <option value="DE">Germany</option>
                            <option value="JP">Japan</option>
                            <option value="Other">Other</option>
                        </select>
                    </div>
                </div>
                
                <div class="form-group">
                    <label for="mobile">Mobile</label>
                    <input type="tel" id="mobile" class="form-control" placeholder="Enter your mobile number" required />
                </div>
                
                <div class="form-group">
                    <label for="password">Password</label>
                    <input type="password" id="password" class="form-control" placeholder="Create a strong password" required />
                </div>
                
                <div class="form-group">
                    <label for="device">Device</label>
                    <div class="select-wrapper">
                        <select id="device" class="form-control" required>
                            <option value="" disabled selected>Select your device</option>
                            <option value="android">Android</option>
                            <option value="ios">iOS</option>
                            <option value="windows">Windows</option>
                            <option value="mac">Mac</option>
                            <option value="other">Other</option>
                        </select>
                    </div>
                </div>
                
                <button type="submit" class="btn">Create Account</button>
            </form>
            
            <div class="login-link">
                Already have an Account? <a href="#">Sign in</a>
            </div>
            
            <div class="form-footer">
                By creating an account, you agree to our Terms of Service and Privacy Policy.
            </div>
        </div>
    </div>
    </ProductCardContainer>
   
  );
};

export default Inscrire;