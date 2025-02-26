import React, { useEffect, useState } from 'react'
import './PaymentTypes.css'
import { RiSecurePaymentLine, RiInformationLine } from "react-icons/ri";
import paypalLogo from '../../../../Assets/icons/paypal.png'
import { useMyOrders } from '../../../../context/orderContext/ordersContext';


const PaymentTypes = ({selectedPaymentType, setSelectedPaymentType, onSelectLabel}) => {

    const paymentTypeCheckData = [
        {type: 'credit-card', sign: 'Credit Card', paymentMethodId: '9879079j7mummjh'},
        {type: 'finance-account', sign: 'Finance Account', paymentMethodId: '961803160m79delmiw'},
        {type: 'progressive-leasing', sign: 'Progressive Leasing', paymentMethodId: '19783168sagsk879'},
        {type: 'paypal', logo: paypalLogo},
    ]

    const {
            creditCardData,
            setCreditCardData,
            activePaymentMethods
        } = useMyOrders();

        
    
        const checkPaymentMethodById = (id) => {
            const paymentMethod = activePaymentMethods?.find(pm => pm.id === id);
            if (paymentMethod) {
                return paymentMethod;
            } else {
                return paymentMethod;
            }
        };

    useEffect(() => {setSelectedPaymentType(paymentTypeCheckData[0].type)}, [])
    // const [selectedPaymentType, setSelectedPaymentType] = useState(paymentTypeCheckData[0].type);
    const handleSelectPaymentType = (type) => {
        setSelectedPaymentType(type);
        onSelectLabel(type)
        checkPaymentMethodById(type.paymentMethodId)
    }

    const handlePaymentMethod = (type) => {
        onSelectLabel(type)
    }

  return (
    <div className='payment-types-main-container'>
        <span className='payment-type-heading-container'>
            Payment 
            <RiSecurePaymentLine size={25} />
        </span>
        <div className='payment-types-select-boxes-container'>
            {paymentTypeCheckData.map((item, index) => (
                <label 
                    key={index} 
                    onClick={() => handleSelectPaymentType(item)}
                    className={`payment-select-option ${selectedPaymentType === item.type ? 'select-payment' : ''}`}>
                    <input 
                        type='radio' 
                        checked={selectedPaymentType === item.type}
                        // checked={selectPaymentMethod === 'credit-card'}
                        name='selectedPaymentType'
                        onChange={() => handleSelectPaymentType(item.type)}
                    />
                    {item.logo ? <img src={item.logo} alt='logo' className='payment-type-paypal-logo' /> : item.sign}
                    
                    
                </label>
            ))}
        </div>
    </div>
  )
}

export default PaymentTypes
