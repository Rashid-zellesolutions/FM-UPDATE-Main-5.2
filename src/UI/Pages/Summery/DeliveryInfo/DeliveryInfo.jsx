import React, { useState, useImperativeHandle, forwardRef } from 'react'
import './DeliveryInfo.css';
import { Link, useNavigate } from 'react-router-dom';

const DeliveryInfo = forwardRef((props, ref) => {

    const navigate = useNavigate()

    const [focusedField, setFocusedField] = useState("");
    const [email, setEmail] = useState("");
    const [deliveryInfo, setDeliveryInfo] = useState({
        name: '',
        address: '',
        address2: '',
        city: '',
        state: '',
        zipCode: '',
        phone: ''
    })

    const [blankEmail, setBlankEmail] = useState({
        email: ''
    })

    const [error, setError] = useState({
        email: '',
        name: '',
        address: '',
        city: '',
        state: '',
        zipCode: '',
        phone: ''
    })

    const handleDeliveryInfo = (e) => {
        const { name, value } = e.target;
        setDeliveryInfo((prevInfo) => ({
            ...prevInfo,
            [name]: value
        }))
        console.log("delivery info", deliveryInfo)
    }


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

        console.log("Delivery Info before validation: ", deliveryInfo);

        // Object.keys(deliveryInfo).forEach((field) => {
        //     if(!deliveryInfo[field].trim()){
        //         newErrors[field] = `${field.charAt(0).toUpperCase() + field.slice(1)} is Required`
        //     }
        // })


        Object.keys(deliveryInfo).forEach((field) => {
            // Skip validation for address2 since it's optional
            if (field === 'address2') return;

            if (!deliveryInfo[field].trim()) {
                newErrors[field] = `${field.charAt(0).toUpperCase() + field.slice(1)} is Required`;
            }
        });

        if (Object.keys(newErrors).length > 0) {
            setError((prev) => ({ ...prev, ...newErrors }));
            console.log("Errors found: ", newErrors);
            return false
        }

        setError({});
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

                <div className={`delivery-input-container ${focusedField === 'name' || deliveryInfo.name ? "focused" : ""}`}>
                    <label className="floating-label">
                        {error.name ? <span className='error-message'>{error.name}</span> : 'Name'}
                    </label>
                    <input
                        type="text"
                        className="input-field-email"
                        onFocus={() => setFocusedField("name")}
                        onBlur={() => setFocusedField("")}
                        onChange={handleDeliveryInfo}
                        name='name'
                        value={deliveryInfo.name}
                    />
                </div>

                <div className={`delivery-input-container ${focusedField === 'address' || deliveryInfo.address ? "focused" : ""}`}>
                    <label className="floating-label">
                        {error.address ? <span className='error-message'>{error.address}</span> : 'Address'}
                    </label>
                    <input
                        type="text"
                        className="input-field-email"
                        onFocus={() => setFocusedField("address")}
                        onBlur={() => setFocusedField()}
                        name='address'
                        onChange={handleDeliveryInfo}
                        value={deliveryInfo.address}
                    />
                </div>

                <div className={`delivery-input-container ${focusedField === 'address2' || deliveryInfo.address2 ? "focused" : ""}`}>
                    <label className="floating-label">Apt, Suite, Building, (Optional)</label>
                    <input
                        type="text"
                        className="input-field-email"
                        onFocus={() => setFocusedField("address2")}
                        onBlur={() => setFocusedField("")}
                        name='address2'
                        value={deliveryInfo.address2}
                        onChange={handleDeliveryInfo}
                    />
                </div>

                <div className='delivery-options-city-and-state'>

                    <div className={`delivery-input-container ${focusedField === 'city' || deliveryInfo.city ? "focused" : ""}`}>
                        <label className="floating-label">
                            {error.city ? <span className='error-message'>{error.city}</span> : 'City'}
                        </label>
                        <input
                            type="text"
                            className="input-field-email"
                            onFocus={() => setFocusedField('city')}
                            onBlur={() => setFocusedField("")}
                            name='city'
                            value={deliveryInfo.city}
                            onChange={handleDeliveryInfo}
                        />
                    </div>

                    <div className={`delivery-input-container ${focusedField === 'state' || deliveryInfo.state ? "focused" : ""}`}>
                        <label className="floating-label">
                            {error.state ? <span className='error-message'>{error.state}</span> : 'State'}
                        </label>
                        <input
                            type="text"
                            className="input-field-email"
                            onFocus={() => setFocusedField("state")}
                            onBlur={() => setFocusedField("")}
                            name='state'
                            value={deliveryInfo.state}
                            onChange={handleDeliveryInfo}
                        />
                    </div>

                </div>

                <div className='delivery-zip-and-phone'>

                    <div className={`delivery-input-container ${focusedField === 'zipCode' || deliveryInfo.zipCode ? "focused" : ""}`}>
                        <label className="floating-label">
                            {error.zipCode ? <span className='error-message'>{error.zipCode}</span> : 'Zip Code'}
                        </label>
                        <input
                            type="text"
                            className="input-field-email"
                            onFocus={() => setFocusedField('zipCode')}
                            onBlur={() => setFocusedField("")}
                            name='zipCode'
                            value={deliveryInfo.zipCode}
                            onChange={handleDeliveryInfo}
                        />
                    </div>

                    <div className={`delivery-input-container ${focusedField === 'phone' || deliveryInfo.phone ? "focused" : ""}`}>
                        <label className="floating-label">
                            {error.phone ? <span className='error-message'>{error.phone}</span> : 'Phone'}
                        </label>
                        <input
                            type="text"
                            className="input-field-email"
                            onFocus={() => setFocusedField("phone")}
                            onBlur={() => setFocusedField("")}
                            name='phone'
                            value={deliveryInfo.phone}
                            onChange={handleDeliveryInfo}
                        />
                    </div>

                </div>
            </div>

        </div>
    )
})

export default DeliveryInfo
