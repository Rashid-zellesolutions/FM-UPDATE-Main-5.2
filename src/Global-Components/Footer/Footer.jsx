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
import clock from '../../Assets/icons/white-clock.png'
import calander from '../../Assets/icons/white-calander.png'
import mail from '../../Assets/icons/mail.png'
import checked_white from "../../Assets/checked_white.png"
import LoaderAnimation from "../../Assets/Loader-animations/loader-check-two.gif"
import { getCurrentDay, getCurrentTimeForNewYork, url } from '../../utils/api';
import RatingReview from '../../UI/Components/starRating/starRating';


import { IoLocationOutline } from "react-icons/io5";

// Components
import MobileFooter from '../TabAndMobileFooter/MobileFooter';
import FooterNav from './FooterNav/FooterNav';

// Functions and Utils
import axios from 'axios';
import { useGlobalContext } from '../../context/GlobalContext/globalContext';

const Footer = ({ notLandingPage, checkoutPage }) => {

    const navigate = useNavigate();

    const uid = localStorage.getItem('uuid');
    const navigateToRoute = (link) => {
        if (link === '/user-dashboard/:uid') {
            navigate(`/user-dashboard/${uid}`);
        } else {
            navigate(link);
        }
    };

    // State for email input and form submission status
    const [isSubscribed, setIsSubscribed] = useState(false);
    const [email, setEmail] = useState('');
    const [error, setError] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

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

            console.log(response);

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


    const footerNavLinks = [
        {
            heading: "Living Room", navItems: [
                { name: 'Living Room Sets', link: '/product-category/living-room/living-room-sets' },
                { name: 'Sofa & Lovaseat Sets', link: '/product-category/living-room/sofa-loveseat-sets' },
                { name: 'Sectionals', link: '/product-category/living-room/sectionals' },
                { name: 'Reclining Furniture', link: '/product-category/living-room/reclining-sets' },
                { name: 'Sofas', link: '/product-category/living-room/sofas' },
                { name: 'Sleeper Sofas', link: '/product-category/living-room/sleeper-sofas' },
                { name: 'LoveSeats', link: '/product-category/living-room/loveseats' },
                { name: 'Small Space Living Room', link: '/product-category/living-room/small-space-living-rooms' },
                { name: 'Outlets', link: '/product-category/living-room/living-room-outlet' },
            ]
        },
        {
            heading: "Bedroom", navItems: [
                { name: 'Bedroom Sets', link: '/product-category/bedroom/bedroom-sets' },
                { name: 'Beds & Headboards', link: '/product-category/bedroom/beds-headboards' },
                { name: 'Dresser & Mirror Set', link: '/product-category/bedroom/dresser-mirror-sets' },
                { name: 'Dressers', link: '/product-category/bedroom/dressers' },
                { name: 'Chests', link: '/product-category/bedroom/chests' },
                { name: 'NightStands', link: '/product-category/bedroom/nightstands' },
                { name: 'Mirrors', link: '/product-category/bedroom/mirrors' },
                { name: 'Twin Beds', link: '/product-category/bedroom/twin-beds' },
                { name: 'Quen Beds', link: '/product-category/bedroom/queen-beds-fm' },
                { name: 'Full Beds', link: '/product-category/bedroom/full-beds' },
                { name: 'King Beds', link: '/product-category/bedroom/king-beds' },
                { name: 'Small Spaces Bedrooms', link: '/product-category/bedroom/small-space-bedrooms' },
                { name: 'Outlets', link: '/product-category/bedroom/bedroom-outlet' },
            ]
        },
        {
            heading: "Dining Rooms", navItems: [
                { name: 'Dining Room Sets', link: '/product-category/dining-room/dining-room-sets' },
                { name: 'Pub Heights Dining Sets', link: '/product-category/dining-room/pub-heights-dining-sets' },
                { name: 'Dining Chairs & Benches', link: '/product-category/dining-room/dining-chairs-benches' },
                { name: 'Dining Tables', link: '/product-category/dining-room/dining-tables' },
                { name: 'Bar Stools', link: '/product-category/dining-room/bar-pub-stools' },
                { name: 'Servers, Buffets & China Cabinets', link: '/product-category/dining-room/servers-buffets-china-cabinets' },
            ]
        },
        {
            heading: "Mattresses", navItems: [
                { name: 'Twin Size', link: '/product-category/mattresses/twin-size' },
                { name: 'Quen Size', link: '/product-category/mattresses/queen-size' },
                { name: 'Full Size', link: '/product-category/mattresses/full-size' },
                { name: 'King Size', link: '/product-category/mattresses/king-size' },
                { name: 'Bed Frames', link: '/product-category/mattresses/bed-frames' },
                { name: 'Pillows', link: '/product-category/mattresses/pillows' },
                { name: 'Memory Foam Mattresses', link: '/product-category/mattresses/memory-foam-mattresses' },
                { name: 'box Spring', link: '/product-category/mattresses/box-springs' },
                { name: 'Mattresses Protection', link: '/product-category/mattresses/mattress-protection' },
                { name: 'Outlet', link: '/product-category/mattresses/sale-mattresses' },
            ]
        },
        {
            heading: "Kids", navItems: [
                { name: 'Kids Bedroom Sets', link: '/product-category/kids/kids-bedroom-sets' },
                { name: 'Kids Room', link: '/product-category/kids/kids-room' },
                { name: 'Kids Beds & Headboards', link: '/product-category/kids/kids-beds-headboards' },
                { name: 'Kids Bedroom Storage', link: '/product-category/kids/kids-bedroom-storage' },
                { name: 'Outlet', link: '/product-category/kids/sale-kids-room' },
            ]
        },
        {
            heading: "Accent", navItems: [
                { name: 'Accent Tables', link: '/product-category/accent-furniture/accent-tables' },
                { name: 'Accent Chest & Storage', link: '/product-category/accent-furniture/accent-chests-storage' },
                { name: 'Coffee & End Tables', link: '/product-category/accent-furniture/coffee-end-tables' },
                { name: 'Lampes & Lighting', link: '/product-category/accent-furniture/lamps-lighting' },
                { name: 'Entertainment Centers & TV Stands', link: '/product-category/accent-furniture/entertainment-centers-tv-stands' },
                { name: 'Home Office', link: '/product-category/accent-furniture/home-office' },
                { name: 'Benches', link: '/product-category/accent-furniture/benches' },
                { name: 'Outlets', link: '/product-category/accent-furniture/sale-accent-furniture' },
            ]
        },
        {
            heading: "Home Decor", navItems: [
                { name: 'Lampes & Lighting', link: '/product-category/accent-furniture/lamps-lighting' },
                { name: 'Home Office', link: '/product-category/home-decor/home-office' },
                { name: 'Mirrored Furniture', link: '/product-category/home-decor/mirrored-furniture' },
                { name: 'Vanities & Mirror', link: '/product-category/bedroom/vanities-mirror' },
                { name: 'Wall Art', link: '/product-category/home-decor/wall-art' },
                { name: 'Audio & Speaker', link: '/product-category/home-decor/audio-speakers' },
                { name: 'Throw Pillows', link: '/product-category/home-decor/throw-pillows' },
                { name: 'Jhula Swings', link: '/product-category/home-decor/jhula-swings' },
                { name: 'Outlets', link: '/product-category/home-decor/sale-home-decor' },
            ]
        },
        {
            heading: "Rugs", navItems: [
                { name: 'Machine Washable', link: '/product-category/rugs-main/machine-washable' },
                { name: 'Indoor/Outdoor Rugs', link: '/product-category/rugs-main/indoor-outdoor-rugs' },
                { name: 'Runners', link: '/product-category/rugs-main/runners' },
                { name: 'Small Area Rugs', link: '/product-category/rugs-main/small-area-rugs' },
                { name: 'Large Area Rugs', link: '/product-category/rugs-main/large-area-rugs' },
                { name: 'All Area Rugs', link: '/product-category/rugs-main/all-area-rugs' },
                { name: 'Outlets', link: '/product-category/rugs-main/sale-rugs' },
            ]
        },
        {
            heading: "Outlet", navItems: [
                { name: 'Bed Room Sets', link: '#' },
                { name: 'Bed & HeadBoards', link: '#' },
                { name: 'Dressers', link: '#' },
                { name: 'Chest', link: '#' },
                { name: 'Dresser & Mirror Sets', link: '#' },
                { name: 'Night Stands', link: '#' },
                { name: 'Mirrors', link: '#' },
                { name: 'Twin Beds', link: '#' },
                { name: 'Queen Beds', link: '#' },
                { name: 'King Beds', link: '#' },
                { name: 'Full Bed', link: '#' },
                { name: 'Small Space Bed Room', link: '#' },
                { name: 'Outlets', link: '#' },
            ]
        },
    ]

    const socialIcons = [
        { name: 'facebook', icon: facebook, link: 'https://www.facebook.com/myfurnituremecca' },
        { name: 'tiktok', icon: tiktok, link: 'https://www.tiktok.com/@myfurnituremecca?_t=8gcQvVGSaGI&_r=1' },
        { name: 'youtube', icon: youtube, link: 'https://www.youtube.com/@FurnitureMecca1' },
        { name: 'insta', icon: insta, link: 'https://www.instagram.com/myfurnituremecca/?igshid=MzRlODBiNWFlZA%3D%3D' }
    ]

    const locationPhoneMail = [
        { name: 'Philadelphia', icon: location, link: '#' },
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
                // { name: 'Protection Plan', link: '#' },
                // { name: 'FAQs', link: '#' },
            ]
        },
        {
            heading: 'About Furniture Mecca', navLinks: [
                { name: 'About Us', link: '/about-us' },
                { name: 'Career', link: '/careers' },
                { name: 'Store Locations', link: '/store-locator' },
                // { name: 'Reference', link: '#' },
                { name: 'My Account', link: '/user-dashboard' },
                { name: 'Blogs', link: '/blogs' },
            ]
        },
    ]

    const { stores } = useGlobalContext()
    const findDefaultStore = () => {
        const defaultStore = stores.find(store => store.postal_code === '19134')
        return defaultStore;
    }

    const defaultStore = findDefaultStore()

    const currentDay = getCurrentDay(getCurrentTimeForNewYork(), 'en-us')
    const defaultStoreTimings = defaultStore?.timings?.find(day => day.day === currentDay);

    const nearStoreDetails = [
        {
            icon: location,
            details: defaultStore?.name
        },
        {
            icon: call,
            details: defaultStore?.phone

        },
        {
            icon: clock,
            details: defaultStoreTimings?.time
        },
        {
            icon: calander,
            details: 'Monday - Sunday'
        },
    ]

    const handleNavigateStores = () => {
        navigate(`/store-locator`, { state: defaultStore })
    }


    const handleClick = () => {
        if (defaultStore?.latitude && defaultStore?.longitude) {
            // Construct the Google Maps URL with the latitude and longitude
            const googleMapsUrl = `https://www.google.com/maps?q=${defaultStore?.latitude},${defaultStore?.longitude}`;
            // Open the URL in a new tab
            window.open(googleMapsUrl, "_blank");
        } else {
            alert("Latitude and Longitude are not available.");
        }
    };

    return (
        <>
            <div className={`footer-main-container ${checkoutPage ? 'hide-whole-footer' : ''}`}>
                <div className='footer-nav'>
                    {footerNavLinks.map((items, index) => {
                        return <div key={index} className='footer-nav-links'>
                            <h3 className='footer-nav-link-heading'>{items.heading}</h3>
                            {items.navItems.map((item, innerIndex) => {
                                return <FooterNav key={innerIndex} link={item.link} linkName={item.name} />
                            })}
                        </div>
                    })}
                </div>
                <div className='footer-second-contant-section'>
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
                                    {/* <div className='tag-rating-stars'>
                                        {stars.map((item, index) => (
                                            <img key={index} src={item.icon} alt='star' />
                                        ))}
                                    </div> */}
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
                        </div>

                        <div className='left-section-location-section'>
                            <h3 className='footer-location-section'>Nearest Store</h3>
                            <div className='near-store-containt-section'>
                                <div className='near-store-image-div'>
                                    <img src={`${url}${defaultStore?.images?.[0]?.image_url}`} alt='near store' />
                                </div>
                                <div className='near-store-details-section'>
                                    {nearStoreDetails.map((item, index) => (
                                        <span key={index}>
                                            <img src={item.icon} alt='icon' />
                                            <p>{item.details}</p>
                                        </span>
                                    ))}
                                </div>
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
                    <div className='footer-right-section'>
                        <div className={`footer-right-get-scoop ${notLandingPage ? 'show-footer-get-the-scoop' : ''}`}>
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
                                    <p>By signing up, you agree to our <Link to={'/privacy-policy'}> Privacy Policy  and  Terms of Use. </Link></p>
                                </div>
                            </form>
                                :
                                <div className="subscribtion_done_1">
                                    <img src={checked_white} />
                                    <p className=''>Your Subscription Has Been Done Successfully.</p>
                                </div>}
                        </div>

                        <div className='right-section-care-and-about'>
                            {footerCustomerCareAndAbout.map((item, index) => (
                                <div key={index} className='footer-costumer-care-and-about'>
                                    <h3>{item.heading}</h3>
                                    {item.navLinks.map((navItem, inn) => (
                                        <div key={inn} onClick={() => { navigateToRoute(navItem.link) }} className='about-and-care-link'>
                                            {navItem.name}
                                        </div>
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
        </>
    )
}

export default Footer
