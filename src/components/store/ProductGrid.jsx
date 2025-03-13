// // src/components/store/ProductGrid.jsx
// import React from 'react';
// import ProductCard from './ProductCard';

// const ProductGrid = ({ products = [], columns = 3 }) => {
//   if (!products || products.length === 0) {
//     return <p className="no-products">No products found.</p>;
//   }

//   return (
//     <div className={`product-grid product-grid-${columns}`}>
//       {products.map(product => (
//         <ProductCard key={product.id} product={product} />
//       ))}
//     </div>
//   );
// };

// export default ProductGrid;


// src/components/store/ProductGrid.jsx
import React from 'react';
import ProductCard from './ProductCard';

const ProductGrid = ({ 
  products = [], 
  columns = 3,
  layout = 'grid'
}) => {
  if (!products || products.length === 0) {
    return <p className="no-products">No products found.</p>;
  }

  return (
    <div 
      className={`product-grid product-grid-${columns}`}
      data-layout={layout}
    >
      {products.map(product => (
        <ProductCard 
          key={product.id} 
          product={product} 
          style={product.cardStyle}
        />
      ))}
    </div>
  );
};

export default ProductGrid;