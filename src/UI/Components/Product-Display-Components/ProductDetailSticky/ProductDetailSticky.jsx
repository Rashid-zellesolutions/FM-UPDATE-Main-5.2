import React, { useEffect, useRef, useState } from 'react'
import './ProductDetailSticky.css'
import ProductGallery from '../ProductGallery/ProductGallery'
import ProductDimension from '../ProductDimenson/ProductDimension'
import { useProductPage } from '../../../../context/ProductPageContext/productPageContext'
import RatingReview from '../../starRating/starRating'
import { FaShareSquare } from 'react-icons/fa'
import axios from 'axios'
import { formatedPrice, truncateTitle, url } from '../../../../utils/api'
import { useNavigate, useParams } from 'react-router-dom'
import AlsoNeed from '../../AlsoNeed/AlsoNeed'
import SizeVariant from '../../SizeVariant/SizeVariant'
import { FaLocationDot, FaPlus, FaWindowMinimize } from 'react-icons/fa6'
import { useList } from '../../../../context/wishListContext/wishListContext'
import { SlCalender } from "react-icons/sl";

import { SiAdguard } from "react-icons/si";
import DimensionDetail from '../DimensionDetail/DimensionDetail'

import { IoCallOutline, IoChatbubbleOutline } from "react-icons/io5";

import { IoMdHeartEmpty, IoMdHeart } from "react-icons/io";
import ShareProduct from '../../ShareProduct/ShareProduct'
import CartSidePannel from '../../Cart-side-section/CartSidePannel'
import { useGlobalContext } from '../../../../context/GlobalContext/globalContext'
import { PiStorefrontLight } from "react-icons/pi";
import { MdOutlineKeyboardArrowDown } from 'react-icons/md'
import AppointmentModal from '../../../../Global-Components/AppointmentModal/AppointmentModal'
import LocationPopUp from '../../LocationPopUp/LocationPopUp'
import ConfirmationModal from '../../../../Global-Components/AppointmentModal/ConfirmationModal/ConfirmationModal'
import SnakBar from '../../../../Global-Components/SnakeBar/SnakBar'
import { useAppointment } from '../../../../context/AppointmentContext/AppointmentContext'


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
    setVariationData,
    handleGalleryModal,
    isSticky,
    // parentCategories,
  }) => {

    // console.log("product data initial state", productData)

  const navigate = useNavigate()
  const { setAppointmentPayload } = useAppointment()
  const [selectedTab, setSelectedTab] = useState(1);

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

  }, [slug]);
  // productData in this effect dependancy

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
  }, [productData, slug, getBySlug ])
  // product from this dependancy


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
    setProtectionCheck(!protectionCheck)
    if (key === 'single-protection') {
      setIsSingleProtectionChecked(isChecked);
      setIsProtected(isSingleProtectionChecked)
    }
  };

  // useEffect(() => {
  // }, [isSingleProtectionChecked,])

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

  const [showMiles, setShowMiles] = useState(false);
  const milesData = [
    { distance: '50 MILES' },
    { distance: '100 MILES' },
    { distance: '200 MILES' },
  ]
  const [miles, setMiles] = useState(milesData[0].distance);
  const handleMilesDropdown = () => {
    setShowMiles(!showMiles)
  }

  const contectInfo = [
    { title: 'Call', icon: <IoCallOutline size={18} color='#595959' /> },
    { title: 'Chat', icon: <IoChatbubbleOutline size={18} color='#595959' /> },
    { title: 'Visit', icon: <PiStorefrontLight size={18} color='#595959' /> },
  ]

  const [appointmentModal, setAppointmentModal] = useState(false);
  const handleShowAppointmentModal = () => {
    setAppointmentModal(true);
  }

  const handleCloseAppointmentModal = () => {
    setAppointmentModal(false)
    setSelectedTab(1)
    setAppointmentPayload({
      serviceType: '',
      selectedCategories: [],
      selectedStore: {},
      otherDetails: 'Customer has sensitive skin',
      selectedDate: '',
      selectedSlot: '',
      details: {
        firstName: '',
        lastName: '',
        email: '',
        contact: '',
        associate: ''
      }
    })
  }

  useEffect(() => {
    document.body.style.overflow = appointmentModal ? 'hidden' : 'auto';
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [appointmentModal]);

  const [showLocation, setShowLocation] = useState(false);
  const [locationData, setLocationData] = useState();
  const handleOpenLocationModal = () => {
    setShowLocation(true);
  }
  const handleCloseLocationModal = () => {
    setShowLocation(false);
  }

  const [addCartSticky, setAddCartSticky] = useState(false)
  // const [isCartTop, setIsCartTop] = useState
  const cartDivRef = useRef(null);
  useEffect(() => {
    const handleScrollAddToCart = () => {
      if (cartDivRef.current) {
        const rect = cartDivRef.current.getBoundingClientRect();
        setAddCartSticky(rect.top <= 0);
      }
    }
    window.addEventListener('scroll', handleScrollAddToCart);


    return () => window.removeEventListener('scroll', handleScrollAddToCart);

  }, [cartDivRef]);
  const [errorMessage, setErrorMessage] = useState('Something went wrong! Please try again later.');
      const [snakebarOpen, setSnakebarOpen] = useState(false);

  const handleOpenSnakeBar = () => {
    console.log("snakebar open function called")
    // setAppointmentModal(false);
    setSnakebarOpen(true);
  }
  const handleCloseSnakeBar = () => {
    setSnakebarOpen(false);
  }

  useEffect(() => {  }, [addCartSticky])

  const [isProtectionCheck, setIsProtectionCheck] = useState(true)




  

  return (
    <div className='product-detail-sticky-section-main-container'>

      <div className='product-detail-sticky-gallery-and-detail'>

        <div className='product-detail-product-gallery-section'>

          <div className='mobile-view-slider-top-details'>
            <h3>{product?.name}</h3>
            {/* <p>SKU : {product.sku}</p> */}
            <div className='product-detail-rating-and-share'>
              {/* <RatingReview rating={(product?.average_rating)} disabled={true} size={"20px"} /> */}

              <p>SKU : {product.sku}</p>

              <span
                className='single-product-share'
                onClick={() => handleShareModal(productData)}
              >
                <FaShareSquare className='single-product-share-icon' size={20} />
              </span>
            </div>

              <RatingReview rating={(product?.average_rating)} disabled={true} size={"20px"} />
            
          </div>

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
            handleGalleryModal={handleGalleryModal}

          />
          <ProductDimension productData={product} handleGalleryModal={handleGalleryModal} handleZoom={handleZoomImage} zoomIn={zoomIn} variationData={selectedVariationData} />
          {product?.weight_dimension && <DimensionDetail productData={product} />}

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

              {/* <div className='single-product-frame-color'>
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

              <div className='add-cart-or-add-items-div' ref={cartDivRef}>
                <div className='item-count'>
                  <button className={`minus-btn ${product.quantity === 1 ? 'disabled' : ''}`} onClick={decreaseLocalQuantity} disabled={product.quantity === 1}>
                    
                    <FaWindowMinimize size={15} className='minus-icon' />
                  </button>

                  <input
                    type='number'
                    value={quantity}
                    onChange={handleQuantityChange}
                  />
                  <button className='plus-btn' onClick={increaseLocalQuantity}>
                    
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
              </div> */}

            </div>

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


          </div>

          <div className='product-detail-other-info'>


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

            <div className='add-cart-or-add-items-div' ref={cartDivRef}>
              <div className='item-count'>
                <button className={`minus-btn ${product.quantity === 1 ? 'disabled' : ''}`} onClick={decreaseLocalQuantity} disabled={product.quantity === 1}>

                  <FaWindowMinimize size={15} className='minus-icon' />
                </button>

                <input
                  type='number'
                  value={quantity}
                  onChange={handleQuantityChange}
                />
                <button className='plus-btn' onClick={increaseLocalQuantity}>

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

            <div className='back-in-order-container'>
              <p>
                Back in stock 2/28/2025. Order now! We'll contact you to schedule delivery once your item is ready.
              </p>
              <span onClick={handleOpenLocationModal}>
                <FaLocationDot size={17} color='#4487C5' />
                <p>19134</p>
              </span>
            </div>

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

            <div className='see-in-person-container'>

              <div className='see-it-in-person-head'>
                <PiStorefrontLight size={20} color='#595959' />
                <h3>See it in Person</h3>
              </div>

              <div className='see-it-in-person-body'>

                <p>This collection is on display in 3 stores within</p>

                <div className='see-it-in-person-distance-and-zip'>

                  <div className='see-it-in-person-distance-drop-down'>
                    <span onClick={handleMilesDropdown}>
                      <p>{miles}</p>
                      <MdOutlineKeyboardArrowDown size={15} color='#4487C5' />
                    </span>
                    <div className={`miles-dropdown-body ${showMiles ? 'show-miles-dropdown' : ''}`}>
                      {milesData.map((item, index) => (
                        <p key={index} onClick={() => {
                          setMiles(item.distance);

                        }}>{item.distance}</p>
                      ))}
                    </div>
                  </div>

                  <p>of</p>

                  <span onClick={handleOpenLocationModal}>
                    <FaLocationDot size={17} color='#4487C5' />
                    <p>19134</p>
                  </span>

                </div>

              </div>

              <div className='see-it-in-person-book-appointment-container'>
                <SlCalender size={20} color='#4487C5' />
                <p onClick={handleShowAppointmentModal}>MAKE AN APPOINTMENT</p>
              </div>

              <div className='talk-with-expert-main-container'>
                <p>Talk with an Expert</p>
                <div className='talk-with-expert-options'>
                  {contectInfo.map((item, index) => (
                    <button key={index}>
                      {item.icon}
                      {item.title}
                    </button>
                  ))}
                </div>
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

      <AppointmentModal
        showAppointMentModal={appointmentModal}
        setAppointmentModal={setAppointmentModal}
        handleCloseModal={handleCloseAppointmentModal}
        setErrorMessage={setErrorMessage}
        snakebarOpen={snakebarOpen}
        setSnakebarOpen={setSnakebarOpen}
        handleOpenSnakeBar={handleOpenSnakeBar}
        selectedTab={selectedTab}
        setSelectedTab={setSelectedTab}
      />

      <LocationPopUp
        searchLocation={showLocation}
        handleCloseSearch={handleCloseLocationModal}
        locationDetails={locationData}
        setLocationDetails={setLocationData}
      />


      <div 
        className={`add-to-cart-sticky-section ${addCartSticky ? 'show-sticky-add-to-cart' : ''}`}
        style={{ boxShadow: !isSticky ? 'rgba(0, 0, 0, 0.24) 0px 3px 8px' : 'none'}}
      >
        <div className='mobile-product-sticky-fixed-add-to-cart'>
          <div className='mobile-sticky-product-sale-and-price'>
            <h3 className='sticky-section-product-name'>{productData?.name ? truncateTitle(productData?.name, 23) : ''}</h3>
            <span>
              <h3>Sale</h3>
              <p>{formatedPrice(productData?.sale_price)}</p>
            </span>
          </div>
          <button
            onClick={() => {
              addToCart0(productData, variationData, !isProtectionCheck ? 1 : 0, quantity)
              handleAddToCartProduct(productData);
              // handleSubmitProduct(productData)
            }
            }
          >
            Add To Cart
          </button>
        </div>
      </div>

      <SnakBar
        message={errorMessage}
        openSnakeBarProp={snakebarOpen}
        setOpenSnakeBar={setSnakebarOpen}
        onClick={handleCloseSnakeBar}
      />

    </div>
  )
}

export default ProductDetailSticky
