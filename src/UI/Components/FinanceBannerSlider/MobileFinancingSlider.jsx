import React from 'react'
import './MobileFinancingSlider.css'
import payFour from '../../../Assets/Furniture Mecca/Landing Page/sale banner/payFour.png';
import monthCountBanner from '../../../Assets/Furniture Mecca/Landing Page/sale banner/12Month.png';
import noCredit from '../../../Assets/Furniture Mecca/Landing Page/sale banner/noCreditNeed.png'
import Slider from 'react-slick';

const MobileFinancingSlider = () => {
    const mobileSlider = [
        payFour,
        monthCountBanner,
        noCredit,
    ]

    const settings = {
        dots: false, // Show navigation dots
        infinite: true, // Infinite loop
        speed: 500, // Transition speed (in ms)
        slidesToShow: 1, // Number of slides to show at once
        slidesToScroll: 1, // Number of slides to scroll per action
        autoplay: true, // Enables autoplay
        autoplaySpeed: 3000, // Autoplay interval (in ms)
        draggable: true, // Allows drag/swipe functionality
        pauseOnHover: false, // Pause autoplay on hover
        arrows: false, // Show left/right navigation arrows
    };

    return (
        <div className="mobile-carousel-container">
            <Slider {...settings}>
                {mobileSlider.map((image, index) => (
                    <div className="carousel-slide" key={index}>
                        <img
                            src={image}
                            alt={`slide ${index + 1}`}
                        />
                    </div>
                ))}
            </Slider>
        </div>
    )
}

export default MobileFinancingSlider
