import React, { useEffect, useRef, useState } from 'react'
import './ProductDetailSticky.css'
import ProductGallery from '../ProductGallery/ProductGallery'
import ProductDimension from '../ProductDimenson/ProductDimension'
import { useProductPage } from '../../../../context/ProductPageContext/productPageContext'
import RatingReview from '../../starRating/starRating'
import { FaShareSquare } from 'react-icons/fa'
import axios from 'axios'
import { formatedPrice, truncateTitle, url ,getDeliveryDate} from '../../../../utils/api'
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
import { useAppointment } from '../../../../context/AppointmentContext/AppointmentContext';
import { useCart } from '../../../../context/cartContext/cartContext'
import { BsTruck } from "react-icons/bs";



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
    isCartLoading,
    // parentCategories,
  }) => {

  // console.log("product data initial state", productData)

  const navigate = useNavigate()
  const { setAppointmentPayload } = useAppointment()
  const [selectedTab, setSelectedTab] = useState(1);

  const { info, fetchAllstores } = useGlobalContext();

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

  useEffect(() => {
    console.log(productData, "here is pdata")
  }, [])


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
  }, [productData, slug, getBySlug])
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
    setShowMiles(true)
  }

  const handleCloseMiles = (e) => {
    // e.stopPropagation()
    setShowMiles(false);
  }


  const [appointmentModal, setAppointmentModal] = useState(false);
  const handleShowAppointmentModal = () => {
    console.log("clicked")
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
    // setAppointmentModal(false);
    setSnakebarOpen(true);
  }
  const handleCloseSnakeBar = () => {
    setSnakebarOpen(false);
  }

  useEffect(() => { }, [addCartSticky])

  const [isProtectionCheck, setIsProtectionCheck] = useState(true)


  const { eachProtectionValue } = useCart();



  return (
    <div className='product-detail-sticky-section-main-container'>

      <div className='product-detail-sticky-gallery-and-detail'>

        <div className='product-detail-product-gallery-section'>

          <div className='mobile-view-slider-top-details'>
            {
              product?.tags?.length > 0 && <div className="product-tagging">
                {
                  product?.tags[0] && product?.tags[0].type.toLowerCase() === "text" ?
                    <div className='text-tag' style={{ backgroundColor: product?.tags[0].bg_color, color: product?.tags[0].text_color }} >
                      {product?.tags[0].text}
                    </div> :
                    <div className='image-tag' >
                      <img src={url + product?.tags[0]?.image} alt="" srcset="" />
                    </div>
                }
              </div>
            }

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
            {product?.type === "simple" ? <>
              {product?.sale_price !== "" ? <div className='single-product-prices'>

                <h3 className='single-product-new-price'>{formatedPrice(productData?.sale_price)}</h3>
                <del className='single-product-old-price'>{formatedPrice(productData?.regular_price)}</del>
              </div> : <div className='single-product-prices'>
                <h3 className='single-product-new-price'>{formatedPrice(productData?.regular_price)}</h3>
              </div>
              }
            </> : <>
              {selectedVariationData?.sale_price !== "" ? <div className='single-product-prices'>

                <h3 className='single-product-new-price'>{formatedPrice(selectedVariationData?.sale_price)}</h3>
                <del className='single-product-old-price'>{formatedPrice(selectedVariationData?.regular_price)}</del>
              </div> : <div className='single-product-prices'>
                <h3 className='single-product-new-price'>{formatedPrice(selectedVariationData?.regular_price)}</h3>
              </div>
              }
            </>}

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
              {
                product?.tags?.length > 0 && <div className="product-tagging">
                  {
                    product?.tags[0] && product?.tags[0].type.toLowerCase() === "text" ?
                      <div className='text-tag' style={{ backgroundColor: product?.tags[0].bg_color, color: product?.tags[0].text_color }} >
                        {product?.tags[0].text}
                      </div> :
                      <div className='image-tag' >
                        <img src={url + product?.tags[0]?.image} alt="" srcset="" />
                      </div>
                  }
                </div>
              }
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
                  <h3 className='single-product-new-price'>{formatedPrice(selectedVariationData?.regular_price)}</h3>
                </div>
                }
              </>}

              

            </div>

            


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
                style={{ border: isInWishList(product.uid) ? '1px solid red' : '1px solid var(--secondary-color)' }}
              >
                {isInWishList(product.uid) ? <IoMdHeart size={20} color={isInWishList(product.uid) ? 'red' : 'var(--secondary-color)'} />
                  : <IoMdHeartEmpty size={20} />}
              </div>

              



              <button
                className={`add-to-cart-btn ${isLoading ? 'loading' : ''}`}
                onClick={() => {
                  handleClick();
                  addToCart0(product, variationData, !isProtected ? 1 : 0, quantity)
                  // handleAddToCartProduct(product);
                }
                }>
                {isCartLoading && <div className="loader_2"></div>}
                {isCartLoading ? ' Almost there...' : 'Add To Cart'}
              </button>
            </div>

            

            {product.may_also_need && product.may_also_need.length > 0 ? <AlsoNeed productsUid={product.may_also_need} /> : <></>}

            <div className='get-in-timeline-offer'>
              <BsTruck size={21} color='var(--secondary-color)' />
              <div className='get-offer-details'>
                <h3 >Get it by <span style={{fontWeight:"600",color:"var(--primary-color)"}}>{getDeliveryDate()}</span></h3>
                <p>
                  Fully assembled & placed in your room, or in-store pickup.
                </p>
                <span className='location' onClick={handleOpenLocationModal}>
                  <FaLocationDot size={17} color='var(--tertiary-color)' />
                  <p>{info.locationData.zipCode} {info.locationData.stateCode}</p>
                </span>
              </div>
            </div>

            <div className='product-details-protection-plan-container'>
              <h3>Protect Your Investment</h3>
              <div className='product-details-protection-plan-details-and-add'>

                <div className='product-details-protection-plan'>
                  <SiAdguard size={21} color='var(--secondary-color)' />

                  <div className='product-details-info'>
                    <p>5-Year Platinum Protection</p>

                    <span>
                      <p>+${eachProtectionValue}</p>
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
                <PiStorefrontLight size={20} color='var(--secondary-color)' />
                <h3>See it in Person</h3>
              </div>

              <div className='see-it-in-person-body' onClick={handleCloseMiles}>

                <p>This collection is on display in 3 stores within</p>

                <div className='see-it-in-person-distance-and-zip'>

                  <div className='see-it-in-person-distance-drop-down'>
                    <span onClick={handleMilesDropdown}>
                      <p>{miles}</p>
                      <MdOutlineKeyboardArrowDown size={15} color='var(--tertiary-color)' />
                    </span>
                    <div className={`miles-dropdown-body ${showMiles ? 'show-miles-dropdown' : ''}`}>
                      {milesData.map((item, index) => (
                        <p key={index} onClick={() => {
                          setMiles(item.distance);
                          setShowMiles(false)
                        }}>{item.distance}</p>
                      ))}
                    </div>
                  </div>

                  <p>of</p>

                  <span onClick={handleOpenLocationModal}>
                    <FaLocationDot size={17} color='var(--tertiary-color)' />
                    <p>{info.locationData.zipCode} {info.locationData.stateCode}</p>
                  </span>

                </div>

              </div>

              <div className='see-it-in-person-book-appointment-container'>
                <SlCalender size={20} color='var(--tertiary-color)' />
                <p onClick={handleShowAppointmentModal}>MAKE AN APPOINTMENT</p>
              </div>

              

            </div>
            <div className='talk-with-expert-main-container'>
                <p>Talk with an Expert</p>
                <div className='talk-with-expert-options'>

                  <a href='tel:2153521600'>
                    <IoCallOutline size={18} color='var(--secondary-color)' />
                    Call
                  </a>

                  <button className='disable-chat' disabled={true}>
                    <IoChatbubbleOutline size={18} color='var(--secondary-color)' />
                    Chat
                  </button>

                  <button onClick={handleShowAppointmentModal} >
                    <PiStorefrontLight size={18} color='var(--secondary-color)' />
                    Visit
                  </button>

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
        style={{ boxShadow: !isSticky ? 'rgba(0, 0, 0, 0.24) 0px 3px 8px' : 'none' }}
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
