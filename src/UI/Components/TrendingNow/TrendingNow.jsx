import React, { useEffect, useState } from 'react';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import './TrendingNow.css';
import { url } from '../../../utils/api';
import TrandingNowShmmer from './TrandingNowShimmer/TrandingNowShmmer';
import { Link, useNavigate } from 'react-router-dom';

const TrendingNow = ({ data }) => {
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        if (data && data?.sliders) {
            const interval = setInterval(() => {
                setCurrentIndex(prevIndex => (prevIndex + 1) % data?.sliders.length); // Correct logic
            }, 3000);

            return () => clearInterval(interval); // Cleanup interval
        }
    }, [data]);

    // Extract only the product objects (if data exists)
    const productArray = data ? Object.keys(data)
        .filter(key => key.startsWith('product_'))
        .map(key => data[key]) : [];

    const settings = {
        infinite: true,
        speed: 1000,
        autoplay: true,
        autoplaySpeed: 3000,
        slidesToShow: 1,
        slidesToScroll: 1,
        draggable: true,
        arrows: false,
        dots: false,
        pauseOnHover: false,
    };

    const navigate = useNavigate()
    const handleNavigate = (item) => {
        navigate(`/product/${item.link_url}`)
    }

    return (
        <>
            {data ? (
                <div className='trending-now-main-container'>
                    <h3>Trending Now</h3>
                    <div className='tranding-slider-and-categories'>
                        <div className="tranding-slider">
                            <div className="tranding-slides">
                                <Slider {...settings}>
                                    {data?.sliders.map((image, index) => (
                                        <div className="trending-slide" key={index} onClick={() => handleNavigate(image)}>
                                            <img
                                                src={`${url}${image.image_url}`}
                                                alt={`Slide ${index + 1}`}
                                            />
                                        </div>
                                    ))}
                                </Slider>
                            </div>
                        </div>
                        <div className='trending-items-cards'>
                            {productArray.map((item, index) => (
                                <div key={item.uid} className='trending-item-category' onClick={() => handleNavigate(item)}>
                                    <img
                                        src={`${url}${item.image_url}`}
                                        alt={item.alt_text}
                                        effect='blur'
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            ) : (
                <TrandingNowShmmer />
            )}
        </>
    );
};

export default TrendingNow;