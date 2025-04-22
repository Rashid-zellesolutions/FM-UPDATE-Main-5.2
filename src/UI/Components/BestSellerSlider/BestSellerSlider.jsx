import React, { useState, useEffect, useRef } from 'react';

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import '@splidejs/react-splide/css'
import './BestSellerSlider.css';
import BestSellerSliderMainBanner from '../../../Assets/Furniture Mecca/Landing Page/best seller products/Home Page Banner 396x595.jpg';
import { Link, useNavigate } from 'react-router-dom';
import BestSellerProductCard from '../BestSellerProductCard/BestSellerProductCard';
import star from '../../../Assets/icons/Star 19.png'

import leftArrow from '../../../Assets/icons/arrow-left-white.png';
import rightArrow from '../../../Assets/icons/right-arrow-white.png';
import axios from 'axios';
import { formatedPrice, url } from '../../../utils/api';
import { useSingleProductContext } from '../../../context/singleProductContext/singleProductContext';
import { useCart } from '../../../context/AddToCart/addToCart';
import { useList } from '../../../context/wishListContext/wishListContext';
import { toast } from 'react-toastify';
import BestSellerProductCardShimmer from '../BestSellerProductCard/BestSellerProductCardShimmer';
import BestSellerShimmer from './BestSellerShimmer/BestSellerShimmer';
import RatingReview from '../starRating/starRating';
import heartIcon from '../../../Assets/icons/like.png'
import { VscHeartFilled } from "react-icons/vsc";

import { HiOutlineShoppingBag } from "react-icons/hi2";

const BestSellerPrevArrow = (props) => {
    const { className, style, onClick } = props;
    return (
        <div onClick={onClick} className={`best-seller-arrow ${className}`} >
            <img src={leftArrow} alt='arrow' />
        </div>
    )
}

function BestSellerNextArrow(props) {
    const { className, style, onClick } = props;
    return (
        <div onClick={onClick} className={`best-seller-arrow ${className}`} >
            <img src={rightArrow} alt='arrow' />
        </div>
    )
}




const BestSellerSlider = (
    {
        allProducts,
        setAllProducts,
        bestSellerNav1,
        setBestSellerNav1
    }) => {

    // States and Variables
    const navigate = useNavigate()

    const [currentSlug, setCurrentSlug] = useState();
    const [loading, setLoading] = useState(false);

    const getBestSellerProducts = async (slug) => {
        const api = `/api/v1/products/get-best-selling-products?category=${slug}`
        try {
            setLoading(true);
            const response = await axios.get(`${url}${api}`)
            setAllProducts(response.data.products);
            setLoading(false);

        } catch (error) {
            console.error("error geting best seller products", error);
            setLoading(false);
        }
    }

    const getBestSellerData = async () => {
        const api = `/api/v1/best-seller-home/get`
        try {
            const response = await axios.get(`${url}${api}`)
            setBestSellerNav1(response.data)
            setCurrentSlug(response.data[0].slug)
            getBestSellerProducts(response.data[0].slug);

        } catch (error) {
            console.error("error geting best seller products", error);
        }
    }


    useEffect(() => {
        if (!allProducts.length) {
            getBestSellerData()
        }
    }, [])


    const [currentIndex, setCurrentIndex] = useState(0);
    const [cardsPerPage] = useState(6);
    const [totalPages] = useState(Math.ceil(allProducts.length / cardsPerPage));
    const [applyFilter, setApplyFilter] = useState(false);
    const [width, setWidth] = useState(window.innerWidth);
    const [activeItem, setActiveItem] = useState(0)
    const [MobileActiveIndex, setMobileActiveIndex] = useState(0)
    const [mobIndex, setMobIndex] = useState(0)
    const { addSingleProduct } = useSingleProductContext();
    const { addToCart } = useCart()
    const { addToList, isInWishList, removeFromList } = useList()
    const notify = (str) => toast.success(str);
    const notifyRemove = (str) => toast.error(str)
    const [listed, setListed] = useState(false);
    const [currentPage, setCurrentPage] = useState(0);

    // Functions
    const handleActiveItem = (index) => {
        setActiveItem(index)
    }

    const handleMobileActiveindex = (index) => {
        setActiveItem(index)
    }

    useEffect(() => {
        const handleResizer = () => setWidth(window.innerWidth);
        window.addEventListener("resize", handleResizer);
        return () => window.removeEventListener("resize", handleResizer)
    })

    // product slice to show 6 product maxx
    const handleCardClicked = (item) => {

        addSingleProduct(item)
        addToCart(item)
        navigate(`/product/${item.slug}`, { state: item })

    }

    const handleWishlisted = (item) => {
        if (isInWishList(item.uid)) {
            removeFromList(item.uid);
            notifyRemove('Removed from wish list', {
                autoClose: 10000,
                // position: toast.POSITION.BOTTOM_CENTER,
                className: "toast-message",
            })
        } else {
            addToList(item); // Add if not in wishlist
            notify("added to wish list", {
                autoClose: 10000,
            })
        }
    }

    const handleMobileNavClick = (index) => {
        setApplyFilter(true);
        setTimeout(() => {
            setApplyFilter(false);
            setMobIndex(index)
        }, 1000)
    }

    // Get the slice of products to display based on the current page
    const getDisplayedCards = () => {
        const start = currentPage * cardsPerPage;
        const end = start + cardsPerPage;
        const publishedProductes = allProducts.filter(product => product.status === 'published');
        const productWithDiscount = publishedProductes.map((product) => {
            let newPrice = parseFloat(product.regular_price);
            if (product.discount && product.discount.is_discountable === 1) {
                const oldPrice = parseFloat(product.regular_price); // Convert regular_price to a number
                const discountValue = parseFloat(product.discount.discount_value);

                // Calculate the new price based on the discount type
                if (product.discount.discount_type === 'percentage' && !isNaN(discountValue)) {
                    newPrice = parseFloat(product.regular_price) - (parseFloat(product.regular_price) * (discountValue / 100));
                    newPrice = parseFloat(newPrice.toFixed(2));
                } else if (product.discount.discount_type === 'currency' && !isNaN(discountValue)) {
                    newPrice = oldPrice - discountValue;
                    newPrice = parseFloat(newPrice.toFixed(2));
                }
                //else if (product.discount.discount_type === 'fixed') 
                else {
                    // newPrice = oldPrice - parseFloat(product.discount.discount_value);
                    newPrice = oldPrice;
                }
            }
            return {
                ...product,
                newPrice
            }
        })

        return productWithDiscount.slice(start, end);
    };

    const ratingStars = [
        { icon: star },
        { icon: star },
        { icon: star },
        { icon: star },
        { icon: star }
    ]

    var settings = {
        dots: false,
        infinite: true,
        arrows: false,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
        initialSlide: 0,
        arrows: true,
        nextArrow: <BestSellerNextArrow to="next" />,
        prevArrow: <BestSellerPrevArrow to="prev" />,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                    infinite: false,
                    dots: false
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                    initialSlide: 2
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    initialSlide: 1
                }
            }
        ]
    };


    const sliderRef = useRef(null);
    const [currentSlide, setCurrentSlide] = useState(0);
    const [currentDotPosition, setCurrentDotPosition] = useState(1);

    const [dotStartIndex, setDotStartIndex] = useState(0);


    const beforeChange = (oldIndex, newIndex) => {
        setCurrentSlide(newIndex);

        const groupSize = 5;

        // When the active dot moves beyond the current group
        if (newIndex >= dotStartIndex + groupSize) {
            const newStart = Math.floor(newIndex / groupSize) * groupSize;
            setDotStartIndex(newStart);
            setCurrentDotPosition((newIndex % groupSize) + 1);
        } else if (newIndex < dotStartIndex) {
            // User went back to a previous group
            const newStart = Math.floor(newIndex / groupSize) * groupSize;
            setDotStartIndex(newStart);
            setCurrentDotPosition((newIndex % groupSize) + 1);
        } else {
            // Within current group
            setCurrentDotPosition((newIndex % groupSize) + 1);
        }
    };

    const mobileSettings = {
        dots: true,
        infinite: true,
        autoplay: true,
        autoplaySpeed: 3000,
        arrows: false,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        beforeChange,

        customPaging: () => <button className="custom-dot" />,

        appendDots: (dots) => {
            const totalDots = dots.length;
            const visibleDots = dots.slice(dotStartIndex, dotStartIndex + 5);

            return (
                <div className="dots-slider-wrapper">
                    <div className="dots-slider">
                        {visibleDots.map((dot, i) => {
                            const actualIndex = dotStartIndex + i;
                            const isActive = actualIndex === currentSlide;

                            return (
                                <div
                                    key={actualIndex}
                                    className={`dot-wrapper ${isActive ? 'active-dot' : ''}`}
                                    onClick={() => {
                                        sliderRef.current?.slickGoTo(actualIndex);
                                        setCurrentSlide(actualIndex);

                                        const groupSize = 5;
                                        const newStart = Math.floor(actualIndex / groupSize) * groupSize;

                                        setDotStartIndex(newStart);
                                        setCurrentDotPosition((actualIndex % groupSize) + 1);
                                    }}
                                >
                                    <span className={`custom-dot ${isActive ? 'highlighted-dot' : ''}`} />
                                </div>
                            );
                        })}
                    </div>
                </div>
            );
        },
    };

    useEffect(() => {
    }, [MobileActiveIndex])


    return (
        <>
            {allProducts && allProducts.length > 0 ? (
                <div className="best-seller-slider-container">

                    <div className='best-seller-imaage-and-cards'>
                        <div className='best-seller-slider-main-banner'>
                            <img src={url + bestSellerNav1[activeItem].image.image_url} alt='main banner' />
                        </div>
                        <div className='best-seller-slider-div'>
                            <div className='best-seller-slider-menu-bar'>
                                <h3>Best Seller</h3>
                                <div className='best-seller-menu-bar'>
                                    {bestSellerNav1.map((item, index) => (
                                        <p
                                            key={index}
                                            className={activeItem === index ? 'active' : ''}
                                            onClick={() => {
                                                getBestSellerProducts(item.slug)
                                                handleActiveItem(index)
                                            }}
                                        >
                                            {item.Heading}
                                        </p>
                                    ))}
                                </div>
                            </div>

                            <div className='best-seller-slider-main-banner-mobile-view'>
                                <img src={url + bestSellerNav1[activeItem].image.image_url} alt='main banner' />
                            </div>

                            <div className='products-slider-container'>

                                <div className='best-seller-slider-wrapper' style={{ overflow: 'hidden' }}>
                                    <div
                                        className='best-seller-slider'
                                        style={{
                                            transform: `translateX(-${(currentIndex / totalPages) * 100}%)`
                                        }}>
                                        {/* {products.slice(currentIndex, currentIndex + cardsPerPage).map((item, index) => ( */}
                                        {!loading ?
                                            getDisplayedCards().slice(currentIndex, currentIndex + cardsPerPage).map((item, index) => (
                                                <BestSellerProductCard
                                                    productData={item}
                                                    isDiscountable={item.discount.is_discountable === 1 ? true : false}
                                                    key={index}
                                                    productMainImage={item.images?.[0]?.image_url}
                                                    starIcon={ratingStars}
                                                    reviews={'200'}
                                                    productName={item.name}
                                                    oldPrice={item.regular_price}
                                                    newPrice={item.newPrice}
                                                    listed={listed}
                                                    handleCardClicked={() => handleCardClicked(item)}
                                                    handleWishListClicked={() => handleWishlisted(item)}
                                                />
                                            )) :
                                            <>
                                                <BestSellerProductCardShimmer />
                                                <BestSellerProductCardShimmer />
                                                <BestSellerProductCardShimmer />
                                                <BestSellerProductCardShimmer />
                                                <BestSellerProductCardShimmer />
                                                <BestSellerProductCardShimmer />
                                            </>
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Mobile View  */}
                    <div className='best-saller-mobile-container'>
                        <h3>Best Seller</h3>
                        <div className='mobile-card-nav-container'>
                            {bestSellerNav1.map((item, index) => (
                                <p
                                    key={index}
                                    className={`mobile-best-seller-nav-item ${mobIndex === index ? 'mobile-seller-nav-active' : ''}`}
                                    onClick={() => {
                                        handleMobileNavClick(index)
                                        handleMobileActiveindex(index)
                                        getBestSellerProducts(item.slug)
                                    }}
                                >
                                    {item.Heading}
                                </p>
                            ))}
                        </div>

                        <div className='mobile-view-cards-main-container'>
                            {loading ? (
                                <BestSellerProductCardShimmer width={'85%'} />
                            ) : (
                                <Slider ref={sliderRef} {...mobileSettings}>
                                    {allProducts.map((item, index) => (


                                        <Link to={{ pathname: `/product/${item?.slug}`, state: item }} className='best-seller-card-main-container'>
                                            <div className='mobile-best-seller-cart-wishlist-container'>
                                                {
                                                    isInWishList(item?.uid) ? (
                                                        <VscHeartFilled
                                                            size={25}
                                                            style={{ color: 'var(--primary-color)' }}
                                                            onClick={(e) => {
                                                                e.stopPropagation();
                                                                handleWishlisted(item);
                                                            }}
                                                        />
                                                    ) : (
                                                        <img
                                                            src={heartIcon}
                                                            alt='heart'
                                                            className='mobile-best-seller-heart-icon'
                                                            onClick={(e) => {
                                                                e.stopPropagation();
                                                                handleWishlisted(item);
                                                            }}
                                                        />
                                                    )
                                                }
                                            </div>
                                            <img src={url + item?.images?.[1]?.image_url} />
                                            <div className='mobile-card-details-container'>
                                                <div className='mobile-best-seller-rating-and-review'>
                                                    <RatingReview rating={item?.rating} bgColor={'#FFFFFF'} bgColor2={'#FFFFFF'} disabled={true} size={"12px"} />
                                                </div>
                                                <h3>{item?.name}</h3>
                                                <div className='mobile-best-seller-category-product-price'>
                                                    <p className='mobile-best-seller-sale-price'>{formatedPrice(item?.sale_price)}</p>
                                                    {item?.sale_price === '' ? <p className='mobile-best-seller-sale-price'>{formatedPrice(item?.sale_price)}</p> : <del className='mobile-best-seller-regular-price'>{formatedPrice(allProducts?.[0]?.regular_price)}</del>}
                                                </div>
                                            </div>
                                            <div className='mobile-best-seller-cart-container'>
                                                <div className='mobile-best-sseller-card-bag-container'>
                                                    <HiOutlineShoppingBag size={25} className='best-seller-cart-icon' />
                                                </div>
                                            </div>
                                        </Link>
                                    ))}
                                </Slider>
                            )}
                        </div>
                    </div>

                    

                </div>
            ) : (
                <BestSellerShimmer rowDirection={'row'} />
            )}

        </>
    );
};

export default BestSellerSlider;
