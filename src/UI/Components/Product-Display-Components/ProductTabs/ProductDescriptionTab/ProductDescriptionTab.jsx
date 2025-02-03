import React, { useState } from 'react'
import './ProductDescriptionTab.css'
import { url } from '../../../../../utils/api'

import performanceIcon from '../../../../../Assets/icon/performance-fabric.svg'
import pillow from '../../../../../Assets/icon/pillows.svg'
import spaceIcon from '../../../../../Assets/icon/home-dimention.svg'
import seatDepth from '../../../../../Assets/icon/sofa-side.svg'
import seatCushion from '../../../../../Assets/icon/sofa-front.svg'
import { IoIosArrowDown } from "react-icons/io";

const ProductDescriptionTab = ({ id, descriptionRef, productData, addMarginTop }) => {

  function truncateDescription(description, length) {
    if (!description) return '';
    return description?.length > length
      ? description?.substring(0, length) + '...'
      : description;
  }

  const truncatedDescription = truncateDescription(productData?.description, 350);

  const featuresData = [
    {icon: performanceIcon, title: 'Upholstery Material', secondTitle: 'Performance Fabric'},
    {icon: pillow, title: '# of Accent Pillows', secondTitle: '2'},
    {icon: spaceIcon, title: 'Lifestyle Size', secondTitle: 'Small Space'},
    {icon: seatDepth, title: 'Seat Depth', secondTitle: '20.00"'},
    {icon: seatCushion, title: 'Seat Cushion Style', secondTitle: 'Loose'},
  ]

  const [showAdditional, setShowAdditional] = useState(false);
  const handleShowAdditional = () => {
    setShowAdditional(!showAdditional)
  }


  return (
    <div
      id={'Description'}
      ref={descriptionRef}
      className={`product-description-main-container ${addMarginTop ? 'add-top-margin' : ''}`}
    >
      <div className='product-description-section'>
        <div className='product-description-image-container'>
          <img src={`${url}${productData?.image?.image_url}`} alt='product' />
        </div>
        <div className='product-description'>
          <h3>Description</h3>
          <div dangerouslySetInnerHTML={{ __html: truncatedDescription }} ></div>
        </div>
      </div>

      <div className='product-features-main-container'>
        <h3>Features</h3>
        <div className='product-features-and-extra-features-container'>
          <div className='product-features-section'>
            {featuresData.map((item, index) => (
              <div 
                key={index}
                className='product-single-feature'
              >
                <img src={item.icon} alt='icon' />
                <div className='product-single-feature-title-and-desc'>
                  <h3>{item.title}</h3>
                  <p>{item.secondTitle}</p>
                </div>
              </div>
            ))}
          </div>

          <div className='product-extra-features-main-section'>
            <div className='additional-feature-head' onClick={handleShowAdditional}>
              <h3>Additional Features</h3>
              <button className={`additional-feature-arrow-button ${showAdditional ? 'additional-arrow-rotate' : ''}`}>
                <IoIosArrowDown size={25} className={`addition-feature-arrow`} />
              </button>
            </div>
            <div className={`additional-features-body ${showAdditional ? 'show-addition-feature-detail' : ''}`}>
                <h3>Polyester upholstery</h3>
                <p>100% polyester. This stain-resistant, easy-care fabric boasts a soft feel, yet it's tough enough for extensive, everyday use.</p>
            </div>
          </div>

        </div>
      </div>

    </div>
  )
}

export default ProductDescriptionTab