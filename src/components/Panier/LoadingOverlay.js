// components/LoadingOverlay.jsx
import React from 'react';

const LoadingOverlay = ({ show }) => {
    if (!show) return null;

    return (
        <div className="loading-overlay">
            <div className="loading-spinner">
                <i className="fas fa-spinner fa-spin"></i>
                <p>Mise à jour du panier...</p>
            </div>
        </div>
    );
};

export default LoadingOverlay;