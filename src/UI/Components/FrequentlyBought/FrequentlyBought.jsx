import React, { useState, useEffect } from 'react'
import './FrequentlyBought.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import star from '../../../Assets/icons/black-star.png'
import { url } from '../../../utils/api';
import heart from '../../../Assets/icons/heart-vector.png'
import ProductCardShimmer from '../Loaders/productCardShimmer/productCardShimmer';
import { useList } from '../../../context/wishListContext/wishListContext';
import { toast } from 'react-toastify';
import ProductCardTwo from '../ProductCardTwo/ProductCardTwo';
import QuickView from '../QuickView/QuickView';

const FrequentlyBought = ({ relatedProducts, isPadding }) => {

    // const productData = useSelector((state) => state.products.data)
    const products = relatedProducts;
    const relatedCollection = products.map((item) => item)

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
    }
    useEffect(() => {
        getchMyCollectionProducts()
    }, [])

    // const {products} = useProducts()
    const navigate = useNavigate()
    

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
                            maxWidthAccordingToComp={"98%"}
                            justWidth={'100%'}
                            showOnPage={true}
                            percent={'12%'}
                            titleHeight={true}
                            tagIcon={item.productTag ? item.productTag : heart}
                            tagClass={item.productTag ? 'tag-img' : 'heart-icon'}
                            mainImage={`${item.image.image_url}`}
                            productCardContainerClass="product-card"
                            ProductSku={item.sku}
                            tags={item.tags}
                            allow_back_order={item?.allow_back_order}
                            ProductTitle={item.name}
                            
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
                    ))
                ) : (
                    Array.from({ length: 4 }).map((_, index) => (
                        <ProductCardShimmer />
                    ))
                )}
            </div>
            <QuickView
                setQuickViewProduct={quickViewProduct}
                quickViewShow={quickViewClicked}
                quickViewClose={handleQuickViewClose}
            />
        </div>
    )
}

export default FrequentlyBought
