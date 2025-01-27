import React, { useState, useRef, useEffect } from 'react';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from 'react-slick';
import './BestSeller.css';
import { useNavigate } from 'react-router-dom';
import { url } from '../../../utils/api';
import axios from 'axios';

// Assets
import arrowLeft from '../../../Assets/icons/arrow-left.png'
import arrowRight from '../../../Assets/icons/arrow-right.png'
import star from '../../../Assets/icons/Star 19.png'
import bestSellerMobileBanner from '../../../Assets/Furniture Mecca/Landing Page/best seller products/mobile-view-main-image.png';

// Components
import BestSellerProductCard from '../BestSellerProductCard/BestSellerProductCard';
import BestSellerProductCardShimmer from '../BestSellerProductCard/BestSellerProductCardShimmer';
import { useSingleProductContext } from '../../../context/singleProductContext/singleProductContext';
import { useCart } from '../../../context/cartContext/cartContext';
import { useList } from '../../../context/wishListContext/wishListContext';
import { toast } from 'react-toastify';
import BestSellerShimmer from '../BestSellerSlider/BestSellerShimmer/BestSellerShimmer';

const BestSellerPrevArrow = (props) => {
    const { className, style, onClick } = props;
    return (
        <div onClick={onClick} className={`best-seller-arrow ${className}`} >
            <img src={arrowLeft} alt='arrow' />
        </div>
    )
}

function BestSellerNextArrow(props) {
    const { className, style, onClick } = props;
    return (
        <div onClick={onClick} className={`best-seller-arrow ${className}`} >
            <img src={arrowRight} alt='arrow' />
        </div>
    )
}

const BestSeller = ({ categoryData }) => {

    // States and variables
    const [loading, setLoading] = useState(false);
    const [mainBanner, setMainBanner] = useState();
    const [products, setAllProducts] = useState();
    const [currentSlug, setCurrentSlug] = useState();
    const [data, setData] = useState(categoryData)
    const bestSellerNav = ['Living Room', 'Bedroom', 'Dining Room']
    const [activeItem, setActiveItem] = useState(0);
    const navigate = useNavigate()

    // Functions
    const getBestSellerProducts = async (slug) => {
        const api = `/api/v1/products/by-category?categorySlug=${slug}&best_selling_product=1`
        try {
            setLoading(true);
            const response = await axios.get(`${url}${api}`)
            setAllProducts(response.data.products);
            setLoading(false)

        } catch (error) {
            console.error("error geting best seller products", error);
            setLoading(false);
        }
    }

    useEffect(() => {
        setMainBanner(categoryData.categories[0].image)
        setCurrentSlug(categoryData.categories[0].slug)
    }, []);

    useEffect(() => {
        getBestSellerProducts(currentSlug)
    }, [currentSlug]);

    useEffect(() => {
        if (products?.length === 0) {
            setLoading(false);
        }
    }, [products])

    const handleActiveItem = (index, item) => {
        setActiveItem(index);
        setMainBanner(item?.image)
        setCurrentSlug(item?.slug)
    };

    const handleProductClick = (item) => {
        navigate(`/product/${item.slug}`, { state: { products: item } });
    }

    const itemPerPage = 6
    const maxIndex = Math.ceil(products && products.length / itemPerPage) - 1;
    const [currentIndex, setCurrentIndex] = useState(1)
    const handlePageChange = (index) => {
        setCurrentIndex(index)
    }

    // Mobile view script
    const [mobiIndex, setMobIndex] = useState(0)
    const handleMobileNavClick = (index) => {
        setMobIndex(index);
    }

    var settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
        initialSlide: 0,
        arrows: false,
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

    const ratingStars = [
        { icon: star },
        { icon: star },
        { icon: star },
        { icon: star },
        { icon: star }
    ]

    const { addToList, isInWishList, removeFromList } = useList()
    const notify = (str) => toast.success(str);
    const notifyRemove = (str) => toast.error(str)
    const [listed, setListed] = useState(false);
    const { addSingleProduct } = useSingleProductContext();
    const { addToCart } = useCart()
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

    return (
        <>
            {!loading ? (
                <div className={`category-besst-seller-main-container `}>
                    {/* {loading && <Loader />} */}
                    <div className='category-best-seller-and-banner-container'>

                        <div className='category-best-seller-cards-section'>

                            <div className='category-best-seller-menu'>
                                <h3>Best Seller</h3>
                                {categoryData ? (
                                    <div className='category-best-seller-menu-items'>
                                        {data.categories.map((item, index) => (
                                            <p key={index} className={activeItem === index ? 'active' : ''} onClick={() => handleActiveItem(index, item)}>{item.Heading}</p>
                                        ))}
                                    </div>
                                ) : <></>}
                            </div>

                            <div className='products-slider-container'>
                                {!loading ? <div className='best-seller-slider' style={{ transform: `translateX(-${(currentIndex / maxIndex) * 0}%)` }}>
                                    {products && products.slice(currentIndex, currentIndex + itemPerPage).map((item, index) => (
                                        <BestSellerProductCard
                                            key={index}
                                            productData={item}
                                            productMainImage={item.image.image_url}
                                            starIcon={item.ratingStars}
                                            reviews={item.reviewCount}
                                            productName={item.name}
                                            oldPrice={item.regular_price}
                                            newPrice={item.sale_price}
                                            handleCardClicked={() => handleProductClick(item)}
                                        />
                                    ))}
                                </div> :

                                    <div className='best-seller-slider'>


                                        <BestSellerProductCardShimmer />
                                        <BestSellerProductCardShimmer />
                                        <BestSellerProductCardShimmer />
                                        <BestSellerProductCardShimmer />
                                        <BestSellerProductCardShimmer />
                                        <BestSellerProductCardShimmer />


                                    </div>
                                }
                            </div>
                        </div>

                        <div className='category-best-seller-banners-section'>
                            <img src={url + categoryData.cover_img.image_url} className='banner_one' alt='banner one' />
                            <img src={mainBanner && (url + mainBanner.image_url)} alt='banner two' />
                        </div>

                    </div>

                    <div className='mobile-view-category-best-seller'>
                        <div className='mobile-view-category-best-seller-heading-section'>
                            <h3>Best Seller</h3>
                        </div>
                        <div className='mobile-view-category-best-seller-nav-and-banner'>
                            <img src={bestSellerMobileBanner} alt='mobile-main-banner' />
                            <div className='mobile-view-category-best-seller-nav-items'>
                                {bestSellerNav.map((items, index) => (
                                    <p
                                        key={index}
                                        onClick={() => { handleMobileNavClick(index); handleActiveItem(index) }}
                                        className={`mobile-view-nav-link ${mobiIndex === index ? 'mobile-view-nav-active' : ''}`}

                                    >
                                        {items}
                                    </p>
                                ))}
                            </div>
                        </div>

                        <div className='mobile-view-category-best-seller-card-section'>

                            <div className='mobile-view-best-seller-slider'>
                                {!loading ? (
                                    <Slider {...settings}>
                                        {products && products.map((item, index) => (
                                            <BestSellerProductCard
                                                productData={item}
                                                isDiscountable={item.discount.is_discountable === 1 ? true : false}
                                                key={index}
                                                productMainImage={item.images?.[0]?.image_url}
                                                starIcon={ratingStars}
                                                reviews={'200'}
                                                productName={item.name}
                                                oldPrice={item.regular_price}
                                                newPrice={item.sale_price}
                                                listed={listed}
                                                handleCardClicked={() => handleCardClicked(item)}
                                                handleWishListClicked={() => handleWishlisted(item)}
                                            />
                                        ))
                                        }
                                    </Slider>
                                ) : (
                                    <BestSellerProductCardShimmer width={'85%'} />
                                )}
                            </div>

                        </div>

                    </div>

                    <div className='category-pagination-dots'>
                        {Array.from({ length: maxIndex }, (_, index) => (
                            <span
                                key={index}
                                className={`category-dot ${currentIndex === index ? 'category-dot-active-active' : ''}`}
                                onClick={() => handlePageChange(index)}
                            ></span>
                        ))}
                    </div>
                </div>
            ) : (
                <BestSellerShimmer rowDirection={'row-reverse'} />
            )}
        </>
    )
}

export default BestSeller
