import React, { useState } from 'react';
import { itemsAPI } from '../services/api';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';


const ClientForm = () => {
    const [formData, setFormData] = useState({
        nom: '',
        prenom: '',
        email: '',
        telephone: '',
        mot_de_passe: '',
        actif: true
    });
    
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage('');
        setError('');

        try {
            const response = await axios.post('http://localhost:5000/api/client', formData, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            if (response.status === 201) {
                setMessage('Client créé avec succès!');
                setFormData({
                    nom: '',
                    prenom: '',
                    email: '',
                    telephone: '',
                    mot_de_passe: '',
                    actif: true
                });
            }
        } catch (err) {
            setError(err.response?.data?.error || 'Erreur lors de la création du client');
        }
    };

    return (
        <div className="client-form">
            <h2>Ajouter un nouveau client</h2>
            
            {message && <div className="success">{message}</div>}
            {error && <div className="error">{error}</div>}
            
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Nom *:</label>
                    <input
                        type="text"
                        name="nom"
                        value={formData.nom}
                        onChange={handleChange}
                        required
                    />
                </div>
                
                <div>
                    <label>Prénom:</label>
                    <input
                        type="text"
                        name="prenom"
                        value={formData.prenom}
                        onChange={handleChange}
                    />
                </div>
                
                <div>
                    <label>Email:</label>
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                    />
                </div>
                
                <div>
                    <label>Téléphone:</label>
                    <input
                        type="tel"
                        name="telephone"
                        value={formData.telephone}
                        onChange={handleChange}
                    />
                </div>
                
                <div>
                    <label>Mot de passe *:</label>
                    <input
                        type="password"
                        name="mot_de_passe"
                        value={formData.mot_de_passe}
                        onChange={handleChange}
                        required
                    />
                </div>
                
                <div>
                    <label>
                        <input
                            type="checkbox"
                            name="actif"
                            checked={formData.actif}
                            onChange={handleChange}
                        />
                        Client actif
                    </label>
                </div>
                
                <button type="submit">Créer le client</button>
            </form>
        </div>
    );
};

export default ClientForm;