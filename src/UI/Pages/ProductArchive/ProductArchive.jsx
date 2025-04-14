import React, { useEffect} from 'react';
import './ProductArchive.css';

// Components
import FAQ from '../../Components/FAQ/FAQ';
import Products from '../../Components/Products/Products';
import RelatedCategories from '../../Components/Related-categories-Tags/RelatedCategories';
import { useNavigationType } from 'react-router-dom';
import { useProductArchive } from '../../../context/ActiveSalePageContext/productArchiveContext';

const ProductArchive = ({productArchiveHading}) => {

  const navigationType = useNavigationType();

  const {activePage , setActivePage, setActivePageIndex, setColorValue} = useProductArchive()

      useEffect(() => {
          if(navigationType !== 'POP') {
              setActivePage(1);
              setActivePageIndex(activePage);
              setColorValue([])
          }
      }, [navigationType])

  return (
    <div>
        <Products 
          productArchiveHading={productArchiveHading}
          navigationType={navigationType}
        />
        <RelatedCategories
          navigationType={navigationType}
        />
        <FAQ />
    </div>    
  )
}

export default ProductArchive