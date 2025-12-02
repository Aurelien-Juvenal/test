// components/BoutonFacture.js
import React, { useState } from 'react';
import { pdfService } from './pdfService';

const BoutonFacture = ({ type = "telecharger" }) => {
  const [loading, setLoading] = useState(false);

  const handleGenererPDF = async () => {
   

    try {
      setLoading(true);
      
      if (type === "telecharger") {
        await pdfService.genererEtTelechargerFacture();
      } else {
        await pdfService.genererEtOuvrirFacture();
      }
      
    } catch (error) {
      alert('Erreur: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <button 
      onClick={handleGenererPDF}
      disabled={loading}
      className="btn btn-primary"
      style={{ display: 'flex', alignItems: 'center', gap: '8px' }}
    >
      {loading ? (
        <>
          <span className="spinner-border spinner-border-sm" role="status"></span>
          Génération...
        </>
      ) : (
        <>
          📄 {type === "telecharger" ? "Télécharger Facture" : "Voir Facture"}
        </>
      )}
    </button>
  );
};

export default BoutonFacture;