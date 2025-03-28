import React, { useEffect, useState } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './Slider.css';

import sliderImageOne from '../../Assets/Furniture Mecca/Landing Page/Slider/mobile-view-banner.png';
import sliderImageThree from '../../Assets/Furniture Mecca/Landing Page/Slider/sofa4.png';
import sliderImageFour from '../../Assets/Furniture Mecca/Landing Page/Slider/sofa2.png';
import { url } from '../../utils/api';
import loader from "../../Assets/Loader-animations/loader-check-two.gif"
import { IoChevronForward } from "react-icons/io5";
import { IoChevronBack } from "react-icons/io5";
import { Link } from 'react-router-dom';

const Sliderr = ({ images, height, autoSlideSpeed = 5000 }) => { 

    const [currentIndex, setCurrentIndex] = useState(0);
    const [isHovered, setIsHovered] = useState(false);
    const [isDragging, setIsDragging] = useState(false);
    const [imagePreloader, setImagePreloader] = useState(false);

    const handleMouseEnter = () => setIsHovered(true);
    const handleMouseLeave = () => setIsHovered(false);

    const nextSlide = () => {
        setCurrentIndex(prevIndex => (images?.length ? (prevIndex + 1) % images?.length : 0));
    };

    // These events will help determine if a drag is happening
    const handleMouseDown = (e) => {
        setIsDragging(false); // Reset drag state on mouse down
    };

    const handleMouseMove = (e) => {
        if (e.buttons === 1) {
            setIsDragging(true); // Mark as dragging when moving with the left mouse button
        }
    };

    const handleClick = (e) => {
        if (isDragging) {
            e.preventDefault(); // Prevent navigation if it was a drag
        }
    };

    useEffect(() => {
        const interval = setInterval(nextSlide, autoSlideSpeed);
        return () => clearInterval(interval);
    }, [images, autoSlideSpeed]);

    // Custom arrows
    const CustomPrevArrow = ({ onClick }) => (
        <div className="arrow left-arrow" onClick={onClick} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
            <IoChevronBack />
        </div>
    );

    const CustomNextArrow = ({ onClick }) => (
        <div className="arrow right-arrow" onClick={onClick} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
            <IoChevronForward />
        </div>
    );

    const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: autoSlideSpeed,  // Using the passed prop for auto-slide speed
        pauseOnHover: false,
        prevArrow: imagePreloader ? <CustomPrevArrow /> : <></>,
        nextArrow: imagePreloader ? <CustomNextArrow /> : <></>,
        beforeChange: () => setIsDragging(true),
        afterChange: () => setIsDragging(false),
    };

    return (
        <>
            <div className="slider" style={{ cursor: 'grab', height: height || "calc(100vw * 0.26355)" }}>
                <Slider {...settings}>
                    {images && images?.desktop?.map((img, index) => (
                        <Link
                            to={`/product/${img.link_url}`}
                            className="slide"
                            key={index}
                            onMouseDown={handleMouseDown}
                            onMouseMove={handleMouseMove}
                            onClick={handleClick}  // prevent click if dragging
                        >
                            <img
                                src={`${url}${img.image_url}`}
                                alt={`slide ${index + 1}`}
                                onDragStart={(e) => e.preventDefault()}  // Prevent drag
                                onLoad={() => setImagePreloader(true)}
                            />
                        </Link>
                    ))}
                </Slider>
                {!imagePreloader && <div className='image_preloader'>
                    <img src={loader} alt="" />
                </div>}
            </div>

            {/* Mobile View */}
            <div className="mobile-view-slider">
                {images?.mobile?.length > 0 ? (
                    <Slider {...settings}>
                        {images?.mobile?.map((img, index) => (
                            <Link
                                to={`/product/${img.link_url}`}
                                className="mobile-slide"
                                key={index}
                                onMouseDown={handleMouseDown}
                                onMouseMove={handleMouseMove}
                                onClick={handleClick}  // prevent click if dragging
                            >
                                <img
                                    src={`${url}${img.image_url}`}
                                    alt={`slide ${index + 1}`}
                                    onDragStart={(e) => e.preventDefault()}  // Prevent drag
                                />
                            </Link>
                        ))}
                    </Slider>
                ) : (
                    <div className='mobile-view-slider-shimmer'></div>
                )}
            </div>
        </>
    );
};

export default Sliderr;
