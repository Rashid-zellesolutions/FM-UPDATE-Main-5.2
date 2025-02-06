import React, { useState, useImperativeHandle, forwardRef, useEffect } from 'react'
import './DeliveryInfo.css';
import { Link, useNavigate } from 'react-router-dom';
import { url } from '../../../../utils/api';
import { useMyOrders } from '../../../../context/orderContext/ordersContext';

const DeliveryInfo = forwardRef((props, ref) => {


    // const [deliveryInfo, setDeliveryInfo] = useState({
    //     name: '',
    //     address: '',
    //     address2: '',
    //     city: '',
    //     state: '',
    //     zipCode: '',
    //     phone: ''
    // })

    // const [tokenValid, setTokenValid] = useState(true)
    // const [userAddress, setUserAddress] = useState({})



    // const verifyToken = async () => {
    //     const token = localStorage.getItem('userToken');
    //     try {
    //         const response = await fetch(`${url}/api/v1/web-users/verify-token`, {
    //             method: 'GET',
    //             headers: {
    //                 authorization: `${token}`
    //             }
    //         })
    //         if (response.ok) {
    //             const userId = localStorage.getItem('uuid')
    //             try {
    //                 const userResponse = await fetch(`${url}/api/v1/web-users/get/${userId}`, {
    //                     method: 'GET',
    //                     headers: {
    //                         authorization: `${token}`
    //                     }
    //                 });
    //                 if (userResponse.ok) {
    //                     const data = await userResponse.json();
    //                     setUserAddress(data.data.billing_address);
    //                 }
    //             } catch (error) {

    //             }
    //             setTokenValid(true);
    //         } else {
    //             localStorage.removeItem('userToken')
    //             setTokenValid(false);
    //         }
    //     } catch (error) {
    //         console.error("server error")
    //     }
    // }

    // useEffect(() => {
    //     verifyToken()
    // }, [])

    // useEffect(() => { }, [userAddress])

    // const [isCheckedAddress, setIsCheckedAddress] = useState(false);
    // const handleSelectAddress = () => {
    //     setIsCheckedAddress(!isCheckedAddress)
    // }


    // // const [userZip, setUserZip] = useState()
    // const getZipAndState = (zip) => {

    //     let locationData;
    //     if (zip) {
    //         locationData = JSON.parse(zip)
    //         setOrderPayload((prevPayload) => ({
    //             ...prevPayload,
    //             billing: {
    //                 ...prevPayload.billing,
    //                 city: locationData?.locationData?.city,
    //                 postal_code: locationData?.locationData?.zipCode,
    //                 state: locationData?.locationData?.state,
    //             }
    //         }))
    //     } else {
    //     }
    // }


    // useEffect(() => {
    //     const zipCode = localStorage.getItem('other_info');
    //     getZipAndState(zipCode)
    // }, [])

    // const fillBillingAddress = () => {

    //     setOrderPayload((prevPayload) => ({
    //         ...prevPayload,
    //         billing: {
    //             ...prevPayload.billing,
    //             first_name: userAddress?.first_name,
    //             last_name: userAddress?.last_name,
    //             email: userAddress?.email,
    //             phone: userAddress?.phone,
    //             address_1: userAddress?.address_1,
    //             country: 'USA',
    //         }
    //     }))

    //     // setMyAddressPopup(false)
    // }

    // const checkEmptyOrNot = () => {
    //     return orderPayload?.billing?.first_name !== '' &&
    //         orderPayload.billing?.last_name !== '' &&
    //         orderPayload.billing?.email !== '' &&
    //         orderPayload.billing?.phone !== '' &&
    //         orderPayload.billing?.address_1 !== '' ? true : false
    // }

    // const clearFields = () => {
    //     setOrderPayload((prevPayload) => ({
    //         ...prevPayload,
    //         billing: {
    //             first_name: '',
    //             last_name: '',
    //             email: '',
    //             phone: '',
    //             address_1: '',
    //         }
    //     }))
    // }



    // const clearBtnVisible = checkEmptyOrNot()

    // if (loading) {
    //     return <div>Loading....</div>
    // }





    // const handleDeliveryInfo = (e) => {
    //     const { name, value } = e.target;

    //     if (name === 'zipCode') {
    //         if (/^\d{0,5}$/.test(value)) {
    //             setDeliveryInfo((prevInfo) => ({
    //                 ...prevInfo,
    //                 [name]: value
    //             }))
    //         }
    //     } else if (name === 'phone') {
    //         let cleaned = value.replace(/\D/g, "");

    //         if (cleaned.length < 3) {
    //             cleaned = cleaned;
    //         } else if (cleaned.length < 6) {
    //             cleaned = `${cleaned.slice(0, 3)}-${cleaned.slice(3)}`;
    //         } else {
    //             cleaned = `${cleaned.slice(0, 3)}-${cleaned.slice(3, 6)}-${cleaned.slice(6, 10)}`
    //         }

    //         setDeliveryInfo((prevInfo) => ({
    //             ...prevInfo,
    //             [name]: cleaned
    //         }))

    //     } else {
    //         setDeliveryInfo((prevInfo) => ({
    //             ...prevInfo,
    //             [name]: value
    //         }))
    //     }


    // }




    // const handleSubmitDeliveryInfo = () => {
    //     let newErrors = {};

    //     Object.keys(deliveryInfo).forEach((field) => {
    //         // Skip validation for address2 since it's optional
    //         if (field === 'address2') return;

    //         if (!deliveryInfo[field].trim()) {
    //             newErrors[field] = `${field.charAt(0).toUpperCase() + field.slice(1)} is Required`;
    //         }
    //     });

    //     if (Object.keys(newErrors).length > 0) {
    //         setError((prev) => ({ ...prev, ...newErrors }));
    //         console.log("Errors found: ", newErrors);
    //         return false
    //     }

    //     setError({});
    //     props.onSubmit();
    //     return true;
    // }

    // useImperativeHandle(ref, () => ({
    //     validateAndSubmit: handleSubmitDeliveryInfo,
    // }));



    const navigate = useNavigate()

    const [focusedField, setFocusedField] = useState("");
    const [email, setEmail] = useState("");

    const {
        orderPayload,
        emptyField,
        setEmptyField,
        handleNestedValueChange,
        setOrderPayload,
        handleNestedValueChangeShipping,
        loading,
        handleClickTop,
        handleTabOpen
    } = useMyOrders();

    const [error, setError] = useState({
        email: '',
        first_name: '',
        last_name: '',
        address_1: '',
        city: '',
        state: '',
        postal_code: '',
        phone: ''
    })

    const validateEmail = (email) => {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    };

    const handleNavigateToSignup = () => {
        if (!email.trim()) {
            setError((prev) => ({ ...prev, email: 'Email is required' }));
            return;
        }
        if (!validateEmail(email)) {
            setError((prev) => ({ ...prev, email: 'Invalid email format' }));
            return;
        }
        setError((prev) => ({ ...prev, email: '' }));
        navigate('/my-account');
    }


    const handleSubmitDeliveryInfo = () => {
        let newErrors = {};

        Object.keys(orderPayload?.billing).forEach((field) => {
            // Skip validation for address2 since it's optional
            if (field === 'address2') return;

            if (!orderPayload?.billing?.[field]?.trim()) {
                newErrors[field] = `${field.charAt(0).toUpperCase() + field.slice(1)} is Required`;
            }
        });

        if (Object.keys(newErrors).length > 0) {
            setError((prev) => ({ ...prev, ...newErrors }));
            console.log("Errors found: ", newErrors);
            return false
        }

        setError({});
        console.log("order payload", orderPayload)
        props.onSubmit();
        return true;
    }

    useImperativeHandle(ref, () => ({
        validateAndSubmit: handleSubmitDeliveryInfo,
    }));


    return (
        <div className='delivery-form-main-container'>
            <p>All Fields Required Unless indicated Optional </p>

            <div className='delivery-form-signup-container'>
                <h3>Your Information</h3>
                <div className={`input-container ${focusedField === 'email' || email ? "focused" : ""}`}>
                    <label className="floating-label">
                        {error.email ? <span className="error-message">{error.email}</span> : 'Email'}
                    </label>
                    <input
                        type="text"
                        className="input-field-email"
                        onFocus={() => setFocusedField("email")}
                        onBlur={() => setFocusedField("")}
                        onChange={(e) => setEmail(e.target.value)}
                        value={email}
                    />

                </div>
                <span>Already have an account <p onClick={handleNavigateToSignup}>SIGN IN</p></span>
                <p>You Can Create an Account After Checkout.</p>
            </div>

            <div className='delivery-info-input-main-container'>
                <h3>Delivery Information</h3>

                <div className='delivery-info-input-first-and-last-name'>

                    <div className={`delivery-input-container ${focusedField === 'first_name' || orderPayload.billing?.first_name ? "focused" : ""}`}>
                        <label className="floating-label">
                            {error.name ? <span className='error-message'>{error.name}</span> : 'First Name'}
                        </label>
                        <input
                            type="text"
                            className="input-field-email"
                            onFocus={() => setFocusedField("name")}
                            onBlur={() => setFocusedField("")}
                            name='first_name'
                            value={orderPayload.billing?.first_name}
                            onChange={handleNestedValueChange}
                        />
                    </div>

                    <div className={`delivery-input-container ${focusedField === 'last_name' || orderPayload.billing?.last_name ? "focused" : ""}`}>
                        <label className="floating-label">
                            {error.last_name ? <span className='error-message'>{error.last_name}</span> : 'Last Name'}
                        </label>
                        <input
                            type="text"
                            className="input-field-email"
                            onFocus={() => setFocusedField("last_name")}
                            onBlur={() => setFocusedField("")}
                            onChange={handleNestedValueChange}
                            name='last_name'
                            value={orderPayload.billing?.last_name}
                        />
                    </div>
                </div>

                {/* <div className={`delivery-input-container ${focusedField === 'name' || deliveryInfo.name ? "focused" : ""}`}>
                    <label className="floating-label">
                        {error.name ? <span className='error-message'>{error.name}</span> : 'Name'}
                    </label>
                    <input
                        type="text"
                        className="input-field-email"
                        onFocus={() => setFocusedField("name")}
                        onBlur={() => setFocusedField("")}
                        onChange={handleNestedValueChange}
                        name='name'
                        value={deliveryInfo.name}
                    />
                </div> */}

                <div className={`delivery-input-container ${focusedField === 'address_1' || orderPayload.billing?.address_1 ? "focused" : ""}`}>
                    <label className="floating-label">
                        {error.address_1 ? <span className='error-message'>{error.address_1}</span> : 'Address'}
                    </label>
                    <input
                        type="text"
                        className="input-field-email"
                        onFocus={() => setFocusedField("address_1")}
                        onBlur={() => setFocusedField()}
                        name='address_1'
                        onChange={handleNestedValueChange}
                        value={orderPayload.billing?.address_1}
                    />
                </div>

                <div className={`delivery-input-container ${focusedField === 'address2' || orderPayload.billing?.address2 ? "focused" : ""}`}>
                    <label className="floating-label">Apt, Suite, Building, (Optional)</label>
                    <input
                        type="text"
                        className="input-field-email"
                        onFocus={() => setFocusedField("address2")}
                        onBlur={() => setFocusedField("")}
                        name='address2'
                        value={orderPayload.billing?.address2}
                        onChange={handleNestedValueChange}
                    />
                </div>

                <div className='delivery-options-city-and-state'>

                    <div className={`delivery-input-container ${focusedField === 'city' || orderPayload.billing?.city ? "focused" : ""}`}>
                        <label className="floating-label">
                            {error.city ? <span className='error-message'>{error.city}</span> : 'City'}
                        </label>
                        <input
                            type="text"
                            className="input-field-email"
                            onFocus={() => setFocusedField('city')}
                            onBlur={() => setFocusedField("")}
                            name='city'
                            value={orderPayload.billing?.city}
                            onChange={handleNestedValueChange}
                        />
                    </div>

                    <div className={`delivery-input-container ${focusedField === 'state' || orderPayload.billing?.state ? "focused" : ""}`}>
                        <label className="floating-label">
                            {error.state ? <span className='error-message'>{error.state}</span> : 'State'}
                        </label>
                        <input
                            type="text"
                            className="input-field-email"
                            onFocus={() => setFocusedField("state")}
                            onBlur={() => setFocusedField("")}
                            name='state'
                            value={orderPayload.billing?.state}
                            onChange={handleNestedValueChange}
                        />
                    </div>

                </div>

                <div className='delivery-zip-and-phone'>

                    <div className={`delivery-input-container ${focusedField === 'postal_code' || orderPayload.billing?.postal_code ? "focused" : ""}`}>
                        <label className="floating-label">
                            {error.postal_code ? <span className='error-message'>{error.postal_code}</span> : 'Zip Code'}
                        </label>
                        <input
                            type="text"
                            className="input-field-email"
                            onFocus={() => setFocusedField('postal_code')}
                            onBlur={() => setFocusedField("")}
                            name='postal_code'
                            value={orderPayload.billing?.postal_code}
                            onChange={handleNestedValueChange}
                            maxLength={5}
                        />
                    </div>

                    <div className={`delivery-input-container ${focusedField === 'phone' || orderPayload.billing?.phone ? "focused" : ""}`}>
                        <label className="floating-label">
                            {error.phone ? <span className='error-message'>{error.phone}</span> : 'Phone'}
                        </label>
                        <input
                            type="text"
                            className="input-field-email"
                            onFocus={() => setFocusedField("phone")}
                            onBlur={() => setFocusedField("")}
                            name='phone'
                            value={orderPayload.billing?.phone}
                            onChange={handleNestedValueChange}
                        />
                    </div>

                </div>
            </div>

        </div>
    )
})

export default DeliveryInfo
