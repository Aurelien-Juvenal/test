// components/Navbar.js
// Navbar.jsx
import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
    faStore, 
    faHome, 
    faBox, 
    faShoppingCart, 
    faUser, 
    faSignInAlt, 
    faSignOutAlt,
    faCog,
    faSearch,
    faInfoCircle,
    faEnvelope,
    faShoppingBag,
    faSun,
    faMoon,
    faWineGlass,
    faSignOut,
    faTimes,
    faQuestionCircle,
    faSlidersH,
    faBell,
    faEuroSign,
    faUsers,
    
  } from '@fortawesome/free-solid-svg-icons';
import Chart from 'react-apexcharts';

const API_URL = 'http://localhost:5000/api';
const Container = () => {
    const options = {
        chart: {
          id: 'basic-bar'
        },
        xaxis: {
          categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998]
        }
      };
    
      const series = [{
        name: 'series-1',
        data: [30, 40, 45, 50, 49, 60, 70, 91]
      }]
      const [transactions, setTransactions] = useState([]);
      const [statistiques, setStatistiques] = useState({});
      const [loading, setLoading] = useState(true);
      const [period, setPeriod] = useState('30days');
    
      const api = axios.create({
        baseURL: API_URL,
      });
    
      api.interceptors.request.use((config) => {
        const token = localStorage.getItem('access_token');
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      });
    
      const fetchTransactions = async () => {
        try {
          setLoading(true);
          const response = await api.get('/admin/transactions/recentes');
          if (response.data.success) {
            setTransactions(response.data.transactions);
            setStatistiques(response.data.statistiques);
          }
        } catch (error) {
          console.error('Erreur récupération transactions:', error);
        } finally {
          setLoading(false);
        }
      };
    
      const fetchAdvancedStats = async () => {
        try {
          const response = await api.get('/admin/transactions/statistiques');
          if (response.data.success) {
            setStatistiques(prev => ({
              ...prev,
              ...response.data.statistiques
            }));
          }
        } catch (error) {
          console.error('Erreur récupération statistiques:', error);
        }
      };
    
      useEffect(() => {
        fetchTransactions();
        fetchAdvancedStats();
      }, [period]);
    
      // Configuration pour le graphique de ligne (ventes) - CORRIGÉE
      const lineChartOptions = {
        chart: {
          type: 'line',
          height: 350,
          zoom: {
            enabled: true
          }
        },
        stroke: {
          curve: 'smooth',
          width: [3, 3]
        },
        colors: ['#8884d8', '#82ca9d'],
        dataLabels: {
          enabled: false
        },
        xaxis: {
          type: 'category',
          labels: {
            // CORRECTION: Vérifier que val n'est pas undefined
            formatter: function(val) {
              if (!val) return '';
              try {
                // Si c'est une date au format YYYY-MM-DD
                if (typeof val === 'string' && val.includes('-')) {
                  return val.split('-').slice(1).reverse().join('/'); // Format DD/MM
                }
                return val;
              } catch (error) {
                console.error('Erreur formatage date:', error);
                return val || '';
              }
            }
          }
        },
        yaxis: [
          {
            title: {
              text: 'Montant (Ar)'
            },
            labels: {
              formatter: function(val) {
                return val ? val.toFixed(0) + ' Ar' : '0 Ar';
              }
            }
          },
          {
            opposite: true,
            title: {
              text: 'Commandes'
            },
            labels: {
              formatter: function(val) {
                return val ? val.toFixed(0) : '0';
              }
            }
          }
        ],
        tooltip: {
          shared: true,
          intersect: false,
          y: {
            // CORRECTION: Vérifier les paramètres
            formatter: function (val, opts) {
              if (val === undefined || val === null) return '0';
              return opts.seriesIndex === 0 
                ? val.toFixed(2) + ' Ar' 
                : val + ' commandes';
            }
          }
        },
        legend: {
          position: 'top'
        }
      };
    
      // Configuration pour le graphique à barres (top produits) - CORRIGÉE
      const barChartOptions = {
        chart: {
          type: 'bar',
          height: 350
        },
        plotOptions: {
          bar: {
            borderRadius: 4,
            horizontal: false,
          }
        },
        dataLabels: {
          enabled: false
        },
        xaxis: {
          labels: {
            rotate: -45,
            style: {
              fontSize: '12px'
            }
          }
        },
        yaxis: {
          title: {
            text: 'Quantité vendue'
          },
          labels: {
            formatter: function(val) {
              return val ? val.toString() : '0';
            }
          }
        },
        colors: ['#8884d8'],
        tooltip: {
          y: {
            formatter: function(val) {
              return val ? val + ' unités' : '0 unité';
            }
          }
        }
      };
    
      // Configuration pour le graphique circulaire (statut des commandes) - CORRIGÉE
      const pieChartOptions = {
        chart: {
          type: 'pie',
          height: 350
        },
        labels: statistiques.commandes_par_statut ? 
          Object.keys(statistiques.commandes_par_statut) : [],
        colors: ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'],
        legend: {
          position: 'bottom'
        },
        tooltip: {
          y: {
            formatter: function(val) {
              return val ? val + ' commandes' : '0 commande';
            }
          }
        },
        responsive: [{
          breakpoint: 480,
          options: {
            chart: {
              width: 200
            },
            legend: {
              position: 'bottom'
            }
          }
        }]
      };
    
      // Préparer les données pour les graphiques - CORRIGÉE
      const prepareLineChartData = () => {
        if (!statistiques.commandes_par_jour || !Array.isArray(statistiques.commandes_par_jour)) {
          return { 
            series: [
              { name: 'Montant (Ar)', data: [] },
              { name: 'Nombre de commandes', data: [] }
            ],
            options: lineChartOptions 
          };
        }
        
        const dates = statistiques.commandes_par_jour.map(item => item?.date || '');
        const montants = statistiques.commandes_par_jour.map(item => item?.montant_total || 0);
        const commandes = statistiques.commandes_par_jour.map(item => item?.nb_commandes || 0);
        
        return {
          series: [
            {
              name: 'Montant (Ar)',
              data: montants
            },
            {
              name: 'Nombre de commandes',
              data: commandes
            }
          ],
          options: {
            ...lineChartOptions,
            xaxis: {
              ...lineChartOptions.xaxis,
              categories: dates
            }
          }
        };
      };
    
      const prepareBarChartData = () => {
        if (!statistiques.top_produits || !Array.isArray(statistiques.top_produits)) {
          return { 
            series: [{ name: 'Quantité vendue', data: [] }],
            options: barChartOptions 
          };
        }
        
        const produits = statistiques.top_produits.map(item => item?.nom || 'N/A');
        const quantites = statistiques.top_produits.map(item => item?.quantite_vendue || 0);
        
        return {
          series: [{
            name: 'Quantité vendue',
            data: quantites
          }],
          options: {
            ...barChartOptions,
            xaxis: {
              ...barChartOptions.xaxis,
              categories: produits
            }
          }
        };
      };
    
      const preparePieChartData = () => {
        if (!statistiques.commandes_par_statut || typeof statistiques.commandes_par_statut !== 'object') {
          return { 
            series: [],
            options: {
              ...pieChartOptions,
              labels: []
            }
          };
        }
        
        const valeurs = Object.values(statistiques.commandes_par_statut).map(val => val || 0);
        
        return {
          series: valeurs,
          options: {
            ...pieChartOptions,
            labels: Object.keys(statistiques.commandes_par_statut)
          }
        };
      };
    
      if (loading) {
        return (
          <div className="flex justify-center items-center h-64">
            <div className="text-lg">Chargement des données...</div>
          </div>
        );
      }
    
      const lineChartData = prepareLineChartData();
      const barChartData = prepareBarChartData();
      const pieChartData = preparePieChartData();
  return (
<div class="col-lg-8 main-content">
    
    <div class="header d-flex justify-content-between align-items-center">
        <div>
            <h1>Dashboard</h1>
        </div>
        <div class="d-flex gap-3 align-items-center">
            <button class="btn-icon"><FontAwesomeIcon icon={faSearch} /></button>
            <button class="btn-icon"><FontAwesomeIcon icon={faSlidersH} /></button>
            <button class="btn-icon"><FontAwesomeIcon icon={faSun} /></button>
            <button class="btn-icon"><FontAwesomeIcon icon={faBell} /></button>
            <div class="user-profile">
                <img src="https://via.placeholder.com/32" alt="User" />
            </div>
        </div>
    </div>
    <section id="dashboard" class="section active">
                <div class="stats-grid">
                    <div class="stat-card">
                        <div class="stat-icon clients">
                        <a href="#" className='stat-icon'><FontAwesomeIcon icon={faUsers} /></a>
                        
                        </div>
                        <div class="stat-info">
                            <h3 id="total-clients">0</h3>
                            <p>Clients</p>
                        </div>
                    </div>
                    <div class="stat-card">
                        <div class="stat-icon products">
                        <a href="#" className='stat-icon'>
                        <FontAwesomeIcon icon={faBox} />
                        </a>
                        </div>
                        <div class="stat-info">
                            <h3 id="total-products">0</h3>
                            <p>Produits</p>
                        </div>
                    </div>
                    <div class="stat-card">
                        <div class="stat-icon orders">
                        <a href="#" className='stat-icon'>
                        <FontAwesomeIcon icon={faShoppingCart} />
                        </a>
                        </div>
                        <div class="stat-info">
                            <h3 id="total-orders">0</h3>
                            <p>Commandes</p>
                        </div>
                    </div>
                    <div class="stat-card">
                        <div class="stat-icon revenue">
                        <a href="#" className='stat-icon'>
                        <FontAwesomeIcon icon={faEuroSign} />
                        </a>
                        </div>
                        <div class="stat-info">
                            <h3 id="total-revenue">0€</h3>
                            <p>Chiffre d'affaires</p>
                        </div>
                    </div>
                </div>

                

              
            </section>
   
    <div class="row mt-4">
        
        <div class="col-lg-8">
            <div class="card-dashboard">
                <h5>Évolution des ventes (30 derniers jours)</h5>
                <div className="mixed-chart">
                <div className="bg-white rounded-lg shadow p-6">
          
          {lineChartData.series[0].data.length > 0 ? (
            <Chart
              options={lineChartData.options}
              series={lineChartData.series}
              type="line"
              height={350}
            />
          ) : (
            <div className="flex justify-center items-center h-64">
              <div className="text-gray-500">Aucune donnée disponible</div>
            </div>
          )}
        </div>
        </div>
            </div>
        </div>

       
        <div class="col-lg-4">
            <div class="card-dashboard">
                <h5>Browser Usage</h5>
                <div class="d-flex justify-content-center">
                    <canvas id="browserChart"></canvas>
                </div>
                <div class="text-center mt-3">
                    <p class="small">Trending up by 5.2% this month</p>
                    <p class="text-muted small">Showing total visitors for the last 6 months</p>
                </div>
            </div>
        </div>
    </div>

    <div class="row mt-4">
        
        <div class="col-lg-4">
            <div class="card-dashboard">
                <h5>Latest Transactions</h5>
                <div class="transactions-list">
                    <div class="transaction-item">
                        <div class="transaction-avatar">JD</div>
                        <div class="transaction-info">
                            <p class="mb-1"><strong>Order Payment</strong></p>
                            <p class="text-muted small">John Doe</p>
                        </div>
                        <p class="transaction-amount">$160$</p>
                    </div>
                    <div class="transaction-item">
                        <div class="transaction-avatar">JS</div>
                        <div class="transaction-info">
                            <p class="mb-1"><strong>Order Payment</strong></p>
                            <p class="text-muted small">Jane Smith</p>
                        </div>
                        <p class="transaction-amount">$210$</p>
                    </div>
                    <div class="transaction-item">
                        <div class="transaction-avatar">MJ</div>
                        <div class="transaction-info">
                            <p class="mb-1"><strong>Order Payment</strong></p>
                            <p class="text-muted small">Michael Johnson</p>
                        </div>
                        <p class="transaction-amount">$130$</p>
                    </div>
                    <div class="transaction-item">
                        <div class="transaction-avatar">LA</div>
                        <div class="transaction-info">
                            <p class="mb-1"><strong>Order Payment</strong></p>
                            <p class="text-muted small">Lily Adams</p>
                        </div>
                        <p class="transaction-amount">$250$</p>
                    </div>
                    <div class="transaction-item">
                        <div class="transaction-avatar">SB</div>
                        <div class="transaction-info">
                            <p class="mb-1"><strong>Order Payment</strong></p>
                            <p class="text-muted small">Sam Brown</p>
                        </div>
                        <p class="transaction-amount">$140$</p>
                    </div>
                </div>
            </div>
        </div>

        
        <div class="col-lg-4">
            <div class="card-dashboard">
                <h5>Todo List</h5>
                <div class="mb-3">
                    <input type="date" class="form-control" value="2025-09-23" />
                </div>
                <div class="todos-list">
                    <div class="todo-item">
                        <input type="checkbox" id="todo1" checked />
                        <label for="todo1">Lorem ipsum dolor sit, amet consectetur adipisicing elit.</label>
                    </div>
                    <div class="todo-item">
                        <input type="checkbox" id="todo2" />
                        <label for="todo2">Lorem ipsum dolor sit, amet consectetur adipisicing elit.</label>
                    </div>
                </div>
            </div>
        </div>

      
        <div class="col-lg-4">
            <div class="card-dashboard">
                <h5>Popular Products</h5>
                <div class="products-list">
                    <div class="product-item">
                        <div class="product-image">
                            <img src="https://via.placeholder.com/60" alt="Nike Dri Flex T-Shirt" />
                        </div>
                        <div class="product-info">
                            <p class="mb-1"><strong>Nike Dri Flex T-Shirt</strong></p>
                            <p class="text-muted small">$30$</p>
                        </div>
                    </div>
                    <div class="product-item">
                        <div class="product-image">
                            <img src="https://via.placeholder.com/60" alt="Nike Ultraboost Pulse" />
                        </div>
                        <div class="product-info">
                            <p class="mb-1"><strong>Nike Ultraboost Pulse</strong></p>
                            <p class="text-muted small">$69$</p>
                        </div>
                    </div>
                    <div class="product-item">
                        <div class="product-image">
                            <img src="https://via.placeholder.com/60" alt="StormFleece Jacket" />
                        </div>
                        <div class="product-info">
                            <p class="mb-1"><strong>StormFleece Jacket</strong></p>
                            <p class="text-muted small">$48$</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <div class="row mt-4">
        
        <div class="col-lg-12">
            <div class="card-dashboard">
                <h5>Total Visitors</h5>
                <canvas id="visitorsChart"></canvas>
            </div>
        </div>
    </div>
</div>

  );
};

export default Container;