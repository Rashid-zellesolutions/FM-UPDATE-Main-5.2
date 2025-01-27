import React, { useEffect, useState } from 'react'
import './ShippingAndDelivery.css';
import storeIcon from '../../../Assets/icons/store-icon.png';
import { url } from '../../../utils/api';

const ShippingAndDelivery = () => {

    const [shippingAndDelivery, setShippingAndDelivery] = useState()
    const fetchShippingAndDeliveryPolicy = async () => {
      const api = `/api/v1/pages/shipping-delivery/get`;
      try {
        const response = await fetch(`${url}${api}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'Application/json'
          }
        });
        const result = await response.json();
        setShippingAndDelivery(result.shippingDelivery.content)
        // console.log("result", result)
      } catch (error) {
        console.error("UnExpected Server Error", error);
      }
    }

    useEffect(() => {fetchShippingAndDeliveryPolicy()})

  return (
    <div className='shipping-and-delivery-main-container'>
      <div dangerouslySetInnerHTML={{ __html: shippingAndDelivery }} ></div>
    </div>
  )
}

export default ShippingAndDelivery
