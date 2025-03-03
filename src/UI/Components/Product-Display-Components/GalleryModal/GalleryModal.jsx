import React, { useEffect, useRef, useState } from 'react'
import './GalleryModal.css'

import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { MdKeyboardArrowDown } from "react-icons/md";
import { RxCross2 } from "react-icons/rx";

import { url } from '../../../../utils/api'

const GalleryModal = (
  {
    dimensionModal,
    handleCloseDimensionModal,
    productData,
    variationData,
    handleNextImage,
    handlePrevImage,
    activeIndex,
    handleThumbnailClick,
    thumbActiveIndex
  }) => {

  // console.log("product Data", productData);
  // console.log("variation Data", variationData);
  // Check if dimension_image is not empty
  const hasDimensionImage = productData?.dimension_image?.image_url?.trim();

  // Prepare images array with dimension_image at the start if available
  const updatedVariationImages = hasDimensionImage
    ? [
      ...(variationData?.images ? variationData.images : []),
      {
        alt_text: "",
        description: "",
        image_url: productData?.dimension_image?.image_url,
        link_url: "",
        title: "",
      },
    ]
    : variationData?.images || [];

  // console.log("Updated Variation images", updatedVariationImages)
  // console.log("Product Data Images Length", productData?.images.length);
  // console.log("Active Index", activeIndex);

  const updatedSimpleImages = hasDimensionImage
    ? [{ image_url: productData?.dimension_image?.image_url }, ...productData?.images]
    : productData?.images;

  // console.log("updated single images", updatedSimpleImages)


  const [dragStartX, setDragStartX] = useState(0);
  const [dragging, setDragging] = useState(false);
  const sliderRef = useRef(null);



  // Handle Drag Start
  const handleDragStart = (e) => {
    setDragStartX(e.clientX);
    setDragging(true);
  };

  // Handle Drag Move
  const handleDragMove = (e) => {
    if (!dragging) return;
    const dragDistance = e.clientX - dragStartX;

    if (dragDistance > 50) {
      handlePrevImage(); // Move to previous image
      setDragging(false);
    } else if (dragDistance < -50) {
      handleNextImage(); // Move to next image
      setDragging(false);
    }
  };

  // Handle Drag End
  const handleDragEnd = () => {
    setDragging(false);
  };

  return (
    <div className={`dimension-modal-main-container ${dimensionModal ? 'show-dimension-modal' : ''}`}>
      <div className='dimension-modal-inner-container'>
        <button className='dimension-modal-close-button' onClick={handleCloseDimensionModal}>
          <RxCross2 size={25} color='#595959' />
        </button>

        <div className='dimension-left-thumbnail-section'>
          <div className='dimension-modal-products-thumb-heading'>
            <p>Product Photos {(updatedSimpleImages.length)}</p>
            <MdKeyboardArrowDown size={20} color='#595959' className='dimension-modal-arrow-down ' />
          </div>
          <div className='thumb-images-main-container'>
            {productData?.type === 'variable' ?
              (updatedVariationImages || []).map((item, index) => (
                <div key={index} className={`dimension-modal-thumb-single-image ${index === thumbActiveIndex ? 'dimension-modal-active-thumb' : ''} `} onClick={() => handleThumbnailClick(index)}>
                  <img src={`${url}${item.image_url}`} alt='slid' className='dimension-modal-thumbnail-single-image' />
                </div>
              ))
              :
              (updatedSimpleImages || []).map((item, index) => (
                <div key={index} className={`dimension-modal-thumb-single-image ${index === thumbActiveIndex ? 'dimension-modal-active-thumb' : ''} `} onClick={() => handleThumbnailClick(index)}>
                  <img src={`${url}${item.image_url}`} alt='slid' className='dimension-modal-thumbnail-single-image' />
                </div>
              ))}
          </div>




        </div>

        <div className='dimension-modal-slider'>
          <div
            className='dimension-modal-main-slider-section'
            ref={sliderRef}
            onMouseDown={handleDragStart}
            onMouseMove={handleDragMove}
            onMouseUp={handleDragEnd}
            onMouseLeave={handleDragEnd}
            style={{
              cursor: 'pointer', // Change cursor when dragging
              userSelect: 'none' // Prevent selection
            }}
          >
            <button
              className={`dimension-main-slider-arrow dimension-slider-arrow-back ${activeIndex === 0 ? 'dimension-modal-disabled-button' : ''}`}
              onClick={handlePrevImage}
              disabled={activeIndex === 0}
            >
              <IoIosArrowBack size={20} color='#595959' className='product-gallery-arrow' />
            </button>

            <div
              className='dimension-modal-main-slider-images'
              style={{
                transform: `translateX(-${activeIndex * 100}%)`,
              }}
            >
              {productData.type === 'variable' ?
                (updatedVariationImages || []).map((slideItem, slideIndex) => (
                  <div key={slideIndex} className='dimension-modal-slider-single-image-container'>
                    <img
                      src={`${url}${slideItem.image_url}`}
                      alt='slide'
                      className='dimension-modal-slider-image'
                    />
                  </div>
                )) :
                (updatedSimpleImages || []).map((simpleSlideItem, simpleSlideIndex) => (
                  <div key={simpleSlideIndex} className='dimension-modal-slider-single-image-container'>
                    <img
                      src={`${url}${simpleSlideItem.image_url}`}
                      alt='slide'
                      className='dimension-modal-slider-image'
                    />
                  </div>
                ))}
            </div>

            {/* <div className='dimension-modal-main-slider-images' style={{ transform: `translateX(-${activeIndex * 100}%)` }}>
              {images.map((slideItem, slideIndex) => (
                <div key={slideIndex} className='dimension-modal-slider-single-image-container'>
                  <img src={`${url}${slideItem.image_url}`} alt='slide' className='dimension-modal-slider-image' />
                </div>
              ))}
            </div> */}


            <button
              className={`dimension-main-slider-arrow dimension-slider-arrow-right ${activeIndex === updatedSimpleImages.length - 1 ? 'disabled-button' : ''}`}
              onClick={handleNextImage}
            >
              <IoIosArrowForward size={20} color='#595959' className='product-gallery-arrow' />
            </button>

          </div>
        </div>

      </div>
    </div>
  )
}

export default GalleryModal
