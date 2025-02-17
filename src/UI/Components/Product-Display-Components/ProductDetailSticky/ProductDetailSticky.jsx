import React, { useEffect, useRef, useState } from 'react'
import './ProductDetailSticky.css'
import ProductGallery from '../ProductGallery/ProductGallery'
import ProductDimension from '../ProductDimenson/ProductDimension'
import SingleProductFAQ from '../../SingleProductFAQ/SingleProductFAQ'
import WhatWeOffer from '../../WhatWeOffer/WhatWeOffer'
import FinancingOptions from '../../FinancingOptions/FinancingOptions'
import { useProductPage } from '../../../../context/ProductPageContext/productPageContext'
import RatingReview from '../../starRating/starRating'
import { FaShareSquare } from 'react-icons/fa'
import { useCart } from '../../../../context/cartContext/cartContext'
import axios from 'axios'
import { formatedPrice, url } from '../../../../utils/api'
import { useNavigate, useParams } from 'react-router-dom'
import AlsoNeed from '../../AlsoNeed/AlsoNeed'
import SizeVariant from '../../SizeVariant/SizeVariant'
import { FaPlus, FaWindowMinimize } from 'react-icons/fa6'
import { useList } from '../../../../context/wishListContext/wishListContext'

import redHeart from '../../../../Assets/icons/red-heart.png'
import filledHeart from '../../../../Assets/icons/filled-heart.png';
import { SiAdguard } from "react-icons/si";
import DimensionDetail from '../DimensionDetail/DimensionDetail'

import { IoMdHeartEmpty, IoMdHeart } from "react-icons/io";
import ShareProduct from '../../ShareProduct/ShareProduct'
import CartSidePannel from '../../Cart-side-section/CartSidePannel'
import { useGlobalContext } from '../../../../context/GlobalContext/globalContext'

const ProductDetailSticky = (
  {
    productData,
    decreaseLocalQuantity,
    quantity,
    handleQuantityChange,
    increaseLocalQuantity,
    isLoading,
    handleClick,
    addToCart0,
    // isProtectionCheck,
    handleAddToCartProduct,
    cartProducts,
    cartSection,
    handleCartClose,
    setCartSection,
    removeFromCart,
    decreamentQuantity,
    increamentQuantity,
    variationData,
    setVariationData
  }) => {

  const navigate = useNavigate()

  // Get Product Data from previous route or api
  const {
    setSingleProductData,
    setSelectedVariationUid,
    findObjectByUID,
    setSelectedVariationData,
    selectedVariationData
  } = useProductPage();

  const { slug } = useParams()
  const [getBySlug, setGetBySlug] = useState({})

  const getProductDataWithSlug = async (slug) => {
    const api = `/api/v1/products/get-by-slug/`
    try {
      const response = await axios.get(`${url}${api}${slug}`)
      const temporaryProduct = response.data.products[0] || {};
      setGetBySlug(temporaryProduct)
    } catch (error) {
      console.error("Error Fetching fetching data with slug", error);
    }
  }

  // Effect to fetch data if user came directly via link
  useEffect(() => {
    if (!productData || Object.keys(productData).length === 0 || !('images' in productData)) {
      getProductDataWithSlug(slug);
    }
    setSingleProductData(productData)
    setSelectedVariationUid(productData?.default_variation)
    setSelectedVariationData(findObjectByUID(productData?.default_variation, productData?.variations));

  }, [productData, slug]);

  const [product, setProduct] = useState(
    Object.keys(productData || {}).length > 0 && productData.images !== undefined
      ? productData
      : getBySlug
  );

  useEffect(() => {

    if (
      Object.keys(productData || {}).length > 0 &&
      productData.images !== undefined &&
      productData !== product
    ) {
      setProduct(productData);
    } else if (!productData || Object.keys(productData).length === 0 || !productData.images) {
      setProduct(getBySlug);
    }
  }, [productData, slug, getBySlug, product])

  useEffect(() => { }, [product])

  // Share Product Modal
  const [isSharePopup, setIsSharePopup] = useState(null);
  const [selectedProduct, SetSelectedProduct] = useState()
  const handleShareModal = (item) => {
    setIsSharePopup(item.uid)
    SetSelectedProduct(item)
  }

  // Variation Select and auto select
  const [selectedColor, setSelectedColor] = useState();
  const handleSelectColor = (value) => {
    setSelectedColor(value);
  }

  // const [variationData, setVariationData] = useState([])

  const [selectVariation, setSelectVariation] = useState(0);
  const handleSelectVariation = (value) => {
    setSelectVariation(value);
  }
  const [selectedUid, setSelectedUid] = useState(null);

  const handleSelectedVariationData = (value) => {
    setSelectedUid(value);

    const selectedIndex = productData?.variations?.findIndex(variation => variation?.uid === value);

    setVariationData(productData?.variations?.[selectedIndex]);

  };

  // Protection Plan
  const { setWarrantyModalState } = useGlobalContext();
  const [isSingleProtectionChecked, setIsSingleProtectionChecked] = useState(false);
  const [isProtected, setIsProtected] = useState(true)
  const handleWarrantyModal = () => {
    setWarrantyModalState(true)
  }

  const [protectionCheck, setProtectionCheck] = useState(false)

  const handleProtection = (key, isChecked) => {
    console.log("value is check", isChecked)
    setProtectionCheck(!protectionCheck)
    if (key === 'single-protection') {
      setIsSingleProtectionChecked(isChecked);
      console.log("is protected on first", isSingleProtectionChecked)
      setIsProtected(isSingleProtectionChecked)
      console.log("is protected after value change", isProtected)
    }
  };

  useEffect(() => {
    console.log("protect value", isSingleProtectionChecked)
  }, [isSingleProtectionChecked,])

  // Add To WishList and Remove
  const { addToList, removeFromList, isInWishList } = useList()
  const handleWishList = (item) => {

    if (isInWishList(item?.uid)) {
      removeFromList(item?.uid)
    } else {
      addToList(item)
    }
  }

  const handleNavigate = () => {
    navigate('/contact-us')
  }

  // Zoom gallery

  const [zoomIn, setZoomIn] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [dragging, setDragging] = useState(false);
  const [startPos, setStartPos] = useState({ x: 0, y: 0 });
  const [isClick, setIsClick] = useState(false);

  const handleZoomImage = () => {
    console.log("zoom func call")
    setZoomIn(!zoomIn);
    if (!isClick) {
      setPosition({ x: 0, y: 0 }); // Reset position when zooming out
    }
  };

  const handleMouseDown = (e) => {
    if (!zoomIn) return;
    setDragging(true);
    setIsClick(true);
    setStartPos({ x: e.clientX - position.x, y: e.clientY - position.y });
  };

  const handleMouseMove = (e) => {
    if (!dragging || !zoomIn) return;
    e.preventDefault();

    const newX = e.clientX - startPos.x;
    const newY = e.clientY - startPos.y;

    setPosition({ x: newX, y: newY });
    setIsClick(false);
  };

  const handleMouseUp = () => {
    setDragging(false);
  };

  return (
    <div className='product-detail-sticky-section-main-container'>
      <div className='product-detail-sticky-gallery-and-detail'>
        <div className='product-detail-product-gallery-section'>
          <ProductGallery
            productData={product}
            selectedVariationData={selectedVariationData}
            productImages={product?.images}
            zoomIn={zoomIn}
            setZoomIn={setZoomIn}
            handleMouseMove={handleMouseMove}
            handleMouseDown={handleMouseDown}
            handleMouseUp={handleMouseUp}
            dragging={dragging}
            setDragging={setDragging}
            position={position}
            setPosition={setPosition}

          />
          <ProductDimension productData={product} handleZoom={handleZoomImage} variationData={selectedVariationData} />
          <DimensionDetail />
        </div>

        <div className='product-detail-product-info-section'>

          <div className='product-detail-info-sticky'>
            <div className='product-detail-name-and-rating-etc'>
              <h3>{product?.name}</h3>
              <p>SKU : {product.sku}</p>
              <div className='product-detail-rating-and-share'>
                <RatingReview rating={(product?.average_rating)} disabled={true} size={"20px"} />
                <span
                  className='single-product-share'
                  onClick={() => handleShareModal(productData)}
                >
                  <FaShareSquare className='single-product-share-icon' size={20} />
                </span>
              </div>

              {product?.type === "simple" ? <>
                {product?.sale_price !== "" ? <div className='single-product-prices'>
                  <del className='single-product-old-price'>{formatedPrice(productData?.regular_price)}</del>
                  <h3 className='single-product-new-price'>{formatedPrice(productData?.sale_price)}</h3>
                </div> : <div className='single-product-prices'>
                  <h3 className='single-product-new-price'>{formatedPrice(productData?.regular_price)}</h3>
                </div>
                }
              </> : <>
                {selectedVariationData?.sale_price !== "" ? <div className='single-product-prices'>
                  <del className='single-product-old-price'>{formatedPrice(selectedVariationData?.regular_price)}</del>
                  <h3 className='single-product-new-price'>{formatedPrice(selectedVariationData?.sale_price)}</h3>
                </div> : <div className='single-product-prices'>
                  <h3 className='single-product-new-price'>{formatedPrice(product?.regular_price)}</h3>
                </div>
                }
              </>}

              <div className='single-product-frame-color'>
                <SizeVariant
                  productType={product.type}
                  productData={product.variations}
                  attributes={product.attributes}
                  selectedColor={selectedColor}
                  selectVariation={selectVariation}
                  handleSelectColor={handleSelectColor}
                  handleSelectVariation={handleSelectVariation}
                  handleSelectedVariationData={handleSelectedVariationData}
                />
              </div>

              <div className='add-cart-or-add-items-div'>
                <div className='item-count'>
                  <button className={`minus-btn ${product.quantity === 1 ? 'disabled' : ''}`} onClick={decreaseLocalQuantity} disabled={product.quantity === 1}>
                    {/* <img src={minus} alt='minus btn' /> */}
                    <FaWindowMinimize size={15} className='minus-icon' />
                  </button>

                  <input
                    type='number'
                    value={quantity}
                    onChange={handleQuantityChange}
                  />
                  <button className='plus-btn' onClick={increaseLocalQuantity}>
                    {/* <img src={plus} alt='plus btn' /> */}
                    <FaPlus size={15} className='plus-icon' />
                  </button>
                </div>
                <div
                  className='product-details-add-to-wishlist-icon'
                  onClick={(e) => { e.stopPropagation(); handleWishList(product) }}
                  style={{ border: isInWishList(product.uid) ? '1px solid red' : '1px solid #595959' }}
                >
                  {isInWishList(product.uid) ? <IoMdHeart size={20} color={isInWishList(product.uid) ? 'red' : '#595959'} />
                    : <IoMdHeartEmpty size={20} />}
                </div>
                {/* <img src={isInWishList(product.uid) ? filledHeart : redHeart} alt='red-heart-icon' className='red-heart-icon' onClick={(e) => { e.stopPropagation(); handleWishList(product) }} /> */}
                <button
                  className={`add-to-cart-btn ${isLoading ? 'loading' : ''}`}
                  onClick={() => {
                    handleClick();
                    addToCart0(product, variationData, !isProtected ? 1 : 0, quantity)
                    handleAddToCartProduct(product);
                  }
                  }>
                  {isLoading ? 'Loading...' : 'Add To Cart'}
                </button>
              </div>

            </div>

            {Object.keys(product).length > 0 ? (
              <FinancingOptions />
            ) : (
              <div className='shimmer-financing-option'>
                <div className='shimmer-financing-cards-sec'>
                  <div className='shimmer-financing-card'></div>
                  <div className='shimmer-financing-card'></div>
                  <div className='shimmer-financing-card'></div>
                </div>
                <div className='shimmer-financing-card-button'></div>
              </div>
            )}


          </div>

          <div className='product-detail-other-info'>

            {/* {Object.keys(product).length > 0 ? (
              <FinancingOptions />
            ) : (
              <div className='shimmer-financing-option'>
                <div className='shimmer-financing-cards-sec'>
                  <div className='shimmer-financing-card'></div>
                  <div className='shimmer-financing-card'></div>
                  <div className='shimmer-financing-card'></div>
                </div>
                <div className='shimmer-financing-card-button'></div>
              </div>
            )} */}

            {product.may_also_need && product.may_also_need.length > 0 ? <AlsoNeed productsUid={product.may_also_need} /> : <></>}

            <div className='product-details-protection-plan-container'>
              <h3>Protect Your Investment</h3>
              <div className='product-details-protection-plan-details-and-add'>

                <div className='product-details-protection-plan'>
                  <SiAdguard size={30} color='#595959' />

                  <div className='product-details-info'>
                    <p>5-Year Platinum Protection (2)</p>

                    <span>
                      <p>+$499.95</p>
                      <strong onClick={handleWarrantyModal}>
                        What's Covered
                      </strong>
                    </span>

                  </div>

                </div>

                {protectionCheck ? (
                  <button
                    onClick={() => handleProtection('single-protection', false)}
                    className='product-detail-add-protection-plan-button'>
                    Applied
                  </button>
                ) : (
                  <button
                    onClick={() => handleProtection('single-protection', true)}
                    className='product-detail-add-protection-plan-button'>
                    Add
                  </button>
                )}


              </div>

              <div className='product-detail-chat-option-container'>
                <p>Product Question?</p>
                <button onClick={handleNavigate}>Contact Us</button>
              </div>

            </div>

          </div>
        </div>
      </div>
      <ShareProduct
        isSharePopup={isSharePopup}
        setIsSharePopup={setIsSharePopup}
        selectedProduct={selectedProduct}
      />

      <CartSidePannel
        cartData={cartProducts}
        addToCartClicked={cartSection}
        handleCartSectionClose={handleCartClose}
        setAddToCartClick={setCartSection}
        removeFromCart={removeFromCart}
        decreamentQuantity={decreamentQuantity}
        increamentQuantity={increamentQuantity}
      />

    </div>
  )
}

export default ProductDetailSticky
