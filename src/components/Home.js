// components/Home.js
import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/Authentification';
import './Home.css';

const Home = () => {
  const { isAuthenticated, user } = useAuth();

  return (
    <div className="home">
      {/* Section Hero */}
      <section className="hero-section">
        <div className="hero-content">
          <div className="hero-text">
            <h1>
              <span className="hero-title">🎄 Bienvenue sur</span>
              <span className="hero-highlight">Noël Magique</span>
            </h1>
            <p className="hero-description">
              Découvrez la magie de Noël avec notre plateforme interactive. 
              Gérez votre liste de cadeaux, suivez le Père Noël, et profitez 
              des festivités en un seul endroit !
            </p>
            
            <div className="hero-buttons">
              {!isAuthenticated ? (
                <>
                  <Link to="/auth" className="btn btn-primary">
                    🎅 Commencer l'aventure
                  </Link>
                  <Link to="/auth?tab=register" className="btn btn-secondary">
                    🎄 Créer un compte
                  </Link>
                </>
              ) : (
                <>
                  <Link to="/dashboard" className="btn btn-primary">
                    🎁 Accéder au Tableau de Bord
                  </Link>
                  <span className="welcome-user">
                    Bon retour, <strong>{user?.username}</strong> ! 🎉
                  </span>
                </>
              )}
            </div>
          </div>
          
          <div className="hero-visual">
            <div className="floating-icons">
              <div className="icon">🎁</div>
              <div className="icon">🦌</div>
              <div className="icon">⭐</div>
              <div className="icon">❄️</div>
            </div>
          </div>
        </div>
        
        <div className="scroll-indicator">
          <span>Découvrir plus</span>
          <div className="arrow">↓</div>
        </div>
      </section>

      {/* Section Features */}
      <section className="features-section">
        <div className="container">
          <h2 className="section-title">✨ Ce qui vous attend</h2>
          
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">🎁</div>
              <h3>Liste de Cadeaux Intelligente</h3>
              <p>
                Créez et partagez votre liste de souhaits. 
                Marquez les cadeaux déjà reçus et suivez vos idées.
              </p>
            </div>
            
            <div className="feature-card">
              <div className="feature-icon">🦌</div>
              <h3>Suivi du Père Noël</h3>
              <p>
                Suivez le trajet du Père Noël en temps réel 
                avec notre carte interactive et les mises à jour en direct.
              </p>
            </div>
            
            <div className="feature-card">
              <div className="feature-icon">🍪</div>
              <h3>Recettes Festives</h3>
              <p>
                Découvrez des recettes de Noël traditionnelles 
                et des idées gourmandes pour impressionner vos proches.
              </p>
            </div>
            
            <div className="feature-card">
              <div className="feature-icon">❄️</div>
              <h3>Activités Hivernales</h3>
              <p>
                Trouvez des événements et activités de Noël 
                près de chez vous. Patinage, marchés de Noël, et plus encore !
              </p>
            </div>
            
            <div className="feature-card">
              <div className="feature-icon">🎵</div>
              <h3>Musique de Noël</h3>
              <p>
                Playlist festive avec tous les classiques de Noël. 
                Créez l'ambiance parfaite pour vos célébrations.
              </p>
            </div>
            
            <div className="feature-card">
              <div className="feature-icon">📖</div>
              <h3>Histoires de Noël</h3>
              <p>
                Lisez et partagez des histoires de Noël magiques. 
                Parfait pour les soirées en famille au coin du feu.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Section Countdown */}
      <section className="countdown-section">
        <div className="container">
          <h2 className="section-title">⏰ Compte à rebours de Noël</h2>
          <div className="countdown-container">
            <div className="countdown-item">
              <span className="countdown-number" id="days">00</span>
              <span className="countdown-label">Jours</span>
            </div>
            <div className="countdown-item">
              <span className="countdown-number" id="hours">00</span>
              <span className="countdown-label">Heures</span>
            </div>
            <div className="countdown-item">
              <span className="countdown-number" id="minutes">00</span>
              <span className="countdown-label">Minutes</span>
            </div>
            <div className="countdown-item">
              <span className="countdown-number" id="seconds">00</span>
              <span className="countdown-label">Secondes</span>
            </div>
          </div>
        </div>
      </section>

      {/* Section Testimonials */}
      <section className="testimonials-section">
        <div className="container">
          <h2 className="section-title">🌟 Témoignages</h2>
          <div className="testimonials-grid">
            <div className="testimonial-card">
              <div className="testimonial-content">
                "Cette plateforme a rendu notre Noël tellement plus organisé ! 
                La liste de cadeaux partagée est géniale."
              </div>
              <div className="testimonial-author">
                <div className="author-avatar">👨‍👩‍👧‍👦</div>
                <div className="author-info">
                  <strong>La famille Martin</strong>
                  <span>Utilisateur depuis 2022</span>
                </div>
              </div>
            </div>
            
            <div className="testimonial-card">
              <div className="testimonial-content">
                "Mes enfants adorent suivre le Père Noël sur la carte. 
                C'est devenu notre nouvelle tradition !"
              </div>
              <div className="testimonial-author">
                <div className="author-avatar">👩‍👧‍👦</div>
                <div className="author-info">
                  <strong>Sophie D.</strong>
                  <span>Maman de deux enfants</span>
                </div>
              </div>
            </div>
            
            <div className="testimonial-card">
              <div className="testimonial-content">
                "Les recettes de biscuits de Noël sont incroyables ! 
                Nous les préparons chaque année maintenant."
              </div>
              <div className="testimonial-author">
                <div className="author-avatar">👨‍🍳</div>
                <div className="author-info">
                  <strong>Pierre L.</strong>
                  <span>Passionné de cuisine</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="container">
          <div className="cta-content">
            <h2>Prêt à vivre la magie de Noël ?</h2>
            <p>
              Rejoignez des milliers de familles qui utilisent déjà 
              Noël Magique pour rendre leurs fêtes encore plus spéciales.
            </p>
            {!isAuthenticated && (
              <div className="cta-buttons">
                <Link to="/auth" className="btn btn-large btn-primary">
                  🎅 Commencer Gratuitement
                </Link>
                <Link to="/about" className="btn btn-large btn-secondary">
                  En savoir plus
                </Link>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="home-footer">
        <div className="container">
          <div className="footer-content">
            <div className="footer-section">
              <h4>🎄 Noël Magique</h4>
              <p>Rendez chaque Noël inoubliable avec nos outils magiques.</p>
            </div>
            
            <div className="footer-section">
              <h5>Navigation</h5>
              <Link to="/">Accueil</Link>
              <Link to="/about">À propos</Link>
              <Link to="/contact">Contact</Link>
              <Link to="/auth">Connexion</Link>
            </div>
            
            <div className="footer-section">
              <h5>Fonctionnalités</h5>
              <span>Liste de cadeaux</span>
              <span>Suivi du Père Noël</span>
              <span>Recettes</span>
              <span>Activités</span>
            </div>
            
            <div className="footer-section">
              <h5>Légal</h5>
              <span>Confidentialité</span>
              <span>Conditions d'utilisation</span>
              <span>Mentions légales</span>
            </div>
          </div>
          
          <div className="footer-bottom">
            <p>&copy; 2024 Noël Magique. Tous droits réservés. 🎅</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;