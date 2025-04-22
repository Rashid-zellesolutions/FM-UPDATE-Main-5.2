import React from 'react'
import './ProductDetailTab.css'
import { url } from '../../../../../utils/api';

const ProductDetailTab = ({id, detailsRef, productData}) => {

  return (
    <div
        id={'Details'}
        ref={detailsRef}
        className='product-detail-main-section'
    >
      <h3>Product Details</h3>
      <div className="product-details-sub-section">
      <div className='product-detail-left-section'>
        {productData?.dimension_image?.image_url ? (
          <img src={`${url}${productData?.dimension_image?.image_url}`} alt='dimension' />
        ) : (
            <img src={`${url}${productData?.image?.image_url}`} alt='detail' />
        )}
        
      </div>
      <div className='product-detail-right-section'>

        <div className='product-detail-right-section-items product-detail-second-tab'>
          <span>
            <h3>Dimensions (in):</h3>
            <p>L: 88.5" x W: 37.5" x H: 37"</p>
          </span>
          {/* <p>More Dimensions</p> */}
        </div>

        <div className='product-detail-right-section-items'>
          <span>
            <h3>Color:</h3>
            <p>Sugar Shack Cafe</p>
          </span>
          {/* <p>Care Instructions</p> */}
        </div>

        <div className='product-detail-right-section-items product-detail-second-tab'>
          <span>
            <h3># of Accent Pillows:</h3>
            <p>2</p>
          </span>
        </div>

        <div className='product-detail-right-section-items'>
          <span>
            <h3>Brand:</h3>
            <p>Furniture Mecca</p>
          </span>
        </div>

        <div className='product-detail-right-section-items product-detail-second-tab'>
        <span>
            <h3>Collection:</h3>
            <p>Furniture Mecca</p>
          </span>
        </div>
      </div>
      </div>
      
    </div>
  )
}

export default ProductDetailTab
