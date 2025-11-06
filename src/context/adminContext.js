import React, { createContext, useState, useContext, useEffect } from 'react';

const AdminContext = createContext();

export const useAdmin = () => {
  const context = useContext(AdminContext);
  if (!context) {
    throw new Error('useAdmin must be used within an AdminProvider');
  }
  return context;
};

export const AdminProvider = ({ children }) => {
  const [activeSection, setActiveSection] = useState('dashboard');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [clients, setClients] = useState([]);
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [payments, setPayments] = useState([]);
  const [deliveries, setDeliveries] = useState([]);
  const [loading, setLoading] = useState(false);

  // Données simulées
  const mockData = {
    clients: [
      {
        id: 1,
        nom: "Dupont",
        prenom: "Jean",
        email: "jean.dupont@email.com",
        telephone: "01 23 45 67 89",
        commandes: 5,
        statut: "actif",
        date_inscription: "2024-01-15",
        adresse: "123 Rue Example, Paris"
      },
      {
        id: 2,
        nom: "Martin",
        prenom: "Marie",
        email: "marie.martin@email.com",
        telephone: "06 12 34 56 78",
        commandes: 12,
        statut: "actif",
        date_inscription: "2023-11-20",
        adresse: "456 Avenue Test, Lyon"
      }
    ],
    products: [
      {
        id: 1,
        nom: "Smartphone Android",
        categorie: "electronique",
        prix: 299.99,
        stock: 25,
        statut: "actif",
        ventes: 150,
        image: "https://via.placeholder.com/50"
      },
      {
        id: 2,
        nom: "Casque Audio Bluetooth",
        categorie: "electronique",
        prix: 79.99,
        stock: 3,
        statut: "actif",
        ventes: 89,
        image: "https://via.placeholder.com/50"
      }
    ],
    orders: [
      {
        id: "CMD-001",
        client: "Jean Dupont",
        clientId: 1,
        date: "2024-03-15",
        montant: 379.98,
        statut: "livree",
        paiement: "paye",
        livraison: "livree",
        produits: [
          { id: 1, nom: "Smartphone Android", quantite: 1, prix: 299.99 },
          { id: 2, nom: "Casque Audio", quantite: 1, prix: 79.99 }
        ]
      }
    ],
    payments: [
      {
        id: "PAY-001",
        commande: "CMD-001",
        client: "Jean Dupont",
        montant: 379.98,
        methode: "carte",
        statut: "paye",
        date: "2024-03-15"
      }
    ],
    deliveries: [
      {
        tracking: "TRK-001",
        commande: "CMD-001",
        client: "Jean Dupont",
        adresse: "123 Rue Example, Paris",
        transporteur: "Chronopost",
        statut: "livree",
        date_expedition: "2024-03-16",
        date_livraison: "2024-03-18"
      }
    ]
  };

  useEffect(() => {
    // Charger les données simulées
    setClients(mockData.clients);
    setProducts(mockData.products);
    setOrders(mockData.orders);
    setPayments(mockData.payments);
    setDeliveries(mockData.deliveries);
  }, []);

  const addClient = (clientData) => {
    const newClient = {
      ...clientData,
      id: Math.max(...clients.map(c => c.id)) + 1,
      commandes: 0,
      date_inscription: new Date().toISOString().split('T')[0]
    };
    setClients(prev => [...prev, newClient]);
  };

  const updateClient = (id, clientData) => {
    setClients(prev => prev.map(client => 
      client.id === id ? { ...client, ...clientData } : client
    ));
  };

  const deleteClient = (id) => {
    setClients(prev => prev.filter(client => client.id !== id));
  };

  const addProduct = (productData) => {
    const newProduct = {
      ...productData,
      id: Math.max(...products.map(p => p.id)) + 1,
      ventes: 0,
      statut: 'actif'
    };
    setProducts(prev => [...prev, newProduct]);
  };

  const updateProduct = (id, productData) => {
    setProducts(prev => prev.map(product => 
      product.id === id ? { ...product, ...productData } : product
    ));
  };

  const deleteProduct = (id) => {
    setProducts(prev => prev.filter(product => product.id !== id));
  };

  const updateOrderStatus = (orderId, newStatus) => {
    setOrders(prev => prev.map(order => 
      order.id === orderId ? { ...order, statut: newStatus } : order
    ));
  };

  const value = {
    activeSection,
    setActiveSection,
    sidebarCollapsed,
    setSidebarCollapsed,
    clients,
    products,
    orders,
    payments,
    deliveries,
    loading,
    addClient,
    updateClient,
    deleteClient,
    addProduct,
    updateProduct,
    deleteProduct,
    updateOrderStatus
  };

  return (
    <AdminContext.Provider value={value}>
      {children}
    </AdminContext.Provider>
  );
};