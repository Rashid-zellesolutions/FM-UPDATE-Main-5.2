import React, { useState, useRef, useEffect } from 'react';
import './ProductGallery.css';

// Assets
import { 
    IoIosArrowUp, 
    IoIosArrowDown, 
    IoIosArrowBack, 
    IoIosArrowForward, 
    IoMdArrowDropleft 
} from "react-icons/io";


import 'react-medium-image-zoom/dist/styles.css';
import { url } from '../../../../utils/api';

const ProductGallery = ({ productImages, productData, selectedVariationData }) => {

    const [activeIndex, setActiveIndex] = useState(0); // For main slider image
    const [thumbActiveIndex, setThumbActiveIndex] = useState(0); // For active thumbnail
    const thumbnailContainerRef = useRef(null); // To control the vertical scroll

    // const handleThumbnailClick = (index) => {
    //     setActiveIndex(index);
    //     setThumbActiveIndex(index);

    //     // Prevent page scroll
    //     if (thumbnailContainerRef.current) {
    //         const thumbnailElement = thumbnailContainerRef.current.children[index];
    //         thumbnailContainerRef.current.scrollTo({
    //             top: thumbnailElement.offsetTop - (thumbnailContainerRef.current.clientHeight / 2) + (thumbnailElement.clientHeight / 2),
    //             behavior: 'smooth',
    //         });
    //     }
    // };

    // const handleScrollUp = () => {
    //     setThumbActiveIndex((prevIndex) => {

    //         const length =
    //             productData.type === 'variable'
    //                 ? selectedVariationData?.images?.length
    //                 : productData?.images?.length;

    //         const newIndex = prevIndex === 0 ? length - 1 : prevIndex - 1;
    //         setActiveIndex(newIndex); // Update the active main image index
    //         if (thumbnailContainerRef.current) {
    //             thumbnailContainerRef.current.scrollBy({
    //                 top: -80,
    //                 behavior: 'smooth',
    //             });
    //         }
    //         return newIndex;
    //     });
    // };

    // const handleScrollDown = () => {
    //     setThumbActiveIndex((prevIndex) => {

    //         const length =
    //             productData.type === 'variable'
    //                 ? selectedVariationData?.images?.length
    //                 : productData?.images?.length;

    //         const newIndex = prevIndex === length - 1 ? 0 : prevIndex + 1;
    //         setActiveIndex(newIndex); // Update the active main image index
    //         if (thumbnailContainerRef.current) {
    //             thumbnailContainerRef.current.scrollBy({
    //                 top: 80,
    //                 behavior: 'smooth',
    //             });
    //         }
    //         return newIndex;
    //     });
    // };

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

    const handleScrollUp = () => {
        setThumbActiveIndex((prevIndex) => {
            const length =
                productData.type === 'variable'
                    ? selectedVariationData?.images?.length
                    : productData?.images?.length;

            const newIndex = prevIndex === 0 ? length - 1 : prevIndex - 1;
            setActiveIndex(newIndex); // Update the active main image index

            if (thumbnailContainerRef.current) {
                if (window.innerWidth < 480) {
                    // Scroll horizontally for mobile view
                    thumbnailContainerRef.current.scrollBy({
                        left: -80,
                        behavior: 'smooth',
                    });
                } else {
                    // Scroll vertically for larger screens
                    thumbnailContainerRef.current.scrollBy({
                        top: -80,
                        behavior: 'smooth',
                    });
                }
            }
            return newIndex;
        });
    };

    const handleScrollDown = () => {
        setThumbActiveIndex((prevIndex) => {
            const length =
                productData.type === 'variable'
                    ? selectedVariationData?.images?.length
                    : productData?.images?.length;

            const newIndex = prevIndex === length - 1 ? 0 : prevIndex + 1;
            setActiveIndex(newIndex); // Update the active main image index

            if (thumbnailContainerRef.current) {
                if (window.innerWidth < 480) {
                    // Scroll horizontally for mobile view
                    thumbnailContainerRef.current.scrollBy({
                        left: 80,
                        behavior: 'smooth',
                    });
                } else {
                    // Scroll vertically for larger screens
                    thumbnailContainerRef.current.scrollBy({
                        top: 80,
                        behavior: 'smooth',
                    });
                }
            }
            return newIndex;
        });
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
                    ? selectedVariationData?.images?.length
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






    // const handlePrevImage = () => {
    //     setActiveIndex((prevIndex) => {
    //         if (prevIndex === 0) return prevIndex; // Prevent moving before first item

    //         const newIndex = prevIndex - 1;
    //         setThumbActiveIndex(newIndex); // Update active thumbnail index

    //         // Scroll thumbnail container upwards
    //         if (thumbnailContainerRef.current) {
    //             thumbnailContainerRef.current.scrollBy({
    //                 top: -80,  // Adjust scroll step based on your layout
    //                 behavior: 'smooth',
    //             });
    //         }

    //         return newIndex;
    //     });
    // };

    // const handleNextImage = () => {
    //     setActiveIndex((prevIndex) => {

    //         const length =
    //             productData.type === 'variable'
    //                 ? selectedVariationData?.images?.length
    //                 : productData?.images?.length;

    //         if (prevIndex === length - 1) return prevIndex; // Prevent moving after last item

    //         const newIndex = prevIndex + 1;
    //         setThumbActiveIndex(newIndex); // Update active thumbnail index

    //         // Scroll thumbnail container downwards
    //         if (thumbnailContainerRef.current) {
    //             thumbnailContainerRef.current.scrollBy({
    //                 top: 80,  // Adjust scroll step based on your layout
    //                 behavior: 'smooth',
    //             });
    //         }

    //         return newIndex;
    //     });
    // };

    return (
        <div className='product-gallery-main-container'>
            {/* Thumbnail Section */}
            <div className='product-gallery-thumbnail-section'>
                <IoIosArrowUp
                    size={25}
                    className={`product-thumbnail-arrow product-thumbnail-arrow-up ${thumbActiveIndex === 0 ? 'disabled' : ''}`}
                    onClick={thumbActiveIndex === 0 ? null : handleScrollUp}
                />

                <div
                    className='product-thumbnail-images'
                    ref={thumbnailContainerRef}
                >
                    {productData.type === 'variable' ?
                        (selectedVariationData?.images || []).map((thumbItem, thumbIndex) => (
                            <div
                                key={thumbIndex}
                                className={`product-thumbnail-single-image-div ${thumbIndex === thumbActiveIndex ? 'active-thumb' : ''}`}
                                onClick={() => handleThumbnailClick(thumbIndex)}
                            >
                                <IoMdArrowDropleft size={30} color='#4487C5' className={`arrow-pointer ${thumbIndex === thumbActiveIndex ? 'show-pointer-arrow' : ''}`} />
                                <img src={`${url}${thumbItem.image_url}`} alt="thumb" className="product-thumbnail-single-image" />
                            </div>
                        ))
                        : (productData?.images || []).map((thumbItem, thumbIndex) => (
                            <div
                                key={thumbIndex}
                                className={`product-thumbnail-single-image-div ${thumbIndex === thumbActiveIndex ? 'active-thumb' : ''}`}
                                onClick={() => handleThumbnailClick(thumbIndex)}
                            >
                                <IoMdArrowDropleft size={30} color='#4487C5' className={`arrow-pointer ${thumbIndex === thumbActiveIndex ? 'show-pointer-arrow' : ''}`} />
                                <img src={`${url}${thumbItem.image_url}`} alt="thumb" className="product-thumbnail-single-image" />
                            </div>
                        ))
                    }
                </div>

                <IoIosArrowDown
                    size={25}
                    // className={`product-thumbnail-arrow product-thumbnail-arrow-down ${thumbActiveIndex === productData.type === 'variable' ? selectedVariationData?.images?.length : productData?.images.length - 1 ? 'disabled' : ''}`}
                    // onClick={thumbActiveIndex === productData.type === 'variable' ? selectedVariationData?.images?.length : productData?.images.length - 1 ? null : handleScrollDown}
                    className={`product-thumbnail-arrow product-thumbnail-arrow-down ${thumbActiveIndex ===
                        (productData.type === 'variable'
                            ? selectedVariationData?.images?.length - 1
                            : productData?.images?.length - 1)
                        ? 'disabled'
                        : ''
                        }`}
                    onClick={
                        thumbActiveIndex ===
                            (productData.type === 'variable'
                                ? selectedVariationData?.images?.length - 1
                                : productData?.images?.length - 1)
                            ? null
                            : handleScrollDown
                    }
                />
                <button className='product-gallery-view-all-button'>
                    View All
                </button>
            </div>

            {/* Main Slider Section */}
            <div className='product-gallery-main-slider-section'>
                <button
                    onClick={handlePrevImage}
                    disabled={activeIndex === 0}
                    className={`product-gallery-main-slider-arrow product-gallery-arrow-back ${activeIndex === 0 ? 'disabled-button' : ''}`}
                >
                    <IoIosArrowBack
                        size={20}
                        className='product-gallery-arrow'
                    />
                </button>

                <div
                    className='product-gallery-main-slider-images'
                    style={{ transform: `translateX(-${activeIndex * 100}%)` }} // Move the slider based on the active index
                >
                    {productData.type === 'variable' ?
                        (selectedVariationData?.images || []).map((slideItem, slideIndex) => (
                            <div key={slideIndex} className='product-gallery-main-slider-single-image-container'>
                                <img
                                    src={`${url}${slideItem.image_url}`}
                                    alt='Main slide'
                                    className='product-gallery-main-slider-image'
                                />
                            </div>
                        ))
                        : (productData?.images || []).map((slideItem, slideIndex) => (
                            <div key={slideIndex} className='product-gallery-main-slider-single-image-container'>
                                <img
                                    src={`${url}${slideItem.image_url}`}
                                    alt='Main slide'
                                    className='product-gallery-main-slider-image'
                                />
                            </div>
                        ))
                    }
                </div>

                <button
                    onClick={handleNextImage}
                    disabled={activeIndex === productImages?.length - 1}
                    className={`product-gallery-main-slider-arrow product-gallery-arrow-right ${activeIndex === productImages?.length - 1 ? 'disabled-button' : ''}`}
                >
                    <IoIosArrowForward
                        size={20}
                        className='product-gallery-arrow'
                    />
                </button>
            </div>
        </div>
    );
};

export default ProductGallery;
