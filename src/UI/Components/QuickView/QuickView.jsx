import React, { useEffect, useState } from 'react'
import './QuickView.css';
import minusBtn from '../../../Assets/icons/minus.png'
import plusBtn from '../../../Assets/icons/plus.png';
import redHeart from '../../../Assets/icons/red-heart.png'
import arrowDown from '../../../Assets/icons/arrow-down-white.png';
import arrowLeft from '../../../Assets/icons/arrow-left.png';
import arrowRight from '../../../Assets/icons/arrow-right.png';
import CartSidePannel from '../Cart-side-section/CartSidePannel';
import { useCart } from '../../../context/cartContext/cartContext';
import crossBtn from '../../../Assets/icons/close-btn.png'
import { FaStar } from "react-icons/fa";
import { formatedPrice, url } from '../../../utils/api';
import QuickViewVariations from '../SizeVariant/QuickViewVariations';
import { VscHeartFilled } from "react-icons/vsc";
import { VscHeart } from "react-icons/vsc";
import { useList } from '../../../context/wishListContext/wishListContext';
import { toast } from 'react-toastify';
import RatingReview from '../starRating/starRating';
// import { IoIosArrowDown } from "react-icons/io";
// Assets
import {
    IoIosArrowUp,
    IoIosArrowDown,
    IoIosArrowBack,
    IoIosArrowForward,
    IoMdArrowDropleft
} from "react-icons/io";

const QuickView = ({ setQuickViewProduct, quickViewClose, quickViewShow, }) => {


    // console.log("Quick View Data", setQuickViewProduct)

    const {
        cart,
        increamentQuantity,
        decreamentQuantity,
        removeFromCart,
        addToCart0,
        cartProducts
    } = useCart();
    const [cartSection, setCartSection] = useState(false);
    const [viewDetails, setViewDetails] = useState(null)
    const [currentIndex, setCurrentIndex] = useState(0);


    const handleCartSectionClose = () => {
        setCartSection(false)
        setQuantity(1)
    }

    const handlePrev = () => {
        setCurrentIndex((prevIndex) => (prevIndex === 0 ? setQuickViewProduct.images.length - 1 : prevIndex - 1));
    };

    const handleNext = () => {
        setCurrentIndex((prevIndex) => (prevIndex === setQuickViewProduct.images.length - 1 ? 0 : prevIndex + 1));
    };

    const handleViewDetails = (index) => {
        setViewDetails(prevIndex => (prevIndex === index ? null : index));
    }

    const quickViewData = [
        {
            name: "Dimensions",
        },
        {
            name: 'Description',
            para: setQuickViewProduct.description,
        },
        {
            name: 'Weight & Dimension',
            para: [
                { id: 1, name: 'Dimensions (in)', val: `L: 88.5" x W: 37.5" x H: 37"` },
                { id: 2, name: 'Color', val: `Sugar Shack Cafe` },
                { id: 3, name: 'Color Family', val: `Brown` },
                { id: 4, name: 'Weight Capacity', val: `900 lbs` },
            ]
        },
    ]

    const startFrom = setQuickViewProduct?.dimension_image !== null ? 0 : 1


    const handleAddToCartProduct = (product) => {
        setCartSection(true);
        addToCart0(product, variableProductData, 0, quantity)
    }

    const imagesLenght = setQuickViewProduct.images && setQuickViewProduct.images.length;
    const [quantity, setQuantity] = useState(1)

    const [variableProductData, setVariableData] = useState();

    const increaseLocalQuantity = () => {
        setQuantity(quantity + 1);
    }
    const decreaseLocalQuantity = () => {
        setQuantity(quantity - 1);
    }

    const [selectedVariationUid, setSelectedVariationUid] = useState(null);
    const handleVariationSelected = (uid) => {
        setSelectedVariationUid(uid);
    };

    useEffect(() => {
        const searchProductInVariation = setQuickViewProduct?.variations?.find((item) => item.uid === selectedVariationUid)
        setVariableData(searchProductInVariation);
    }, [selectedVariationUid])

    // wish list 
    const { addToList, removeFromList, isInWishList } = useList()
    const notify = (str) => toast.success(str);
    const notifyRemove = (str) => toast.error(str)

    const handleWishList = (item) => {
        if (isInWishList(item.uid)) {
            removeFromList(item.uid);
            notifyRemove('Removed from wish list', {
                autoClose: 10000,
                className: "toast-message",
            })

        } else {
            addToList(item)
            notify("added to wish list", {
                autoClose: 10000,
            })
        }
    }


    return (
        // <div className={`quick-view-outer-overlay-container ${quickViewShow ? 'show-quick-view-outer-overlay' : ''}`}>
        <div className={`quick-view-main-container ${quickViewShow ? 'show-quick-view-modal' : ''}`} onClick={quickViewClose}>
            <div
                className={`quick-view-main ${quickViewShow ? 'slide-quick-view-inner-modal' : ''}`}
                onClick={(e) => e.stopPropagation()}
            >
                <button className='quick-view-close-modal-button' onClick={quickViewClose}>
                    <img src={crossBtn} alt='close' />
                </button>
                <div className='quick-view-heading-and-rating'>
                    <h3>{setQuickViewProduct.name}</h3>
                    <div className='quick-view-rating'>
                        <div className='quick-view-start'>
                            <RatingReview rating={parseFloat(setQuickViewProduct?.average_rating)} size={"12px"} disabled={true} />
                            {/* <p>4.1</p> */}
                        </div>

                    </div>
                </div>
                <div className='quick-view-image-and-variations'>
                    <div className="quick-view-slider">
                        <button className={`quick-view-arrow quick-view-left ${currentIndex === 0 ? 'disabled' : ''}`} onClick={handlePrev}>
                            {/* <img src={arrowLeft} alt='left' /> */}
                            <IoIosArrowBack
                                size={15}
                                className='quick-view-product-gallery-arrow-left'
                            />
                        </button>
                        <div className="quick-view-slider-container">
                            {setQuickViewProduct?.type === "simple" ? <div className="quick-view-slider-wrapper" style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
                                {setQuickViewProduct.images && setQuickViewProduct.images.map((image, index) => (
                                    <img key={index} src={`${url}${image.image_url}`} alt={`Slide ${index + 1}`} />
                                ))}
                            </div> :
                                <div className="quick-view-slider-wrapper" style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
                                    {variableProductData?.images && variableProductData?.images?.map((image, index) => (
                                        <img key={index} src={`${url}${image.image_url}`} alt={`Slide ${index + 1}`} />
                                    ))}
                                </div>
                            }
                        </div>
                        <button className={`quick-view-arrow quick-view-right ${currentIndex === imagesLenght - 1 ? 'disabled' : ''}`} onClick={handleNext}>
                            {/* <img src={arrowRight} alt='right' /> */}
                            <IoIosArrowForward
                                size={15}
                                className='quick-view-product-gallery-arrow-right'
                            />
                        </button>
                    </div>
                    <div className='quick-view-variations'>
                        <QuickViewVariations default_uid={setQuickViewProduct.default_uid} attributes={setQuickViewProduct.attributes} productData={setQuickViewProduct} variations={setQuickViewProduct.variations} onChangeVar={handleVariationSelected} />
                    </div>
                </div>
                {setQuickViewProduct.type === "simple" ? <>
                    {
                        setQuickViewProduct.sale_price === "0" ?
                            <h3 className='-quick-view-product-price-tag'>{formatedPrice(setQuickViewProduct.regular_price)}</h3> :
                            <h3 className='quick-view-product-price-tag'> <del>{formatedPrice(setQuickViewProduct.regular_price)}</del>  {formatedPrice(setQuickViewProduct.sale_price)}</h3>
                    }
                </> :
                    <>
                        {
                            variableProductData?.sale_price === "0" ?
                                <h3 className='-quick-view-product-price-tag'>{formatedPrice(variableProductData?.regular_price)}</h3> :
                                <h3 className='quick-view-product-price-tag'> <del>{formatedPrice(variableProductData?.regular_price)}</del>  {formatedPrice(variableProductData?.sale_price)}</h3>
                        }
                    </>}
                <div className='quick-view-add-item-or-cart-btn'>
                    <div className='quick-view-add-or-minus-item'>
                        <button onClick={decreaseLocalQuantity}>
                            <img src={minusBtn} alt='minus' />
                        </button>
                        <input type='number' value={quantity} onChange={(e) => setQuantity(e.target.value)} />
                        <button onClick={increaseLocalQuantity}>
                            <img src={plusBtn} alt='plus' />
                        </button>
                    </div>
                    <div className='quick-view-wish-list-container'>
                        {
                            isInWishList(setQuickViewProduct.uid) ?
                                <VscHeartFilled
                                    size={20}
                                    style={{ color: '#C61B1A' }}
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        handleWishList(setQuickViewProduct)
                                    }}
                                />
                                :
                                <VscHeart
                                    size={20}
                                    style={{ color: '#C61B1A' }}
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        handleWishList(setQuickViewProduct)
                                    }}
                                />
                        }
                    </div>
                    {/* <img src={redHeart} alt='heart' className='quickview-heart-icon' /> */}
                    <button className='quick-view-add-to-cart' onClick={() => handleAddToCartProduct(setQuickViewProduct)}>
                        Add To Cart
                    </button>
                </div>
                <div className='quick-view-details-section'>
                    {quickViewData.slice(startFrom, quickViewData.length).map((items, index) => (
                        <div key={index} className='quick-view-detail-single-section'>
                            <div className='quick-view-details-heading' onClick={() => handleViewDetails(index)}>
                                <p>{items.name}</p>
                                <button >
                                    <IoIosArrowDown className={viewDetails === index ? 'quick-view-rotate-up' : 'quick-view-rotate-down'} size={20} color='#595959' />
                                    {/* <img src={arrowDown} alt='arrow down' className={viewDetails === index ? 'quick-view-rotate-up' : 'quick-view-rotate-down'} /> */}
                                </button>
                            </div>
                            <div className={`quick-view-details ${viewDetails === index ? 'show-details' : ''}`}>
                                {
                                    setQuickViewProduct?.dimension_image !== null && index === 0
                                        ? <img src={url + setQuickViewProduct?.dimension_image?.image_url} className='quick-view-dimension-image' alt='dimension' />
                                        : index === quickViewData.length - 1 ? <div className='quick-view-drop-down-dimension-data'>
                                            {items.para.map((item) => (
                                                <span key={item.id}>
                                                    <h3>{item.name}</h3>
                                                    <p>{item.val}</p>
                                                </span>
                                            ))}
                                        </div>
                                            : <p dangerouslySetInnerHTML={{ __html: items.para }} />}
                            </div>
                        </div>
                    ))}

                </div>
            </div>
            <CartSidePannel
                cartData={cartProducts}
                addToCartClicked={cartSection}
                handleCartSectionClose={handleCartSectionClose}
                setAddToCartClick={setCartSection}
                removeFromCart={removeFromCart}
                decreamentQuantity={decreamentQuantity}
                increamentQuantity={increamentQuantity}
            />
        </div>
        // </div>


    )
}

export default QuickView
