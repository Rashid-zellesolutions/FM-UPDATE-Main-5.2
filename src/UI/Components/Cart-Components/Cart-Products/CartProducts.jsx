import React, { useState, useEffect } from 'react'
import './CartProducts.css';
import CartItems from '../Cart-items/CartItems';
import CartPaymnetMethoud from '../CArtAddPaymentMethoud/CartPaymnetMethoud';
import { useCart } from '../../../../context/cartContext/cartContext';
import EmptyCart from '../Empty-Cart/EmptyCart';
import MobileCart from '../Mobile-Cart/MobileCart';
import { useNavigate } from 'react-router-dom';
import Breadcrumb from '../../../../Global-Components/BreadCrumb/BreadCrumb';
import { IoLocationOutline } from "react-icons/io5";
import LocationPopUp from '../../LocationPopUp/LocationPopUp';
import guardIcon from '../../../../Assets/icons/guard-icon.png'
import { formatedPrice } from '../../../../utils/api';
import { useGlobalContext } from '../../../../context/GlobalContext/globalContext';
import SnakBar from '../../../../Global-Components/SnakeBar/SnakBar';


const CartProducts = () => {
    const {
        cart,
        cartProducts,
        removeFromCart,
        increamentQuantity,
        decreamentQuantity,
        calculateTotalPrice,
        removeProtection,
        addSingleProtection,
        subTotal,
        savings,
        isCartProtected,
        isProfessionalAssembly,
        handleCartProtected,
        handleCartAssembly,
    } = useCart()

    const {
        shippingMethods,
        info,
        zipCode,
        handleInputChange,
        handleButtonClick,
        totalTax,
        calculateTotalTax,
        selectedOption,
        handleChange,
        getShippingMethods,
        selectedShippingMethods,
        setSelectedShippingMethods,
        CalculateGrandTotal
    } = useGlobalContext();

    const [locationDetails, setLocationDetails] = useState({
        zipCode: '',
        city: '',
        state: '',
        country: ''
    });

    const [deliveryOptionIndex, setDeliveryOptionIndex] = useState(null);
    const handleDeliveryOptionndex = (index) => {
        setDeliveryOptionIndex(index)
    }

    calculateTotalPrice(cart)

    const [isOpen, setIsOpen] = useState(false);
    const [checkoutFixed, setCheckoutFixed] = useState(true);
    const [searchLocation, setSearchLocation] = useState(false);

    const handleToggle = () => {
        setIsOpen(!isOpen);
    };

    const handleScroll = () => {
        if (window.scrollY > 250) {
            setCheckoutFixed(false);
        }
        else {
            setCheckoutFixed(true);
        }
    }

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll)
        }
    }, [])

    const [issingleProtected, setIsSingleProtected] = useState(false);

    const handleLocationModal = () => {
        setSearchLocation(true)
    }
    const handleCloseSearch = () => {
        setSearchLocation(false)
    }

    const [showSnakeBar, setShowSnakeBar] = useState(false);
    const [snakeBarMessage, setSnakeBarMessage] = useState()
    const handleShowSnakeToust = (name) => {
        setShowSnakeBar(true)
        setSnakeBarMessage(name)
    }
    const handleCloseSnakeBar = () => {
        setShowSnakeBar(false)
    }

    

    return (
        <>
            <div className='cart-products-main-container'>
                <div className='cart-products-heading'>
                    <Breadcrumb />
                    <h3>Cart ({cartProducts.products.length} items)</h3>
                </div>
                <div className='zipcode-and-protection-plan-container'>
                    <span className='update-zip-code-on-cart-page'>
                        <IoLocationOutline size={20} />
                        <p className='update-zip-on-cart-details'>Product availability and delivery options for 19134</p>
                        <p className='update-zip-on-cart-update-location' onClick={handleLocationModal}>Change Location</p>
                    </span>
                    <div className='cart-protection-plan-container'>
                        <h3
                            className='protection-plan-on-cart-container'
                        >
                            Add Furniture Mecca Platinum Protection Plan
                        </h3>

                        <div className='cart-protect-or-not-container'>
                            <div className='cart-protect-card'>
                                <img src={guardIcon} alt='guard icon' className='cart-protection-card-icon' />
                                <div className='cart-protection-plan-details-container'>
                                    <p className='cart-protection-plan-card-header'>Protect Entire Order</p>
                                    <p className='cart-protection-plan-cart-desc'>{formatedPrice(199)}</p>
                                </div>
                                <div className='cart-protection-checkbox-container'>
                                    <input
                                        type="checkbox"
                                        className='order-summary-checkbox'
                                        checked={isCartProtected}
                                        onChange={() => handleCartProtected()}
                                    />
                                </div>
                            </div>

                            <div className='cart-protect-card'>
                                <div className='cart-protection-plan-details-container'>
                                    <p className='cart-protection-plan-card-header'>Professional Assembly (+ $210)</p>
                                    <p className='cart-protection-plan-cart-desc'>Use professional assembly for all products and save up to $80</p>
                                </div>
                                <div className='cart-protection-checkbox-container'>
                                    <input
                                        type="checkbox"
                                        className='order-summary-checkbox'
                                        checked={isProfessionalAssembly}
                                        onChange={() => handleCartAssembly()}
                                    />
                                </div>
                            </div>

                        </div>

                    </div>
                </div>
                <div className={`cart-items ${isOpen ? 'low-width' : ''}`}>
                    <div className='cart-container-shipping-details'>
                        <h3 className='protection-plan-on-cart-container'>Choose Delivery Method</h3>
                        <div className='cart-protect-or-not-container'>
                            {selectedShippingMethods &&
                                selectedShippingMethods.map((option, index) => (
                                    <div className='cart-protect-card'>
                                        <img src={guardIcon} alt='guard icon' className='cart-protection-card-icon' />
                                        <div className='cart-protection-plan-details-container'>
                                            <p className='cart-protection-plan-card-header'>{option.name}</p>
                                        </div>
                                        <div className='cart-protection-radio-container'>
                                            <label
                                                key={option.id}
                                                style={{
                                                    display: "flex",
                                                    alignItems: "flex-start",
                                                    flexDirection: "row",
                                                    justifyContent: "flex-start",
                                                    margin: "5px 0",
                                                    gap: "10px",
                                                }}
                                                onClick={() => handleDeliveryOptionndex(index)}
                                            >
                                                <input
                                                    type="radio"
                                                    name="options"
                                                    value={option.id}
                                                    checked={selectedOption?.id === option.id}
                                                    onChange={(e) => handleChange(e, option, index)} // Pass the `option` object
                                                    style={{
                                                        marginTop: "5px",
                                                    }}
                                                />
                                            </label>

                                        </div>
                                    </div>
                                ))}
                            {/* <div className='cart-protect-card'>
                                <img src={guardIcon} alt='guard icon' className='cart-protection-card-icon' />
                                <div className='cart-protection-plan-details-container'>
                                    <p className='cart-protection-plan-card-header'>Protect Entire Order</p>
                                </div>
                                <div className='cart-protection-checkbox-container'>
                                    <input
                                        type="radio"
                                        name="options"
                                        value={option.id}
                                        checked={selectedOption?.id === option.id}
                                        onChange={(e) => handleChange(e, option, index)} // Pass the `option` object
                                        style={{
                                            marginTop: "5px",
                                        }}
                                    />
                                </div>
                            </div> */}
                        </div>
                    </div>
                    {cartProducts.products.length <= 0 && <EmptyCart />}
                    {cartProducts.products.map((items, index) => {
                        return <CartItems
                            key={items.product_uid}
                            totalProducts={cartProducts?.products.length}
                            attributes={items.attributes}
                            onlyMobile={false}
                            productData={items}
                            issingleProtected={issingleProtected}
                            handleSingleProtected={() => { }}
                            cartIndex={items.product_uid}
                            productsLength={cartProducts.products.length}
                            handleRomoveProduct={() => { 
                                handleShowSnakeToust(items.name) ; 
                                removeFromCart(items.isVariable === 1 ? items.variation_uid : items.product_uid, items.isVariable === 1)
                            }}
                            cartProductName={items.name}
                            cartPRoductImage={items.image?.image_url}
                            cartProductTitle={items.name}
                            isCartOpen={isOpen}
                            quantity={items.quantity}
                            productTotalPrice={items.total_price}
                            sale_price={items.sale_price}
                            regular_price={items.regular_price}
                            isProtected={items.is_protected}
                            productSubTotal={items.sub_total}
                            handleIncreament={() => increamentQuantity(items.isVariable === 1 ? items.variation_uid : items.product_uid, items.isVariable === 1)}
                            handleDecreament={() => decreamentQuantity(items.isVariable === 1 ? items.variation_uid : items.product_uid, items.isVariable === 1)}
                            removeProtection={() => removeProtection(items.isVariable === 1 ? items.variation_uid : items.product_uid, items.isVariable === 1)}
                            addProtection={() => addSingleProtection(items.isVariable === 1 ? items.variation_uid : items.product_uid, items.isVariable === 1)}
                        />
                    })}
                </div>
                <div className='mobile-cart-items'>
                    {cartProducts.products.length <= 0 && <EmptyCart />}
                    {cartProducts.products.map((items, index) => (
                        <MobileCart
                            key={items.product_uid}
                            attributes={items.attributes}
                            // onlyMobile={false}
                            productData={items}
                            issingleProtected={issingleProtected}
                            handleSingleProtected={() => { }}
                            cartIndex={items.product_uid}
                            productsLength={cartProducts.products.length}
                            handleRomoveProduct={() => removeFromCart(items.isVariable === 1 ? items.variation_uid : items.product_uid, items.isVariable === 1)}
                            cartProductName={items.name}
                            cartPRoductImage={items.image?.image_url}
                            cartProductTitle={items.name}
                            isCartOpen={isOpen}
                            quantity={items.quantity}
                            productTotalPrice={items.total_price}
                            sale_price={items.sale_price}
                            regular_price={items.regular_price}
                            isProtected={items.is_protected}
                            productSubTotal={items.sub_total}
                            handleIncreament={() => increamentQuantity(items.isVariable === 1 ? items.variation_uid : items.product_uid, items.isVariable === 1)}
                            handleDecreament={() => decreamentQuantity(items.isVariable === 1 ? items.variation_uid : items.product_uid, items.isVariable === 1)}
                            removeProtection={() => removeProtection(items.isVariable === 1 ? items.variation_uid : items.product_uid, items.isVariable === 1)}
                            addProtection={() => addSingleProtection(items.isVariable === 1 ? items.variation_uid : items.product_uid, items.isVariable === 1)}
                        // handleIncreament={() => increamentQuantity(items.isVariable===1?items.variation_uid:items.product_uid,items.isVariable===1) }
                        // handleDecreament={() => decreamentQuantity(items.isVariable===1?items.variation_uid:items.product_uid,items.isVariable===1)}
                        // removeProtection={() => removeProtection(items.isVariable===1?items.variation_uid:items.product_uid,items.isVariable===1)}
                        // addProtection={() => addSingleProtection(items.isVariable===1?items.variation_uid:items.product_uid,items.isVariable===1)}
                        />
                    ))}
                </div>


                <CartPaymnetMethoud
                    isOpen={isOpen}
                    handleToggle={handleToggle}
                />

                <LocationPopUp
                    searchLocation={searchLocation}
                    handleCloseSearch={handleCloseSearch}
                    setLocationDetails={setLocationDetails}
                    locationDetails={locationDetails}
                />
                <SnakBar 
                    message={snakeBarMessage}
                    openSnakeBarProp={showSnakeBar}
                    setOpenSnakeBar={setShowSnakeBar}
                    onClick={handleCloseSnakeBar}
                />
            </div>
        </>
    )
}

export default CartProducts
