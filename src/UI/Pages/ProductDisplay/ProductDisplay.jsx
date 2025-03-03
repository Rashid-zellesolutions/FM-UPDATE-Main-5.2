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
import { useCart } from '../../../context/cartContext/cartContext';
import Breadcrumb from '../../../Global-Components/BreadCrumb/BreadCrumb';

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

  // Add To Cart Functionality
  const {
    addToCart,
    decreamentQuantity,
    increamentQuantity,
    removeFromCart,
    addToCart0,
    cartProducts
  } = useCart();

  const [variationData, setVariationData] = useState([])
  const [isLoading, setIsLoading] = useState(false);
  const [isProtectionCheck, setIsProtectionCheck] = useState(true)
  const [cartSection, setCartSection] = useState(false);
  const [quantity, setQuantity] = useState(1)

  const decreaseLocalQuantity = () => {
    setQuantity((prevQuantity) => Math.max(1, prevQuantity - 1));
  }

  const increaseLocalQuantity = () => {
    setQuantity(quantity + 1);
  }

  const handleQuantityChange = (e) => {
    const { value } = e.target;
    setQuantity(value)
  }

  const handleClick = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  };

  const handleAddToCartProduct = (product) => {
    setCartSection(true);
    addToCart(product, quantity, !isProtectionCheck);
  }

  const handleCartClose = () => {
    setCartSection(false)
    setQuantity(1)

  }

  // console.log("product Data", product)

  // Parentcategories
  
  

  return (
    <div className='product-display-page-main-container'>
      <Breadcrumb category={product.categories} />
      <ProductDetailSticky
        productData={product}
        decreaseLocalQuantity={decreaseLocalQuantity}
        quantity={quantity}
        handleQuantityChange={handleQuantityChange}
        increaseLocalQuantity={increaseLocalQuantity}
        isLoading={isLoading}
        handleClick={handleClick}
        addToCart0={addToCart0}
        isProtectionCheck={isProtectionCheck}
        handleAddToCartProduct={handleAddToCartProduct}
        cartProducts={cartProducts}
        cartSection={cartSection}
        variationData={variationData}
        setVariationData={setVariationData}
        handleCartClose={handleCartClose}
        setCartSection={setCartSection}
        removeFromCart={removeFromCart}
        decreamentQuantity={decreamentQuantity}
        increamentQuantity={increamentQuantity}
        isSticky={isSticky}
        // parentCategories={parentCategories}
      />

      <ProductStickyTabBar 
        sectionRefs={sectionRefs} 
        productData={product} 
        isSticky={isSticky} 
        setIsSticky={setIsSticky} 
        variationData={variationData}
        addToCart0={addToCart0}
        handleAddToCartProduct={handleAddToCartProduct}
        isProtectionCheck={isProtectionCheck}
        quantity={quantity}
      />

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