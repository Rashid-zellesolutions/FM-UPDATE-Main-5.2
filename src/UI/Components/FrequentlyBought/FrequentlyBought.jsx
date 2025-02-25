import React, { useState, useEffect } from 'react'
import './FrequentlyBought.css';
import { useSelector } from 'react-redux';
// import ProductCard from '../ProductCard/ProductCard';
import { useNavigate } from 'react-router-dom';
import { useProducts } from '../../../context/productsContext/productContext';
import axios from 'axios';
import star from '../../../Assets/icons/black-star.png'
import { url } from '../../../utils/api';
import heart from '../../../Assets/icons/heart-vector.png'
// import ProductCardTwo from '../ProductCardTwo/ProductCardTwo';
import ProductCardShimmer from '../Loaders/productCardShimmer/productCardShimmer';
import { useList } from '../../../context/wishListContext/wishListContext';
import { toast } from 'react-toastify';
import ProductCardTwo from '../ProductCardTwo/ProductCardTwo';

const FrequentlyBought = ({ relatedProducts, isPadding }) => {

    // console.log("related products", relatedProducts)
    // console.log("core collections", collection);
    // const collections = collection.map((item) => item);
    // console.log("transfered valued", collections)
    // const productData = useSelector((state) => state.products.data)
    const products = relatedProducts;
    const relatedCollection = products.map((item) => item)
    // console.log("similler products", relatedCollection)

    const [data, setData] = useState()
    const fetchData = async () => {
        const api = `/api/v1/products/get/`;
        try {
            const request = relatedCollection.map(async (item) => {
                const response = await axios.get(`${url}${api}${item}`);
                return response.data.products;
            });
            const relatedMyCollection = await Promise.all(request);
            const filteredMyRelatedProducts = relatedMyCollection.flat();
            return filteredMyRelatedProducts;
        } catch (error) {
            console.error("error geting data", error)
        }
    }

    const getchMyCollectionProducts = async () => {
        const products = await fetchData();
        setData(products);
        // console.log("my colection data");
    }
    useEffect(() => {
        getchMyCollectionProducts()
    }, [])
    // console.log("converted my related products", data)

    // const {products} = useProducts()
    const navigate = useNavigate()
    // const handleProductClicked = (item) => {
    //     navigate(`/product/${item.slug}`, { state: { products: item } })
    // }

    const handleCardClick = (item) => {
        navigate(`/product/${item.slug}`, {state: {products: item}})
    }

    const [hoveredIndex, setHoveredIndex] = useState(null);
    const [hideFilters, setHideFilters] = useState(false);

    // console.log(productData)





    // Change image on hover function
    const handleImageHover = (index) => {
        setHoveredIndex(index);
    };

    const handleImageHoverLeave = () => {
        setHoveredIndex(null);
    };

    // Card title words limit
    const maxLength = 30;
    const truncateTitle = (title, maxLength) => {
        if (title.length > maxLength) {
            return title.slice(0, maxLength) + '...';
        }
        return title;
    };


    // Select Color Variations Functions
    const [selectedColorIndices, setSelectedColorIndices] = useState(Array(products.length).fill(0));
    const handleVariantImageClick = (cardIndex, colorIndex) => {
        const updatedIndices = [...selectedColorIndices];
        updatedIndices[cardIndex] = colorIndex;
        setSelectedColorIndices(updatedIndices);
    };

    const colorIndex = useSelector((state) => state.colorIndex.colorIndex)

    // const handleCardClick = (item) => {
    //     navigate(`/product/${item.slug}`, {state: {products: item}})
    // }

    // wish list
    const {addToList, removeFromList, isInWishList} = useList()
    const notify = (str) => toast.success(str);
    const notifyRemove = (str) => toast.error(str)
    const handleWishList = (item) => {
        if(isInWishList(item.uid)){
            removeFromList(item.uid);
            notifyRemove('Removed from wish list', {
                autoClose: 10000,
                className: "toast-message",
            })
        }else{
            addToList(item)
            notify("added to wish list", {
                autoClose: 10000,
            })
        }
    }

    const [quickViewClicked, setQuickView] = useState(false);
    const [quickViewProduct, setQuickViewProduct] = useState({})
    const handleQuickViewOpen = (item) => {
        setQuickView(true);
        setQuickViewProduct(item)
    }
    const handleQuickViewClose = () => { setQuickView(false) }

    const handleProductClick = (item) => {
        navigate(`/product/${item.slug}`, { state: item });
    };


    return (
        <div className={`frequently-bought-main ${isPadding ? 'add-padding' : ''}`}>
            <h3>You May Also Like</h3>
            <div className='frequently-bought-card'>
                {data ? (
                    data && data.slice(0, 5).map((item, index) => (
                    <ProductCardTwo
                            key={index}
                            slug={item.slug}
                            singleProductData={item}
                            maxWidthAccordingToComp={"100%"}
                            justWidth={'100%'}
                            percent={'12%'}
                            showOnPage={false}
                            // colTwo={selectedGrid === 'single-col' ? false : true}
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
                        // key={item.uid}
                        // maxWidthAccordingToComp={'100%'} justWidth={'100%'}
                        // tagIcon={heart}
                        // tagClass={` ${item.productTag ? 'tag-img' : 'heart-icon'}`}
                        // tagDivClass={`${item.productTag ? 'product-tag-div' : 'heart-icon-div'}`}
                        // mainImage={hoveredIndex === index && item.image.image_url ? item.hoverImage : item.image.image_url}
                        // productCardContainerClass={`product-card ${hideFilters ? 'card-width-increase' : ''}`}
                        // mouseEnter={() => handleImageHover(index)}
                        // mouseLeave={handleImageHoverLeave}
                        // ProductTitle={truncateTitle(item.name, maxLength)}
                        // stars={item.ratingStars}
                        // reviewCount={'200'}
                        // lowPriceAddvertisement={item.lowPriceAddvertisement}
                        // priceTag={item.regular_price}
                        // financingAdd={item.financingAdd}
                        // learnMore={item.learnMore}
                        // colorVariation={item.colorVariation}
                        // mainIndex={index}
                        // percent={'12%'}
                        // deliveryTime={item.deliveryTime}
                        // selectedColorIndices={selectedColorIndices}
                        // handleVariantColor={() => handleVariantImageClick(index, colorIndex)}
                        // borderLeft={index % 4 === 3}
                        // stock={item.manage_stock}
                        // singleProductData={item}
                        // attributes={item.attributes}
                        // ProductSku={item.sku}
                        // sale_price={item.sale_price}
                        // handleWishListclick={() => handleWishList(item)}
                        // handleCardClick={() => handleCardClick(item)}
                    />
                ))
                ) : (
                    Array.from({ length: 4 }).map((_, index) => (
                        <ProductCardShimmer />
                    ))
                )}
                {data && data.slice(0, 5).map((item, index) => (
                    <ProductCardTwo
                        key={item.uid}
                        maxWidthAccordingToComp={'100%'} justWidth={'100%'}
                        // tagIcon={item.productTag ? item.productTag : item.heart}
                        tagIcon={heart}
                        tagClass={` ${item.productTag ? 'tag-img' : 'heart-icon'}`}
                        tagDivClass={`${item.productTag ? 'product-tag-div' : 'heart-icon-div'}`}
                        mainImage={hoveredIndex === index && item.image.image_url ? item.hoverImage : item.image.image_url}
                        productCardContainerClass={`product-card ${hideFilters ? 'card-width-increase' : ''}`}
                        mouseEnter={() => handleImageHover(index)}
                        mouseLeave={handleImageHoverLeave}
                        ProductTitle={truncateTitle(item.name, maxLength)}
                        stars={item.ratingStars}
                        reviewCount={'200'}
                        lowPriceAddvertisement={item.lowPriceAddvertisement}
                        priceTag={item.regular_price}
                        financingAdd={item.financingAdd}
                        learnMore={item.learnMore}
                        colorVariation={item.colorVariation}
                        mainIndex={index}
                        percent={'12%'}
                        deliveryTime={item.deliveryTime}
                        selectedColorIndices={selectedColorIndices}
                        handleVariantColor={() => handleVariantImageClick(index, colorIndex)}
                        borderLeft={index % 4 === 3}
                        stock={item.manage_stock}
                        // handleCardClick={() => handleCardClick(item)}
                        singleProductData={item}
                        attributes={item.attributes}
                        ProductSku={item.sku}
                        sale_price={item.sale_price}
                        handleCardClick={() => handleCardClick(item)}
                    />
                ))}
            </div>
        </div>
    )
}

export default FrequentlyBought
