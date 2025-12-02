// components/FacturePDF.js
import React from 'react';
import { 
  Document, 
  Page, 
  Text, 
  View, 
  StyleSheet,
  Font
} from '@react-pdf/renderer';

// Définir les styles
const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    backgroundColor: '#FFFFFF',
    padding: 30,
    fontFamily: 'Helvetica'
  },
  header: {
    marginBottom: 20,
    textAlign: 'center'
  },
  title: {
    fontSize: 24,
    marginBottom: 10,
    fontWeight: 'bold'
  },
  section: {
    marginBottom: 15
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5
  },
  table: {
    marginTop: 20,
    borderWidth: 1,
    borderColor: '#000000'
  },
  tableRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#000000'
  },
  tableHeader: {
    backgroundColor: '#f0f0f0',
    fontWeight: 'bold'
  },
  tableCell: {
    padding: 8,
    flex: 1,
    borderRightWidth: 1,
    borderRightColor: '#000000'
  },
  total: {
    marginTop: 20,
    textAlign: 'right',
    fontWeight: 'bold'
  }
});

// Composant PDF
const FacturePDF = () => (
  <Document>
    <Page size="A4" style={styles.page}>
      {/* En-tête */}
      <View style={styles.header}>
        <Text style={styles.title}>FACTURE</Text>
        <Text>N° 4</Text>
        <Text>Date: </Text>
      </View>

      {/* Informations client */}
      <View style={styles.section}>
        <Text style={{ fontWeight: 'bold', marginBottom: 10 }}>CLIENT:</Text>
        <View style={styles.row}>
          <Text>Nom: JUVENAL</Text>
        </View>
        <View style={styles.row}>
          <Text>Email: </Text>
        </View>
        
      </View>

      {/* Tableau des produits */}
      <View style={styles.section}>
        <Text style={{ fontWeight: 'bold', marginBottom: 10 }}>DÉTAILS DE LA COMMANDE:</Text>
        
     
        <View style={[styles.tableRow, styles.tableHeader]}>
          <Text style={[styles.tableCell, { flex: 3 }]}>Produit</Text>
          <Text style={styles.tableCell}>Quantité</Text>
          <Text style={styles.tableCell}>Prix Unitaire</Text>
          <Text style={styles.tableCell}>Total</Text>
        </View>

        {/* Lignes des produits */}
        
          <View key={index} style={styles.tableRow}>
            <Text style={[styles.tableCell, { flex: 3 }]}></Text>
            <Text style={styles.tableCell}></Text>
            <Text style={styles.tableCell}>Ar</Text>
            <Text style={styles.tableCell}>
               Ar
            </Text>
          </View>
      
      </View>

      {/* Total */}
      <View style={styles.total}>
        <Text>TOTAL: Ar</Text>
      </View>

      {/* Pied de page */}
      <View style={{ marginTop: 50, textAlign: 'center' }}>
        <Text>Merci pour votre commande !</Text>
        <Text>Lazan'i Betsileo</Text>
      </View>
    </Page>
  </Document>
);

export default FacturePDF;