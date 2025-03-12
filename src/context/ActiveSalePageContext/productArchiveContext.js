// ProductArchiveContext.js
import { createContext, useContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

const ProductArchiveContext = createContext();

export const ProductArchiveProvider = ({ children }) => {

   

  const [products, setProducts] = useState([]);
  const [activePage, setActivePage] = useState(1);
  const [activePageIndex, setActivePageIndex] = useState(1);

  const [priceRange, setPriceRange] = useState([130, 900]);
  
      const [allFilters, setAllFilters] = useState();

  return (
    <ProductArchiveContext.Provider
      value={{
        products,
        setProducts,
        activePage,
        setActivePage,
        activePageIndex,
        setActivePageIndex,
        priceRange,
        setPriceRange,
        allFilters,
        setAllFilters,
      }}
    >
      {children}
    </ProductArchiveContext.Provider>
  );
};

export const useProductArchive = () => useContext(ProductArchiveContext);
