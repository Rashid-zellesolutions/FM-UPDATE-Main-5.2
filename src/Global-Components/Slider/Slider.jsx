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


// Slider component accepting images as props
const Sliderr = ({ images, height }) => {

    // State and variables
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isHovered, setIsHovered] = useState(false);
    const [imagePreloader, setImagePreloader] = useState(false);

    // Functions
    const handleMouseEnter = () => {
        setIsHovered(true);
    }

    const handleMouseLeave = () => {
        setIsHovered(false);
    }

    const nextSlide = () => {
        setCurrentIndex(prevIndex => (images?.length ? (prevIndex + 1) % images?.length : 0));
    };

    useEffect(() => {
        const interval = setInterval(nextSlide, 3000);
        return () => clearInterval(interval);
    }, [images]);

    const mobileViewSLider = [
        { img: sliderImageOne },
        { img: sliderImageThree },
        { img: sliderImageFour },
    ]

    // Custom arrows
    const CustomPrevArrow = ({ onClick }) => (
        <div className="arrow left-arrow" onClick={onClick} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
            {/* <img src={isHovered ? arrowLeftRed : ArrowLeft} alt="arrow left" /> */}
            <IoChevronBack />
        </div>
    );

    const CustomNextArrow = ({ onClick }) => (
        <div className="arrow right-arrow" onClick={onClick} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
            {/* <img src={isHovered ? arrowRightRed : ArrowRight} alt="arrow right" /> */}
            <IoChevronForward />
        </div>
    );


    const settings = {
        dots: false, // Set to true if you want dot navigation
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 1000000,
        pauseOnHover: false,
        prevArrow: imagePreloader ? <CustomPrevArrow /> : <></>,
        nextArrow: imagePreloader ? <CustomNextArrow /> : <></>,
    };

    return (
        <>
            <div className="slider" style={{ cursor: 'grab', height: height ? height : "calc(100vw * 0.26355)" }}>
                <Slider {...settings}>
                    {images?.map((img, index) => (
                        <Link to={`/product/${img?.link_url}`} className="slide" key={index}>
                            <img
                                src={`${url}${img.image_url}`}
                                alt={`slide ${index + 1}`}
                                onDragStart={(e) => e.preventDefault()}
                                onLoad={() => setImagePreloader(true)}
                            />

                        </Link>
                    ))}
                </Slider>
                {!imagePreloader && <div className='image_preloader'>
                    <img src={loader} alt="" srcset="" />
                </div>}
            </div>

            {/* Mobile View */}

            <div className="mobile-view-slider">
                <Slider {...settings}>
                    {images?.map((img, index) => (
                        <div className="mobile-slide" key={index}>
                            <img
                                src={mobileViewSLider?.[index]?.img}
                                alt={`slide ${index + 1}`}
                                onDragStart={(e) => e.preventDefault()}
                            />
                        </div>
                    ))}
                </Slider>
            </div>
        </>
    );
};
export default Sliderr;
