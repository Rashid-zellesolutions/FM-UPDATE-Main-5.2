import React, { useState, useEffect } from 'react'
import './ProductCardTwo.css';
import { url } from '../../../utils/api';
import RatingReview from '../starRating/starRating';
import { useList } from '../../../context/wishListContext/wishListContext';
import { VscHeartFilled } from "react-icons/vsc";
import { VscHeart } from "react-icons/vsc";
import ProductCardImageShimmer from '../Loaders/CardImageShimmer/cardImageShimmer';
import { GoInfo } from "react-icons/go";
import { FaEye } from "react-icons/fa";

const ProductCardTwo = ({
    mainImage,
    productCardContainerClass,
    ProductTitle,
    reviewCount,
    mainIndex,
    priceTag,
    sale_price,
    tags,
    productUid,
    singleProductData,
    handleQuickView,
    maxWidthAccordingToComp,
    borderLeft,
    justWidth,
    handleCardClick,
    handleWishListclick,
    attributes,
    colTwo,
    showOnPage,
    handleInfoModal,
    showExtraLines,
    titleHeight,
}) => {

    const [isImageLoaded, setImageLoaded] = useState(false);

    const getPriorityAttribute = (attributes) => {
        return attributes && attributes.find(attr => attr.type === "image") ||
            attributes && attributes.find(attr => attr.type === "color") ||
            attributes && attributes.find(attr => attr.type === "select");
    };


    const priorityAttribute = getPriorityAttribute(attributes);

    const [hoveredImage, setHoveredImage] = useState()
    const [selectedColor, setSelectedColor] = useState();
    const [selectedColorImage, setSelectedColorImage] = useState();

    const [isHovered, setIsHovered] = useState(false);


    const handleColorSelect = (color) => {
        setSelectedColor(color)
        if (singleProductData?.type === "variable") {
            const matchingAttribute = singleProductData?.variations?.find(variation =>
                variation?.attributes?.some(attribute =>
                    attribute?.type === "color" &&
                    attribute?.options?.some(option => option?.value === color)
                )
            );

            setSelectedColorImage(matchingAttribute?.images[0]?.image_url)
            setHoveredImage(matchingAttribute?.images[1]?.image_url)
            // console.log(matchingAttribute?.images[0]?.image_url, matchingAttribute?.images[1]?.image_url, "two images are")
            return matchingAttribute;

        } else if (singleProductData?.type === "simple") {
            // Handle simple product logic
            const simpleAttribute = singleProductData?.attributes?.find(attribute =>
                attribute?.type === "color"
            );

            if (simpleAttribute) {
                setSelectedColorImage(singleProductData?.images[0]?.image_url);
                setHoveredImage(singleProductData?.images[1]?.image_url);
            }
            return simpleAttribute;
        }

    }

    useEffect(() => { }, [selectedColor])



    const handleImageSelect = (image) => {
        if (singleProductData?.type === "variable") {
            const matchingAttribute = singleProductData?.variations?.find(variation =>
                variation?.attributes?.some(attribute =>
                    attribute?.type === "image" &&
                    attribute?.options?.some(option => option?.value === image)
                )
            );
            setSelectedColorImage(matchingAttribute?.images[0]?.image_url)
            setHoveredImage(matchingAttribute?.images[1]?.image_url)
            return matchingAttribute;
        } else if (singleProductData?.type === "simple") {
            const simpleAttribute = singleProductData?.attributes?.find(attribute =>
                attribute?.type === "image"
            );
            setSelectedColorImage(singleProductData?.images[0]?.image_url);
            setHoveredImage(singleProductData?.images[1]?.image_url);
            return simpleAttribute;
        }
    }

    const moveToFirst = (array, defValue) => {
        const index = array.findIndex(item => item === defValue);
        if (index > 0) {
            const [priorityItem] = array.splice(index, 1);
            array.unshift(priorityItem)
        }
        return array;
    }

    useEffect(() => {
        if (singleProductData?.type === "variable") {
            // Find the default variation
            const defAttImage = singleProductData?.variations?.find(attr =>
                attr?.uid === singleProductData.default_variation
            );

            // Get the default color
            const defAttrColor = defAttImage?.attributes?.find(attribute =>
                attribute?.type === "color" &&
                attribute?.options?.some(option => option?.value)
            );

            const defaultColor = defAttrColor?.options?.[0]?.value;

            // Automatically select the default color
            if (defaultColor) {
                handleColorSelect(defaultColor);
            }

            // Handle prioritized attributes for variable products
            const attributes = defAttImage?.attributes;
            if (attributes) {
                const defaultAttribute = getPriorityAttribute(attributes);
                if (defaultAttribute) {
                    const updatedAttributes = moveToFirst(attributes, defaultAttribute);
                }
            }

        } else if (singleProductData?.type === "simple") {
            // For simple products, select the only color available
            const simpleColorAttribute = singleProductData?.attributes?.find(attribute =>
                attribute?.type === "color"
            );

            const defaultColor = simpleColorAttribute?.options?.[0]?.value;

            if (defaultColor) {
                handleColorSelect(defaultColor);
            }
        }

    }, [singleProductData]); 



    const { isInWishList } = useList();


    const getDeliveryDate = () => {
        const options = { weekday: "long", month: "short", day: "numeric" };
        const today = new Date();

        const optionWithTimeZone = { ...options, timeZone: "America/New_York" };

        today.setDate(today.getDate() + 3);
        return today.toLocaleDateString("en-us", optionWithTimeZone);
    }

    return (
        <>
            <div
                className={`${productCardContainerClass} ${borderLeft ? 'hide-after' : ''} `}
                style={{ maxWidth: maxWidthAccordingToComp, width: justWidth }}

            >
                <div className='product-card-data'
                    onMouseEnter={() => { setIsHovered(true); console.log("enter") }}
                    onMouseLeave={() => { setIsHovered(false); console.log("exit") }}
                    onClick={() => handleCardClick(singleProductData)}
                >
                    <div className={`product-cart-top-tags-container ${showOnPage ? 'show-product-cart-top-tags' : ''}`}>
                        <div className='tag-and-heart' onClick={(e) => e.stopPropagation()}>

                            {
                                tags?.length > 0 && <div className="product-tagging">
                                    {
                                        tags[0] && tags[0].type.toLowerCase() === "text" ?
                                            <div className='text-tag' style={{ backgroundColor: tags[0].bg_color, color: tags[0].text_color }} >
                                                {tags[0].text}
                                            </div> :
                                            <div className='image-tag' >
                                                <img src={url + tags[0]?.image} alt="" srcset="" />
                                            </div>
                                    }
                                </div>
                            }

                            <div className='product-wishlist-icon-container'>
                                {
                                    isInWishList(singleProductData.uid) ?
                                        <VscHeartFilled
                                            // size={25}
                                            className='wishlist-heart'
                                            style={{ color: 'var(--primary-color)' }}
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                handleWishListclick(singleProductData)
                                            }}
                                        />
                                        :
                                        <VscHeart
                                            size={25}
                                            className='wishlist-heart'
                                            style={{ float: 'right', color: 'var(--primary-color)' }}
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                handleWishListclick(singleProductData)
                                            }}
                                        />
                                }
                            </div>
                        </div>
                    </div>

                    <div className='product-main-image-container'>

                        <div className='product-card-product-image-inner-container'>

                            <div className={`product-image-wishlist-icon-container ${!showOnPage ? 'show-product-wishlist-icon' : ''}`}>
                                {
                                    isInWishList(singleProductData.uid) ?
                                        <VscHeartFilled
                                            size={25}
                                            className='wishlist-heart'
                                            style={{ color: 'var(--primary-color)' }}
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                handleWishListclick(singleProductData)
                                            }}
                                        />
                                        :
                                        <VscHeart
                                            size={25}
                                            className='wishlist-heart'
                                            style={{ float: 'right', color: 'var(--primary-color)' }}
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                handleWishListclick(singleProductData)
                                            }}
                                        />
                                }
                            </div>

                                <img
                                    src={`${url}${selectedColorImage
                                        }`}
                                    alt='product img'
                                    className={`product-main-img`}
                                    effect='blur'
                                    onLoad={() => { setImageLoaded(true) }}
                                />

                                <img
                                    src={`${url}${hoveredImage
                                        }`}
                                    alt='product img'
                                    className={`hovered-product-main-img ${isHovered ? 'visible-hovered' : ''}`}
                                    effect='blur'
                                    onLoad={() => { setImageLoaded(true) }}
                                />

                                {
                                    !isImageLoaded && <div className="image_shimmer_loader">
                                        <ProductCardImageShimmer />
                                    </div>
                                }


                        </div>

                        <div className='product-card-inner-content-container'>

                            <div className='product-card-main-heading-container'>
                                <h3 className={`product-title ${colTwo ? 'apply-col-two-styling' : ''} ${titleHeight ? "heighted" : ""}`}> {ProductTitle} </h3>
                            </div>

                            {priorityAttribute && (
                                <div className={`product-card-attr ${colTwo ? 'hide-squire-attribute' : ''}`} >
                                    {priorityAttribute.type === "image" && (
                                        <div className="image-variation">
                                            {priorityAttribute.options.map((item, index) => (
                                                <img
                                                    key={index}
                                                    onClick={(e) => { e.stopPropagation(); handleImageSelect(item.value) }}
                                                    src={url + item.value}
                                                    alt=""
                                                />
                                            ))}
                                        </div>
                                    )}

                                    {priorityAttribute.type === "color" && (
                                        <div className="color-variation-div">
                                            {priorityAttribute.options.map((item, index) => (
                                                <span
                                                    key={index}
                                                    className={`color-variation ${selectedColor === item.value ? 'show-tick-mark' : ''}`}
                                                    onClick={(e) => { e.stopPropagation(); handleColorSelect(item.value) }}
                                                    style={{
                                                        backgroundColor: item.value,
                                                        // border: 'none',
                                                        border: selectedColor === item.value ? `1px solid ${item.value}` : 'none',
                                                        // boxShadow: ''
                                                        boxShadow: selectedColor === item.value ? `inset 0 0 0 2px #FFFF` : '',
                                                        "--tick-color": item.value

                                                    }}
                                                ></span>
                                            ))}
                                        </div>
                                    )}

                                    {priorityAttribute.type === "select" && (
                                        <div className="text-variation">
                                            {priorityAttribute.options.map((item, index) => (
                                                <p key={index} className="attr-var">{item.value}</p>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            )}

                            {priorityAttribute && (
                                <div className={`mobile-product-card-attr ${colTwo ? 'show-rounded-attributes' : ''}`} >
                                    {priorityAttribute.type === "image" && (
                                        <div className="mobile-image-variation">
                                            {priorityAttribute.options.map((item, index) => (
                                                <img
                                                    key={index}
                                                    onClick={(e) => { e.stopPropagation(); handleImageSelect(item.value) }}
                                                    src={url + item.value}
                                                    alt=""
                                                />
                                            ))}
                                        </div>
                                    )}

                                    {priorityAttribute.type === "color" && (
                                        <div className="mobile-color-variation-div">
                                            {priorityAttribute.options.map((item, index) => (
                                                <span
                                                    key={index}
                                                    className="mobile-color-variation"
                                                    onClick={(e) => { e.stopPropagation(); handleColorSelect(item.value) }}
                                                    style={{
                                                        backgroundColor: item.value,
                                                        border: selectedColor === item.value ? `1px solid ${item.value}` : 'none',
                                                        boxShadow: selectedColor === item.value ? `inset 0 0 0 2px #FFFF` : ''
                                                    }}
                                                ></span>
                                            ))}
                                        </div>
                                    )}

                                    {priorityAttribute.type === "select" && (
                                        <div className="mobile-text-variation">
                                            {priorityAttribute.options.map((item, index) => (
                                                <p key={index} className="mobile-attr-var">{item.value}</p>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            )}

                        </div>

                    </div>

                    <div className='product-card-content-bottom-section'>


                        <div className={`product-card-get-it-by-container ${colTwo ? 'apply-col-two-styling' : ''}`}>

                            <div className={`product-get-it-by-left-side ${colTwo ? 'apply-col-two-styling' : ''}`}>

                                <div className='product-card-rating-and-price'>


                                    {
                                        sale_price === "0" ?
                                            <h3 className={`product-price-del ${colTwo ? 'apply-col-two-styling' : ''}`}>${priceTag}</h3> :
                                            <div className='price-and-rating-container'>
                                                <h3 className={`product-price-tag ${colTwo ? 'apply-col-two-styling' : ''}`}>
                                                    <p className={`product-price-starting-at ${colTwo ? 'apply-two-col-styling' : ''}`}>Starting at</p>
                                                    ${sale_price}
                                                    <del className={`product-del-price-with-sale-price ${colTwo ? 'apply-col-two-styling' : ''}`}>${priceTag}</del>
                                                </h3>
                                                <div className={`mobile-view-rating-stars ${colTwo ? 'apply-two-col-styling' : ''}`}>
                                                    <RatingReview rating={3} size={"12px"} disabled={true} />
                                                </div>
                                            </div>
                                    }

                                    <span className={`product-card-installment-plan ${showExtraLines ? 'show-installment-plan' : ''}`}>
                                        <p className={`installment-plan-detail ${colTwo ? 'apply-col-two-styling' : ''}`}>or $35/week for 48 mos</p>
                                        <GoInfo onClick={(e) => { e.stopPropagation(); handleInfoModal() }}
                                        />
                                    </span>
                                    <span className={`product-card-get-it-by ${showExtraLines ? 'show-set-it-by' : 'hide-get-it-by'}`}>
                                        <p>Get it by</p>
                                        <h3>{getDeliveryDate()}</h3>
                                    </span>

                                </div>
                            </div>

                            <div className={`product-card-quick-view-container ${colTwo ? 'apply-col-two-styling' : ''}`}>

                                <div className={`product-rating-stars-div ${colTwo ? 'apply-col-two-styling' : ''}`}>
                                    <RatingReview rating={reviewCount} size={"12px"} disabled={true} />
                                </div>

                                <span className={`product-card-get-it-by-title ${showExtraLines ? 'show-product-card-get-it-by-title' : ''}`}>
                                    <p className={`get-it-by ${colTwo ? 'apply-col-two-styling' : ''}`}>Get it By</p>
                                    <h3 className={`get-by-delivery ${colTwo ? 'apply-col-two-styling' : ''}`}>{getDeliveryDate()}</h3>
                                </span>

                                <button className={`card-two-quick-view-button ${colTwo ? 'apply-col-two-styling' : ''}`}
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        handleQuickView()
                                    }}
                                >
                                    Quick View
                                </button>

                                <FaEye
                                    size={20}
                                    className='quick-view-eye-icon'
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        handleQuickView()
                                    }}
                                />

                            </div>

                        </div>
                    </div>
                </div>
            </div>


        </>
    )
}

export default ProductCardTwo