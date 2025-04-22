import React, { useEffect, useState } from 'react'
import './Financing.css'
import LatestModulerBanner from '../../Components/LatestModuler/LatestModulerBanner'
import { url } from '../../../utils/api'
import axios from 'axios'
import mobileSecondBanner from '../../../Assets/Furniture Mecca/Financing/download 146.png';





const Financing = () => {
    
    const [financingPageData, setFinancingPageData] = useState(null);
    const getFinancingPageData = async () => {
        try {
            const response = await axios.get(`${url}/api/v1/pages/financing/get`);
            setFinancingPageData(response.data.financingPage || []);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        if (financingPageData === null) {
            getFinancingPageData();
        }
    }, [financingPageData]);


    return (
        <div className='financing-main-container'>
            {financingPageData && <LatestModulerBanner
                customWidth={false}
                mainImgShow={true}
                mobileMainImage={url + financingPageData?.main_banner?.mobile?.image_url}
                mainImage={url + financingPageData?.main_banner?.desktop?.image_url}
            />}
            <div className='mobile-finance-secondBanner'>
                <img src={mobileSecondBanner} alt='mobile-second-banner' />
            </div>
            <div className='desktop-finance-secondBanner'>
                <img src={url + "/uploads/media/Pages/home/financeSlider/1737797410760_405_Finance-Page-Points-2.jpg"} alt='desktop-second-banner' />
            </div>
            {/* <LeaseToOwn /> */}
            <div className='payment-solutions desktopview' style={{ flexDirection: "column" }}>
                {financingPageData && financingPageData?.slides?.desktop?.map((items, index) => (
                    <a
                        className="payment-solution-single-card"
                        href={items?.link_url} target='_blank' >
                        <img className='' src={url + items?.image_url} alt="" srcset="" />
                    </a>

                ))}
            </div>
            <div className='payment-solutions mobileview' style={{ flexDirection: "column" }}>
                {financingPageData && financingPageData?.slides?.mobile?.map((items, index) => (
                    <a
                        className="payment-solution-single-card"
                        href={items?.link_url} target='_blank' >
                        <img className='' src={url + items?.image_url} alt="" srcset="" />
                    </a>

                ))}
            </div>
            
        </div>
    )
}

export default Financing
