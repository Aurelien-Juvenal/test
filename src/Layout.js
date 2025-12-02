import axios from 'axios';
import Navbar from './components/Navbar';
import Login from './components/login/login';
import Inscrire from './components/inscription/inscrire';
import ProductCard from './components/Produit/ProductCard';
import CategorySlider from './components/Produit/Categorie';
import Section from './components/Produit/Section';

const Layout = () => {
 

    return (
    <div>
      <Navbar />
        <Section />
        <CategorySlider />
      <ProductCard/>
    </div>
    );
  };

export default Layout;