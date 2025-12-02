import React, { useState, useEffect } from 'react';
import { itemsAPI } from '../services/api';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter,Route,Routes,Navigate,Link } from 'react-router-dom';
import { profilAPI } from '../services/api';
import { useAuth } from '../context/Authentification';
import { ProfilStyle } from '../css/ProfilStyle';

// ClientsList.jsx


const Profil = () => {
  const { client, logout, isAuthenticated } = useAuth();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    nom: '',
    prenom: '',
    email: '',
    telephone: ''
  });
    // Initialiser le formulaire avec les données du client
    useEffect(() => {
        if (client) {
          setFormData({
            nom: client.nom || '',
            prenom: client.prenom || '',
            email: client.email || '',
            description: client.description || '', 
            telephone: client.telephone || ''
          });
        }
      }, [client]);

      if (!client) {
        return (
          <div className="dashboard">
            <div className="loading">Chargement du profil...</div>
          </div>
        );
      }
    
    

  return (
    <ProfilStyle>
    <div class="profile-container" id='profile-container'>
        
        <div class="profile-header" id='profile-header'>
            <div class="profile-avatar" id='profile-avatar'>
                AJ
            </div>
            <div class="profile-info" id='profile-info'>
                <h1 class="profile-name" id='profile-name'>
                    {client.nom}
                    <span class="badge-premium" id='badge-premium'>Diable</span>
                </h1>
                <div class="profile-username" id='profile-username'>{client.email}</div>
                
                <div class="profile-stats" id='profile-stats'>
                    <div class="stat-item" id='stat-item'>
                        <span class="stat-number" id='stat-number'>4,9 K</span>
                        <span class="stat-label" id='stat-label'>Followers</span>
                    </div>
                    <div class="stat-item" id='stat-item'>
                        <span class="stat-number" id='stat-number'>414</span>
                        <span class="stat-label" id='stat-label'>Suivi(e)s</span>
                    </div>
                    <div class="stat-item" id='stat-item'>
                        <span class="stat-number" id='stat-number'>127</span>
                        <span class="stat-label" id='stat-label'>Publications</span>
                    </div>
                </div>
            </div>
        </div>
        
        
        <div class="profile-content" id='profile-content'>
            
            <div class="action-buttons" id='action-buttons'>
                <button class="btn btn-primary-custom" id='btn btn-primary-custom'>
                    <i class="fas fa-plus me-2"></i>Suivre
                </button>
                <button class="btn btn-outline-custom" id='btn btn-outline-custom'>
                    <i class="fas fa-envelope me-2"></i>Message
                </button>
                <button class="btn btn-outline-custom" id='btn btn-outline-custom'>
                    <i class="fas fa-share-alt me-2"></i>Partager
                </button>
            </div>
            
            
            <div class="profile-bio" id='profile-bio'>
                <h3 class="bio-title" id='bio-title'>À propos</h3>
                <p class="bio-content" id='bio-content'>
                    Passionné par l'innovation et la création de contenu. Je partage mes découvertes 
                    et expériences dans le domaine du design et de la technologie. Toujours à la 
                    recherche de nouveaux défis et collaborations créatives.
                </p>
                
                <div class="social-links" id='social-links'>
                    <a href="#" class="social-link" id='social-link'>
                        <i class="fab fa-twitter"></i>
                    </a>
                    <a href="#" class="social-link" id='social-link'>
                        <i class="fab fa-instagram"></i>
                    </a>
                    <a href="#" class="social-link" id='social-link'>
                        <i class="fab fa-linkedin-in"></i>
                    </a>
                    <a href="#" class="social-link" id='social-link'>
                        <i class="fab fa-github"></i>
                    </a>
                </div>
            </div>
            
           
            <div class="recent-activity" id='recent-activity'>
                <h3 class="section-title" id='section-title'>Activité récente</h3>
                <div class="activity-grid" id='activity-grid'>
                    <div class="activity-card" id='activity-card'>
                        <div class="activity-icon" id='activity-icon'>
                            <i class="fas fa-pencil-alt"></i>
                        </div>
                        <h4 class="activity-title" id='activity-title'>Nouvelle publication</h4>
                        <p class="activity-description" id='activity-description'>
                            Partagé un tutoriel sur les dernières tendances en design web.
                        </p>
                    </div>
                    
                    <div class="activity-card" id='activity-card'>
                        <div class="activity-icon" id='activity-icon'>
                            <i class="fas fa-heart"></i>
                        </div>
                        <h4 class="activity-title" id='activity-title'>Interaction</h4>
                        <p class="activity-description" id='activity-description'>
                            A aimé 15 publications cette semaine.
                        </p>
                    </div>
                    
                    <div class="activity-card" id='activity-card'>
                        <div class="activity-icon" id='activity-icon'>
                            <i class="fas fa-users"></i>
                        </div>
                        <h4 class="activity-title" id='activity-title'>Nouveaux followers</h4>
                        <p class="activity-description" id='activity-description'>
                            +42 nouveaux followers ce mois-ci.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </div>
    </ProfilStyle>

  );
};

export default Profil;