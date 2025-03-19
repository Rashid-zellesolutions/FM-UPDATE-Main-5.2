// ProductArchiveContext.js
import { createContext, useContext, useEffect, useState } from "react";

const ProductArchiveContext = createContext();

export const ProductArchiveProvider = ({ children }) => {



  // const [products, setProducts] = useState([]);

  const [products, setProducts] = useState(() => {
    // Load data from localStorage on initial render
    const savedData = localStorage.getItem("productData");
    return savedData ? JSON.parse(savedData) : []; // Default to empty array
  });

   // Save data to localStorage whenever it updates
  useEffect(() => {
    localStorage.setItem("productData", JSON.stringify(products));
  }, [products]);

  const [activePage, setActivePage] = useState(1);
  const [activePageIndex, setActivePageIndex] = useState(1);

  const [priceRange, setPriceRange] = useState([130, 900]);

  // const [allFilters, setAllFilters] = useState();

  const [allFilters, setAllFilters] = useState(() => {
    // Load data from localStorage on initial render
    const savedData = localStorage.getItem("filterData");
    return savedData ? JSON.parse(savedData) : []; // Default to empty array
  });

   // Save data to localStorage whenever it updates
  useEffect(() => {
    localStorage.setItem("filterData", JSON.stringify(allFilters));
  }, [allFilters]);

  const [colorValue, setColorValue] = useState([]);

  const [subCategories, setSubCategories] = useState([])

  const [categoryData, setCategoryData] = useState([]);
  const [totalPages, setTotalPages] = useState();

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
        subCategories,
        setSubCategories,
        categoryData,
        setCategoryData,
        totalPages,
        setTotalPages,
        colorValue,
        setColorValue,
      }}
    >
      {children}
    </ProductArchiveContext.Provider>
  );
};

export const useProductArchive = () => useContext(ProductArchiveContext);
