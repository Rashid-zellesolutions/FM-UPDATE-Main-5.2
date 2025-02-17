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

const ProductDimension = ({ productData, variationData, handleZoom }) => {
  const dimensionCards = [
    { icon: <RxDimensions size={25} />, title: 'Dimensions' },
    { icon: <FaRegImage size={25} />, title: 'Customer Photos' },
    { icon: <RiZoomOutLine size={25} />, title: 'Zoom' },
  ]

  const [dimensionIndex, setDimensionIndex] = useState(null)
  const handleDimensionSelect = (item, index) => {
    setDimensionIndex((prevIndex) => prevIndex === index ? null : index)
    if(item.title === 'Dimensions'){
      setDimensionModal(true)
    }else if(item.title === 'Zoom'){
      handleZoom()
    }
  }

  const [dimensionModal, setDimensionModal] = useState(false);
  const handleDimensionModal = () => {
    setDimensionModal(true);
  }

  const handleCloseDimensionModal = () => {
    setDimensionModal(false);
  }

  useEffect(() => {
    if (dimensionModal) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
  }, [dimensionModal])


  const [activeIndex, setActiveIndex] = useState(0); // For main slider image
  const [thumbActiveIndex, setThumbActiveIndex] = useState(0); // For active thumbnail
  const thumbnailContainerRef = useRef(null);


  const handleThumbnailClick = (index) => {
        setActiveIndex(index);
        setThumbActiveIndex(index);

        // Prevent page scroll
        if (thumbnailContainerRef.current) {
            const thumbnailElement = thumbnailContainerRef.current.children[index];

            if (window.innerWidth < 480) {
                // Scroll horizontally for mobile view
                thumbnailContainerRef.current.scrollTo({
                    left: thumbnailElement.offsetLeft - (thumbnailContainerRef.current.clientWidth / 2) + (thumbnailElement.clientWidth / 2),
                    behavior: 'smooth',
                });
            } else {
                // Scroll vertically for larger screens
                thumbnailContainerRef.current.scrollTo({
                    top: thumbnailElement.offsetTop - (thumbnailContainerRef.current.clientHeight / 2) + (thumbnailElement.clientHeight / 2),
                    behavior: 'smooth',
                });
            }
        }
    };


  const handlePrevImage = () => {
        setActiveIndex((prevIndex) => {
            if (prevIndex === 0) return prevIndex; // Prevent moving before first item

            const newIndex = prevIndex - 1;
            setThumbActiveIndex(newIndex); // Update active thumbnail index

            // Scroll thumbnail container
            if (thumbnailContainerRef.current) {
                if (window.innerWidth < 480) {
                    // Scroll left for mobile screens
                    thumbnailContainerRef.current.scrollBy({
                        left: -80, // Adjust scroll step based on your layout
                        behavior: 'smooth',
                    });
                } else {
                    // Scroll up for larger screens
                    thumbnailContainerRef.current.scrollBy({
                        top: -80,
                        behavior: 'smooth',
                    });
                }
            }

            return newIndex;
        });
    };

    const handleNextImage = () => {
        setActiveIndex((prevIndex) => {
            const length =
                productData.type === 'variable'
                    ? variationData?.images?.length
                    : productData?.images?.length;

            if (prevIndex === length - 1) return prevIndex; // Prevent moving after last item

            const newIndex = prevIndex + 1;
            setThumbActiveIndex(newIndex); // Update active thumbnail index

            // Scroll thumbnail container
            if (thumbnailContainerRef.current) {
                if (window.innerWidth < 480) {
                    // Scroll right for mobile screens
                    thumbnailContainerRef.current.scrollBy({
                        left: 80, // Adjust scroll step based on your layout
                        behavior: 'smooth',
                    });
                } else {
                    // Scroll down for larger screens
                    thumbnailContainerRef.current.scrollBy({
                        top: 80,
                        behavior: 'smooth',
                    });
                }
            }

            return newIndex;
        });
    };

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

        <div className='mobile-view-dimension-main' onClick={handleDimensionModal}>
          <RxDimensions size={20} color='#595959' />
          <p>Dimensions</p>
        </div>
      </div>


      {/* <div className={`dimension-modal-main-container ${dimensionModal ? 'show-dimension-modal' : ''}`}>
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
      </div> */}
      <GalleryModal 
        dimensionModal={dimensionModal}
        handleCloseDimensionModal={handleCloseDimensionModal}
        productData={productData} 
        variationData={variationData}
        handleNextImage={handleNextImage}
        handlePrevImage={handlePrevImage}
        activeIndex={activeIndex}
        handleThumbnailClick={handleThumbnailClick}
        thumbActiveIndex={thumbActiveIndex}
      />
    </>
  )
}

export default ProductDimension
