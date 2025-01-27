import React, { useEffect, useState } from 'react'
import './AddressesTab.css';
import editIcon from '../../../../Assets/icons/edit.png';
import crossBtn from '../../../../Assets/icons/close-btn.png'
import axios from 'axios';
import { url } from '../../../../utils/api';
import Loader from '../../Loader/Loader';
import { use } from 'react';

const AddressesTab = ({ userAddresses, setTrigerPoint }) => {

  const [loading, setLoading] = useState(false);
  const [billingPayload, setBillingPayload] = useState({
    userId: '',
    billingAddress: {
      first_name: userAddresses?.billing_address?.first_name,
      last_name: userAddresses?.billing_address?.last_name,
      address_1: userAddresses?.billing_address?.address_1,
      city: userAddresses?.billing_address?.city,
      state: userAddresses?.billing_address?.state,
      postal_code: userAddresses?.billing_address?.postal_code,
      country: 'USA',
      // email: userAddresses?.email,
      // phone: '090078601'
    }
  })
  const [shippingPayload, setShippingPayload] = useState({
    userId: '',
    shippingAddress: {
      first_name: userAddresses?.shipping_address?.first_name,
      last_name: userAddresses?.shipping_address?.last_name,
      address_1: userAddresses?.shipping_address?.address_1,
      city: userAddresses?.shipping_address?.city,
      state: userAddresses?.shipping_address?.state,
      postal_code: userAddresses?.shipping_address?.postal_code,
      country: 'USA',
      // email: userAddresses?.email,
      // phone: '090078601'
    }
  })



  const [isEditTrue, setIsEdit] = useState(false);
  const [modalType, setModalType] = useState('');
  const handleEditBillingAddress = (clickType) => {
    setIsEdit(true)
    setModalType(clickType)
  }
  const handleEditShippingClose = () => {
    setIsEdit(false);
    setModalType('')
  }
  useEffect(() => {
  }, [modalType])

  useEffect(() => {
    const uuid = localStorage.getItem('uuid')
    if (modalType === 'billing-address') {
      setBillingPayload((prevPayload) => ({
        ...prevPayload,
        userId: uuid
      }));
    } else if (modalType === 'shipping-address') {
      setShippingPayload((prevPayload) => ({
        ...prevPayload,
        userId: uuid
      }));
    }
  }, [modalType])

  const handleInputData = (e) => {
    const { name, value } = e.target;

    if (modalType === 'billing-address') {
      setBillingPayload((prevPayload) => ({
        ...prevPayload, // Keep previous state
        ...(name === 'email' ? { email: value } : {
          billingAddress: {
            ...prevPayload.billingAddress, // Spread existing shippingAddress
            [name]: value, // Dynamically update the field in shippingAddress
          },
        }), // Dynamically update the field in billingAddress
      }));
    } else if (modalType === 'shipping-address') {
      setShippingPayload((prevPayload) => ({
        ...prevPayload, // Keep previous state
        ...(name === 'email' ? { email: value } : {
          shippingAddress: {
            ...prevPayload.shippingAddress, // Spread existing shippingAddress
            [name]: value, // Dynamically update the field in shippingAddress
          },
        })
      }));
    }
  }

  const handleUpdateAddress = async () => {
    const billingApi = `/api/v1/web-users/update-billing-address`
    const shippingApi = `/api/v1/web-users/update-shipping-address`;
    try {

      if (modalType === 'billing-address') {
        setLoading(true)
        const response = await axios.put(`${url}${billingApi}`, billingPayload);
        if (response.status === 200) {
          setTrigerPoint(true)
          console.log("update billing address detail successfully", response);
        } else {
          console.error("Request response failed");
        }
      } else if (modalType === 'shipping-address') {
        setLoading(true)
        const response = await axios.put(`${url}${shippingApi}`, shippingPayload);
        if (response.status === 200) {
          setTrigerPoint(true)
          console.log("update shipping address detail successfully", response);
        } else {
          console.error("Request response failed");
        }
      }

    } catch (error) {
      setLoading(false)
      console.error("UnExpected Server Error", error);
      return {
        error: true,
        message: "Server Error"
      }
    } finally {
      setLoading(false)
      setIsEdit(false)
      // setBillingPayload({
      //   userId: '',
      //   billingAddress: {
      //     first_name: '',
      //     last_name: '',
      //     address_1: '',
      //     city: '',
      //     state: '',
      //     postal_code: '',
      //     country: 'USA',
      //     email: '',
      //     phone: ''
      //   }
      // })
      // setShippingPayload({
      //   userId: '',
      //   shippingAddress: {
      //     first_name: '',
      //     last_name: '',
      //     address_1: '',
      //     city: '',
      //     state: '',
      //     postal_code: '',
      //     country: 'USA',
      //     email: '',
      //     phone: ''
      //   }
      // })
    }
  }

  return (
    <div className='addresses-main-container'>
      {/* <p>The following addresses will be used on checkout page by default</p> */}
      {loading && <Loader />}
      <div className='billing-and-shipping-addresses'>
        <div className='user-billing-address'>
          <div className='billing-address-details'>
            <div className='title-and-edit-icon'>
              <h3>Billing Address</h3>
              <img src={editIcon} alt='edit icon' onClick={() => handleEditBillingAddress('billing-address')} />
            </div>
            <div className='billing-address-show'>
              <p>{userAddresses?.billing_address?.first_name} {userAddresses?.billing_address?.last_name}</p>
              <p>{userAddresses?.email}</p>
              <p>{userAddresses?.billing_address?.phone}</p>
              <p>{userAddresses?.billing_address?.address_1}</p>
              <p>{userAddresses?.billing_address?.address_2}</p>
              <p>{userAddresses?.billing_address?.postal_code}</p>
              <p>{userAddresses?.billing_address?.city} {userAddresses?.billing_address?.state}</p>
            </div>
          </div>
        </div>

        <div className='user-billing-address'>
          <div className='billing-address-details'>
            <div className='title-and-edit-icon'>
              <h3>Shipping Address</h3>
              <img src={editIcon} alt='edit icon' onClick={() => handleEditBillingAddress('shipping-address')} />
            </div>
            <div className='billing-address-show'>
              <p>{userAddresses?.shipping_address?.first_name} {userAddresses?.shipping_address?.last_name}</p>
              <p>{userAddresses?.email}</p>
              <p>{userAddresses?.shipping_address?.phone}</p>
              <p>{userAddresses?.shipping_address?.address_1}</p>
              <p>{userAddresses?.shipping_address?.address_2}</p>
              <p>{userAddresses?.shipping_address?.postal_code}</p>
              <p>{userAddresses?.shipping_address?.city} {userAddresses?.shipping_address?.state}</p>
            </div>
          </div>
        </div>
      </div>

      <div className={`address-edit-modal ${isEditTrue ? 'show-address-edit-modal' : ''}`}>
        <div className='address-edit-modal-content'>
          <div className='address-edit-modal-head'>
            <h3 className='address-edit-main-heading'>{modalType === 'billing-address' ? 'Billing Address Update' : 'Shipping Address Update'}</h3>
            <button className='address-edit-modal-close-button' onClick={handleEditShippingClose}>
              <img src={crossBtn} alt='cross btn' />
            </button>
          </div>
          <div className='address-edit-modal-body'>

            <div className='two-inputs-row'>
              <label className='label-with-input'>
                First Name
                <input
                  className='input-with-label'
                  type='text'
                  placeholder='First Name'
                  name='first_name'
                  value={
                    modalType === 'billing-address'
                      ? billingPayload?.billingAddress?.first_name
                      : shippingPayload?.shippingAddress?.first_name
                  }
                  onChange={handleInputData}
                />
              </label>
              <label className='label-with-input'>
                Last Name
                <input
                  className='input-with-label'
                  type='text'
                  placeholder='Last Name'
                  name='last_name'
                  value={modalType === 'billing-address'
                    ? billingPayload?.billingAddress?.last_name
                    : shippingPayload?.shippingAddress?.last_name
                  }
                  onChange={handleInputData}
                />
              </label>
            </div>

            {/* <div className='double-address'>
              <label className='label-with-input'>
                Email
                <input
                  className='input-with-label'
                  type='text'
                  placeholder='Email'
                  name='email'
                  value={modalType === 'billing-address'
                    ? billingPayload?.billingAddress?.email
                    : shippingPayload?.shippingAddress?.email
                  }
                  onChange={handleInputData}
                />
              </label>
            </div> */}

            <div className='country-indication'>
              <p className='country-region'>Country/Region</p>
              <h3 className='only-country'>United States (USA)</h3>
            </div>

            <div className='double-address'>
              <label className='label-with-input'>
                Street Address
                <input
                  className='input-with-label'
                  type='text'
                  placeholder='House number & Street number'
                  name='address_1'
                  value={modalType === 'billing-address'
                    ? billingPayload?.billingAddress?.address_1
                    : shippingPayload?.shippingAddress?.address_1
                  }
                  onChange={handleInputData}
                />
              </label>
              <input className='input-with-label' type='text' placeholder='Apartment, suite, unit etc' />
            </div>

            <div className='zip_city_state_input_container'>
              <label className='label-with-input'>
                Zip Code
                <input
                  className='input-with-label'
                  type='text'
                  placeholder='123123'
                  name='postal_code'
                  value={modalType === 'billing-address'
                    ? billingPayload?.billingAddress?.postal_code
                    : shippingPayload?.shippingAddress?.postal_code
                  }
                  onChange={handleInputData}
                />
              </label>
              <label className='label-with-input'>
                Towt/City
                <input
                  className='input-with-label'
                  type='text'
                  placeholder='New York'
                  name='city'
                  value={modalType === 'billing-address'
                    ? billingPayload?.billingAddress?.city
                    : shippingPayload?.shippingAddress?.city
                  }
                  onChange={handleInputData}
                />
              </label>
              <label className='label-with-input'>
                State
                <input
                  className='input-with-label'
                  type='text'
                  placeholder='Pennsylvenian'
                  name='state'
                  value={modalType === 'billing-address'
                    ? billingPayload?.billingAddress?.state
                    : shippingPayload?.shippingAddress?.state
                  }
                  onChange={handleInputData}
                />
              </label>
            </div>

            <div className='update-address-div'>
              <button className='update-address-button' onClick={handleUpdateAddress}>
                Update Address
              </button>
            </div>
          </div>
        </div>
      </div>

    </div>
  )
}

export default AddressesTab
