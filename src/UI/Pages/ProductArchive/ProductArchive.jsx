import React, { useEffect, useState } from 'react';
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

  console.log("navigation type", navigationType)
      useEffect(() => {
          if(navigationType !== 'POP') {
              setActivePage(1);
              setActivePageIndex(activePage);
              setColorValue([])
          }
      }, [navigationType])

  // const [isReloaded, setIsReloaded] = useState(false);

  


  // useEffect(() => {
  //   // Check if the page was reloaded
  //   if (sessionStorage.getItem("reloaded") === "true") {
  //     setIsReloaded(true);
  //   }

  //   // Set sessionStorage flag before reload
  //   const handleBeforeUnload = () => {
  //     sessionStorage.setItem("reloaded", "true");
  //   };

  //   window.addEventListener("beforeunload", handleBeforeUnload);

  //   return () => {
  //     window.removeEventListener("beforeunload", handleBeforeUnload);
  //     sessionStorage.removeItem("reloaded"); // Reset on component unmount
  //   };
  // }, []);

  // useEffect(() => {console.log("browser reload", isReloaded)}, [isReloaded])
  
  
  
  return (
    <div>
        <Products 
          productArchiveHading={productArchiveHading}
          navigationType={navigationType}
          // browserReload={isReloaded}
        />
        <RelatedCategories
          navigationType={navigationType}
        />
        <FAQ />
    </div>    
  )
}

export default ProductArchive
