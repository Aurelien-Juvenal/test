// services/pdfService.js
import { pdf } from '@react-pdf/renderer';

export const pdfService = {
  // Générer et télécharger un PDF
  async genererEtTelechargerFacture(filename = null) {
    try {
      // Import dynamique pour éviter les imports circulaires
      const { default: FacturePDF } = await import('./FacturePDF');
      
      // Générer le blob PDF
      const blob = await pdf(<FacturePDF />).toBlob();
      
      // Créer l'URL et déclencher le téléchargement
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = filename || `facture.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      // Nettoyer l'URL
      setTimeout(() => URL.revokeObjectURL(url), 100);
      
      return true;
    } catch (error) {
      console.error('Erreur génération PDF:', error);
      throw new Error('Erreur lors de la génération du PDF');
    }
  },

  // Générer et ouvrir dans un nouvel onglet
  async genererEtOuvrirFacture() {
    try {
      const { default: FacturePDF } = await import('./FacturePDF');
      
      const blob = await pdf(<FacturePDF />).toBlob();
      const url = URL.createObjectURL(blob);
      
      // Ouvrir dans un nouvel onglet
      window.open(url, '_blank');
      
      // Nettoyer après un délai
      setTimeout(() => URL.revokeObjectURL(url), 10000);
      
      return true;
    } catch (error) {
      console.error('Erreur génération PDF:', error);
      throw error;
    }
  }
};