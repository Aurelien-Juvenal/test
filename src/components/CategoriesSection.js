import React from 'react';
import CategoryCard from './CategoryCard';

const CategoriesSection = ({ categories }) => {
  return (
    <section className="categories-section">
      <div className="container">
        <div className="categories-intro">
          <p>Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
        </div>

        <div className="categories-grid">
          {categories.map(category => (
            <CategoryCard key={category.id} category={category} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategoriesSection;