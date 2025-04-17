// export default Categories
import React, { useEffect, useState } from 'react'
import './Categories.css';
import Category from '../../Components/Category/Category';
import LatestModulerBanner from '../../Components/LatestModuler/LatestModulerBanner';
import CategoriesGetScop from '../../Components/CategoriesGetScop/CategoriesGetScop';
import BestSeller from '../../Components/BestSeller/BestSeller';
import FinanceBannerSlider from '../../Components/FinanceBannerSlider/FinanceBannerSlider';
import ShipBanner from '../../Components/ShipBanner/ShipBanner';
import shipBanner from '../../../Assets/Furniture Mecca/Landing Page/sale banner/AT FM.jpg'
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import { url } from '../../../utils/api';
import { useSEOContext } from '../../../context/SEOcontext/SEOcontext';
import { useLPContentContext } from '../../../context/LPContentContext/LPContentContext';
import Loader from '../../Components/Loader/Loader';
import DealOfTheDay from '../../Components/DealOfTheDay/DealOfTheDay';

const Categories = ({
}) => {

  const { categorySlug } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const [loading, setLoading] = useState(false);
  const { setTitle, setDescription, setImage } = useSEOContext();
  const [contentImages, setContentImages] = useState([]);
  const [error, setError] = useState(null);

  const {
    financingBanners,
    getFinanceBannerImagesFromApi,
    categoryPageData,
    setCategoryPageData,
    categoryData,
    setCategoryData,
    bestSelling,
    setBestSelling,
    paragraph,
    allProducts,
    setAllProducts,
    dealEndTime,
    setDealEndTime,
    setParagraph
  } = useLPContentContext();

  useEffect(() => {
    if(!financingBanners?.length){
      // getFinanceBannerImagesFromApi()
    }
  }, [financingBanners]);


  const getPageData = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${url}/api/v1/sub-category/get/${categorySlug}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        }// Data to send
      });
      const result = await response.json();

      console.log("CAtegory Page Data", result)
      
      setCategoryPageData(result.sub_categories);
      setBestSelling(result.bestSelling);
      setParagraph(result.content); 
      setContentImages(result.content_images);
    } catch (error) {
      setError(error.message);
      setLoading(false)
    } finally {
      setLoading(false);
    }
  };

  const getCategoryData = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${url}/api/v1/productCategory/get?slug=${categorySlug}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        }// Data to send
      });
      const result = await response.json();
      console.log("Category Page Console", result)
      setCategoryData(result.categories[0])
      
      setTitle(result.categories[0].meta.title);
      setDescription(result.categories[0].meta.description);
      setImage(url + result.categories[0].meta.og_image);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getPageData();
    getCategoryData();
  }, [categorySlug]);

  useEffect(() => {
    getPageData();
    if (!location.state) {
      getCategoryData();
    }
  }, [])

  const handleNavigate = (slug, item) => {
    navigate(`/${categorySlug}/${item.slug}`, { state: item });
  };


  useEffect(() => {console.log("all produts", allProducts)}, [allProducts])

  return (
    <>
      
      <LatestModulerBanner customWidth={false} showBanners={false} mainImgShow={true} mobileMainImage={location.state ? location.state?.bannerImage2 : categoryData?.bannerImage2}  mainImage={url + (location.state ? location.state?.bannerImage : categoryData?.bannerImage)} />
      
      <Category title={location.state ? location.state?.name : categoryData?.name} categorySlug={categorySlug} categoryData={categoryPageData} handleNavigate={handleNavigate} />
      {bestSelling &&  (<BestSeller categoryData={bestSelling} />) }
      {allProducts && (
        <DealOfTheDay
        allProducts={allProducts}
        setAllProducts={setAllProducts}
        dealEndTime={dealEndTime}
        categorySlug={categorySlug}
        setDealEndTime={setDealEndTime}
        api={`/api/v1/products/get-deal-of-month-products?limit=10&slug=${categorySlug}`}
      />
      )}
      
      

      {/* <ShipBanner bannerImg={shipBanner} showBanner={false} paddindTrue={false} /> */}
      <CategoriesGetScop text={paragraph} contentImages={contentImages} isTrue={true} />
      {/* <LatestModulerBanner customWidth={false} showBanners={true} paddingTop={true} mainImgShow={false} /> */}
      {/* <FinanceBannerSlider images={financingBanners} /> */}
      {/* <CustomerServicePanel /> */}
    </>
  )
}

export default Categories