import React, { useState, useEffect } from 'react';
import { produitAPI } from '../services/api';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';


const AjoutProduit = () => {
    const [formData, setFormData] = useState({
        reference: '',
        nom: '',
        description: '',
        prix: '',
        tva: '20.0',
        stock: '0',
        stock_alerte: '5',
        image: null
    });
    const [categories, setCategories] = useState([]);
    const [fournisseurs, setFournisseurs] = useState([]);
    const [preview, setPreview] = useState(null);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');

    // Charger les catégories et fournisseurs
    useEffect(() => {
        const fetchData = async () => {
            try {
                // Ici vous devrez implémenter les endpoints pour récupérer catégories et fournisseurs
                // const catResponse = await axios.get('/api/categories');
                // const fourResponse = await axios.get('/api/fournisseurs');
                // setCategories(catResponse.data);
                // setFournisseurs(fourResponse.data);
            } catch (error) {
                console.error('Erreur chargement données:', error);
            }
        };
        fetchData();
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setFormData(prev => ({
                ...prev,
                image: file
            }));

            // Prévisualisation
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreview(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const generateReference = () => {
        const ref = `PROD-${Date.now()}`;
        setFormData(prev => ({ ...prev, reference: ref }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage('');

        try {
            const data = new FormData();
            data.append('reference', formData.reference);
            data.append('nom', formData.nom);
            data.append('description', formData.description);
            data.append('prix', formData.prix);
            data.append('tva', formData.tva);
            data.append('stock', formData.stock);
            data.append('stock_alerte', formData.stock_alerte);
            data.append('categorie_id', formData.categorie_id);
            data.append('fournisseur_id', formData.fournisseur_id);
            
            if (formData.image) {
                data.append('image', formData.image);
            }

            const response = await axios.post('http://localhost:5000/api/produits', data, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                }
            });

            setMessage('✅ Produit ajouté avec succès!');
            console.log('Produit créé:', response.data.produit);
            
            // Réinitialiser le formulaire
            setFormData({
                reference: '',
                nom: '',
                description: '',
                prix: '',
                tva: '20.0',
                stock: '0',
                stock_alerte: '5',
                categorie_id: '',
                fournisseur_id: '',
                image: null
            });
            setPreview(null);
            
        } catch (error) {
            console.error('Erreur:', error);
            setMessage(`❌ Erreur: ${error.response?.data?.error || error.message}`);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div class="col-lg-8 main-content" >
            <h2>Ajouter un Nouveau Produit</h2>
            
            <form onSubmit={handleSubmit}>
                {/* Référence */}
                <div style={{ marginBottom: '15px' }}>
                    <label>Référence *</label>
                    <div style={{ display: 'flex', gap: '10px' }}>
                        <input
                            type="text"
                            name="reference"
                            value={formData.reference}
                            onChange={handleInputChange}
                            required
                            style={{ flex: 1, padding: '8px', border: '1px solid #ccc', borderRadius: '4px' }}
                            placeholder="Référence unique"
                        />
                        <button 
                            type="button" 
                            onClick={generateReference}
                            style={{ padding: '8px 12px', backgroundColor: '#6c757d', color: 'white', border: 'none', borderRadius: '4px' }}
                        >
                            Générer
                        </button>
                    </div>
                </div>

                {/* Nom */}
                <div style={{ marginBottom: '15px' }}>
                    <label>Nom du produit *</label>
                    <input
                        type="text"
                        name="nom"
                        value={formData.nom}
                        onChange={handleInputChange}
                        required
                        style={{ width: '100%', padding: '8px', border: '1px solid #ccc', borderRadius: '4px' }}
                    />
                </div>

                {/* Description */}
                <div style={{ marginBottom: '15px' }}>
                    <label>Description</label>
                    <textarea
                        name="description"
                        value={formData.description}
                        onChange={handleInputChange}
                        style={{ width: '100%', padding: '8px', border: '1px solid #ccc', borderRadius: '4px', height: '80px' }}
                    />
                </div>

                {/* Prix et TVA */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px', marginBottom: '15px' }}>
                    <div>
                        <label>Prix HT *</label>
                        <input
                            type="number"
                            name="prix"
                            value={formData.prix}
                            onChange={handleInputChange}
                            step="0.01"
                            required
                            style={{ width: '100%', padding: '8px', border: '1px solid #ccc', borderRadius: '4px' }}
                        />
                    </div>
                    <div>
                        <label>TVA (%)</label>
                        <input
                            type="number"
                            name="tva"
                            value={formData.tva}
                            onChange={handleInputChange}
                            step="0.1"
                            style={{ width: '100%', padding: '8px', border: '1px solid #ccc', borderRadius: '4px' }}
                        />
                    </div>
                </div>

                {/* Stock */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px', marginBottom: '15px' }}>
                    <div>
                        <label>Stock initial</label>
                        <input
                            type="number"
                            name="stock"
                            value={formData.stock}
                            onChange={handleInputChange}
                            style={{ width: '100%', padding: '8px', border: '1px solid #ccc', borderRadius: '4px' }}
                        />
                    </div>
                    <div>
                        <label>Stock d'alerte</label>
                        <input
                            type="number"
                            name="stock_alerte"
                            value={formData.stock_alerte}
                            onChange={handleInputChange}
                            style={{ width: '100%', padding: '8px', border: '1px solid #ccc', borderRadius: '4px' }}
                        />
                    </div>
                </div>

                {/* Catégorie et Fournisseur */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px', marginBottom: '15px' }}>
                    <div>
                        <label>Catégorie</label>
                        <select
                            name="categorie_id"
                            value={formData.categorie_id}
                            onChange={handleInputChange}
                            style={{ width: '100%', padding: '8px', border: '1px solid #ccc', borderRadius: '4px' }}
                        >
                            <option value="">Sélectionner une catégorie</option>
                            {categories.map(cat => (
                                <option key={cat.id} value={cat.id}>{cat.nom}</option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <label>Fournisseur</label>
                        <select
                            name="fournisseur_id"
                            value={formData.fournisseur_id}
                            onChange={handleInputChange}
                            style={{ width: '100%', padding: '8px', border: '1px solid #ccc', borderRadius: '4px' }}
                        >
                            <option value="">Sélectionner un fournisseur</option>
                            {fournisseurs.map(four => (
                                <option key={four.id} value={four.id}>{four.nom}</option>
                            ))}
                        </select>
                    </div>
                </div>

                {/* Image */}
                <div style={{ marginBottom: '15px' }}>
                    <label>Image du produit</label>
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        style={{ width: '100%', padding: '8px', marginBottom: '10px' }}
                    />
                    
                    {preview && (
                        <div style={{ marginTop: '10px' }}>
                            <img 
                                src={preview} 
                                alt="Preview" 
                                style={{ width: '100px', height: '100px', objectFit: 'cover', borderRadius: '4px' }}
                            />
                        </div>
                    )}
                </div>

                {/* Bouton Submit */}
                <button 
                    type="submit" 
                    disabled={loading}
                    style={{
                        backgroundColor: loading ? '#ccc' : '#007bff',
                        color: 'white',
                        padding: '12px 24px',
                        border: 'none',
                        borderRadius: '4px',
                        cursor: loading ? 'not-allowed' : 'pointer',
                        fontSize: '16px'
                    }}
                >
                    {loading ? 'Ajout en cours...' : 'Créer le Produit'}
                </button>

                {message && (
                    <div style={{
                        marginTop: '15px',
                        padding: '10px',
                        borderRadius: '4px',
                        backgroundColor: message.includes('✅') ? '#d4edda' : '#f8d7da',
                        color: message.includes('✅') ? '#155724' : '#721c24'
                    }}>
                        {message}
                    </div>
                )}
            </form>
        </div>
    );
};

export default AjoutProduit;