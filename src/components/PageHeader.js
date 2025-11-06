import React from 'react';

const PageHeader = ({ title, description }) => {
  return (
    <section className="page-header">
      <div className="container">
        <h1 className="page-title">{title}</h1>
        <p className="page-description">{description}</p>
      </div>
    </section>
  );
};

export default PageHeader;