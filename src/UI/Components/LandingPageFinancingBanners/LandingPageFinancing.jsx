import React from 'react'
import './LandingPageFinancing.css'
import bannerOne from '../../../Assets/Furniture Mecca/Landing Page/financing/banner-1.png';
import bannerTwo from '../../../Assets/Furniture Mecca/Landing Page/financing/PAYPAL-BANNER.gif';
import bannerThree from '../../../Assets/Furniture Mecca/Landing Page/financing/banner-3.png'

import acima from '../../../Assets/Furniture Mecca/Landing Page/financing/acima.png';
import progressive from '../../../Assets/Furniture Mecca/Landing Page/financing/progressive.png';
import snap from '../../../Assets/Furniture Mecca/Landing Page/financing/snap.png';
import american from '../../../Assets/Furniture Mecca/Landing Page/financing/ammerican.png';
import { Link } from 'react-router-dom';


const LandingPageFinancing = () => {
  const bannersData = [
    bannerOne,
    bannerTwo,
    bannerThree
  ]
  const financingButtons = [
    {
      img: acima,
      title: 'acima',
      link: `https://ams.acimacredit.com/discover/new?utm_campaign=merchant&utm_source=web&merchant_guid=merc-3bd04932-d6a0-4848-8a30-af0a9d935f25#/select_location`
    },
    {
      img: progressive,
      title: 'progressive',
      link: `https://approve.me/s/furnituremecca/129301`
    },
    {
      img: snap,
      title: 'snap',
      link: `https://apply.snapfinance.com/snap-com?paramId=Hq1qQmOsEuVFOlP6bdRg2D3%2BxnW9U1eKtIkrDRYxxSNWnLK4%2F6jHOC57%2FaFXzbBqmSADc%2B25IrUh0fLOir2w4pCWfkdCvNKE7NiJor%2BcWcRld9e3IFdUTA%3D%3D&source=INTERNET&merchantGroupId=36354109`
    },
    {
      img: american,
      title: 'american',
      link: `https://sv1.americanfirstfinance.com/v2/kwik/10609`
    },
  ]
  return (
    <>
      <div className='landing-page-financing-main-container'>
        <h3 className='landing-page-financing-main-heading'>Flexible Financing Options</h3>
        <div className='landing-page-financing-banners-main-container'>
          <div className='landing-page-financing-left'>
            <img src={bannerOne} alt='banner one' />
            <img src={bannerTwo} alt='banner two' />
          </div>
          <div className='landing-page-financing-right'>
            <img src={bannerThree} alt='banner-three' />
            <div className='financing-page-buttons-div'>
              {financingButtons.map((item, index) => (
                <div className='financing-page-buttons-div-column'>
                  <Link target='_blank' to={item.link} className='financing-buttons'>
                    <img src={item.img} alt={item.title} />
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className='mobile-view-banners-container'>
        {bannersData.map((item, index) => (
          <div key={index} className='mobile-view-banner-container'>
            <img src={item} alt='banner' className='mobile-view-banner' />
          </div>
        ))}
        <div className='mobile-view-banner-buttons-container'>
          {financingButtons.map((item, index) => (
                <div className='mobile-view-financing-page-buttons-div-column'>
                  <Link target='_blank' to={item.link} className='mobile-view-financing-buttons'>
                    <img src={item.img} alt={item.title} />
                  </Link>
                </div>
              ))}
        </div>
      </div>
    </>
  )
}

export default LandingPageFinancing
