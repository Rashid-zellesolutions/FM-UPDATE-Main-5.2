import React, { useEffect, useState } from 'react'
import './PaymentMethod.css';
import { useMyOrders } from '../../../../context/orderContext/ordersContext';
import { Link } from 'react-router-dom';
import PaymentTypes from '../PaymentTypes/PaymentTypes';
import CreditCard from '../CreditCard/CreditCard';
import FinancingAccount from '../FinancingAccount/FinancingAccount';
import Paypal from '../Paypal/Paypal';

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


  // const { addOrder } = useOrder()
  

  // new design scripts
  const [selectedPaymentType, setSelectedPaymentType] = useState('financing-account');


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
                : selectedPaymentType === 'acima-leasing' ?
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


        
      </div>
    </div>
  )
}

export default PaymentMethod
