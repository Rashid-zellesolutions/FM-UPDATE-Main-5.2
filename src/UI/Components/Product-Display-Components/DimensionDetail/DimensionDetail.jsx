import React from 'react';
import './DimensionDetail.css';
import dimensionImage from '../../../../Assets/dimention-image.webp'

const DimensionDetail = () => {
  return (
    <div className='dimension-detail-main-container'>
      <div className='dimension-detail-section'>
        <h3>Dimension (In): </h3>
        <p>L: 88.5" x W: 37.5" x H: 37"</p>
      </div>
      <div className='dimension-detail-image-section'>
        <img src={dimensionImage} alt='dimension' />
      </div>
    </div>
  )
}

export default DimensionDetail
