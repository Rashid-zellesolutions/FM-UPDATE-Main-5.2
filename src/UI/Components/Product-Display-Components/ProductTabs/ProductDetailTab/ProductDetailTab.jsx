import React from 'react'
import './ProductDetailTab.css'
import { IoIosArrowForward } from "react-icons/io";
import { Link } from 'react-router-dom';
import { url } from '../../../../../utils/api';

const ProductDetailTab = ({id, detailsRef, productData}) => {

  return (
    <div
        id={'Details'}
        ref={detailsRef}
        className='product-detail-main-section'
    >
      <div className='product-detail-right-section'>

        <div className='product-detail-right-section-heading-container'>
          <h3>Product details</h3>
          <Link target='_blank'>
            Will This Fit?
          </Link>
        </div>

        <div className='product-detail-right-section-items product-detail-second-tab'>
          <span>
            <h3>Dimensions (in):</h3>
            <p>L: 88.5" x W: 37.5" x H: 37"</p>
          </span>
          <p>More Dimensions</p>
        </div>

        <div className='product-detail-right-section-items'>
          <span>
            <h3>Color:</h3>
            <p>Sugar Shack Cafe</p>
          </span>
          <p>Care Instructions</p>
        </div>

        <div className='product-detail-right-section-items product-detail-second-tab'>
          <span>
            <h3>Color Family:</h3>
            <p>Brown</p>
          </span>
        </div>

        <div className='product-detail-right-section-items'>
          <span>
            <h3># of Accent Pillows:</h3>
            <p>2</p>
          </span>
        </div>

        <div className='product-detail-right-section-items product-detail-second-tab'>
          <span>
            <h3>Pattern:</h3>
            <p>Solid</p>
          </span>
        </div>

        <div className='product-detail-right-section-items'>
          <span>
            <h3>Brand:</h3>
            <p>Furniture Mecca</p>
          </span>
          <p>More Dimensions</p>
        </div>

        <div className='product-detail-right-section-items product-detail-second-tab'>
          <span>
            <h3>Construction</h3>
          </span>
          <IoIosArrowForward size={20} />
        </div>

        <div className='product-detail-right-section-items'>
          <span>
            <h3>Styles & Types</h3>
          </span>
          <IoIosArrowForward size={20} />
        </div>

        <div className='product-detail-right-section-items product-detail-second-tab'>
          <span>
            <h3>Weight Capacity:</h3>
            <p>900 lbs</p>
          </span>
        </div>


      </div>
      <div className='product-detail-left-section'>
        <img src={`${url}${productData?.image?.image_url}`} alt='detail' />
      </div>
    </div>
  )
}

export default ProductDetailTab
