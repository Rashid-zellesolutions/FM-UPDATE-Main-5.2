import React from 'react'
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
  return (
    <div className={`dimension-modal-main-container ${dimensionModal ? 'show-dimension-modal' : ''}`}>
            <div className='dimension-modal-inner-container'>
              <button className='dimension-modal-close-button' onClick={handleCloseDimensionModal}>
                <RxCross2 size={25} color='#595959' />
              </button>
    
              <div className='dimension-left-thumbnail-section'>
                <div className='dimension-modal-products-thumb-heading'>
                  <p>Product Photos {(productData?.images?.length)}</p>
                  <MdKeyboardArrowDown size={20} color='#595959' className='dimension-modal-arrow-down ' />
                </div>
                <div className='thumb-images-main-container'>
                  {productData?.type === 'variable' ? 
                  (variationData?.images || []).map((item, index) => (
                    <div key={index} className={`dimension-modal-thumb-single-image ${index === thumbActiveIndex ? 'dimension-modal-active-thumb' : ''} `} onClick={() => handleThumbnailClick(index)}>
                      <img src={`${url}${item.image_url}`} alt='slid' className='dimension-modal-thumbnail-single-image' />
                    </div>
                  )) 
                  : 
                  (productData?.images || []).map((item, index) => (
                    <div key={index} className={`dimension-modal-thumb-single-image ${index === thumbActiveIndex ? 'dimension-modal-active-thumb' : ''} `} onClick={() => handleThumbnailClick(index)}>
                      <img src={`${url}${item.image_url}`} alt='slid' className='dimension-modal-thumbnail-single-image' />
                    </div>
                  ))}
                </div>
              </div>
    
              <div className='dimension-modal-slider'>
                <div className='dimension-modal-main-slider-section'>
                  <button
                    className={`dimension-main-slider-arrow dimension-slider-arrow-back ${activeIndex === 0 ? 'dimension-modal-disabled-button' : ''}`}
                    onClick={handlePrevImage}
                    disabled={activeIndex === 0}
                  >
                    <IoIosArrowBack size={20} color='#595959' className='product-gallery-arrow' />
                  </button>
    
                  <div
                    className='dimension-modal-main-slider-images'
                    style={{ transform: `translateX(-${activeIndex * 100}%)` }}
                  >
                    {productData.type === 'variable' ?
                      (variationData?.images || []).map((slideItem, slideIndex) => (
                        <div key={slideIndex} className='dimension-modal-slider-single-image-container'>
                          <img
                            src={`${url}${slideItem.image_url}`}
                            alt='slide'
                            className='dimension-modal-slider-image'
                          />
                        </div>
                      )) :
                      (productData?.images || []).map((simpleSlideItem, simpleSlideIndex) => (
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
                    className={`dimension-main-slider-arrow dimension-slider-arrow-right ${activeIndex === productData?.images?.length - 1 ? 'disabled-button' : ''}`}
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
