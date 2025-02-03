import React, { useEffect, useRef, useState } from 'react'
import './ProductDisplay.css';
import ProductDetailSticky from '../../Components/Product-Display-Components/ProductDetailSticky/ProductDetailSticky';
import ProductStickyTabBar from '../../Components/Product-Display-Components/ProductStickyTabBar/ProductStickyTabBar';
import ProductDescriptionTab from '../../Components/Product-Display-Components/ProductTabs/ProductDescriptionTab/ProductDescriptionTab';
import ProductDetailTab from '../../Components/Product-Display-Components/ProductTabs/ProductDetailTab/ProductDetailTab';
import ProductRecommendationTab from '../../Components/Product-Display-Components/ProductTabs/ProductRecommendationTab/ProductRecommendationTab';
import ProductReviewTab from '../../Components/Product-Display-Components/ProductTabs/ProductReviewTab/ProductReviewTab';
import { useLocation, useParams } from 'react-router-dom';
import axios from 'axios';
import { url } from '../../../utils/api';

const ProductDisplay = () => {

  const { slug } = useParams();
  const location = useLocation();
  const [product, setProduct] = useState(location.state || null);
  const [isSticky, setIsSticky] = useState(false)


  const fetchProductBySlug = async (slug) => {
    try {
      const response = await axios.get(`${url}/api/v1/products/get-by-slug/${slug}`);
      const fetchedProduct = response.data.products[0] || {};
      setProduct(fetchedProduct);
    } catch (error) {
      console.error('Error fetching product by slug:', error);
    }
  };

  useEffect(() => {
    if (!product) {
      fetchProductBySlug(slug);
    } 
  }, [product, slug]);

  useEffect(() => { fetchProductBySlug(slug) }, [slug])



  const sectionRefs = {
    Description: useRef(null),
    Details: useRef(null),
    Recommendations: useRef(null),
    Reviews: useRef(null),
  };

  return (
    <div className='product-display-page-main-container'>
      <ProductDetailSticky productData={product} />
      <ProductStickyTabBar sectionRefs={sectionRefs} isSticky={isSticky} setIsSticky={setIsSticky} />

      <ProductDescriptionTab
        descriptionRef={sectionRefs.Description}
        productData={product}
        addMarginTop={isSticky}
      />

      <ProductDetailTab
        detailsRef={sectionRefs.Details}
        productData={product}
      />
      <ProductRecommendationTab
        recommendationRef={sectionRefs.Recommendations}
        product={product}
      />
      <ProductReviewTab
        reviewRef={sectionRefs.Reviews}
        product={product}
      />


    </div>
  )
}

export default ProductDisplay