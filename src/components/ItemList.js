import React, { useState, useEffect } from 'react';
import { itemsAPI } from '../services/api';
import 'bootstrap/dist/css/bootstrap.min.css';

// ClientsList.jsx


const ItemList = () => {
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // URL de votre API Flask
  const API_URL = 'http://localhost:5000/api/client';
  const LOGIN_URL = 'http://localhost:5000/api/login';

  // Récupérer tous les clients
  const fetchClients = async () => {
    try {
      setLoading(true);
      const response = await fetch(API_URL);
      
      if (!response.ok) {
        throw new Error(`Erreur HTTP: ${response.status}`);
      }
      
      const data = await response.json();
      
      if (data.success) {
        setClients(data.clients);
      } else {
        throw new Error(data.error);
      }
    } catch (err) {
      setError(err.message);
      console.error('Erreur lors de la récupération des clients:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchClients();
  }, []);

  // Fonction pour créer un nouveau client
  const createClient = async (clientData) => {
    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(clientData),
      });

      const data = await response.json();
      
      if (data.success) {
        // Recharger la liste des clients
        fetchClients();
        return data;
      } else {
        throw new Error(data.error);
      }
    } catch (err) {
      console.error('Erreur création client:', err);
      throw err;
    }
  };

  if (loading) {
    return (
      <div className="d-flex justify-content-center">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Chargement...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="alert alert-danger" role="alert">
        Erreur lors du chargement des clients: {error}
      </div>
    );
  }

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Liste des Clients</h2>
        <button 
          className="btn btn-primary"
          onClick={() => document.getElementById('clientForm').style.display = 'block'}
        >
          Ajouter un Client
        </button>
      </div>

      {/* Formulaire d'ajout (caché par défaut) */}
      <div id="clientForm" style={{display: 'none'}} className="card mb-4">
        <div className="card-body">
          <h5>Nouveau Client</h5>
          <ClientForm onCreate={createClient} />
        </div>
      </div>

      {/* Tableau des clients */}
      <div className="table-responsive">
        <table className="table table-striped table-hover">
          <thead className="table-dark">
            <tr>
              <th>ID</th>
              <th>Nom</th>
              <th>Prénom</th>
              <th>Email</th>
              <th>Description</th>
              <th>Téléphone</th>
              <th>Date Création</th>
              <th>Statut</th>
              <th>Adresses</th>
              <th>Commandes</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {clients.length === 0 ? (
              <tr>
                <td colSpan="10" className="text-center text-muted">
                  Aucun client trouvé
                </td>
              </tr>
            ) : (
              clients.map(client => (
                <ClientRow key={client.id} client={client} />
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

// Composant pour une ligne de client
const ClientRow = ({ client }) => {
  return (
    <tr>
      <td>{client.id}</td>
      <td>{client.nom}</td>
      <td>{client.prenom}</td>
      <td>{client.email}</td>
      <td>{client.description}</td>
      <td>{client.telephone || 'Non renseigné'}</td>
      <td>{new Date(client.date_creation).toLocaleDateString('fr-FR')}</td>
      <td>
        <span className={`badge ${client.actif ? 'bg-success' : 'bg-danger'}`}>
          {client.actif ? 'Actif' : 'Inactif'}
        </span>
      </td>
      <td>
        <span className="badge bg-info">{client.nombre_adresses || 0}</span>
      </td>
      <td>
        <span className="badge bg-warning">{client.nombre_commandes || 0}</span>
      </td>
      <td>
        <button className="btn btn-sm btn-outline-primary me-1">
          Voir
        </button>
        <button className="btn btn-sm btn-outline-warning">
          Modifier
        </button>
      </td>
    </tr>
  );
};

// Composant formulaire pour créer un client
const ClientForm = ({ onCreate }) => {
  const [formData, setFormData] = useState({
    nom: '',
    prenom: '',
    email: '',
    telephone: '',
    description: '',
    mot_de_passe: ''
  });
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    
    try {
      await onCreate(formData);
      setFormData({
        nom: '',
        prenom: '',
        email: '',
        telephone: '',
        description: '',
        mot_de_passe: ''
      });
      document.getElementById('clientForm').style.display = 'none';
    } catch (error) {
      alert('Erreur lors de la création: ' + error.message);
    } finally {
      setSubmitting(false);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="row">
        <div className="col-md-6">
          <div className="mb-3">
            <label className="form-label">Nom *</label>
            <input
              type="text"
              className="form-control"
              name="nom"
              value={formData.nom}
              onChange={handleChange}
              required
            />
          </div>
        </div>
        <div className="col-md-6">
          <div className="mb-3">
            <label className="form-label">Prénom</label>
            <input
              type="text"
              className="form-control"
              name="prenom"
              value={formData.prenom}
              onChange={handleChange}
            />
          </div>
        </div>
      </div>
      
      <div className="mb-3">
        <label className="form-label">Email *</label>
        <input
          type="email"
          className="form-control"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
        />
      </div>

      <div className="mb-3">
        <label className="form-label">Description</label>
        <input
          type="description"
          className="form-control"
          name="description"
          value={formData.description}
          onChange={handleChange}
          required
        />
      </div>
      
      <div className="mb-3">
        <label className="form-label">Téléphone</label>
        <input
          type="tel"
          className="form-control"
          name="telephone"
          value={formData.telephone}
          onChange={handleChange}
        />
      </div>
      
      <div className="mb-3">
        <label className="form-label">Mot de passe *</label>
        <input
          type="password"
          className="form-control"
          name="mot_de_passe"
          value={formData.mot_de_passe}
          onChange={handleChange}
          required
        />
      </div>
      
      <div className="d-flex gap-2">
        <button 
          type="submit" 
          className="btn btn-success"
          disabled={submitting}
        >
          {submitting ? 'Création...' : 'Créer Client'}
        </button>
        <button 
          type="button" 
          className="btn btn-secondary"
          onClick={() => document.getElementById('clientForm').style.display = 'none'}
        >
          Annuler
        </button>
      </div>
    </form>
  );
};

export default ItemList;