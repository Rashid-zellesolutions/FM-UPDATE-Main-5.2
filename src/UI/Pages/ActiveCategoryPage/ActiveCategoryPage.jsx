import React, { useState, useEffect } from "react";
import "./ActiveCategoryPage.css"
import { url } from "../../../utils/api";
import { useActiveSalePage } from "../../../context/ActiveSalePageContext/ActiveSalePageContext";
import Sliderr from "../../../Global-Components/Slider/Slider";
import { useNavigate } from "react-router-dom";
import { useList } from "../../../context/wishListContext/wishListContext";
import ProductCardShimmer from "../../Components/Loaders/productCardShimmer/productCardShimmer";
import heart from "../../../Assets/icons/heart-vector.png"
import CartSidePannel from "../../Components/Cart-side-section/CartSidePannel";
import { useCart } from "../../../context/cartContext/cartContext";
import QuickView from "../../Components/QuickView/QuickView";
import { IoMdClose } from "react-icons/io";
import { toast } from "react-toastify";
import ProductCardTwo from "../../Components/ProductCardTwo/ProductCardTwo";

export default function ActiveCategoryPage() {
    const navigate = useNavigate();
    const { salesData, products } = useActiveSalePage();
    const maxLength = 50;
    const truncateTitle = (title, maxLength) => {
        if (!title) return '';
        return title.length > maxLength ? title.slice(0, maxLength) + '...' : title
    };
    const handleProductClick = (item) => {
        navigate(`/product/${item.slug}`, { state: item });
    };

    // const moveToProductArchive = () => {
    //     navigate(`/outlet/${salesData?.data?.categoryData?.slug}`, { state: salesData?.data?.categoryData });
    // };

    const [quickViewProduct, setQuickViewProduct] = useState({})
    const [quickViewClicked, setQuickView] = useState(false);
    const [addToCartClicked, setAddToCartClicked] = useState(false)

    const handleQuickViewOpen = (item) => {
        setQuickView(true);
        setQuickViewProduct(item)

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

    const {
        cartProducts,
        increamentQuantity,
        decreamentQuantity,
        removeFromCart
    } = useCart();


    const handleCartSectionClose = () => {
        setAddToCartClicked(false)
    }
    const handleQuickViewClose = () => { setQuickView(false) }

    const [isInfoOpen, setIsInfoOpen] = useState(false);
    const handleOpennfoModal = () => {
        setIsInfoOpen(true);
    }

    const handleCloseInfoModal = () => {
        setIsInfoOpen(false);
    }

    console.log("sale data ", salesData)

    return (
        <>
            <div className="activeCategoryPage">
                {salesData && <Sliderr images={salesData?.data?.mainSlider} />}

                <div className="section_1_ASP">
                    <h3 className='category-heading'>{salesData ? salesData?.data?.categoryData?.name : ""}</h3>
                    <div className="active-sale-cards increase-columns" >

                        {products && products.length > 0 ? (
                            products.map((item, index) => {
                                return <ProductCardTwo
                                    key={index}
                                    slug={item.slug}
                                    singleProductData={item}
                                    maxWidthAccordingToComp={"100%"}
                                    justWidth={'100%'}
                                    tagIcon={item.productTag ? item.productTag : heart}
                                    tagClass={item.productTag ? 'tag-img' : 'heart-icon'}
                                    mainImage={`${item.image.image_url}`}
                                    productCardContainerClass="product-card"
                                    ProductSku={item.sku}
                                    tags={item.tags}
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
                                    showOnPage={true}
                                    createdDate={item.createdAt}
                                    showExtraLines={true}
                                    titleHeight={true}
                                    allow_back_order={item?.allow_back_order}
                                    handleInfoModal={handleOpennfoModal}
                                />
                            })
                        ) : (
                            Array.from({ length: 12 }).map((_, index) => (
                                <ProductCardShimmer />
                            ))
                        )}

                    </div>
                </div>

                <div className="banner-1-content">
                    <img src={`${url}${salesData?.data?.banner1?.desktop?.[0]?.image_url}`} alt="" srcset="" />
                </div>

                <div className="content_1_section">
                    <div className="left_side_cont">
                        <div dangerouslySetInnerHTML={{ __html: salesData?.data?.content1 || "" }} />
                    </div>
                    <div className="right_side_cont">
                        <img src={salesData ? url + salesData?.data?.banner2[0]?.image_url : ""} alt="" srcset="" />
                    </div>
                </div>

                <Sliderr height={"auto"} images={salesData ? salesData?.data?.banner3 : []} />
                <div className="section_3_ASP" dangerouslySetInnerHTML={{ __html: salesData?.data?.content2 || "" }} />
                <CartSidePannel
                    cartData={cartProducts}
                    addToCartClicked={addToCartClicked}
                    handleCartSectionClose={handleCartSectionClose}
                    removeFromCart={removeFromCart}
                    decreamentQuantity={decreamentQuantity}
                    increamentQuantity={increamentQuantity}
                />

                <QuickView
                    setQuickViewProduct={quickViewProduct}
                    quickViewShow={quickViewClicked}
                    quickViewClose={handleQuickViewClose}
                />

                
            </div>

        
        </>
    )
}