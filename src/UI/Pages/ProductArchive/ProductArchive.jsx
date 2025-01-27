import React from 'react';
import './ProductArchive.css';


// Components
import FAQ from '../../Components/FAQ/FAQ';
import Products from '../../Components/Products/Products';
import RelatedCategories from '../../Components/Related-categories-Tags/RelatedCategories';

const ProductArchive = ({productArchiveHading}) => {
  
  return (
    <div>
        <Products 
          productArchiveHading={productArchiveHading}
        />
        <RelatedCategories />
        <FAQ />
    </div>    
  )
}

export default ProductArchive
