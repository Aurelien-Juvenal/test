// components/Navbar.js
// Navbar.jsx
import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
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
    faInbox,
    faCalendar,
    faPlus,
    faList,
    faPlusCircle,
    faFolder,
    faUserPlus,
    faExchangeAlt,
    
  } from '@fortawesome/free-solid-svg-icons';
import Container from './container';
import AjoutProduit from '../../ajout_produits';
import Table_produits from './table_produit';
import Table_client from './table_client';
import { SideStyle } from './sidestyle';


const Side = () => {
    const [activePage, setActivePage] = useState('container');

    const renderPageContent = () => {
      switch (activePage) {
        case 'container':
          return <Container />;
        case 'ajout_produit':
          return <AjoutProduit />;
        case 'table_produits':
          return <Table_produits />;
          case 'table_clients':
            return <Table_client />;
        default:
          return <Container />;
      }
    };
  return (
    <SideStyle>
    <div class="container-fluid">
    <div class="row h-100">
       
        <div class="col-lg-2 sidebar">
            <div class="sidebar-header mb-4">
                <div class="d-flex align-items-center gap-2">
                    <div class="avatar">LB</div>
                    <div>
                        <h6 class="mb-0">Admin</h6>
                    </div>
                </div>
            </div>

            
            <div class="menu-section">
                <h6 class="menu-title">Application</h6>
                <ul class="menu-list">
                    <li className={activePage === 'container' ? 'active' : ''}
                onClick={() => setActivePage('container')}><FontAwesomeIcon icon={faHome} /> Home</li>
                    <li><FontAwesomeIcon icon={faInbox} />Inbox <span class="badge">24</span></li>
                    <li><FontAwesomeIcon icon={faCalendar} /> Calendar</li>
                    <li><FontAwesomeIcon icon={faSearch} /> Search</li>
                    <li><FontAwesomeIcon icon={faCog} />Settings</li>
                </ul>
            </div>

            
            <div class="menu-section">
                <div class="d-flex justify-content-between align-items-center">
                    <h6 class="menu-title mb-0">Products</h6>
                    <button class="btn-add"><FontAwesomeIcon icon={faPlus} /></button>
                </div>
                <ul class="menu-list">
                    <li className={activePage === 'table_produits' ? 'active' : ''}
                onClick={() => setActivePage('table_produits')}><FontAwesomeIcon icon={faList} /> See All Products</li>
                    <li className={activePage === 'ajout_produit' ? 'active' : ''}
                onClick={() => setActivePage('ajout_produit')}><FontAwesomeIcon icon={faPlusCircle} /> Add Product</li>
                    <li><FontAwesomeIcon icon={faFolder} />Add Category</li>
                </ul>
            </div>

            
            <div class="menu-section">
                <div class="d-flex justify-content-between align-items-center">
                    <h6 class="menu-title mb-0">Users</h6>
                    <button class="btn-add"><FontAwesomeIcon icon={faPlus} /></button>
                </div>
                <ul class="menu-list">
                    <li className={activePage === 'table_clients' ? 'active' : ''}
                onClick={() => setActivePage('table_clients')}><FontAwesomeIcon icon={faUser} />See All Users</li>
                    <li><FontAwesomeIcon icon={faUserPlus} /> Add User</li>
                </ul>
            </div>

            
            <div class="menu-section">
                <div class="d-flex justify-content-between align-items-center">
                    <h6 class="menu-title mb-0">Orders / Payments</h6>
                    <button class="btn-add"><FontAwesomeIcon icon={faPlus} /></button>
                </div>
                <ul class="menu-list">
                    <li><FontAwesomeIcon icon={faExchangeAlt} /> See All Transactions</li>
                    <li><FontAwesomeIcon icon={faPlusCircle} />Add Order</li>
                </ul>
            </div>
        </div>
        
        {renderPageContent()}
        
        
       

    </div>
</div>
    
    </SideStyle>
    
  );
};

export default Side;