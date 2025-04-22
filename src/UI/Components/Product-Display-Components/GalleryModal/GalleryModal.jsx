import React, { useRef, useState } from 'react'
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
    thumbActiveIndex,
    name,
    currentIndex,
    handleDotClick,
    setCurrentIndex
  }) => {

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

  const updatedSimpleImages = hasDimensionImage
    ? [{ image_url: productData?.dimension_image?.image_url }, ...productData?.images]
    : productData?.images;



  const [dragStartX, setDragStartX] = useState(0);
  const [dragging, setDragging] = useState(false);
  const sliderRef = useRef(null);





  // Handle Drag Start
  const handleDragStart = (e) => {
    const clientX = e.touches ? e.touches[0].clientX : e.clientX; // Support touch events
    setDragStartX(clientX);
    setDragging(true);
  };

  // Handle Drag Move
  const handleDragMove = (e) => {
    if (!dragging) return;

    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const dragDistance = clientX - dragStartX;

    if (dragDistance > 50 && activeIndex > 0) {
      // Move to previous image if not at the first image
      handlePrevImage();
      setDragging(false);
    } else if (dragDistance < -50 && activeIndex < (productData?.type === 'variable' ? updatedVariationImages.length - 1 : updatedSimpleImages.length - 1)) {
      // Move to next image if not at the last image
      handleNextImage();
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
          <RxCross2 size={25} color='var(--secondary-color)' />
        </button>

        <div className='dimension-left-thumbnail-section'>
          <div className='dimension-modal-products-thumb-heading'>
            <p>Product Photos {(updatedSimpleImages?.length)}</p>
            <MdKeyboardArrowDown size={20} color='var(--secondary-color)' className='dimension-modal-arrow-down ' />
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
            onTouchStart={handleDragStart}  // Added for touch support
            onTouchMove={handleDragMove}    // Added for touch support
            onTouchEnd={handleDragEnd}      // Added for touch support
            style={{
              cursor: 'pointer',
              userSelect: 'none'
            }}
          >

            <button
              className={`dimension-main-slider-arrow dimension-slider-arrow-back ${activeIndex === 0 ? 'dimension-modal-disabled-button' : ''}`}
              onClick={handlePrevImage}
              disabled={activeIndex === 0}
            >
              <IoIosArrowBack size={20} color='var(--secondary-color)' className='product-gallery-arrow' />
            </button>

            <div
              className='dimension-modal-main-slider-images'
              style={{
                transform: `translateX(-${activeIndex * 100}%)`,
              }}
            >
              {productData?.type === 'variable' ?
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

            <button
              className={`dimension-main-slider-arrow dimension-slider-arrow-right ${activeIndex === updatedSimpleImages?.length - 1 ? 'disabled-button' : ''}`}
              onClick={handleNextImage}
            >
              <IoIosArrowForward size={20} color='var(--secondary-color)' className='product-gallery-arrow' />
            </button>

          </div>

          <div className='slider-dots-and-view-all-button'>
            {productData?.type === 'variable' ? <div style={{
              paddingLeft: "0"
            }} className="pagination-dots">
              {updatedVariationImages?.map((_, index) => (
                <span
                  key={index}
                  className={`dot ${currentIndex === index ? "active" : ""}`} // Highlight active dot
                  onClick={() => handleDotClick(index)} // Navigate when clicking dots
                />
              ))}
            </div> :
              <div style={{
                paddingLeft: "0"
              }} className="pagination-dots">
                {updatedSimpleImages?.map((_, index) => (
                  <span
                    key={index}
                    className={`dot ${currentIndex === index ? "active" : ""}`} // Highlight active dot
                    onClick={() => handleDotClick(index)} // Navigate when clicking dots
                  />
                ))}
              </div>
            }
          </div>
        </div>
        {/* Pagination Dots */}


      </div>
    </div>
  )
}

export default GalleryModal
