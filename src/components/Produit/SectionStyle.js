import styled from 'styled-components';

export const SectionStyle = styled.div`

.hero-section {
    background-color: #f8f9fa;
    padding: 3rem 0;
}

.hero-slide {
    padding: 3rem 2rem;
    min-height: 500px;
    display: flex;
    align-items: center;
}

.hero-content {
    animation: slideIn 0.6s ease-out;
}

@keyframes slideIn {
    from {
        opacity: 0;
        transform: translateX(-50px);
    }
    to {
        opacity: 1;
        transform: translateX(0);
    }
}

.hero-title {
    font-size: 2rem;
    color: #666;
    margin-bottom: 0.5rem;
}

.hero-subtitle {
    font-size: 1.5rem;
    font-weight: bold;
    color: #333;
    margin-bottom: 1rem;
    display: flex;
    align-items: center;
    gap: 0.5rem;
}

.wireless-badge {
    background-color: #4860ff;
    color: white;
    padding: 0.2rem 1rem;
    border-radius: 5px;
    font-size: 2rem;
}

.hero-description {
    font-size: 1.1rem;
    color: #666;
    margin-bottom: 2rem;
}

.btn-shop {
    border-radius: 50px;
    padding: 0.8rem 2rem;
    font-weight: 600;
    font-size: 1.1rem;
}

.hero-image {
    max-width: 100%;
    height: 500px;
    animation: fadeInRight 0.6s ease-out;
}

@keyframes fadeInRight {
    from {
        opacity: 0;
        transform: translateX(50px);
    }
    to {
        opacity: 1;
        transform: translateX(0);
    }
}

/* Carousel Indicators */
.carousel-indicators button {
    background-color: #4860ff;
    border-color: #4860ff;
}

.carousel-indicators button.active {
    background-color: #4860ff;
}

/* Products Section */
.products-section {
    background-color: #fff;
}

.section-title {
    font-size: 2rem;
    font-weight: bold;
    color: #333;
}

`;