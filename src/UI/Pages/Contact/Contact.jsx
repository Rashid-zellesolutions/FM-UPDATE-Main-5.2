import React, { useEffect, useState } from 'react'
import './Contact.css'
import telephoneIcon from '../../../Assets/icons/telephone-reciever-icon.png';
import costumerCareIcon from '../../../Assets/icons/costumer-care.png';
import onlineSupport from '../../../Assets/icons/online-support.png';
import billingQueryIcon from '../../../Assets/icons/billing-queries.png';
import warrantyIcon from '../../../Assets/icons/warranty-assurance.png';
import makePaymentIcon from '../../../Assets/icons/make-payment.png';
import faqIcon from '../../../Assets/icons/faq.png';
import sendIcon from '../../../Assets/icons/send.png'
import { BsSend } from "react-icons/bs";
import { iteratee } from 'lodash';
import axios from 'axios';
import { formatPhoneNumber, url } from '../../../utils/api';
import Loader from '../../Components/Loader/Loader';

const Contact = () => {

    const [loading, setLoading] = useState(false)
    const servicesDetail = [
        {
            img: costumerCareIcon,
            name: 'Customer Care',
            slogan: 'Our customer care team is available to assist your needs',
            timing: 'Monday - Sunday: 8am - 6pm'
        },
        {
            img: onlineSupport,
            name: 'Online Shopping Assistance',
            slogan: 'Need help with online shopping? Our phones now open until Midnight',
            timng: 'Monday – Sunday: 8am – Midnight',
        },
        {
            img: billingQueryIcon,
            name: 'Billing Questions',
            slogan: 'Have questions about financing or paying bills? We are here to help via phone or web page Pay your bills',
            timing: 'Monday – Sunday: 8am – 6pm',
        },
        {
            img: warrantyIcon,
            name: 'Warranty Assistance',
            slogan: 'Have questions about financing or paying bills? We are here to help via phone or web page Pay your bills',
            timing: 'Monday – Sunday: 8am – 6pm'
        }
    ]

    const payAndFAQProcess = [
        { img: makePaymentIcon, name: 'Make a Payment', details: 'Now it is easier to make a payment online. Follow this page and it will provide guidance to achieve your goal!' },
        { img: faqIcon, name: `FAQ's`, details: 'Please check out our frequently asked questions page for additional information!' },
    ]

    const [contactForm, setContactForm] = useState({
        name: '',
        contactNo: '',
        email: '',
        zipcode: '',
        state: '',
        message: ''
    })



    const [error, setError] = useState({})

    const handleContactValue = (e) => {
        const { name, value } = e.target;
        setContactForm((prevData) => ({
            ...prevData,
            [name]: name === 'contactNo' ?formatPhoneNumber(value) : value
        }));

        setError((prevError) => ({
            ...prevError,
            [name]: ''
        }))
    }



    const handleZipCode = async (e) => {
        const zipCode = e.target.value;

        // Update contactForm with the entered ZIP code
        setContactForm((prevData) => ({
            ...prevData,
            zipcode: zipCode
        }));

        // Reset state if ZIP code is empty
        if (!zipCode) {
            setContactForm((prevData) => ({ ...prevData, state: "" }));
            return;
        }

        // Validate ZIP code (must be exactly 5 digits)
        if (!/^\d{5}$/.test(zipCode)) {
            setError((prevError) => ({ ...prevError, zipcode: true }));
            return;
        } else {
            setError((prevError) => ({ ...prevError, zipcode: false }));
        }

        // Fetch state information
        try {
            setLoading(true);
            const response = await fetch(`https://zip.getziptastic.com/v2/US/${zipCode}`);

            if (!response.ok) {
                throw new Error("ZIP code not found");
            }

            const result = await response.json();

            // Update state in the contact form
            setContactForm((prevData) => ({
                ...prevData,
                state: result.state || ""
            }));

            setError((prevError) => ({ ...prevError, state: false }));
        } catch (error) {
            console.error("Error fetching ZIP code data:", error);
            setError((prevError) => ({ ...prevError, state: true }));
        } finally {
            setLoading(false);
        }
    };

    const validateEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const handleSubmitContactInfo = async () => {
        const newError = {};
        Object.keys(contactForm).forEach((key) => {
            if (!contactForm[key].trim()) {
                newError[key] = 'This Field Is Required';
            }
        })

        // Email validation
        if (contactForm.email && !validateEmail(contactForm.email)) {
            newError.email = "Enter a valid email address";
        }

        if (Object.keys(newError).length > 0) {
            setError(newError);
            return;
        }

       

        const formatedContact = contactForm.contactNo.replace(/\D/g, "");

        const updatedForm = { ...contactForm, contactNo: formatedContact }

        setContactForm(updatedForm)

        console.log("Formated Contact", formatedContact);
        console.log("updated Form", updatedForm)
        console.log("payload before send", contactForm)

        const api = `/api/v1/contact/create`
        try {
            setLoading(true)
            const response = await axios.post(`${url}${api}`, updatedForm);
            console.log("Contact Response", response);
            if (response.status === 200 || response.status === 201) {
                alert("Your contact information has been submitted successfully!");
                setContactForm({
                    name: '',
                    contactNo: '',
                    email: '',
                    zipcode: '',
                    state: '',
                    message: ''
                });
            } else {
                throw new Error("Unexpected response from the server.");
                
            }
        } catch (error) {
            if (error.response) {
                // Server responded with a status other than 2xx
                console.error("Server Error:", error.response.data);
                alert(error.response.data.message || "Something went wrong. Please try again.");
            } else if (error.request) {
                // Request was made but no response received
                console.error("Network Error:", error.request);
                alert("Network error! Please check your internet connection.");
            } else {
                // Other unexpected errors
                console.error("Unexpected Error:", error.message);
                alert("An unexpected error occurred. Please try again later.");
            }
            setLoading(false)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => { console.log("Contact Details", contactForm) }, [contactForm])

    return (
        <div className='contact-us-main-container'>
            {loading && <Loader />}
            <div className='contact-us-head'>
                <h3 className='contact-us-main-heading'>Contact Us</h3>
                <div className='contact-para'>
                    <p>
                        Our team can answer any questions that you might have, to reach the desired department
                        please call the number and choose one of our extensions listed below.
                    </p>
                </div>
                <div className='contact-head-phone-number-sec'>
                    <img src={telephoneIcon} alt='telephone' />
                    <p><a href='tel:2153521600'>215 352 1600</a></p>
                </div>
            </div>

            <div className='contact-us-body'>

                <div className='contact-us-services'>
                    {servicesDetail.map((item, index) => (
                        <div className='contact-us-service-card'>
                            <img src={item.img} alt='costumer-care' className='costumer-care-service-icon' />
                            <div className='costumer-care-service-details'>
                                <h3>{item.name}</h3>
                                <p>{item.slogan}</p>
                                <p>{item.timing}</p>
                            </div>
                        </div>
                    ))}

                </div>

                <div className='contact-us-contact-form'>
                    <div className='contact-form-head'>
                        <h3>Didn't find what you're looking for?</h3>
                        <p>If it is after hours or you had another type of inquiry, please contact our care team with the mentioned form:</p>
                    </div>
                    <div className='contact-form-input'>
                        <div className='contact-form-combined-inputs'>
                            <label>
                                Name
                                <input
                                    type='text'
                                    placeholder={error.name ? 'Name is required' : 'Alex John'}
                                    name='name'
                                    value={contactForm.name}
                                    onChange={handleContactValue}
                                    style={{ borderColor: error.name ? 'red' : '#d7d7d7', color: error.name ? 'red' : '#595959' }}
                                />
                            </label>
                            <label>
                                Contact
                                <input
                                    type='text'
                                    placeholder={error.contactNo ? 'Contact is required' : '(090) 078-601'}
                                    name='contactNo'
                                    value={contactForm.contactNo}
                                    onChange={handleContactValue}
                                    maxLength={14}
                                    style={{ borderColor: error.contactNo ? 'red' : '#d7d7d7', color: error.contactNo ? 'red' : '#595959' }}
                                />
                            </label>
                        </div>
                        <label>
                            Email
                            <input
                                type='text'
                                placeholder={error.email ? 'Email is required' : 'example@gmail.com'}
                                name='email'
                                value={contactForm.email}
                                onChange={handleContactValue}
                                style={{ borderColor: error.email ? 'red' : '#d7d7d7', color: error.email ? 'red' : '#595959' }}
                            />
                        </label>
                        <div className='contact-form-combined-inputs'>
                            <label>
                                Zip Code
                                <input
                                    type='text'
                                    placeholder={error.zipcode ? 'Zip Code is required' : '10001'}
                                    name='zipcode'
                                    value={contactForm.zipcode}
                                    onChange={handleZipCode}
                                    style={{ borderColor: error.zipcode ? 'red' : '#d7d7d7', color: error.zipcode ? 'red' : '#595959' }}
                                />
                            </label>
                            <label>
                                State
                                <input
                                    type='text'
                                    placeholder={error.state ? 'State is required' : 'New York'}
                                    name='state'
                                    value={contactForm.state}
                                    onChange={handleContactValue}
                                    style={{ borderColor: error.state ? 'red' : '#d7d7d7', color: error.state ? 'red' : '#595959' }}
                                />
                            </label>
                        </div>
                        <label>
                            Your Message
                            <textarea
                                rows={4}
                                placeholder={error.message ? 'Message is required' : 'Write your message here'}
                                name='message'
                                value={contactForm.message}
                                onChange={handleContactValue}
                                style={{
                                    width: '100%',
                                    backgroundColor: '#FDFDFD',
                                    border: error.message ? '1px solid red' : '1px solid #d7d7d7',
                                    fontSize: '15px',
                                    lineHeight: '18px',
                                    fontWeight: '400',
                                    borderRadius: '5px',
                                    color: error.message ? 'red' : '#595959',
                                    padding: '8px 10px',
                                    outline: 'none',
                                    fontFamily: "inherit", // Uses the default (Poppins)
                                    "::placeholder": {
                                        fontSize: "15px",
                                        fontWeight: "500",
                                        lineHeight: "18px",
                                        color: "#A0A0A0", // Placeholder color (adjust as needed)
                                    },

                                }}
                            />
                        </label>
                    </div>
                    <div className='form-submit-button-div'>
                        <button onClick={handleSubmitContactInfo}>
                            {/* <img src={sendIcon} alt='send' /> */}
                            <BsSend size={20} className='send-file-icon' />
                            Send
                        </button>
                    </div>
                </div>

            </div>

            {/* <div className='contact-us-payment-and-FAQ'>
                {payAndFAQProcess.map((item, index) => (
                    <div className='contact-us-pay-and-faq-details'>
                        <img src={item.img} alt='make payment' />
                        <h3>{item.name}</h3>
                        <p>{item.details}</p>
                    </div>
                ))}
            </div> */}
        </div>
    )
}

export default Contact
