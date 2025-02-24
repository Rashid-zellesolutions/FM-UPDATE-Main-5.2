import React from 'react';
import './DimensionDetail.css';
import dimensionImage from '../../../../Assets/dimention-image.webp'
import { url } from '../../../../utils/api';

const DimensionDetail = ({productData}) => {
  console.log("product dimentions image", productData)
  // weight_dimension

  return (
    <div className='dimension-detail-main-container'>
      <div className='dimension-detail-section'>
        {/* <h3>Dimension (In): </h3>
        <p>L: 88.5" x W: 37.5" x H: 37"</p> */}
        <h3>Dimensions (in)</h3>
        <div dangerouslySetInnerHTML={{ __html: productData?.weight_dimension }} ></div>
      </div>
      {productData?.dimension_image && (
        <div className='dimension-detail-image-section'>
          <img src={`${url}${productData?.dimension_image?.image_url}`} alt='dimension' />
        </div>
      )}
      
    </div>
  )
}

export default DimensionDetail
