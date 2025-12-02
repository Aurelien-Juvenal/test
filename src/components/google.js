import React, { useState, useEffect, useRef } from 'react';
import { authService } from '../services/googleservice';

const GoogleLoginButton = ({ onSuccess, onError }) => {
  const [loading, setLoading] = useState(false);
  const googleButtonRef = useRef(null);
  const googleInitialized = useRef(false);

  // Charger le script Google
  useEffect(() => {
    const loadGoogleScript = () => {
      // Si déjà chargé
      if (window.google) {
        initializeGoogle();
        return;
      }

      // Vérifier si le script est déjà en cours de chargement
      if (document.querySelector('script[src*="accounts.google.com"]')) {
        const checkGoogle = setInterval(() => {
          if (window.google) {
            clearInterval(checkGoogle);
            initializeGoogle();
          }
        }, 100);
        return;
      }

      // Charger le script
      const script = document.createElement('script');
      script.src = 'https://accounts.google.com/gsi/client';
      script.async = true;
      script.defer = true;
      script.onload = () => {
        setTimeout(initializeGoogle, 100);
      };
      script.onerror = () => {
        if (onError) onError('Erreur lors du chargement de Google');
      };
      document.body.appendChild(script);
    };

    const initializeGoogle = () => {
      if (googleInitialized.current || !window.google) return;
      
      try {
        /* eslint-disable no-undef */
        google.accounts.id.initialize({
          client_id: '906275952880-c8pvm3su4767hf59ol82povovbjfd5up.apps.googleusercontent.com',
          callback: handleGoogleResponse,
          auto_select: false,
          cancel_on_tap_outside: true,
          context: 'signin'
        });
        
        google.accounts.id.renderButton(
          googleButtonRef.current,
          {
            type: 'standard',
            theme: 'outline',
            size: 'large',
            text: 'continue_with',
            shape: 'rectangular',
            logo_alignment: 'left',
            width: 300
          }
        );
        /* eslint-enable no-undef */
        
        googleInitialized.current = true;
      } catch (error) {
        console.error('Erreur initialisation Google:', error);
        if (onError) onError('Erreur d\'initialisation Google');
      }
    };

    loadGoogleScript();

    return () => {
      // Nettoyage
    };
  }, [onError]);

  // Méthode alternative avec popup
  const handleGoogleLogin = async () => {
    try {
      setLoading(true);
      
      // Vérifier si Google est disponible
      if (window.google) {
        /* eslint-disable no-undef */
        const client = google.accounts.oauth2.initTokenClient({
          client_id: '906275952880-c8pvm3su4767hf59ol82povovbjfd5up.apps.googleusercontent.com',
          scope: 'email profile openid',
          callback: (response) => {
            handleTokenResponse(response.access_token);
          },
        });
        client.requestAccessToken();
        /* eslint-enable no-undef */
      } else {
        // Redirection manuelle
        const redirectUri = encodeURIComponent(`${window.location.origin}/auth/callback`);
        const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=906275952880-c8pvm3su4767hf59ol82povovbjfd5up.apps.googleusercontent.com&redirect_uri=${redirectUri}&response_type=token&scope=email%20profile%20openid&state=google_auth`;
        window.location.href = authUrl;
      }
    } catch (error) {
      console.error('Erreur connexion Google:', error);
      if (onError) onError(error.message || 'Erreur de connexion');
      setLoading(false);
    }
  };

  const handleGoogleResponse = (response) => {
    if (response.credential) {
      handleTokenResponse(response.credential);
    }
  };

  const handleTokenResponse = async (token) => {
    try {
      const result = await authService.loginWithGoogle(token);
      
      if (onSuccess) {
        onSuccess(result);
      } else {
        window.location.href = '/dashboard';
      }
    } catch (error) {
      console.error('Erreur traitement token:', error);
      if (onError) onError(error.response?.data?.error || 'Échec de l\'authentification');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ width: '100%', maxWidth: '300px', margin: '0 auto' }}>
      {/* Bouton Google intégré */}
      <div ref={googleButtonRef}></div>
      
      {/* Bouton alternatif personnalisé */}
      <button
        onClick={handleGoogleLogin}
        disabled={loading}
        style={{
          backgroundColor: '#4285F4',
          color: 'white',
          padding: '12px 24px',
          border: 'none',
          borderRadius: '4px',
          fontSize: '16px',
          fontWeight: '500',
          cursor: loading ? 'not-allowed' : 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '12px',
          opacity: loading ? 0.7 : 1,
          width: '100%',
          marginTop: '20px'
        }}
      >
        {loading ? (
          <span>Connexion en cours...</span>
        ) : (
          <>
            <svg width="20" height="20" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48">
              <path fill="#4285F4" d="M45.12 24.5c0-1.56-.14-3.06-.4-4.5H24v8.51h11.84c-.51 2.75-2.06 5.08-4.39 6.64v5.52h7.11c4.16-3.83 6.56-9.47 6.56-16.17z"/>
              <path fill="#34A853" d="M24 46c5.94 0 10.92-1.97 14.56-5.33l-7.11-5.52c-1.97 1.32-4.49 2.1-7.45 2.1-5.73 0-10.58-3.87-12.31-9.07H4.34v5.7C7.96 41.07 15.4 46 24 46z"/>
              <path fill="#FBBC05" d="M11.69 28.18C11.25 26.86 11 25.45 11 24s.25-2.86.69-4.18v-5.7H4.34C2.85 17.09 2 20.45 2 24c0 3.55.85 6.91 2.34 9.88l7.35-5.7z"/>
              <path fill="#EA4335" d="M24 10.75c3.24 0 6.14 1.11 8.41 3.29l6.31-6.31C34.92 4.18 29.94 2 24 2 15.4 2 7.96 6.93 4.34 14.12l7.35 5.7c1.73-5.2 6.58-9.07 12.31-9.07z"/>
            </svg>
            <span>Se connecter avec Google</span>
          </>
        )}
      </button>
    </div>
  );
};

export default GoogleLoginButton;