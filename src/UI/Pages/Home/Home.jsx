import React, { useState, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css';

// Assets
import shipBanner from '../../../Assets/Furniture Mecca/Landing Page/sale banner/AT FM.jpg'

// components
import Category from '../../Components/Category/Category';
import ShipBanner from '../../Components/ShipBanner/ShipBanner';
import ProductSlider from '../../Components/ProductSlider/ProductSlider';
import GetTheScop from '../../Components/GetTheScop/GetTheScop';
import Sliderr from '../../../Global-Components/Slider/Slider';
import BlogSlider from '../../Components/BlogSlider/BlogSlider';
import NearStorePopUp from '../../Components/NearStorePopUp/NearStorePopUp';
import BestSellerSlider from '../../Components/BestSellerSlider/BestSellerSlider';
import InstaGallery from '../../Components/InstaGallery/InstaGallery';
import FinanceBannerSlider from '../../Components/FinanceBannerSlider/FinanceBannerSlider';
import Comparision from '../../Components/Comparision/Comparision';
import DealOfTheDay from '../../Components/DealOfTheDay/DealOfTheDay';
import TrendingNow from '../../Components/TrendingNow/TrendingNow';
import FurnitureForBudget from '../../Components/FurnitureForBudget/FurnitureForBudget';
import AnnouncmentBanners from '../../Components/AnnouncmentBanner/AnnouncmentBanner';
import MobileFinancingSlider from '../../Components/FinanceBannerSlider/MobileFinancingSlider';
import FinanceBanner2 from '../../Components/FinanceBannerSlider/FinanceBanner2';
import InstaTwoImageGallery from '../../Components/InstaTwoImageGallery/InstaTwoImageGallery';
import { useLPContentContext } from '../../../context/LPContentContext/LPContentContext';
import LandingPageFinancing from '../../Components/LandingPageFinancingBanners/LandingPageFinancing';




const Home = () => {
  const [currentUrl, setCurrentUrl] = useState('/');
  const { postData, 
    data, 
    landingPageCategories, 
    landingPageFOEB,
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
   } = useLPContentContext();

  const location = useLocation();
  useEffect(() => {
    setCurrentUrl(location.pathname);
  }, [location]);


  useEffect(() => {
    if (!slides.length) {
      getHomeSliderImages();
    }
    if (!data) {
      postData();
    }
    if (Object.keys(content2).length === 0) {
      getLandingPageContent2();
    }
    if (!featuredProducts.length) {
      getFeaturedProducts();
    }
    if(!trendingNow){
      getTrendingProductsData();
    }
    if(!financingBanners.length){
      getFinanceBannerImagesFromApi()
    }
  }, [slides,data,content2,featuredProducts,trendingNow,financingBanners]);
  
  const navigate = useNavigate();

  const handleNavigate = (slug, item) => {
    navigate(`/${slug}`, { state: item });
  };




  return (
    <div className='home-page-main-container'>
      <NearStorePopUp />
      <Sliderr images={slides ? slides : []} />
      <ShipBanner bannerImg={shipBanner} showBanner={true} paddindTrue={false} />
      <Category title={'Shop by Category'} categoryData={landingPageCategories} handleNavigate={handleNavigate} />
      <FinanceBannerSlider images={financingBanners} />
      <MobileFinancingSlider />
      <LandingPageFinancing />
      <TrendingNow data={trendingNow? trendingNow : null} />

      <BestSellerSlider />
      
      {content2?.section_2 && (
        <FinanceBanner2
          heading={content2.section_2?.heading}
          image={content2.section_2?.image}
          mobileImage={content2.section_2?.mobile_image}
        />
      )} 

      {content2?.section_1 && (
        <Comparision
          heading={content2.section_1.heading}
          image={content2.section_1.image}
          mobileImage={content2.section_1.mobile_image}
        />
      )}


      {featuredProducts &&
        (<ProductSlider cardData={featuredProducts} />)
      }
      <DealOfTheDay />
      {landingPageFOEB && (
        <FurnitureForBudget budgetCardData={landingPageFOEB} />
      )}
      

      <GetTheScop />
      <BlogSlider />
      <InstaGallery />
      <InstaTwoImageGallery />
    </div>
  )
}

export default Home