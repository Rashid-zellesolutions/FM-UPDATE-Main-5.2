import React, { useState, useEffect } from 'react'
import './ProductCard.css';
import { url } from '../../../utils/api';
import RatingReview from '../starRating/starRating';
import { IoEyeOutline } from "react-icons/io5";
import { BsCart3 } from "react-icons/bs";
import { useList } from '../../../context/wishListContext/wishListContext';
import { VscHeartFilled } from "react-icons/vsc";
import { VscHeart } from "react-icons/vsc";
import ProductCardImageShimmer from '../Loaders/CardImageShimmer/cardImageShimmer';

const ProductCard = ({
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

    // useEffect(() => {

    //     const defAttImage = singleProductData?.variations?.find(attr =>
    //         attr?.uid === singleProductData.default_variation
    //     )
    //     const defAttrColor = defAttImage?.attributes?.find(attribute =>
    //         attribute?.type === 'color' &&
    //         attribute?.options?.some(option => option?.value)
    //     )
    //     const defoultColor = defAttrColor?.options?.[0]?.value;

    //     handleColorSelect(defoultColor);

    //     const attribute = defAttImage?.attributes;
    //     if (attribute) {
    //         const defaultAttribute = getPriorityAttribute(attribute)
    //         if (defaultAttribute) {
    //             const updatedAttributes = moveToFirst(attribute, defaultAttribute)
    //         }
    //     }
    // }, []);

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

    return (
        <>
            <div
                className={`${productCardContainerClass} ${borderLeft ? 'hide-after' : ''} `}
                style={{ maxWidth: maxWidthAccordingToComp, width: justWidth }}
            >
                <div className='product-card-data'
                    onClick={() => handleCardClick(singleProductData)}
                >

                    <div className='product-main-image-container'>

                        <div className='tag-and-heart' onClick={(e) => e.stopPropagation()}>
                            {stock?.is_stock_manage === 0 && <h4 className={allow_back_order === 1 ? "stock-label back" : "stock-label out"}>{allow_back_order === 1 ? "Back Order" : "Out of Stock"}</h4>}
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

                        <div className='overlay-buttons'>
                            <button
                                className={`overlay-button 
                                    ${cartClicked ? 'loading' : ''}
                                    `
                                }
                                onClick={(e) => {
                                    e.stopPropagation();
                                    handleQuickView()
                                }
                                }
                                onMouseEnter={handleMouseEnter}
                                onMouseLeave={handleMouseLeave}
                            >
                                <BsCart3 />
                                Add to cart
                            </button>
                            <button
                                onClick={(e) => {
                                    e.preventDefault();
                                    handleCardClick(singleProductData);
                                }
                                }
                                className='overlay-button'
                                onMouseEnter={handleQuickViewHover}
                                onMouseLeave={handlQuickViewLeave}
                            >
                                <IoEyeOutline />
                                View Product
                            </button>
                        </div>

                    </div>

                    {tags?.length > 0 && <div className="product-tagging">
                        {
                            tags[0] && tags[0].type.toLowerCase() === "text" ?
                                <div className='text-tag' style={{ backgroundColor: tags[0].bg_color, color: tags[0].text_color }} >
                                    {tags[0].text}
                                </div> :
                                <div className='image-tag' >
                                    <img src={"https://fm.skyhub.pk" + tags[0]?.image} alt="" srcset="" />
                                </div>
                        }
                    </div>}
                    <p className='product-sku' onClick={handleCardClick}>SKU : {ProductSku}</p>
                    <h3 className='product-title' > {ProductTitle} </h3>
                    <div className='product-rating-stars-div'>
                        <RatingReview rating={parseFloat(reviewCount)} size={"12px"} disabled={true} />
                    </div>


                    {/* <p className='mobile-view-low-price'>{lowPriceAddvertisement}</p> */}


                    {
                        sale_price === "0" ?
                            <h3 className='product-price-del'>${priceTag}</h3> :
                            <h3 className='product-price-tag'> <del className='product-del-price-with-sale-price'>${priceTag}</del>  ${sale_price}</h3>
                    }

                    {priorityAttribute && (
                        <div className='product-card-attr' >
                            {priorityAttribute.type === "image" && (
                                <div className="image-variation">
                                    {priorityAttribute.options.map((item, index) => (
                                        <img
                                            key={index}
                                            onClick={(e) => { e.stopPropagation(); handleImageSelect(item.value) }}
                                            src={"https://fm.skyhub.pk" + item.value}
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
                                            className="color-variation"
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
                                <div className="text-variation">
                                    {priorityAttribute.options.map((item, index) => (
                                        <p key={index} className="attr-var">{item.value}</p>
                                    ))}
                                </div>
                            )}
                        </div>
                    )}

                </div>
            </div>


        </>
    )
}

export default ProductCard
