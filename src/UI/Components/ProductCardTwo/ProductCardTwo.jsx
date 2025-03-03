import React, { useState, useEffect } from 'react'
import './ProductCardTwo.css';
import { url } from '../../../utils/api';
import RatingReview from '../starRating/starRating';
import { IoEyeOutline } from "react-icons/io5";
import { BsCart3 } from "react-icons/bs";
import { useList } from '../../../context/wishListContext/wishListContext';
import { VscHeartFilled } from "react-icons/vsc";
import { VscHeart } from "react-icons/vsc";
import ProductCardImageShimmer from '../Loaders/CardImageShimmer/cardImageShimmer';
import { GoInfo } from "react-icons/go";

const ProductCardTwo = ({
    mainImage,
    productCardContainerClass,
    ProductTitle,
    ProductSku,
    reviewCount,
    priceTag,
    sale_price,
    tags,
    percent,
    singleProductData,
    stock,
    allow_back_order,
    handleQuickView,
    maxWidthAccordingToComp,
    borderLeft,
    justWidth,
    handleCardClick,
    handleWishListclick,
    attributes,
    colTwo,
    showOnPage,
}) => {

    const [isImageLoaded, setImageLoaded] = useState(false);

    const [cartClicked, setCartClicked] = useState(true);

    const [cardHovered, setCardHovered] = useState(false);
    const handleMouseEnter = () => {
        setCardHovered(true)
    }

    const handleMouseLeave = () => {
        setCardHovered(false);
    }

    const [quickViewHovered, setQuickViewHovered] = useState(false);
    const handleQuickViewHover = () => {
        setQuickViewHovered(true);
    }
    const handlQuickViewLeave = () => {
        setQuickViewHovered(false)
    }

    const getPriorityAttribute = (attributes) => {
        return attributes && attributes.find(attr => attr.type === "image") ||
            attributes && attributes.find(attr => attr.type === "color") ||
            attributes && attributes.find(attr => attr.type === "select");
    };

    const priorityAttribute = getPriorityAttribute(attributes);

    const [hoveredImage, setHoveredImage] = useState()
    const [selectedColor, setSelectedColor] = useState();
    const [selectedImage, setSelectedImage] = useState();
    const [selectedColorImage, setSelectedColorImage] = useState();

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

    useEffect(() => {  }, [selectedColor])

    const handleImageSelect = (image) => {
        setSelectedImage(image)
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



    const [priorArray, setPriorArray] = useState([])
    const moveToFirst = (array, defValue) => {
        const index = array.findIndex(item => item === defValue);
        if (index > 0) {
            const [priorityItem] = array.splice(index, 1);
            array.unshift(priorityItem)
        }
        setPriorArray(array)
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

    }, [singleProductData]); // Run this effect whenever `singleProductData` changes


    const [mainImageHoverIndex, setMainImageHoverIndex] = useState(null)

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
                    onClick={() => handleCardClick(singleProductData)}
                >
                    <div className={`product-cart-top-tags-container ${showOnPage ? 'show-product-cart-top-tags' : ''}`}>
                        <div className='tag-and-heart' onClick={(e) => e.stopPropagation()}>
                            
                            {tags?.length > 0 && <div className="product-tagging">
                                {
                                    tags[0] && tags[0].type.toLowerCase() === "text" ?
                                        <div className='text-tag' style={{ backgroundColor: tags[0].bg_color, color: tags[0].text_color }} >
                                            {tags[0].text}
                                        </div> :
                                        <div className='image-tag' >
                                            <img src={url + tags[0]?.image} alt="" srcset="" />
                                        </div>
                                }
                            </div>}

                            {/* {
                                stock?.is_stock_manage === 0 ? (
                                    <h4 className={allow_back_order === 1 ? "stock-label back" : "stock-label out"}>{allow_back_order === 1 ? "Back Order" : "Out of Stock"}</h4>
                                ) : (
                                    tags?.length > 1 && <div className="product-tagging">
                                        {
                                            tags[1] && tags[1].type.toLowerCase() === "text" ?
                                                <div className={`text-tag ${colTwo ? 'apply-col-two-styling' : ''}`} style={{ backgroundColor: tags[1].bg_color, color: tags[1].text_color }} >
                                                    {tags[1].text}
                                                </div> :
                                                <div className='image-tag' >
                                                    <img src={url + tags[1]?.image} alt="" srcset="" />
                                                </div>
                                        }
                                    </div>
                                )
                            } */}


                            {/* <p className='percent-label'>{percent}</p> */}
                            <div className='product-wishlist-icon-container'>
                                {
                                    isInWishList(singleProductData.uid) ?
                                        <VscHeartFilled
                                            // size={25}
                                            className='wishlist-heart'
                                            style={{ color: '#C61B1A' }}
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                handleWishListclick(singleProductData)
                                            }}
                                        />
                                        :
                                        <VscHeart
                                            size={25}
                                            className='wishlist-heart'
                                            style={{ float: 'right', color: '#C61B1A' }}
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

                        {/* <div className='tag-and-heart' onClick={(e) => e.stopPropagation()}>
                            {
                                stock?.is_stock_manage === 0 ? (
                                    <h4 className={allow_back_order === 1 ? "stock-label back" : "stock-label out"}>{allow_back_order === 1 ? "Back Order" : "Out of Stock"}</h4>
                                ) : (
                                    tags?.length > 1 && <div className="product-tagging">
                                        {
                                            tags[1] && tags[1].type.toLowerCase() === "text" ?
                                                <div className={`text-tag ${colTwo ? 'apply-col-two-styling' : ''}`} style={{ backgroundColor: tags[1].bg_color, color: tags[1].text_color }} >
                                                    {tags[1].text}
                                                </div> :
                                                <div className='image-tag' >
                                                    <img src={url + tags[1]?.image} alt="" srcset="" />
                                                </div>
                                        }
                                    </div>
                                )
                            }
                            <p className='percent-label'>{percent}</p>
                            {
                                isInWishList(singleProductData.uid) ?
                                    <VscHeartFilled
                                        size={25}
                                        className='wishlist-heart'
                                        style={{ color: '#C61B1A' }}
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            handleWishListclick(singleProductData)
                                        }}
                                    />
                                    :
                                    <VscHeart
                                        size={25}
                                        className='wishlist-heart'
                                        style={{ float: 'right', color: '#C61B1A' }}
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            handleWishListclick(singleProductData)
                                        }}
                                    />
                            }

                        </div> */}


                        <div className='product-card-product-image-inner-container'>
                            <div className={`product-image-wishlist-icon-container ${!showOnPage ? 'show-product-wishlist-icon' : ''}`}>
                                {
                                    isInWishList(singleProductData.uid) ?
                                        <VscHeartFilled
                                            size={25}
                                            className='wishlist-heart'
                                            style={{ color: '#C61B1A' }}
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                handleWishListclick(singleProductData)
                                            }}
                                        />
                                        :
                                        <VscHeart
                                            size={25}
                                            className='wishlist-heart'
                                            style={{ float: 'right', color: '#C61B1A' }}
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                handleWishListclick(singleProductData)
                                            }}
                                        />
                                }
                            </div>
                            <img src={`${url}${selectedColorImage
                                ? mainImageHoverIndex === singleProductData.uid
                                    ? hoveredImage
                                    : selectedColorImage
                                : mainImage
                                }`}
                                alt='product img'
                                className='product-main-img'
                                effect='blur'
                                onLoad={() => { setImageLoaded(true) }}
                            />
                            {
                                !isImageLoaded && <div className="image_shimmer_loader">
                                    <ProductCardImageShimmer />
                                </div>
                            }

                            {/* {tags?.length > 0 && <div className="product-tagging">
                                {
                                    tags[0] && tags[0].type.toLowerCase() === "text" ?
                                        <div className='text-tag' style={{ backgroundColor: tags[0].bg_color, color: tags[0].text_color }} >
                                            {tags[0].text}
                                        </div> :
                                        <div className='image-tag' >
                                            <img src={url + tags[0]?.image} alt="" srcset="" />
                                        </div>
                                }
                            </div>} */}


                        </div>

                        <div className='product-card-inner-content-container'>

                            {/* {tags?.length > 0 && <div className="product-tagging">
                                {
                                    tags[0] && tags[0].type.toLowerCase() === "text" ?
                                        <div className='text-tag' style={{ backgroundColor: tags[0].bg_color, color: tags[0].text_color }} >
                                            {tags[0].text}
                                        </div> :
                                        <div className='image-tag' >
                                            <img src={url + tags[0]?.image} alt="" srcset="" />
                                        </div>
                                } 
                            </div>} */}
                            {/* <p className={`product-sku ${colTwo ? 'apply-col-two-styling' : showOnPage ? 'show-product-sku' : ''}`} onClick={handleCardClick}>SKU : {ProductSku}</p> */}

                            <h3 className={`product-title ${colTwo ? 'apply-col-two-styling' : ''}`}> {ProductTitle} </h3>

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
                                                        // border: 'none',
                                                        border: selectedColor === item.value ? `1px solid ${item.value}` : 'none',
                                                        // boxShadow: ''
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
                        {/* <p className='product-sku' onClick={handleCardClick}>SKU : {ProductSku}</p> */}
                        {/* <h3 className='product-title' > {ProductTitle} </h3> */}

                        {/* <div className='product-card-rating-price-and-quick-view'>
                            <div className='product-card-rating-and-price'>

                                <div className='product-rating-stars-div'>
                                    <RatingReview rating={parseFloat(reviewCount)} size={"12px"} disabled={true} />
                                </div>

                                {
                                    sale_price === "0" ?
                                        <h3 className='product-price-del'>${priceTag}</h3> :
                                        <h3 className='product-price-tag'> ${sale_price} <del className='product-del-price-with-sale-price'>${priceTag}</del>  </h3>
                                }

                                <span>
                                    <p>or $35/week for 48 mos</p>
                                    <GoInfo />
                                </span>

                            </div>

                            <div className='product-card-quick-view-container'>
                                <div className='product-rating-stars-div'>
                                    <RatingReview rating={parseFloat(reviewCount)} size={"12px"} disabled={true} />
                                </div>
                                <button onClick={(e) => {
                                    e.stopPropagation();
                                    handleQuickView()
                                }}
                                >
                                    Quick View
                                </button>
                            </div>
                        </div> */}

                        <div className={`product-card-get-it-by-container ${colTwo ? 'apply-col-two-styling' : ''}`}>

                            {/* <span>
                                <p>or $35 / mo for 48 mos</p>
                                <GoInfo />
                            </span> */}

                            <div className={`product-get-it-by-left-side ${colTwo ? 'apply-col-two-styling' : ''}`}>

                                <div className='product-card-rating-and-price'>

                                    {/* <div className='product-rating-stars-div'>
                                    <RatingReview rating={parseFloat(reviewCount)} size={"12px"} disabled={true} />
                                </div> */}

                                    {
                                        sale_price === "0" ?
                                            <h3 className={`product-price-del ${colTwo ? 'apply-col-two-styling' : ''}`}>${priceTag}</h3> :
                                            <h3 className={`product-price-tag ${colTwo ? 'apply-col-two-styling' : ''}`}> <p className={`product-price-starting-at ${colTwo ? 'apply-two-col-styling' : ''}`}>Starting At</p> ${sale_price} <del className={`product-del-price-with-sale-price ${colTwo ? 'apply-col-two-styling' : ''}`}>${priceTag}</del>  </h3>
                                    }

                                    <span className={`product-card-installment-plan ${showOnPage ? 'show-installment-plan' : ''}`}>
                                        <p className={`installment-plan-detail ${colTwo ? 'apply-col-two-styling' : ''}`}>or $35/week for 48 mos</p>
                                        <GoInfo />
                                    </span>

                                </div>


                                <span className={`product-card-get-it-by-title ${showOnPage ? 'show-product-card-get-it-by-title' : ''}`}>
                                    <p className={`get-it-by ${colTwo ? 'apply-col-two-styling' : ''}`}>Get it By</p>
                                    <h3 className={`get-by-delivery ${colTwo ? 'apply-col-two-styling' : ''}`}>{getDeliveryDate()}</h3>
                                </span>
                            </div>

                            {/* <span>
                                <p>Get it By</p>
                                <h3>{getDeliveryDate()}</h3>
                            </span> */}

                            <div className={`product-card-quick-view-container ${colTwo ? 'apply-col-two-styling' : ''}`}>
                                <div className={`product-rating-stars-div ${colTwo ? 'apply-col-two-styling' : ''}`}>
                                    <RatingReview rating={parseFloat(reviewCount)} size={"12px"} disabled={true} />
                                </div>
                                <button className={`card-two-quick-view-button ${colTwo ? 'apply-col-two-styling' : ''}`} onClick={(e) => {
                                    e.stopPropagation();
                                    handleQuickView()
                                }}
                                >
                                    Quick View
                                </button>
                            </div>

                        </div>
                    </div>








                    {/* <p className='mobile-view-low-price'>{lowPriceAddvertisement}</p> */}






                </div>
            </div>


        </>
    )
}

export default ProductCardTwo
