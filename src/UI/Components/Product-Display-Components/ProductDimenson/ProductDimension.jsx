import React, { useEffect, useRef, useState } from 'react'
import './ProductDimension.css'
import { RxDimensions } from "react-icons/rx";
import { FaRegImage } from "react-icons/fa6";
import { RiZoomInLine, RiZoomOutLine } from "react-icons/ri";
import { RxCross2 } from "react-icons/rx";
import ProductGallery from '../ProductGallery/ProductGallery';
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { MdKeyboardArrowDown } from "react-icons/md";
import { url } from '../../../../utils/api';
import GalleryModal from '../GalleryModal/GalleryModal';

const ProductDimension = ({ productData, variationData, handleZoom, handleGalleryModal }) => {
  const dimensionCards = [
    { icon: <RxDimensions size={25} />, title: 'Dimensions' },
    { icon: <FaRegImage size={25} />, title: 'Customer Photos' },
    { icon: <RiZoomOutLine size={25} />, title: 'Zoom' },
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
          <RxDimensions size={20} color='#595959' />
          <p>Dimensions</p>
        </div>
      </div>
    </>
  )
}

export default ProductDimension
