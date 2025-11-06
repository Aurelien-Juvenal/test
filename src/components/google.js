// src/App.js
import React, { useState,useEffect } from 'react';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import axios from 'axios';

const Google = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);

  // Vérifier si l'utilisateur est déjà connecté
  useEffect(() => {
    checkAuthStatus();
  }, []);

  const checkAuthStatus = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/user', {
        withCredentials: true
      });
      setUser(response.data);
    } catch (error) {
      console.log('Non connecté');
    }
  };

  const handleGoogleSuccess = async (credentialResponse) => {
    setLoading(true);
    try {
      const response = await axios.post(
        'http://localhost:5000/api/auth/google',
        {
          token: credentialResponse.credential
        },
        {
          withCredentials: true
        }
      );
      
      setUser(response.data.user);
    } catch (error) {
      console.error('Erreur de connexion:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await axios.get('http://localhost:5000/api/logout', {
        withCredentials: true
      });
      setUser(null);
    } catch (error) {
      console.error('Erreur de déconnexion:', error);
    }
  };

  return (
    <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}>
      <div className="App">
        <h1>Connexion Google avec Flask + React</h1>
        
        {user ? (
          <div>
            <h2>Bienvenue, {user.name}!</h2>
            <img src={user.picture} alt="Profile" style={{width: '50px', borderRadius: '50%'}} />
            <p>Email: {user.email}</p>
            <button onClick={handleLogout}>Déconnexion</button>
          </div>
        ) : (
          <div>
            {loading ? (
              <p>Connexion en cours...</p>
            ) : (
              <GoogleLogin
                onSuccess={handleGoogleSuccess}
                onError={() => {
                  console.log('Erreur de connexion Google');
                }}
                useOneTap
              />
            )}
          </div>
        )}
      </div>
    </GoogleOAuthProvider>
  );
};

export default Google;