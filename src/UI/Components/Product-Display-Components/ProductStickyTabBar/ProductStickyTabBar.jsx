import React, { useEffect, useState } from 'react'
import './ProductStickyTabBar.css'
import { CiDeliveryTruck, CiLocationOn } from "react-icons/ci";
import { useCart } from '../../../../context/cartContext/cartContext';
import { formatedPrice } from '../../../../utils/api';

const ProductStickyTabBar = (
    {
        sectionRefs = {},
        isSticky,
        setIsSticky,
        productData,
        addToCart0,
        handleAddToCartProduct,
        variationData,
        isProtectionCheck,
        quantity
    }) => {


    const tabBarItems = ['Description', 'Details', 'Recommendations', 'Reviews'];
    const [activeTab, setIsActiveTab] = useState('Description');
    // const [isSticky, setIsSticky] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            const container = document.querySelector('.product-sticky-tab-bar-main-container');
            if (container) {
                const rect = container.getBoundingClientRect();
                if (rect.top <= 0) {
                    setIsSticky(true);
                } else {
                    setIsSticky(false);
                }
            }

            // Detect Active Tab Based on Scroll
            let currentTab = 'Description';
            tabBarItems.forEach((tab) => {
                const section = sectionRefs[tab]?.current;
                if (section) {
                    const { top } = section.getBoundingClientRect();
                    if (top <= 100) {
                        currentTab = tab;
                    }
                }
            })
            setIsActiveTab(currentTab)
            // setPrevScrollY(currentScrollY);
        }
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll)
    }, [sectionRefs]);

    const handleTabClick = (tab) => {
        const section = sectionRefs[tab]?.current;
        if (section) {
            section.scrollIntoView({ behavior: 'smooth', block: 'start' })
        }
    }


    console.log("product data", productData);
    console.log("product variation data", variationData);
    console.log("product is protected", isProtectionCheck);
    console.log("product quantity", quantity);

    return (
        <>
            <div className={`product-sticky-tab-bar-main-container ${isSticky ? 'add-margin' : ''}`}>
                {isSticky && <div className={`product-sticky-fixed-container`}>
                    <div className='product-sticky-fixed-detail-and-add-to-cart'>
                        <div className='product-sticky-fixed-details'>
                            <h3>{productData?.name}</h3>
                            <span className='product-sticky-fixed-delivery-detail'>
                                <CiDeliveryTruck size={20} color='#595959' />
                                <p>Get it by</p>
                                <strong>Wednesday, February 5</strong>
                                <i>
                                    <CiLocationOn scale={20} />
                                    <p>19134</p>
                                </i>
                            </span>
                        </div>
                        <div className='product-sticky-fixed-add-to-cart'>
                            <div className='product-detail-fixed-sale-price'>
                                <p>Sale</p>
                                {productData.sale_price !== '' ? (
                                    <span>
                                        <h3>{formatedPrice(productData?.sale_price)}</h3>
                                        <del>was {formatedPrice(productData?.regular_price)}</del>
                                    </span>
                                ) : (
                                    <h3>{formatedPrice(productData?.regular_price)}</h3>
                                )}
                                {/* <span>
                                    <h3>$1999.00</h3>
                                    <del>was $2100.00</del>
                                </span> */}
                            </div>
                            <button
                                onClick={() => {
                                    addToCart0(productData, variationData, !isProtectionCheck ? 1 : 0, quantity)
                                    handleAddToCartProduct(productData);
                                }
                                }
                            >
                                Add To Cart
                            </button>
                        </div>
                    </div>

                    <div className='mobile-product-sticky-fixed-add-to-cart'>
                        <div className='mobile-sticky-product-sale-and-price'>
                            <h3>Sale</h3>
                            <p>{formatedPrice(productData?.sale_price)}</p>
                        </div>
                        <button
                            onClick={() => {
                                addToCart0(productData, variationData, !isProtectionCheck ? 1 : 0, quantity)
                                handleAddToCartProduct(productData);
                            }
                            }
                        >
                            Add To Cart
                        </button>
                    </div>


                    <div className='product-sticky-fixed-tabs-container'>
                        {tabBarItems.map((item, index) => (
                            <div
                                key={index}
                                className={`product-sticky-tab-bar-item-container ${activeTab === item ? 'active-tab' : ''}`}
                                onClick={() => handleTabClick(item)}
                            >
                                <p>{item}</p>
                            </div>
                        ))}
                    </div>
                </div>}
                <div className='product-sticky-tab-bar'>
                    {tabBarItems.map((item, index) => (
                        <div
                            key={index}
                            className={`product-sticky-tab-bar-item-container ${activeTab === item ? 'active-tab' : ''}`}
                            onClick={() => handleTabClick(item)}
                        >
                            <p>{item}</p>
                        </div>
                    ))}
                </div>
            </div>
        </>

    )
}

export default ProductStickyTabBar
