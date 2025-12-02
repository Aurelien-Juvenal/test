import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
    faTrash,
    faEdit,
    faTimes,
    faQuestionCircle
} from '@fortawesome/free-solid-svg-icons';
import { produitService } from '../../../services/api';

const Table_produits = () => {
    const [produits, setProduits] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [produitToDelete, setProduitToDelete] = useState(null);
    const [deleteLoading, setDeleteLoading] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');
    const [pagination, setPagination] = useState({
      page: 1,
      per_page: 12,
      total: 0,
      pages: 0,
      has_next: false,
      has_prev: false
    });
  
    useEffect(() => {
      chargerProduits(1);
    }, []);
  
    const chargerProduits = async (page = 1) => {
      try {
        setLoading(true);
        const data = await produitService.getProduits(page, 12);
        setProduits(data.produits);
        setPagination(data.pagination);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    const handleDeleteClick = (produit) => {
        setProduitToDelete(produit);
    };

    const confirmDelete = async () => {
        if (!produitToDelete) return;

        try {
            setDeleteLoading(true);
            await produitService.deleteProduit(produitToDelete.id);
            
            // Mettre à jour la liste des produits
            setProduits(prevProduits => 
                prevProduits.filter(p => p.id !== produitToDelete.id)
            );
            
            // Message de succès
            setSuccessMessage(`Produit "${produitToDelete.nom}" supprimé avec succès`);
            
            // Réinitialiser après 3 secondes
            setTimeout(() => setSuccessMessage(''), 3000);
            
            // Fermer le modal
         
            // Réinitialiser l'état
            setProduitToDelete(null);
            
        } catch (err) {
            setError('Erreur lors de la suppression: ' + err.message);
        } finally {
            setDeleteLoading(false);
        }
    };

    const cancelDelete = () => {
        setProduitToDelete(null);
    };

    // Fonction pour modifier un produit
    const handleEditClick = (produit) => {
        // Rediriger vers une page d'édition ou ouvrir un modal d'édition
        console.log('Modifier le produit:', produit);
        // Implémentez la logique d'édition ici
        alert(`Modification du produit: ${produit.nom}`);
    };

    if (loading) return <div className="loading">Chargement des produits...</div>;
    if (error) return <div className="alert alert-danger">Erreur: {error}</div>;

    return (
        <div className="main-content">
            {successMessage && (
                <div className="alert alert-success alert-dismissible fade show" role="alert">
                    {successMessage}
                    <button type="button" className="btn-close" onClick={() => setSuccessMessage('')}></button>
                </div>
            )}

            <div className="cart-items">
                {produits.length === 0 ? (
                    <div className="text-center py-4">
                        <p>Aucun produit trouvé</p>
                    </div>
                ) : (
                    produits.map(produit => (
                        <div key={produit.id} className="cart-item">
                            <div className="item-image">
                                <img 
                                    src={produitService.getImageUrl(produit.image)} 
                                    alt={produit.nom} 
                                    style={{ width: '100px', height: '100px', objectFit: 'cover' }}
                                />
                            </div>
                            <div className="item-details">
                                <h2 className="item-title">{produit.nom}</h2>
                                <div className="item-price">{produit.prix} MGA</div>
                                <div className="item-reference">Réf: {produit.reference}</div>
                                
                                <div className="quantity-controls">
                                    <span className="quantity-label">Stock :</span>
                                    <div className="quantity-input">
                                        <span className="stock-value">{produit.stock}</span>
                                    </div>
                                </div>
                                
                                <div className="item-actions">
                                    <button 
                                        className="btn btn-danger btn-sm me-2" 
                                        data-bs-toggle="modal" 
                                        data-bs-target="#Supprimer"
                                        onClick={() => handleDeleteClick(produit)}
                                    >
                                        <FontAwesomeIcon icon={faTrash} /> Supprimer
                                    </button>
                                    <button 
                                        className="btn btn-warning btn-sm"
                                        onClick={() => handleEditClick(produit)}
                                    >
                                        <FontAwesomeIcon icon={faEdit} /> Modifier
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>

            {/* Modal de suppression */}
            <div className="modal fade" id="Supprimer" tabIndex="-1">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title text-warning">
                                <FontAwesomeIcon icon={faTrash} /> Suppression
                            </h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" onClick={cancelDelete}></button>
                        </div>
                        <div className="modal-body text-center">
                            <FontAwesomeIcon icon={faQuestionCircle} className="text-warning mb-3" style={{fontSize: '3rem'}} />
                            <h5>Êtes-vous sûr de vouloir supprimer le produit ?</h5>
                            {produitToDelete && (
                                <div className="mt-3">
                                    <p className="text-muted">
                                        <strong>{produitToDelete.nom}</strong>
                                    </p>
                                    <p className="text-muted">
                                        Référence: {produitToDelete.reference}
                                    </p>
                                    <p className="text-danger">
                                        Cette action est irréversible !
                                    </p>
                                </div>
                            )}
                        </div>
                        <div className="modal-footer justify-content-center">
                            <button 
                                type="button" 
                                className="btn btn-secondary" 
                                data-bs-dismiss="modal"
                                onClick={cancelDelete}
                                disabled={deleteLoading}
                            >
                                <FontAwesomeIcon icon={faTimes} /> Annuler
                            </button>
                            <button 
                                type="button" 
                                className="btn btn-danger text-white" 
                                onClick={confirmDelete}
                                disabled={deleteLoading}
                            >
                                {deleteLoading ? (
                                    <>
                                        <div className="spinner-border spinner-border-sm me-2" role="status">
                                            <span className="visually-hidden">Chargement...</span>
                                        </div>
                                        Suppression...
                                    </>
                                ) : (
                                    <>
                                        <FontAwesomeIcon icon={faTrash} /> Supprimer
                                    </>
                                )}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Table_produits;