
import './section.css';
import React, { useState, useEffect } from 'react';
import image1 from '../../images/sans-bg/raisin.png';
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
    
  } from '@fortawesome/free-solid-svg-icons';
const Section = () => {

  
  return (
    <div class="container">
<section class="hero-section">
    <div class="container-fluid">
        <div id="heroCarousel" class="carousel slide" data-bs-ride="carousel">
            <div class="carousel-indicators">
                <button type="button" data-bs-target="#heroCarousel" data-bs-slide-to="0" class="active"></button>
                <button type="button" data-bs-target="#heroCarousel" data-bs-slide-to="1"></button>
                <button type="button" data-bs-target="#heroCarousel" data-bs-slide-to="2"></button>
            </div>

            <div class="carousel-inner">

                <div class="carousel-item active">
                    <div class="hero-slide">
                        <div class="row align-items-center">
                            <div class="col-md-6">
                                <div class="hero-content">
                                    <h2 class="hero-title">Xbox One Pro</h2>
                                    <h1 class="hero-subtitle">
                                        <span class="wireless-badge">Wireless</span> Controller
                                    </h1>
                                    <p class="hero-description">Revolution Pro Controller.</p>
                                    <button class="btn btn-primary btn-shop">
                                    <FontAwesomeIcon icon={faShoppingCart} /> Shop Now
                                    </button>
                                </div>
                            </div>
                            <div class="col-md-6">
                                <img src={image1} alt="Xbox Controller" class="hero-image" />
                            </div>
                        </div>
                    </div>
                </div>


                <div class="carousel-item">
                    <div class="hero-slide">
                        <div class="row align-items-center">
                            <div class="col-md-6">
                                <div class="hero-content">
                                    <h2 class="hero-title">PlayStation 5</h2>
                                    <h1 class="hero-subtitle">
                                        <span class="wireless-badge">Next Gen</span> Controller
                                    </h1>
                                    <p class="hero-description">Experience the next generation of gaming.</p>
                                    <button class="btn btn-primary btn-shop">
                                    <FontAwesomeIcon icon={faShoppingCart} />Shop Now
                                    </button>
                                </div>
                            </div>
                            <div class="col-md-6">
                                <img src={image1} alt="PS5 Controller" class="hero-image" />
                            </div>
                        </div>
                    </div>
                </div>


                <div class="carousel-item">
                    <div class="hero-slide ">
                        <div class="row align-items-center">
                            <div class="col-md-6">
                                <div class="hero-content">
                                    <h2 class="hero-title">Nintendo Switch</h2>
                                    <h1 class="hero-subtitle">
                                        <span class="wireless-badge">Pro</span> Controller
                                    </h1>
                                    <p class="hero-description">Portable gaming perfection.</p>
                                    <button class="btn btn-primary btn-shop">
                                    <FontAwesomeIcon icon={faShoppingCart} />Shop Now
                                    </button>
                                </div>
                            </div>
                            <div class="col-md-6">
                                <img src={image1} alt="Switch Controller" class="hero-image" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

           
            <button class="carousel-control-prev" type="button" data-bs-target="#heroCarousel" data-bs-slide="prev">
                <span class="carousel-control-prev-icon"></span>
            </button>
            <button class="carousel-control-next" type="button" data-bs-target="#heroCarousel" data-bs-slide="next">
                <span class="carousel-control-next-icon"></span>
            </button>
        </div>
    </div>
</section>


    </div>
    

  );
};

export default Section;