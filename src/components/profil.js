import React, { useState, useEffect } from 'react';
import { itemsAPI } from '../services/api';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter,Route,Routes,Navigate,Link } from 'react-router-dom';
import '../css/profil.css'
import { profilAPI } from '../services/api';

// ClientsList.jsx


const Profil = () => {
  const [profil, setProfil] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    chargerProfil();
  }, []);

  const chargerProfil = async () => {
    try {
      setLoading(true);
      const response = await profilAPI.getProfil();
      setProfil(response.client);
    } catch (err) {
      setError(err.response?.data?.error || 'Erreur lors du chargement du profil');
      console.error('Erreur:', err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div>Chargement du profil...</div>;
  if (error) return <div>Erreur: {error}</div>;
  if (!profil) return <div>Aucun profil trouvé</div>;
  return (
    <div class="profile-container">
        
        <div class="profile-header">
            <div class="profile-avatar">
                AJ
            </div>
            <div class="profile-info">
                <h1 class="profile-name">
                    Aurelien Juvenal 
                    <span class="badge-premium">Diable</span>
                </h1>
                <div class="profile-username">@aurelienjuvenal</div>
                
                <div class="profile-stats">
                    <div class="stat-item">
                        <span class="stat-number">4,9 K</span>
                        <span class="stat-label">Followers</span>
                    </div>
                    <div class="stat-item">
                        <span class="stat-number">414</span>
                        <span class="stat-label">Suivi(e)s</span>
                    </div>
                    <div class="stat-item">
                        <span class="stat-number">127</span>
                        <span class="stat-label">Publications</span>
                    </div>
                </div>
            </div>
        </div>
        
        
        <div class="profile-content">
            
            <div class="action-buttons">
                <button class="btn btn-primary-custom">
                    <i class="fas fa-plus me-2"></i>Suivre
                </button>
                <button class="btn btn-outline-custom">
                    <i class="fas fa-envelope me-2"></i>Message
                </button>
                <button class="btn btn-outline-custom">
                    <i class="fas fa-share-alt me-2"></i>Partager
                </button>
            </div>
            
            
            <div class="profile-bio">
                <h3 class="bio-title">À propos</h3>
                <p class="bio-content">
                    Passionné par l'innovation et la création de contenu. Je partage mes découvertes 
                    et expériences dans le domaine du design et de la technologie. Toujours à la 
                    recherche de nouveaux défis et collaborations créatives.
                </p>
                
                <div class="social-links">
                    <a href="#" class="social-link">
                        <i class="fab fa-twitter"></i>
                    </a>
                    <a href="#" class="social-link">
                        <i class="fab fa-instagram"></i>
                    </a>
                    <a href="#" class="social-link">
                        <i class="fab fa-linkedin-in"></i>
                    </a>
                    <a href="#" class="social-link">
                        <i class="fab fa-github"></i>
                    </a>
                </div>
            </div>
            
           
            <div class="recent-activity">
                <h3 class="section-title">Activité récente</h3>
                <div class="activity-grid">
                    <div class="activity-card">
                        <div class="activity-icon">
                            <i class="fas fa-pencil-alt"></i>
                        </div>
                        <h4 class="activity-title">Nouvelle publication</h4>
                        <p class="activity-description">
                            Partagé un tutoriel sur les dernières tendances en design web.
                        </p>
                    </div>
                    
                    <div class="activity-card">
                        <div class="activity-icon">
                            <i class="fas fa-heart"></i>
                        </div>
                        <h4 class="activity-title">Interaction</h4>
                        <p class="activity-description">
                            A aimé 15 publications cette semaine.
                        </p>
                    </div>
                    
                    <div class="activity-card">
                        <div class="activity-icon">
                            <i class="fas fa-users"></i>
                        </div>
                        <h4 class="activity-title">Nouveaux followers</h4>
                        <p class="activity-description">
                            +42 nouveaux followers ce mois-ci.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </div>
  );
};

export default Profil;