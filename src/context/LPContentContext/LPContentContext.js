import { createContext, useContext, useState, useEffect } from "react";
import { url } from "../../utils/api";
import axios from "axios";

const LPContentContext = createContext();

export const LPContentProvider = ({ children }) => {
  const [data, setData] = useState(null);  // Store API data
  const [loading, setLoading] = useState(true);  // Loading state
  const [error, setError] = useState(null);
  const [landingPageCategories, setLandingPageCategories] = useState([]);
  const [landingPageFOEB, setLandingPageFOEB] = useState([]);


  const [content2, setContent2] = useState({});
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [slides, setSlides] = useState([])


  const getHomeSliderImages = async () => {
    try {
      const response = await axios.get(`${url}/api/v1/pages/home/slider/get`)
      if(response.status === 200) {
        console.log("slider response on landing page", response)
        setSlides(response.data.homeSliders || [])
      } else {
        console.log(`UnExpected Error ${response.status} `)
      }
    } catch (error) {
      console.error("UnExpected Server Error",error);
    }
  }


  const getLandingPageContent2 = async () => {
    const api = `/api/v1/content2/get`
    try {
      setLoading(true);
      const response = await axios.get(`${url}${api}`)
      setContent2(response.data);
      setLoading(false);

    } catch (error) {
      console.error("error fetching contents", error);
      setLoading(false);
    }
  }

  const getFeaturedProducts = async () => {
    const api = "/api/v1/products/featured-products?totalProduct=5";
    try {
      setLoading(true);
      const response = await axios.get(`${url}${api}`);
      const filteredProducts = response.data.products.filter(
        (product) => product.parent === 0
      );
      setFeaturedProducts(filteredProducts);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching contents", error);
      setLoading(false);
    }
  };

  const [trendingNow, setTrendingNow] = useState(null);

  const getTrendingProductsData = async () => {
    try {
      if(trendingNow === null) {
        const response = await axios.get(`${url}/api/v1/pages/home/trending-now/get`);
        setTrendingNow(response.data?.data)
      }
        
    } catch (error) {
        console.error(error);
    }
};

const [financingBanners, setFinancingBanners] = useState([])
const getFinanceBannerImagesFromApi = async () => {
  try {
      if(financingBanners === null) {
        const response = await axios.get(`${url}/api/v1/pages/home/finance-slider/get`);
  
        setFinancingBanners(response?.data?.homeSliders)
      }
      
      // console.log("finance images", response.data.homeSliders)
  } catch (error) {
      console.log("error", error);
  }
}



  // set handling
  const postData = async () => {
    if (data === null) {
      try {
        const response = await fetch(`${url}/api/v1/content1/get`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          }
        });
        const result = await response.json();
          setData(result);
          setLandingPageCategories(result.landingPageContent.sectional_schema.shop_by_category);
          setLandingPageFOEB(result.landingPageContent.sectional_schema.furniture_for_every_budget);
          setLoading(false)
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    } else {

    }
  };


  return (
    <LPContentContext.Provider value={{
      postData, 
      data, 
      loading, 
      landingPageCategories, 
      landingPageFOEB, 
      setLandingPageFOEB,
      content2,
      setContent2,
      featuredProducts,
      setFeaturedProducts,
      slides, 
      setSlides,
      getHomeSliderImages,
      getLandingPageContent2,
      getFeaturedProducts,
      trendingNow,
      getTrendingProductsData,
      financingBanners,
      getFinanceBannerImagesFromApi
    }}>
      {children}
    </LPContentContext.Provider>
  );
}

export const useLPContentContext = () => {
  return useContext(LPContentContext);
};