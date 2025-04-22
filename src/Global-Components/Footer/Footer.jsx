import React, { useEffect, useState } from 'react'
import './Footer.css';
import { Link } from 'react-router-dom';

import { useNavigate } from 'react-router-dom'

// Assets
import ownerTag from '../../Assets/Logo/owner-tag.png';
import facebook from '../../Assets/icons/facebook-white.png'
import tiktok from '../../Assets/icons/tiktok-white.png'
import insta from '../../Assets/icons/insta-white.png'
import youtube from '../../Assets/icons/youtube-white.png'
import location from '../../Assets/icons/location.png'
import call from '../../Assets/icons/call.png'
import calander from '../../Assets/icons/white-calander.png'
import mail from '../../Assets/icons/mail.png'
import checked_white from "../../Assets/checked_white.png"
import LoaderAnimation from "../../Assets/Loader-animations/loader-check-two.gif"
import { getCurrentDay, getCurrentTimeForNewYork, url } from '../../utils/api';
import RatingReview from '../../UI/Components/starRating/starRating';

// Components
import MobileFooter from '../TabAndMobileFooter/MobileFooter';
import FooterNav from './FooterNav/FooterNav';

// Functions and Utils
import axios from 'axios';
import { useGlobalContext } from '../../context/GlobalContext/globalContext';
import SnakBar from '../SnakeBar/SnakBar';

const Footer = ({ notLandingPage, checkoutPage }) => {
    const [headerData, setHeaderData] = useState([]);


    async function fetchHeaderPayloads() {
        try {
            const response = await fetch(`${url}/api/v1/header-payloads/get`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json", // Adjust headers as needed
                },
            });

            if (!response.ok) {
                throw new Error(`Error: ${response.status} ${response.statusText}`);
            }

            const data = await response.json();
            return data;
        } catch (error) {
            console.error("Error fetching data:", error.message);
            throw error;
        }
    }

    const navigate = useNavigate();

    const uid = localStorage.getItem('uuid');
    // const navigateToRoute = (link) => {
    //     if (link === '/user-dashboard/:uid') {
    //         navigate(`/user-dashboard/${uid}`);
    //     } else {
    //         navigate(link);
    //     }
    // };

    // State for email input and form submission status
    
    const [isSubscribed, setIsSubscribed] = useState(false);
    const [email, setEmail] = useState('');
    const [error, setError] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const { stores } = useGlobalContext()

    const validateEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    // Handle email input change
    const handleEmailChange = (e) => {
        setEmail(e.target.value);
        setError(''); // Reset error when the user types
    };

    const handleSubmit = async (e) => {
        e.preventDefault();  // Prevent the default form submission

        if (!email) {
            setError('Email is required');
            return;
        }
        if (!validateEmail(email)) {
            setError('Please enter a valid email address');
            return;
        }

        setIsSubmitting(true);
        try {
            // Send data to API
            const response = await axios.post(`${url}/api/v1/activate-scoop/add`, {
                email,
            });


            // Handle success
            if (response.status === 201) {
                setIsSubscribed(true);
            }
            else if (response.status === 409) {
                setError('Email already exists');
            }
            else {
                setError(response.data.message || 'Something went wrong');
            }
        } catch (error) {
            // Handle error
            console.error('Error signing up:', error);

            // Check if the error is due to the API response or a network issue
            if (error.response) {
                // If the error has a response (API returned an error)
                setError(error.response.data.message || 'Something went wrong, please try again later.');
            } else {
                // If there was a network error or no response
                setError('Network error, please try again later.');
            }
        } finally {
            setIsSubmitting(false);
        }
    };

    const [googleRating, setGoogleRating] = useState(null);

    const fetchGoogleRating = async () => {
        const api = `${url}/api/v1/stores/get-top-rated`;

        try {
            let response;
            response = await axios.get(api);
            const stores = response.data.data;
            setGoogleRating(stores)
        } catch (error) {
            console.error("Error fetching stores data", error);
        }
    };

    useEffect(() => {
        fetchGoogleRating();
    }, [])

    useEffect(() => {
        fetchHeaderPayloads().then(data => {
            setHeaderData(data.data[0].categories);
            console.log(data.data[0].categories, "here us footer")
        }).catch(error => {
            console.error(error);
        });
    }, [])

    const socialIcons = [
        { name: 'facebook', icon: facebook, link: 'https://www.facebook.com/myfurnituremecca' },
        { name: 'tiktok', icon: tiktok, link: 'https://www.tiktok.com/@myfurnituremecca?_t=8gcQvVGSaGI&_r=1' },
        { name: 'youtube', icon: youtube, link: 'https://www.youtube.com/@FurnitureMecca1' },
        { name: 'insta', icon: insta, link: 'https://www.instagram.com/myfurnituremecca/?igshid=MzRlODBiNWFlZA%3D%3D' }
    ]

    const locationPhoneMail = [
        { name: stores?.[0]?.city || 'Philadelphia', icon: location, link: '#' },
        { name: '215 352 1600', icon: call, link: '#' },
        { name: 'meccacustomercare@gmail.com', icon: mail, link: '#' }
    ]

    const footerCustomerCareAndAbout = [
        {
            heading: 'Customer Care', navLinks: [
                { name: 'Contact Us', link: '/contact-us' },
                { name: 'Financing', link: '/financing' },
                { name: 'Shipping & Delivery', link: '/shipping-and-delivery' },
                { name: 'Terms & Conditions', link: '/terms-and-conditions' },
                { name: 'Return Policy', link: '/return-policy' },
            ]
        },
        {
            heading: 'About Furniture Mecca', navLinks: [
                { name: 'About Us', link: '/about-us' },
                { name: 'Career', link: '/careers' },
                { name: 'Store Locations', link: '/store-locator' },
                { name: 'My Account', link: '/user-dashboard' },
                { name: 'Blogs', link: '/blogs' },
            ]
        },
    ]

    const findDefaultStore = () => {
        const defaultStore = stores.find(store => store.postal_code === '19134')
        return defaultStore;
    }

    const defaultStore = findDefaultStore()

    const today = new Date().toLocaleDateString('en-US', { weekday: 'long' });

    // Find matching day object
    const todayTiming = stores?.[0]?.timings.find(item => item.day === today);

    const currentDay = getCurrentDay(getCurrentTimeForNewYork(), 'en-us')
    const defaultStoreTimings = defaultStore?.timings?.find(day => day.day === currentDay);
    console.log("Default timings from footer ", defaultStoreTimings)

    const nearStoreDetails = [
        {
            icon: location,
            details: stores?.[0]?.name ?? defaultStore?.name
        },
        {
            icon: call,
            details: stores?.[0]?.phone ?? defaultStore?.phone

        },
        {
            icon: calander,
            details: todayTiming?.time ?? defaultStoreTimings?.time
        },
    ]

    const handleNavigateStores = () => {
        navigate(`/store-locator`, { state: defaultStore })
    }

    const [snakeBarMessage, setSnakeBarMessage] = useState('');
    const [showSnakeBar, setShowSnakeBar] = useState(false)

    const handleSnakeBarOpen = (message) => {
        setShowSnakeBar(true);
        setSnakeBarMessage(message)
    }

    const handleCloseSnakeBar = () => {
        setShowSnakeBar(false);
    }


    const handleClick = () => {
        if (defaultStore?.latitude && defaultStore?.longitude) {
            // Construct the Google Maps URL with the latitude and longitude
            const googleMapsUrl = `https://www.google.com/maps?q=${defaultStore?.latitude},${defaultStore?.longitude}`;
            // Open the URL in a new tab
            window.open(googleMapsUrl, "_blank");
        } else {
            handleSnakeBarOpen("Latitude and Longitude are not available.");
        }
    };

    return (
        <>
            <div className={`footer-main-container ${checkoutPage ? 'hide-whole-footer' : ''}`}>
                <div className='footer-nav'>
                    {headerData && headerData?.map((items, index) => {
                        return <div key={index} className='footer-nav-links'>
                            <h3 className='footer-nav-link-heading'>{items?.category}</h3>
                            {items?.subCategories.map((item, innerIndex) => {
                                return <FooterNav key={innerIndex} link={`/${items?.category_slug}/${item?.slug}`} linkName={item.name} />
                            })}
                        </div>
                    })}
                </div>
                <div
                    className='footer-second-contant-section'>
                    <div className='footer-left-section'>
                        <div className='left-section-contact'>
                            <div className='left-section-social-icons-div'>
                                {socialIcons.map((items, index) => (
                                    <a key={index} href={items.link}>
                                        <img src={items.icon} alt='icon' />
                                    </a>
                                ))}
                            </div>
                            {googleRating && <div className='footer-owner-tag'>
                                <img src={ownerTag} alt='owner tag' />
                                <div className='owner-tag-info'>
                                    <p className='owner-tag-name'>FURNITURE MECCA</p>
                                    
                                    <RatingReview rating={googleRating?.rating} disabled={true} bgColor={"#FFD700"} size={"20px"} />
                                    <p className='owner-tag-review'>{googleRating?.number_of_reviews} Google Reviews</p>
                                </div>
                            </div>}

                            <div className='footer-left-contact-section'>
                                {locationPhoneMail.map((item, index) => (
                                    <span key={index}>
                                        <img src={item.icon} alt='icon' />
                                        <p>{item.name === '215 352 1600' ? <a href='tel:2153521600'>{item.name}</a> : item.name}</p>
                                    </span>
                                ))}
                            </div>

                            <div style={{ marginTop: "30px" }} className={`footer-right-get-scoop ${notLandingPage ? '' : ''}`}>
                                <h3>Get The Scoop</h3>
                                {!isSubscribed ? <form style={{ width: "100%" }} onSubmit={handleSubmit}>
                                    <div className='footer-get-scoop-and-conditions'>
                                        <div className='footer-get-scoop-input-search'>
                                            <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start", justifyContent: "flex-start" }}>
                                                <input type='text'
                                                    placeholder='Email Address'
                                                    value={email}
                                                    onChange={handleEmailChange} />
                                                {error && <p style={{ color: 'red', fontSize: "13px", margin: "10px 0 0 0 ", padding: "0", lineHeight: "10px" }}>{error}</p>}
                                            </div>
                                            {isSubmitting ? <img className='scoop_loader' src={LoaderAnimation} alt="" /> : <button type='submit' disabled={isSubmitting}>
                                                Sign me up
                                            </button>}
                                        </div>
                                        <p>By signing up, you agree to our <Link to={'/privacy-policy'}> Privacy Policy </Link>  and  <Link to={'/terms-and-conditions'}>Terms of Use.</Link> </p>
                                    </div>
                                </form>
                                    :
                                    <div className="subscribtion_done_1">
                                        <img src={checked_white} />
                                        <p className=''>Your Subscription Has Been Done Successfully.</p>
                                    </div>}
                            </div>
                        </div>

                        <div className='left-section-location-section'>
                            <h3 className='footer-location-section'>Nearest Store</h3>
                            <div className='near-store-containt-section'>
                                <div className='near-store-image-div'>
                                    <img src={`${url}${stores?.[0]?.images?.[0]?.image_url ?? defaultStore?.images?.[0]?.image_url}`} alt='near store' />
                                </div>
                                <div className='near-store-details-section'>
                                    {nearStoreDetails.map((item, index) => (
                                        <span key={index}>
                                            <img src={item.icon} alt="icon" />
                                            {item.icon === call ? (
                                                <a className='footer-near-store-tel' href={`tel:${item.details}`}>{item.details}</a>
                                            ) : (
                                                <p>{item.details}</p>
                                            )}
                                        </span>
                                    ))}
                                    <div className='appointment-and-outlet-div'>
                                        <span>
                                            <p onClick={handleNavigateStores}>Outlet</p>
                                        </span>
                                        <Link to={'#'}>
                                            <p onClick={handleClick}>Directions</p>
                                        </Link>
                                        <Link to={'/book-an-appointment'}>
                                            <p>Book an Appointment</p>
                                        </Link>
                                    </div>
                                </div>

                            </div>
                        </div>

                    </div>
                    <div className='footer-right-section'>
                        

                        <div className='right-section-care-and-about'>
                            {footerCustomerCareAndAbout.map((item, index) => (
                                <div key={index} className='footer-costumer-care-and-about'>
                                    <h3>{item.heading}</h3>
                                    {item.navLinks.map((navItem, inn) => (
                                        <Link to={navItem.link} key={inn} className='about-and-care-link'>
                                            {navItem.name}
                                        </Link>
                                    ))}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
                <div className='footer-rights-reserved-container'>
                    <p>2020 - 2025 Furniture Mecca. All Rights Reserved</p>
                    <p>
                        <Link target='_blank' to={'https://zellesolutions.com/'}>Designed & Managed By Zelle Solutions</Link>
                    </p>
                </div>
            </div>
            <div className='mobile-view-footer-main-div'>
                <MobileFooter checkoutPage={checkoutPage} />
            </div>

            <SnakBar
                message={snakeBarMessage}
                openSnakeBarProp={showSnakeBar}
                setOpenSnakeBar={setShowSnakeBar}
                onClick={handleCloseSnakeBar}
            />
        </>
    )
}

export default Footer
