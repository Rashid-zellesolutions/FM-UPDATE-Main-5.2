import React, { useEffect, useState } from 'react'
import './PaymentTypes.css'
import { RiSecurePaymentLine, RiInformationLine } from "react-icons/ri";
import paypal2 from '../../../../Assets/icons/paypal-2.png'
import acima2 from '../../../../Assets/icons/acima-2.png'
import card2 from '../../../../Assets/icons/card-2.png'
import { useMyOrders } from '../../../../context/orderContext/ordersContext';


const PaymentTypes = ({selectedPaymentType, setSelectedPaymentType, onSelectLabel}) => {

    const paymentTypeCheckData = [
        {type: 'credit-card', sign: 'Credit/Debit Card', logo:card2, paymentMethodId: '9879079j7mummjh'},
        {type: 'paypal',sign: 'Paypal', logo: paypal2},
        // {type: 'finance-account', sign: 'Finance Account', paymentMethodId: '961803160m79delmiw'},
        {type: 'acima-leasing', sign: 'Acima Leasing',logo:acima2, paymentMethodId: '19783168sagsk879'},
        
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
                     
                    <div className='payment-types-select-label'>
                    {item.sign}
                    <img src={item.logo} alt='logo' className='payment-type-paypal-logo' /> 
                    </div>
                    
                    
                </label>
            ))}
        </div>
    </div>
  )
}

export default PaymentTypes
