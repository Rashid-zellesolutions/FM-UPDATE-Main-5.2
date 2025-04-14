import React from 'react'
import paypal from "../../../../Assets/icons/paypal-1.png";
import './Paypal.css'

const Paypal = () => {
  return (
    <div className='payment-type-paypal-main-container'>
      <div className='payment-type-paypal-heading'>
        <h3>Paypal</h3>
        <img src={paypal} alt='paypal' />
      </div>
    </div>
  )
}

export default Paypal
