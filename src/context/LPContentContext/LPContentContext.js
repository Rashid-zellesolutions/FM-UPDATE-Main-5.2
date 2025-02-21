import { createContext, useContext, useState} from "react";
import { url } from "../../utils/api";
import axios from "axios";
import BestSellerSliderMainBanner from '../../Assets/Furniture Mecca/Landing Page/best seller products/Home Page Banner 396x595.jpg';

const LPContentContext = createContext();

export const LPContentProvider = ({ children }) => {
  const timeOut = process.env.REACT_APP_TIMEOUT
  const [data, setData] = useState(null);  // Store API data
  const [loading, setLoading] = useState(true);  // Loading state
  const [error, setError] = useState(null);
  const [landingPageCategories, setLandingPageCategories] = useState([]);
  const [landingPageFOEB, setLandingPageFOEB] = useState([]);


  const [content2, setContent2] = useState({});
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [slides, setSlides] = useState([])

  


  // Standard Function
  const getHomeSliderImages = async () => {
    try {
      // if (slides === null) {
      const response = await axios.get(`${url}/api/v1/pages/home/slider/get`, { timeOut })
      if (response.status === 200) {
        setSlides(response.data.homeSliders || [])
      } else {
        console.log(`UnExpected Error ${response.status} `);
      }
      // }
    } catch (error) {
      console.error("UnExpected Server Error", error);
    }
  }

  // Standard Function
  const getLandingPageContent2 = async () => {
    const api = `/api/v1/content2/get`
    try {
      setLoading(true);
      if (content2 === null) {
        const response = await axios.get(`${url}${api}`, { timeOut })
        if (response.status === 200) {
          setContent2(response.data);
          setLoading(false);
        } else {
          console.log("UnExpected Error", response.status)
          setLoading(false);
        }
      }

    } catch (error) {
      console.error("UnExpected Server Error", error);
      setLoading(false);
    }
  }

  // Standard Function
  const getFeaturedProducts = async () => {
    const api = "/api/v1/products/featured-products?totalProduct=5";
    try {
      setLoading(true);
      const response = await axios.get(`${url}${api}`, { timeOut });
      if (response.status === 200) {
        const filteredProducts = response.data.products.filter(
          (product) => product.parent === 0
        );
        setFeaturedProducts(filteredProducts);
        setLoading(false);
      } else {
        console.log("UnExpected Error", response.status);
        setLoading(false);
      }
    } catch (error) {
      console.error("UnExpected Server Error", error);
      setLoading(false);
    }
  };

  const [trendingNow, setTrendingNow] = useState(null);

  // Standard Function
  const getTrendingProductsData = async () => {
    try {
      if (trendingNow === null) {
        const response = await axios.get(`${url}/api/v1/pages/home/trending-now/get`, { timeOut });
        if (response.status === 200) {
          setTrendingNow(response.data?.data)
        } else {
          console.log("UnExpected Error", response.status)
        }
      }

    } catch (error) {
      console.error("UnExpected Server Error", error);
    }
  };

  const [financingBanners, setFinancingBanners] = useState([])
  // Standard Function
  const getFinanceBannerImagesFromApi = async () => {
    try {
      if (financingBanners === null) {
        const response = await axios.get(`${url}/api/v1/pages/home/finance-slider/get`);
        if (response.status === 200) {
          setFinancingBanners(response?.data?.homeSliders)
        } else {
          console.log("UnExpected Error", response.status)
        }
      }
    } catch (error) {
      console.error("UnExpected Server Error", error);
    }
  }

  // set handling
  const postData = async () => {
    if (data === null) {
      try {
        const response = await axios.get(`${url}/api/v1/content1/get`, {
          timeout: timeOut,
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (response.status === 200) {
          const result = response.data
          setData(result);
          setLandingPageCategories(result?.landingPageContent?.sectional_schema?.shop_by_category);
          setLandingPageFOEB(result?.landingPageContent?.sectional_schema?.furniture_for_every_budget);
          setLoading(false)
        } else {
          console.log("UnExpected Error", response.status)
          setLoading(false)
        }
      } catch (error) {
        console.log("UnExpected Server Error", error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    } else {

    }
  };

  const [allProducts, setAllProducts] = useState([])
  const [dealEndTime, setDealEndTime] = useState(null);

  const [bestSellerProducts, setBestSellerProducts] = useState([])
  const [bestSellerNav1, setBestSellerNav1] = useState([
    {
      heading: "Living Room",
      image: BestSellerSliderMainBanner,
      slug: "living-room"
    },
    {
      heading: "Bedroom",
      image: BestSellerSliderMainBanner,
      slug: "bedroom"
    },
    {
      heading: "Dining Room",
      image: BestSellerSliderMainBanner,
      slug: "dining-room"
    },
  ]);

  // Category Page States
    const [categoryPageData, setCategoryPageData] = useState();
    const [categoryData, setCategoryData] = useState();
    const [bestSelling, setBestSelling] = useState();
    const [paragraph, setParagraph] = useState(null);

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
      getFinanceBannerImagesFromApi,
      allProducts,
      setAllProducts,
      dealEndTime,
      setDealEndTime,
      bestSellerProducts,
      setBestSellerProducts,
      bestSellerNav1,
      setBestSellerNav1,
      categoryPageData,
      setCategoryPageData,
      categoryData,
      setCategoryData,
      bestSelling,
      setBestSelling,
      paragraph,
      setParagraph
    }}>
      {children}
    </LPContentContext.Provider>
  );
}

export const useLPContentContext = () => {
  return useContext(LPContentContext);
};