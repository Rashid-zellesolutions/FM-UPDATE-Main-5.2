import React, { useEffect,  useState } from 'react'
import './ProductDimension.css'
import { RxDimensions } from "react-icons/rx";
import { FaRegImage } from "react-icons/fa6";
import { url } from '../../../../utils/api';
import { AiOutlineZoomIn, AiOutlineZoomOut } from "react-icons/ai";
import axios from 'axios';
// import { AiOutlineZoomOut } from "react-icons/ai";

const ProductDimension = ({ productData, variationData, zoomIn, handleZoom, handleGalleryModal }) => {

  const [customerPhotos, setCustomerPhotos] = useState([]);
  const fetchReviews = async (productUid) => {
    try {
      const response = await axios.get(`${url}/api/v1/reviews/get-by-product/${productUid}`);
      console.log("review response ", response)
      setCustomerPhotos(response.data.reviews[0].images)
      
    } catch (error) {
      console.error("UnExpected Server Error", error);
    }
  };

  useEffect(() => {fetchReviews(productData?.uid)}, [])

  useEffect(() => { console.log("Customer Photos", customerPhotos) }, [customerPhotos])

  const dimensionCards = [
    { icon: <RxDimensions size={25} />, title: 'Dimensions' },
    ...(customerPhotos.length > 0 ? [{ icon: <FaRegImage size={25} />, title: 'Customer Photos' }] : []),
    { icon: zoomIn ? <AiOutlineZoomOut size={25} /> : <AiOutlineZoomIn size={25} /> , title: 'Zoom' },
  ]

  const [dimensionIndex, setDimensionIndex] = useState(null)

  const handleDimensionSelect = (item, index) => {
    setDimensionIndex((prevIndex) => prevIndex === index ? null : index)

    if(item.title === 'Dimensions'){
      handleGalleryModal()
    }else if(item.title === 'Zoom'){
      handleZoom()
    }
  }

  return (
    <>
      <div className='dimension-main-container'>
        {dimensionCards.map((item, index) => (
          <div
            key={index}
            className={`dimension-card ${dimensionIndex === index ? 'active-dimension' : ''}`}
            onClick={() => handleDimensionSelect(item, index)}
          >
            {item.icon}
            <p>{item.title}</p>
          </div>
        ))}

        <div className='mobile-view-dimension-main' onClick={handleGalleryModal}>
          <RxDimensions size={20} color='var(--secondary-color)' />
          <p className='dimensions-detail-button-title'>Dimensions</p>
        </div>

        <div className='mobile-view-dimension-main' onClick={handleZoom}>
          {zoomIn ? <AiOutlineZoomOut size={20} color='var(--secondary-color)' /> : <AiOutlineZoomIn size={20} color='var(--secondary-color)' />}
          <p className='dimensions-detail-button-title'>Zoom</p>
        </div>

      </div>
    </>
  )
}

export default ProductDimension
