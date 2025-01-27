import React from 'react';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import './BlogSlider.css';
import diningRoomBlogImage from '../../../Assets/Furniture Mecca/Landing Page/blogs/Some-Basics-on-cleaning-Leather-Furniture 1.png';
import livingRoomBlogImage from '../../../Assets/Furniture Mecca/Landing Page/blogs/Some-Basics-On-Keeping-Your-Living-Room-Furniture-Clean 1.png';
import mattressBlogImage from '../../../Assets/Furniture Mecca/Landing Page/blogs/Perks-Of-Using-High-Quality-Mattresses-For-Sleeping 1.png';
import BlogCard from './BlogCard';
import leftArrow from '../../../Assets/icons/arrow-left-charcol.png'
import rightArrow from '../../../Assets/icons/right-arrow.png'
import { useBlog } from '../../../context/BlogsContext/blogsContext';
import { useNavigate } from 'react-router-dom';
import BlogCardShimmer from './BlogCardShimmer/BlogCardShimmer';
import { IoChevronForward } from "react-icons/io5";
import { IoChevronBack } from "react-icons/io5";
import { truncateTitle } from '../../../utils/api';

const SamplePrevArrow = (props) => {
  const { className, style, onClick } = props;
  return (
    <div onClick={onClick} className={`blog-slider-arrow blog-slider-arrow-left ${className}`} >
      {/* <img src={leftArrow} alt='arrow' /> */}
      <IoChevronBack />
    </div>
  )
}

function SampleNextArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div onClick={onClick} className={`blog-slider-arrow blog-slider-arrow-right ${className}`} >
      {/* <img src={rightArrow} alt='arrow' /> */}
      <IoChevronForward />
    </div>
  )
}


const BlogSlider = () => {

  const navigate = useNavigate()
  const { blogs } = useBlog()

  const maxLength = 50;

  const handleNavigateToSingleBlog = (item) => {
    navigate(`/single-blog/${item.id}`, { state: item })
  }

  var settings = {
    dots: false,
    infinite: true,
    // arrows: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    initialSlide: 0,
    arrows: true,
    nextArrow: <SampleNextArrow to="next" />,
    prevArrow: <SamplePrevArrow to="prev" />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: true,
          dots: false
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          initialSlide: 2
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  };


  return (
    <div className='blogs-main-container'>
      <h3>Exciting Blogs Created By <span>Furniture Mecca</span></h3>
      <p className='blogs-main-para'>
        Captivating narratives by Jasons Furniture Outlet, where each blog tells a unique tale of style,
        comfort, and functionality. Discover the enchanting stories behind every furnishing at The Furniture Depots,
        turning your home into a haven filled with both charm and character.
      </p>
      <div className='blogs-slider-main-container'>
        {blogs && blogs.length > 0 ? (
          <Slider {...settings}>
            {blogs.map((item, index) => (
              <div key={index} className='blog-cards-container'>
                <BlogCard
                  key={index}
                  navigateToSingleBlog={() => handleNavigateToSingleBlog(item)}
                  img={item.img}
                  category={item.category}
                  title={truncateTitle(item.title, maxLength)}
                  createdBy={item.createdBy}
                  comments={item.comments}
                  date={item.date}
                  month={item.month}
                  start={item.start}
                />
              </div>
            ))}
          </Slider>
        ) : (
          <div className='blog-card-shimmer-container'>
            {Array.from({ length: 3 }).map((_, index) => (
              <BlogCardShimmer />
            ))}
          </div>
        )}

      </div>
    </div>
  );
}

export default BlogSlider;
