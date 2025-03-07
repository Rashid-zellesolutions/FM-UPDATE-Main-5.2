import React, { useEffect, useState } from 'react'
import './PaymentMethod.css';
import paypalLogo from '../../../../Assets/Logo/paypal-logo.png';
import paypalFullLogo from '../../../../Assets/Logo/paypal-full-logo.png';
import PaymentOptions from '../PaymentOptions/PaymentOptions';
import venmaLogo from '../../../../Assets/icons/venma.png';
import cardIcon from '../../../../Assets/icons/card-icon.png'
import { useOrder } from '../../../../context/orderContext/orderContext';
import { useMyOrders } from '../../../../context/orderContext/ordersContext';
import { Link } from 'react-router-dom';
import PaymentTypes from '../PaymentTypes/PaymentTypes';
import CreditCard from '../CreditCard/CreditCard';
import FinancingAccount from '../FinancingAccount/FinancingAccount';
import Paypal from '../Paypal/Paypal';
import ProgressiveLeasing from '../ProgressiveLeasing/ProgressiveLeasing';

const PaymentMethod = ({ handleSubmitOrder }) => {

  // const {handleTabOpen, handleClickTop} = useMyOrders()
  const [selectedLabel, setSelectedLabel] = useState('')
  const { setOrderPayload } = useMyOrders()
  const handleSelectedLabel = (method) => {
    setSelectedLabel(method);
    setOrderPayload((prev) => ({
      ...prev,
      payment_method: method
    }));
  };


  const { addOrder } = useOrder()
  const handleOnClick = () => {
    addOrder('payment_method', 'cash delivery')
  }

  const paypalBtnOptions = [
    { name: 'Pay with', icon: paypalFullLogo, bgColor: '#F2BA36', textColor: '#000' },
    { name: 'Pay with', icon: venmaLogo, bgColor: '#008CFF', textColor: '#fff' },
    { logoBefore: paypalLogo, name: 'Pay Later', bgColor: '#F2BA36', textColor: '#000' },
    { logoBefore: cardIcon, name: 'Debit or Credit Card', bgColor: '#595959', textColor: '#fff' }
  ]

  // new design scripts
  const [selectedPaymentType, setSelectedPaymentType] = useState('financing-account');

  // const {
  //   creditCardData,
  //   setCreditCardData,
  //   activePaymentMethods
  // } = useMyOrders();

  // const checkPaymentMethodById = (id) => {
  //       const paymentMethod = activePaymentMethods?.find(pm => pm.id === id);
  //       if (paymentMethod) {
  //           return paymentMethod;
  //       } else {
  //           return paymentMethod;
  //       }
  //   };

  return (
    <div className='payment-method-main-container'>

      <div className='payment-types-outer-container'>
        {/* <PaymentOptions onSelectedLabel={handleSelectedLabel} /> */}
        <PaymentTypes
          onSelectLabel={handleSelectedLabel}
          selectedPaymentType={selectedPaymentType}
          setSelectedPaymentType={setSelectedPaymentType}
        />


        <div className='selected-payment-type'>
          {
            selectedPaymentType === 'credit-card' ?
              (
                <CreditCard />
              )
              : selectedPaymentType === 'finance-account' ?
                (
                  <FinancingAccount
                    topHeadng={'Look up your financing account.'}
                    buttonText={'Look Up Financing'}
                    askQuestion={'Need To Apply?'}
                    applyText={'Apply Now'}
                  />
                )
                : selectedPaymentType === 'progressive-leasing' ?
                  (
                    <FinancingAccount
                      topHeadng={'Look up your lease account.'}
                      buttonText={'Look Up Lease'}
                      askQuestion={'Need To Apply?'}
                      applyText={'Apply Now'}
                    />
                  )
                  : (
                    <Paypal />
                  )
          }
          <div className=''></div>
          <div>
            <div></div>
            <div></div>
          </div>
        </div>


        {/* <div className='payment-terms-and-procced-btn'>
              <div className='payment-term-agree'>
                <p>
                  Your personal data will be used to process your order, support your experience throughout this website, 
                  and for other purposes described in our <Link to={'/privacy-policy'}>privacy policy</Link>.
                </p>
                <div className='terms-agree'>
                    <input type='checkbox' id='agree-terms' />
                    <label className='terms-agree-label' for='agree-terms'>I have read & agreed to the website <Link>terms and conditions</Link></label>
                </div>
              </div>
              <div className={`procced-btn-div ${selectedLabel === 'Paypal' ? 'hide-proced' : ''}`}  onClick={handleSubmitOrder} >
                <button>
                  Proceed {selectedLabel}
                </button>
              </div>
              <div className={`paypal-btns-option ${selectedLabel === 'Paypal' ? 'show-paypal-btns' : ''}`}>
                  {paypalBtnOptions.map((items, index) => (
                    <button style={{backgroundColor: items.bgColor, border: items.bgColor, color: items.textColor}}>
                      {items.logoBefore ? <img src={items.logoBefore} alt='icon before' /> : <></>}
                      {items.name}
                      {items.icon ? <img src={items.icon} alt='icon after' /> : <></>}
                    </button>
                  ))}
              </div>
          </div> */}
      </div>
    </div>
  )
}

export default PaymentMethod
