import React, { useState } from 'react'
import './Summary.css';
import OrderSummary from '../../Components/Summary-Components/OrderSummary/OrderSummary';
import Coupon from '../../Components/Summary-Components/Coupon/Coupon';
import PaymentMethod from '../../Components/Summary-Components/PaymentMethod/PaymentMethod';
import TrustFor from '../../Components/Summary-Components/Trust-for-varaities/TrustFor';
import HappyCustomers from '../../Components/Summary-Components/Happy-Customer/HappyCustomers';
import ShipingAndDelivery from '../../Components/Summary-Components/ShippingAndDelivery/ShipingAndDelivery';
import PaymentInfo from '../../Components/Summary-Components/PaymentInfo/PaymentInfo';
import { useMyOrders } from '../../../context/orderContext/ordersContext';
import Loader from '../../Components/Loader/Loader';
import ShippingForm from '../../Components/Summary-Components/ShippingForm/ShippingForm';


const Summary = () => {

  const checkoutSections = [
    { id: 1, name: 'Delivery', navOp: 'delivery' },
    { id: 2, name: 'Review', navOp: 'review' },
    { id: 3, name: 'Payment', navOp: 'payment-method' },
  ]

  const [currentId, setCurrentId] = useState(0)
  const {
    setOrderPayload,
    orderPayload,
    handlePaymentInfo,
    addProducts,
    sendProducts,
    selectedTab,
    handleClickTop,
    handleTabOpen,
    isLoader,
    showThankyou,
    setThankyouState
  } = useMyOrders();

  const handleClickSave = () => {
    // addProducts(cartProducts?.products);
    handlePaymentInfo();
    sendProducts();
  };
  


  

  const isPaymentMethodFilled = () => orderPayload.payment_method.trim() !== "";

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isPaymentMethodFilled()) {

      // Proceed with form submission
      handleClickSave();
      // navigate('/')
    } else {
      alert("Please select a payment method!");
    }
  };

  return (
    <div className='summary-main-container'>
      {/* {showThankyou && <ThankYou/>} */}
      {isLoader && <Loader />}
    {!showThankyou &&  <div className='summary-left-section'>
        <div className='checkout-pages-toggle-nav'>
          {checkoutSections.map((items, index) => (
            <span
              key={items.id}
              onClick={() => handleTabOpen(index)}
              className={`checkout-page-toggle-nav-single-item 
                ${selectedTab === index ? 'active-checkout-toggle' : ''}`}
            >
              <p>{items.id}.</p>
              <p>{items.name}</p>
            </span>
          ))}
        </div>
        {
          selectedTab === 0 ?
            <div className='shipping-details-and-coupen-show'>
              {/* <ShippingDetails userInfoPayload={setOrderPayload} />
              <Coupon /> */}
              <ShippingForm />
            </div> :
            selectedTab === 1 ?
              <div className='order-summery-and-proceed-btn'>
                <Coupon />
                <ShipingAndDelivery />
                <PaymentInfo />
                <OrderSummary />
                <div className='order-summery-proceed-btn-div'>
                  <button onClick={() => { handleTabOpen(2); handleClickTop(); 
                    // addProducts(cartProducts)
                     }}>
                    Continue to Payment
                  </button>
                </div>
              </div> :
              selectedTab === 2 ? <PaymentMethod handleSubmitOrder={handleSubmit} />
                : <></>
        }
      </div>}
      {!showThankyou && <div className={` ${currentId === 1 ? 'summary-right-section' : currentId === 2 ? 'summery-right-section-according-payment' : 'summery-right-section-low-height'}`}>
        <TrustFor />
        <HappyCustomers />
      </div>}
    </div>
  )
}

export default Summary