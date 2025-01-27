import React, { useEffect, useRef, useState } from 'react'
import './Products.css';
import { Link, useLocation, useParams, useSearchParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

// Assets
import filterHumberger from '../../../Assets/icons/humberger-icon.png'
import arrowUpDown from '../../../Assets/icons/arrow-up-donw.png'
import arrowBlack from '../../../Assets/icons/hide-arrow-black.png'
import star from "../../../Assets/icons/Star 19.png"
import heart from '../../../Assets/icons/heart-vector.png'
import { MdKeyboardArrowDown } from "react-icons/md";
import { FaRegArrowAltCircleLeft } from "react-icons/fa";
import { FaRegArrowAltCircleRight } from "react-icons/fa";
import { FaPlus } from "react-icons/fa6";
import { IoIosArrowDown } from "react-icons/io";

// Components

import ProductCard from '../ProductCard/ProductCard';
import ProductCardShimmer from '../Loaders/productCardShimmer/productCardShimmer';
import QuickView from '../QuickView/QuickView';
import CartSidePannel from '../Cart-side-section/CartSidePannel';
import MobileViewProductFilters from '../MobileViewProductFilters/MobileViewProductFilters';
import Breadcrumb from '../../../Global-Components/BreadCrumb/BreadCrumb';

// Functions and Context
import { formatedPrice, truncateTitle, url } from '../../../utils/api';
import axios from 'axios';
import { useCart } from '../../../context/cartContext/cartContext';
import { useList } from '../../../context/wishListContext/wishListContext';
import { toast } from 'react-toastify';
import DoubleRangeSlider from '../../../Global-Components/MultiRangeBar/MultiRange';
import RatingReview from '../starRating/starRating';
import { use } from 'react';
import { set } from 'lodash';

const Products = () => {

    // States and Variables
    const {
        cartProducts,
        increamentQuantity,
        decreamentQuantity,
        removeFromCart,
    } = useCart();

    const { subCategorySlug } = useParams();
    const location = useLocation();
    const params = new URLSearchParams(location.search);
    const query = params.get('query');
    const [viewAccording, setViewAccording] = useState('false')

    useEffect(() => {
        if (query !== null) {
            setViewAccording('true')
        } else {
            setViewAccording('false')
        }
    }, [])
    const [searchParams, setSearchParams] = useSearchParams();

    useEffect(() => {
        if (!searchParams.get("page")) {
            setSearchParams({ page: "1" });
        }
    }, [searchParams, setSearchParams]);

    // state variables
    const [hideFilters, setHideFilters] = useState(false);
    const [relevanceTrue, setRelevanceTrue] = useState(false)
    const navigate = useNavigate();
    // const [showAllFilters, setShowAllFilters] = useState(false);
    const [addToCartClicked, setAddToCartClicked] = useState(false);
    const [quickViewClicked, setQuickView] = useState(false);
    const [products, setProducts] = useState([]);
    const [colors, setColors] = useState([]);

    const [mobileFilters, setMobileFilters] = useState(false);

    const [totalPages, setTotalPages] = useState()
    const [activePage, setActivePage] = useState(1);

    const [priceRange, setPriceRange] = useState([130, 900]);

    const [allFilters, setAllFilters] = useState();

    const [quickViewProduct, setQuickViewProduct] = useState({})

    // Related Categories Data
    const relatedCategoriesData = [
        { categoryName: 'Leather Living Room sets', link: '#' },
        { categoryName: 'Reclining Living Room Sets', link: '#' },
        { categoryName: 'Small space Living Room sets', link: '#' },
        { categoryName: 'Sleeper Sofa Living Room sets', link: '#' },
        { categoryName: 'Sofa & Loveseat sets', link: '#' },
        { categoryName: 'Sofa & chair sets', link: '#' },
    ]

    // API Calls
    // Fetch Product data by query and page select
    const fetchProductData = async () => {
        const queryApi = `/api/v1/products/by-name?name`;

        try {
            setProducts([])
            let response;
            if (query) {
                response = await axios.get(`${url}${queryApi}=${query}`);
            } else {
                // setPaginationLoading(true)
                response = await axios.get(
                    `${url}/api/v1/products/by-category?categorySlug=${subCategorySlug}&page=${activePage}`
                );
            }
            const data = response.data.products;
            setTotalPages(response.data.pagination)

            setProducts(data);
            setColors(colors)

            fetchFilters();
            setSearchParams({ page: activePage })
        } catch (error) {
            // setPaginationLoading(false)
            console.error("Error fetching data:", error);
        }
        // setPaginationLoading(false)
    };


    const sortProducts = (criteria) => {
        switch (criteria) {
            case 'Recent':
                return setProducts(products.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)));
            case 'By Price (Low to High)':
                return setProducts(products.sort((a, b) => a.sale_price - b.sale_price));
            case 'By Price (High to Low)':
                return setProducts(products.sort((a, b) => b.sale_price - a.sale_price));
            case 'Alphabetic (A to Z)':
                return setProducts(products.sort((a, b) => a.name.localeCompare(b.name)));
            case 'Alphabetic (Z to A)':
                return setProducts(products.sort((a, b) => b.name.localeCompare(a.name)));
            case 'By Ratings (Low to High)':
                return setProducts(products.sort((a, b) => parseFloat(a.average_rating) - parseFloat(b.average_rating)));
            case 'By Ratings (High to Low)':
                return setProducts(products.sort((a, b) => parseFloat(b.average_rating) - parseFloat(a.average_rating)));

            default:
                return setProducts(products.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)));
        }

    }


    // Fetch Filters
    const fetchFilters = async () => {
        const api = `/api/v1/products/by-category/filters?categorySlug=${subCategorySlug}`
        try {
            const response = await axios.get(`${url}${api}`);
            if (response.status === 200) {
                setAllFilters(response.data)
                if (response.data.priceRange.minPrice !== undefined && response.data.priceRange.maxPrice !== undefined) {
                    setPriceRange([response.data.priceRange.minPrice, response.data.priceRange.maxPrice]);
                }
            } else {
                console.error(`UnExpected ${response.status} Error`)
            }

        } catch (error) {
            console.error("Server Error");
        }
    }

    const filterProducts = async (filter) => {
        const api = `/api/v1/products/by-category?categorySlug=${subCategorySlug}&page=${activePage}&${filter}`;
        try {
            setProducts([])
            const response = await axios.get(`${url}${api}`)
            setProducts(response.data.products)
            setTotalPages(response.data.pagination)
        } catch (error) {
            console.error("Internal Server Error");
        }
    }

    // useEffects
    useEffect(() => {
        fetchFilters();
    }, []);

    useEffect(() => {
        // Re-Fetch Products when user enter Query
        fetchProductData()
    }, [query, subCategorySlug]);

    const handleCartSectionClose = () => {
        setAddToCartClicked(false)
    }

    const handleQuickViewOpen = (item) => {
        setQuickView(true);
        setQuickViewProduct(item)
    }
    const handleQuickViewClose = () => { setQuickView(false) }

    const handleProductClick = (item) => {
        navigate(`/product/${item.slug}`, { state: item });
    };

    const handleFilterSection = () => {
        setHideFilters(!hideFilters)
    }

    const relevanceData = [
        { name: 'Recent' },
        { name: 'By Price (Low to High)' },
        { name: 'By Price (High to Low)' },
        { name: 'Alphabetic (A to Z)' },
        { name: 'Alphabetic (Z to A)' },
        { name: 'By Ratings (Low to High)' },
        { name: 'By Ratings (High to Low)' },
    ]

    const [selectedRelevanceValue, setSelectedRelevanceValue] = useState(0)
    const handleRelevance = () => {
        setRelevanceTrue(!relevanceTrue);
    }

    const handleSelectRelevance = (item) => {
        setSelectedRelevanceValue(item.name);
        setRelevanceTrue(false);
    }

    // Card title words limit
    const maxLength = 50;

    // Mobile view Script

    const [selectedGrid, setSelectedGrid] = useState('')
    const [activeGrid, setActiveGrid] = useState('')
    const handleActiveGrid = (grid) => {
        setActiveGrid(grid);
        setSelectedGrid(grid)
    }
    const handleMobileFilters = () => {
        setMobileFilters(true)
    }

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

    // Filters Section
    const [isOpen, setIsOpen] = useState(false);
    const [ratingOpen, setRatingOpen] = useState(false)
    const [categoryOpen, setCategoryOpen] = useState(false);

    const handleColorFilterOpenClose = (type) => {
        setIsOpen((prevOpen) => prevOpen === type ? '' : type)
        setRatingOpen((prevOpen) => prevOpen === type ? '' : type)
        setCategoryOpen((prevOpen) => prevOpen === type ? '' : type)
    }

    const [colorValue, setColorValue] = useState([]);
    const [ratingValue, setRatingValue] = useState([])
    const [categoryValue, setCategoryValue] = useState([]);

    const handleRangeChange = (newRange) => {
        if (newRange[0] !== priceRange[0] || newRange[1] !== priceRange[1]) {
            setPriceRange(newRange);
        }

        const params = new URLSearchParams(searchParams);
        params.set('price', priceRange.join(','));

        const currentPage = searchParams.get('page');
        params.set('page', currentPage);

        let priceString = params.toString().replace(/%2C/g, ',').replace(/\+/g, ' ');

        setSearchParams(priceString)
        filterProducts(priceString)

    }

    const handleColorCheck = (value) => {
        const updatedColorValue = colorValue.includes(value) ?
            colorValue.filter((item) => item !== value) :
            [...colorValue, value]

        setColorValue(updatedColorValue);
        const params = new URLSearchParams(searchParams);
        if (updatedColorValue.length > 0) {
            params.set('color', updatedColorValue.join(','))
        } else {
            params.delete('color')
        }

        const currentPage = searchParams.get('page');
        params.set('page', currentPage)

        let queryString = params.toString().replace(/%2C/g, ',').replace(/\+/g, ' ');
        setSearchParams(queryString)
        filterProducts(queryString)
    }

    const handleRatingFilter = (value) => {
        const updatedRating = ratingValue.includes(value) ?
            ratingValue.filter((item) => item !== value) :
            [...ratingValue, value];

        setRatingValue(updatedRating)

        const params = new URLSearchParams(searchParams);
        if (updatedRating.length > 0) {
            params.set('rating', updatedRating.join(','));
        } else {
            params.delete('rating');
        }


        const currentPage = searchParams.get('page');
        params.set('page', currentPage);

        const ratingString = params.toString().replace(/%2C/g, ',').replace(/\+/g, ' ');
        setSearchParams(ratingString)
    }

    const handleCategorySelect = (value) => {
        const updatedCategory = categoryValue.includes(value) ?
            categoryValue.filter((item) => item !== value) :
            [...categoryValue, value]

        setCategoryValue(updatedCategory)

        const params = new URLSearchParams(searchParams);
        if (updatedCategory.length > 0) {
            params.set('productType', updatedCategory.join(','));
        } else {
            params.delete('category');
        }

        const currentPage = searchParams.get('page');
        params.set('page', currentPage);

        let categoryString = params.toString().replace(/%2C/g, ',').replace(/\+/g, ' ');

        setSearchParams(categoryString)
        filterProducts(categoryString)
    }

    const handleClearFilters = () => {
        setPriceRange([300, 900])
        setColorValue([]);
        setRatingValue([]);
        setCategoryValue([]);
        fetchProductData();
        fetchFilters();
    }

    useEffect(() => {
    }, [colorValue, categoryValue, ratingValue])

    // Pagination
    const [activePageIndex, setActivePageIndex] = useState(1);

    const handleActivePage = (index) => {
        setActivePage(index);
        setActivePageIndex(index);
    }

    const handlePrevPage = () => {
        if (activePage > 1) {
            setActivePage(activePage - 1);
            setActivePageIndex(activePageIndex - 1);
        }
    };

    const handleNextPage = () => {
        console.log("next clicked")
        if (activePage < totalPages) {
            setActivePage(activePage + 1);
            setActivePageIndex(activePageIndex + 1);
        }
    };


    useEffect(() => {
        fetchProductData(activePage)
    }, [activePageIndex]);





    return (
        <div className='products-main-container'>
            <Breadcrumb category={products.categories} />

            <div className='products-and-filter-container'>
                {/* Filters side bar section code */}
                <div className={`filters-section ${hideFilters ? 'hide-filter' : ''}`}>

                    <div className={`hide-filters-btn`}>
                        <button onClick={handleFilterSection}>
                            <img src={arrowBlack} alt='arrow black' />
                            Hide Filters
                        </button>
                    </div>

                    <div className='filters-inner-container'>

                        <div className='filters-heading-section'>
                            <h3>Filters</h3>
                            <p onClick={handleClearFilters}>Clear Filters</p>
                        </div>

                        <div className='all-filters-section'>

                            {/* Price Filter */}
                            <DoubleRangeSlider
                                min={allFilters?.priceRange?.minPrice}
                                max={allFilters?.priceRange?.maxPrice}
                                initialRange={priceRange}
                                setInitialRange={setPriceRange}
                                onRangeChange={handleRangeChange}
                                minLabel='Min Price:'
                                maxLabel='Max Price:'
                            />

                            {/* Color Filter */}
                            <div className='single-filter'>
                                <span onClick={() => handleColorFilterOpenClose('color-filter')}>
                                    <h3 className='filters-heading'>{allFilters?.colors?.[0]?.name}</h3>
                                    <i className='add-button-round'>
                                        <FaPlus size={15} color='#595959' className={isOpen === 'color-filter' ? 'rotate' : 'rotate-back'} />
                                    </i>
                                </span>
                                <div className={`single-filter-items-container ${isOpen === 'color-filter' ? 'show-single-filter-icons' : ''}`}>
                                    {allFilters?.colors?.[0]?.options.map((item, index) => (
                                        <span key={index} className={`color-span`} >
                                            <input
                                                type='checkbox'
                                                placeholder='checkbox'
                                                value={item.name}
                                                checked={colorValue.includes(item.name)}
                                                onChange={(e) => handleColorCheck(e.target.value)}
                                                style={{ backgroundColor: item.value, border: `2px solid ${item.value}` }}
                                                className='color-custom-checkbox'
                                                id={`filter-${index}`}
                                            />
                                            <label className='filter-inner-text' htmlFor={`filter-${index}`}>{item.name}</label>
                                        </span>
                                    ))}
                                </div>
                            </div>

                            {/* Rating Filter */}
                            <div className='single-filter'>
                                <span onClick={() => handleColorFilterOpenClose('rating-filter')}>
                                    <h3 className='filters-heading'>Ratings</h3>
                                    {/* <img src={AddBtn} alt='btn' className={ratingOpen === 'rating-filter' ? 'rotate' : ''} /> */}
                                    <i className='add-button-round'>
                                        <FaPlus color='#595959' className={isOpen === 'rating-filter' ? 'rotate' : ''} />
                                    </i>
                                </span>
                                <div className={`single-filter-items-container ${ratingOpen === 'rating-filter' ? 'show-single-filter-icons' : ''}`}>
                                    {[...Array(5).keys()].reverse().map((item, index) => (
                                        <span key={index} className={`color-span`} >
                                            <input
                                                type='checkbox'
                                                placeholder='checkbox'
                                                value={item + 1}
                                                checked={ratingValue.includes((item + 1).toString())}
                                                onChange={(e) => handleRatingFilter(e.target.value)}
                                                className='custom-checkbox'
                                                id={`filter-${5 - item}`}
                                            />
                                            <label htmlFor={`filter-${5 - item}`}>
                                                <RatingReview rating={item + 1} disabled={true} size={"20px"} />
                                            </label>
                                        </span>
                                    ))}
                                </div>
                            </div>

                            {/* Category Filter */}
                            <div className='single-filter'>
                                <span onClick={() => handleColorFilterOpenClose('category-filter')}>
                                    <h3 className='filters-heading'>Product Type</h3>
                                    {/* <img src={AddBtn} alt='btn' className={categoryOpen === 'category-filter' ? 'rotate' : ''} /> */}
                                    <i className='add-button-round'>
                                        <FaPlus color='#595959' className={isOpen === 'category-filter' ? 'rotate' : ''} />
                                    </i>
                                </span>
                                <div className={`single-filter-items-container ${categoryOpen === 'category-filter' ? 'show-single-filter-icons' : ''}`}>
                                    {allFilters?.categories?.map((item, index) => (
                                        <span key={index} className={`color-span`} >
                                            <input
                                                type='checkbox'
                                                placeholder='checkbox'
                                                className='custom-checkbox'
                                                id={`filter-${index}`}
                                                value={item.name}
                                                checked={categoryValue.includes(item.name)}
                                                onChange={(e) => handleCategorySelect(e.target.value)}
                                            />
                                            <label className='filter-inner-text' htmlFor={`filter-${index}`}>{item.name}</label>
                                        </span>
                                    ))}
                                </div>
                            </div>

                        </div>

                    </div>
                </div>

                {/* Products section code */}
                <div className={`products-section ${hideFilters ? 'full-width' : ''}`}>
                    {/* product heading */}
                    <div className={`products-heading ${query ? 'query-hide-search-heading' : ''}`}>

                        <div className='show-filter-btn-and-product-count'>
                            <button className={`show-filter-btn ${hideFilters ? 'hide-show-filter-btn' : ''}`} onClick={handleFilterSection}>
                                <img src={arrowBlack} alt='arrow black' className={`show-filter-btn-arrow ${hideFilters ? 'rotate-show-filter-arrow-icon' : ''}`} />
                                Show Filters
                            </button>
                            {products && products?.length > 0 ? (
                                <p>{totalPages?.totalProducts} Items Starting at {formatedPrice(allFilters?.priceRange?.minPrice)}</p>
                            ) : (
                                <p className='total-product-count-shimmer'></p>
                            )
                            }
                            {/* <p>{totalPages?.totalProducts} Items Starting at {formatedPrice(allFilters?.priceRange?.minPrice)}</p> */}
                        </div>

                        {/* Relevance Dropdown */}
                        {/* <div className='relevance-container'>
                            <div className='relevance-heading' onClick={handleRelevance}>
                                <h3 className='relevance-heading-sort-by'>Sort By:</h3>
                                <span >
                                    <p>{selectedRelevanceValue.length > 0 ? selectedRelevanceValue : 'Recent'}</p>
                                    <MdKeyboardArrowDown size={20} className={`relevance-arrow ${relevanceTrue ? 'rotate-relevance-arrow' : ''}`} />
                                </span>
                            </div>
                            <div className={`relevance-dropdown ${relevanceTrue ? 'show-relevance' : ''}`}>
                                {relevanceData.map((item, index) => (
                                    <p className='filter-inner-text' key={index} onClick={() => { 
                                        setSelectedRelevanceValue(item.name); 
                                        setRelevanceTrue(false); 
                                        sortProducts(item.name) 
                                    }}>{item.name}</p>
                                ))}
                            </div>

                        </div> */}

                        <div className='relevance-container'>
                            <div className='relevance-filters-body'>
                                <div className='relevance-filter-heading' onClick={handleRelevance}>
                                    <p className='relevance-heading-text'>Sort By</p>
                                    <div className='selected-relevance-item'>
                                        <p className='selected-relevance-text'>{selectedRelevanceValue}</p>
                                        <i className='relevance-heading-icon'>
                                            <MdKeyboardArrowDown className='relevance-heading-icon-rotate' color='#595959' size={15} />
                                        </i>
                                    </div>
                                </div>
                                <div className={`relevance-filter-items ${relevanceTrue ? 'show-relevance-items' : ''}`}>
                                    {relevanceData.map((item, index) => (
                                        <div
                                            className='relevance-single-filter'
                                            key={index}
                                            onClick={() => {
                                                setSelectedRelevanceValue(item.name);
                                                setRelevanceTrue(false);
                                                sortProducts(item.name)
                                            }}>
                                            <p className='relevance-single-filter-name'>{item.name}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                    </div>

                    <div className={`product-main ${hideFilters ? 'increase-columns' : ''}`}>

                        {products && products?.length > 0 ? (
                            products?.map((item, index) => {
                                return <ProductCard
                                    key={index}
                                    slug={item.slug}
                                    singleProductData={item}
                                    maxWidthAccordingToComp={"100%"}
                                    justWidth={hideFilters ? '310px' : '100%'}
                                    tagIcon={item.productTag ? item.productTag : heart}
                                    tagClass={item.productTag ? 'tag-img' : 'heart-icon'}
                                    mainImage={`${item.image.image_url}`}
                                    productCardContainerClass="product-card"
                                    ProductSku={item.sku}
                                    tags={item.tags}
                                    allow_back_order={item?.allow_back_order}
                                    ProductTitle={truncateTitle(item.name, maxLength)}
                                    stars={[
                                        { icon: star, title: 'filled' },
                                        { icon: star, title: 'filled' },
                                        { icon: star, title: 'filled' },
                                        { icon: star, title: 'filled' },
                                        { icon: star, title: 'filled' },
                                    ]}
                                    reviewCount={item.reviewCount}
                                    lowPriceAddvertisement={item.lowPriceAddvertisement}
                                    priceTag={item.regular_price}
                                    sale_price={item.sale_price}
                                    financingAdd={item.financingAdd}
                                    learnMore={item.learnMore}
                                    mainIndex={index}
                                    deliveryTime={item.deliveryTime}
                                    stock={item.manage_stock}
                                    attributes={item.attributes}
                                    handleCardClick={() => handleProductClick(item)}
                                    handleQuickView={() => handleQuickViewOpen(item)}
                                    handleWishListclick={() => handleWishList(item)}
                                />
                            })
                        ) : (
                            Array.from({ length: 3 }).map((_, index) => (
                                <ProductCardShimmer key={index} />
                            ))
                        )}

                    </div>
                    {/* Product Card Code End */}

                    <div className='view-more-products-button-div'>

                        <div className='view-more-products-pagination-main'>
                            <div className='pagination-buttons-container'>
                                <span
                                    className={activePageIndex === 1 ? 'disabled' : ''}
                                    onClick={handlePrevPage}
                                    style={{
                                        pointerEvents: activePageIndex === 1 ? 'none' : 'auto',
                                        color: activePageIndex === 1 ? '#ccc' : '#4487C5',
                                    }}
                                >
                                    <FaRegArrowAltCircleLeft
                                        size={18}
                                        style={{
                                            pointerEvents: activePageIndex === 1 ? 'none' : 'auto',
                                            color: activePageIndex === 1 ? '#ccc' : '#4487C5',
                                        }}
                                    />
                                    Prev
                                </span>
                                {Array.from({ length: totalPages?.totalPages }).map((_, index) => (
                                    <span
                                        key={index}
                                        onClick={() => handleActivePage(index + 1)}
                                        className={activePageIndex === index + 1 ? 'active-page-span' : ''}
                                    >
                                        {index + 1}
                                    </span>
                                ))}
                                <span
                                    className={activePageIndex === totalPages?.totalPages ? 'disabled' : ''}
                                    onClick={handleNextPage}
                                    style={{
                                        pointerEvents: activePageIndex === totalPages?.totalPages ? 'none' : 'auto',
                                        color: activePageIndex === totalPages?.totalPages ? '#ccc' : '#4487C5',
                                    }}
                                >
                                    Next
                                    <FaRegArrowAltCircleRight
                                        size={18}
                                        style={{
                                            pointerEvents: activePageIndex === totalPages?.totalPages ? 'none' : 'auto',
                                            color: activePageIndex === totalPages?.totalPages ? '#ccc' : '#4487C5',
                                        }}
                                    />
                                </span>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
            {/* Mobile view product section */}
            <div className='mobile-view-product-and-filter-section'>
                <div className='mobile-view-filters-section'>
                    <div className='mobile-view-filter-head'>
                        <div className='mobile-view-product-count'>
                            <p>214 items</p>
                            <p>Starting at $ 299</p>
                        </div>
                        <div className='mobile-view-product-card-grid-select'>
                            <div className={`mobile-view-card-grid-single-col ${activeGrid === 'single-col' ? 'grid-active' : ''}`} onClick={() => handleActiveGrid('single-col')}></div>
                            <div className='mobile-view-card-grid-dual-col' onClick={() => handleActiveGrid('dual-col')}>
                                <div className={`mobile-view-card-grid-dual-col-inner ${activeGrid !== 'single-col' ? 'active-dual-col' : ''}`}></div>
                                <div className={`mobile-view-card-grid-dual-col-inner ${activeGrid !== 'single-col' ? 'active-dual-col' : ''}`}></div>
                            </div>
                        </div>
                    </div>
                    <div className='mobile-view-filter-body'>
                        <button className='mobile-view-show-filters' onClick={handleMobileFilters}>
                            <img src={filterHumberger} alt='filter' />
                            Show Filter
                        </button>
                        <button className={`mobile-view-sort-btn`}>
                            <img src={arrowUpDown} alt='arrow up down' />
                            Sort
                        </button>
                    </div>
                </div>
                <div className={`${selectedGrid === 'single-col' ? 'mobile-view-product-single-column' : 'mobile-view-products-main-container'} `}>

                    {products.length === 0 ? (
                        selectedGrid === 'single-col' ?
                            Array.from({ length: 1 }).map((_, index) => (
                                <ProductCardShimmer width={'100%'} key={index} />
                            )) : Array.from({ length: 2 }).map((_, index) => (
                                <ProductCardShimmer width={'100%'} key={index} />
                            ))
                    ) : (
                        products.map((item, index) => {
                            return <ProductCard
                                key={index}
                                slug={item.slug}
                                singleProductData={item}
                                maxWidthAccordingToComp="100%"
                                // justWidth={'310px'}
                                percent={'-12%'}
                                tagIcon={item.productTag ? item.productTag : item.heart}
                                tagClass={item.productTag ? 'tag-img' : 'heart-icon'}
                                mainImage={`${item.image.image_url}`}
                                productCardContainerClass="product-card"
                                ProductSku={item.sku}
                                tags={item.tags}
                                ProductTitle={truncateTitle(item.name, maxLength)}
                                stars={[
                                    { icon: star, title: 'filled' },
                                    { icon: star, title: 'filled' },
                                    { icon: star, title: 'filled' },
                                    { icon: star, title: 'filled' },
                                    { icon: star, title: 'filled' },
                                ]}
                                reviewCount={item.reviewCount}
                                lowPriceAddvertisement={item.lowPriceAddvertisement}
                                priceTag={item.regular_price}
                                sale_price={item.sale_price}
                                financingAdd={item.financingAdd}
                                learnMore={item.learnMore}
                                mainIndex={index}
                                deliveryTime={item.deliveryTime}
                                stock={item.manage_stock}
                                attributes={item.attributes}
                                handleCardClick={() => handleProductClick(item)}
                                handleWishListclick={() => handleWishList(item)}
                            />
                        })
                    )}
                </div>

                <div className='view-more-products-pagination-main'>
                    <div className='pagination-buttons-container'>
                        <span
                            className={activePageIndex === 1 ? 'disabled' : ''}
                            onClick={handlePrevPage}
                            style={{
                                pointerEvents: activePageIndex === 1 ? 'none' : 'auto',
                                color: activePageIndex === 1 ? '#ccc' : '#4487C5',
                            }}
                        >
                            <FaRegArrowAltCircleLeft
                                size={18}
                                style={{
                                    pointerEvents: activePageIndex === 1 ? 'none' : 'auto',
                                    color: activePageIndex === 1 ? '#ccc' : '#4487C5',
                                }}
                            />
                            <p className='hide-on-mob'> Previous </p>
                        </span>
                        {Array.from({ length: totalPages?.totalPages }).map((_, index) => (
                            <span
                                key={index}
                                onClick={() => handleActivePage(index + 1)}
                                className={activePageIndex === index + 1 ? 'active-page-span' : ''}
                            >
                                {index + 1}
                            </span>
                        ))}
                        <span
                            className={activePageIndex === totalPages?.totalPages ? 'disabled' : ''}
                            onClick={handleNextPage}
                            style={{
                                pointerEvents: activePageIndex === totalPages?.totalPages ? 'none' : 'auto',
                                color: activePageIndex === totalPages?.totalPages ? '#ccc' : '#4487C5',
                            }}
                        >
                            <p className='hide-on-mob'> Next </p>
                            <FaRegArrowAltCircleRight
                                size={18}
                                style={{
                                    pointerEvents: activePageIndex === totalPages?.totalPages ? 'none' : 'auto',
                                    color: activePageIndex === totalPages?.totalPages ? '#ccc' : '#4487C5',
                                }}
                            />
                        </span>
                    </div>
                </div>

            </div>
            {/* Related Categories Code */}
            <div className='related-categories-div'>
                <h3>Related Categories</h3>
                <div className='related-categories-items'>
                    {relatedCategoriesData.map((item, index) => {
                        return <Link key={index} to={item.link}>{item.categoryName}</Link>
                    })}
                </div>
            </div>

            {/* Cart Side Section */}
            <CartSidePannel
                cartData={cartProducts}
                addToCartClicked={addToCartClicked}
                handleCartSectionClose={handleCartSectionClose}
                removeFromCart={removeFromCart}
                decreamentQuantity={decreamentQuantity}
                increamentQuantity={increamentQuantity}
            />

            <QuickView setQuickViewProduct={quickViewProduct} quickViewShow={quickViewClicked} quickViewClose={handleQuickViewClose} />

            {/*Mobile view filters  */}
            <MobileViewProductFilters
                showMobileFilters={mobileFilters}
                setMobileFilters={setMobileFilters}
                filtersData={allFilters}
                subCategorySlug={subCategorySlug}
                priceRange={priceRange}
                tempRange={priceRange}
                setTampRange={setPriceRange}
                setPriceRange={setPriceRange}
                colorValue={colorValue}
                setColorValue={setColorValue}
                handleColor={handleColorCheck}
                handleRating={handleRatingFilter}
                handleCategory={handleCategorySelect}
                handlePriceRange={handleRangeChange}
            />
        </div>
    )
}

export default Products