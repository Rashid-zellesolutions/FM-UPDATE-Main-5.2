import React, { useEffect, useState } from 'react'
import './Financing.css'
import LatestModulerBanner from '../../Components/LatestModuler/LatestModulerBanner'
import { url } from '../../../utils/api'
import axios from 'axios'
import mobileSecondBanner from '../../../Assets/Furniture Mecca/Financing/download 146.png';

import americanFirst from '../../../Assets/Furniture Mecca/Financing/american-first.png';
import wellFargo from '../../../Assets/Furniture Mecca/Financing/wellsfargo.png'
import FinanceServiceCategoryCard from '../../Components/Financing-Components/FinanceServiceCategoryCard/FinanceServiceCategoryCard'

import storeIcon from '../../../Assets/Furniture Mecca/Financing/store.png'
import quickDelivery from '../../../Assets/Furniture Mecca/Financing/quick-delivery.png'
import FinancingForEveryOne from '../../../Assets/Furniture Mecca/Financing/discount.png'
import trackOrder from '../../../Assets/Furniture Mecca/Financing/order-track.png'
import ecoFriendly from '../../../Assets/Furniture Mecca/Financing/eco-friendly.png'
import knowledgeAssociate from '../../../Assets/Furniture Mecca/Financing/knowledge-accociate.png'




const Financing = () => {
    const paymentOptions = [
        {
            img: americanFirst,
            topHeading: 'Payment Solutions',
            heading: 'Americas First Finance',
            creditNeeded: 'Americas First Finance',
            creditDetailsOne:
                `Approval is possible without a credit score, but credit will be checked.`,
            applyNowLink: '#',
            learnMoreLink: '#',
            imgWidth: '100px',
            imgHeight: '100px',
        },
        {
            img: wellFargo,
            topHeading: 'Traditional Financing',
            heading: 'Wells Fargo',
            creditNeeded: 'Lease to own',
            creditDetailsOne: `No credit required`,
            creditDetailsTwo: 'Approved upto $5000',
            applyNowLink: '#',
            learnMoreLink: '#',
            imgWidth: '220px',
            imgHeight: '100px'
        },
    ]
    const financingServiceCategoryData = [
        { img: storeIcon, heading: 'Shop in-store or online', desc: `Thousands of items in stock and even more on our endless aisle.` },
        { img: quickDelivery, heading: 'Quick Delivery', marginTop: 'marginTop', desc: `our order is fully inspected and placed exactly where you want.` },
        { img: FinancingForEveryOne, heading: 'Financing for Everyone', desc: `Pay your way. No matter your budget.` },
        { img: trackOrder, heading: 'Online Order Tracking', desc: `Track the status of your order every step of the way.` },
        { img: ecoFriendly, heading: 'Eco-Friendly', marginTop: 'marginTop', desc: `We recycle nearly 20 million pounds of materials every year.` },
        { img: knowledgeAssociate, heading: 'Knowledgeable Associates', desc: `We’re here to help you make the most informed purchase possible.` },
    ]
    const [financingPageData, setFinancingPageData] = useState(null);
    const getFinancingPageData = async () => {
        try {
            const response = await axios.get(`${url}/api/v1/pages/financing/get`);
            console.log(response, "here is financing page");
            setFinancingPageData(response.data.financingPage || []);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        // Only fetch data if financingPageData is empty
        if (financingPageData === null) {
            getFinancingPageData();
        }
    }, [financingPageData]);

    const handleClick = (items) => {
        if (items?.desktop_view?.link_url) {
            window.open(items.desktop_view.link_url, "_blank");
        } else {
            console.error("Link URL is not available.");
        }
    };

    return (
        <div className='financing-main-container'>
            {financingPageData && <LatestModulerBanner
                customWidth={false}
                // showBanners={financingBanner} 
                mainImgShow={true}
                mobileMainImage={url + financingPageData?.main_banner?.mobile_view?.image_url}
                mainImage={url + financingPageData?.main_banner?.desktop_view?.image_url}
            />}
            <div className='mobile-finance-secondBanner'>
                <img src={mobileSecondBanner} alt='mobile-second-banner' />
            </div>
            <div className='desktop-finance-secondBanner'>
                <img src={url + "/uploads/media/Pages/home/financeSlider/1737797410760_405_Finance-Page-Points-2.jpg"} alt='desktop-second-banner' />
            </div>
            {/* <LeaseToOwn /> */}
            <div className='payment-solutions' style={{ flexDirection: "column" }}>
                {financingPageData && financingPageData?.slides.map((items, index) => (
                    <a
                        className="payment-solution-single-card"
                        href={items?.desktop_view?.link_url} target='_blank' >
                        <img className='desktopview' src={url + items?.desktop_view?.image_url} alt="" srcset="" />
                        <img className='mobileview' src={url + items?.desktop_view?.image_url} alt="" srcset="" />
                    </a>

                ))}
            </div>
            <div className='financing-services-categories'>
                {financingServiceCategoryData.map((items, index) => (
                    <FinanceServiceCategoryCard
                        marginTop={items.marginTop}
                        cardIcon={items.img}
                        cardTitle={items.heading}
                        cardDesc={items.desc}
                    />
                ))}
            </div>
        </div>
    )
}

export default Financing
