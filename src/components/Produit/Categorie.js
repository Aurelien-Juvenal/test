// CategorySlider.jsx
import React, { useState, useEffect, useRef, useCallback } from 'react';
import './CategorySlider.css';
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
    faChevronLeft,
    faChevronRight,
    
  } from '@fortawesome/free-solid-svg-icons';

const CategorySlider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [slidesPerView, setSlidesPerView] = useState(5);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const autoSlideInterval = useRef(null);
  const sliderContainerRef = useRef(null);
  const startXRef = useRef(0);

  // Données des catégories
  const categories = [
    {
      id: 1,
      name: "Accessories",
      icon: "fas fa-headphones",
      products: "45+ Products",
      image: "https://via.placeholder.com/300x100/3B82F6/FFFFFF?text=Accessories",
      color: "#3B82F6"
    },
    {
      id: 2,
      name: "Mobile",
      icon: "fas fa-mobile-alt",
      products: "125+ Products",
      image: "https://via.placeholder.com/300x100/EF4444/FFFFFF?text=Mobile",
      color: "#EF4444"
    },
    {
      id: 3,
      name: "Tablets",
      icon: "fas fa-tablet-alt",
      products: "90+ Products",
      image: "https://via.placeholder.com/300x100/10B981/FFFFFF?text=Tablets",
      color: "#10B981"
    },
    {
      id: 4,
      name: "Laptops",
      icon: "fas fa-laptop",
      products: "80+ Products",
      image: "https://via.placeholder.com/300x100/F59E0B/FFFFFF?text=Laptops",
      color: "#F59E0B"
    },
    {
      id: 5,
      name: "Televisions",
      icon: "fas fa-tv",
      products: "60+ Products",
      image: "https://via.placeholder.com/300x100/8B5CF6/FFFFFF?text=Televisions",
      color: "#8B5CF6"
    },
    {
      id: 6,
      name: "Cameras",
      icon: "fas fa-camera",
      products: "35+ Products",
      image: "https://via.placeholder.com/300x100/EC4899/FFFFFF?text=Cameras",
      color: "#EC4899"
    },
    {
      id: 7,
      name: "Gaming",
      icon: "fas fa-gamepad",
      products: "70+ Products",
      image: "https://via.placeholder.com/300x100/06B6D4/FFFFFF?text=Gaming",
      color: "#06B6D4"
    }
  ];

  // Calcul du nombre de slides visibles selon la largeur d'écran
  const getSlidesPerView = useCallback(() => {
    const width = window.innerWidth;
    if (width < 576) return 1;
    if (width < 768) return 2;
    if (width < 992) return 3;
    if (width < 1200) return 4;
    return 5;
  }, []);

  // Mise à jour responsive
  useEffect(() => {
    const handleResize = () => {
      const newSlidesPerView = getSlidesPerView();
      setSlidesPerView(newSlidesPerView);
      setCurrentIndex(0); // Reset à la première slide
    };

    window.addEventListener('resize', handleResize);
    handleResize(); // Initial call

    return () => window.removeEventListener('resize', handleResize);
  }, [getSlidesPerView]);

  // Défilement automatique
  useEffect(() => {
    if (!isAutoPlaying) return;

    autoSlideInterval.current = setInterval(() => {
      nextSlide();
    }, 3000);

    return () => {
      if (autoSlideInterval.current) {
        clearInterval(autoSlideInterval.current);
      }
    };
  }, [isAutoPlaying, currentIndex, categories.length, slidesPerView]);

  // Navigation
  const nextSlide = useCallback(() => {
    const maxIndex = categories.length - slidesPerView;
    setCurrentIndex(prev => prev >= maxIndex ? 0 : prev + 1);
  }, [categories.length, slidesPerView]);

  const prevSlide = useCallback(() => {
    const maxIndex = categories.length - slidesPerView;
    setCurrentIndex(prev => prev <= 0 ? maxIndex : prev - 1);
  }, [categories.length, slidesPerView]);

  const goToSlide = useCallback((slideIndex) => {
    setCurrentIndex(slideIndex * slidesPerView);
  }, [slidesPerView]);

  // Gestion du survol
  const handleMouseEnter = () => {
    setIsAutoPlaying(false);
  };

  const handleMouseLeave = () => {
    setIsAutoPlaying(true);
  };

  // Gestion du touch pour mobile
  const handleTouchStart = (e) => {
    startXRef.current = e.touches[0].clientX;
    setIsAutoPlaying(false);
  };

  const handleTouchEnd = (e) => {
    const endX = e.changedTouches[0].clientX;
    if (startXRef.current - endX > 50) {
      nextSlide(); // Swipe gauche
    } else if (endX - startXRef.current > 50) {
      prevSlide(); // Swipe droite
    }
    setIsAutoPlaying(true);
  };

  // Calcul de la transformation
  const getTransform = () => {
    return `translateX(-${currentIndex * (100 / slidesPerView)}%)`;
  };

  // Calcul des dots
  const totalDots = Math.ceil(categories.length / slidesPerView);
  const activeDotIndex = Math.floor(currentIndex / slidesPerView);

  return (
    <section className="py-5 categories-slider">
      <div className="container">
        <h2 className="text-center mb-4">Nos Catégories</h2>
        
        <div className="position-relative">
          {/* Boutons de navigation */}
          <button 
            className="slider-nav slider-prev"
            onClick={() => {
              setIsAutoPlaying(false);
              prevSlide();
              setTimeout(() => setIsAutoPlaying(true), 3000);
            }}
          >
            <FontAwesomeIcon icon={faChevronLeft} />
          </button>
          
          <button 
            className="slider-nav slider-next"
            onClick={() => {
              setIsAutoPlaying(false);
              nextSlide();
              setTimeout(() => setIsAutoPlaying(true), 3000);
            }}
          >
            <FontAwesomeIcon icon={faChevronRight} />
          </button>

          {/* Conteneur du diaporama */}
          <div 
            ref={sliderContainerRef}
            className="slider-container"
            style={{ transform: getTransform() }}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
          >
            {categories.map((category) => (
              <div key={category.id} className="category-slide">
                <div className="category-card card text-center">
                  <img 
                    src={category.image} 
                    alt={category.name}
                    className="category-image"
                  />
                  <div className="card-body">
                    <i className={`${category.icon} fa-2x text-primary mb-2`}></i>
                    <h5 className="card-title">{category.name}</h5>
                    <span className="stats-badge">{category.products}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Indicateurs de points */}
          <div className="slider-dots">
            {Array.from({ length: totalDots }).map((_, index) => (
              <span
                key={index}
                className={`dot ${index === activeDotIndex ? 'active' : ''}`}
                onClick={() => goToSlide(index)}
              ></span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default CategorySlider;