import React, { useState } from 'react'
import './ProductDimension.css'
import { RxDimensions } from "react-icons/rx";
import { FaRegImage } from "react-icons/fa6";
import { RiZoomInLine, RiZoomOutLine } from "react-icons/ri";

const ProductDimension = () => {
    const dimentionCards = [
        {icon: <RxDimensions size={25} />, title: 'Dimensions'},
        {icon: <FaRegImage size={25} />, title: 'Customer Photos'},
        {icon: <RiZoomOutLine size={25} />, title: 'Zoom'},
    ]

    const [dimensionIndex, setDimensionIndex] = useState(null)
    const handleDimensionSelect = (index) => {
        setDimensionIndex((prevIndex) => prevIndex === index ? null : index)
    }

  return (
    <div className='dimension-main-container'>
      {dimentionCards.map((item, index) => (
        <div 
            key={index} 
            className={`dimension-card ${dimensionIndex === index ? 'active-dimension' : ''}`}
            onClick={() => handleDimensionSelect(index)}
        >
            {item.icon}
            <p>{item.title}</p>
        </div>
      ))}
    </div>
  )
}

export default ProductDimension
