import React from 'react'
import './BlogCard.css';
import rightArrowWithooutOutline from '../../../Assets/icons/arrow-right-without-outline-black.png'
import { FaStar } from "react-icons/fa";
import { CiStar } from "react-icons/ci";
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { url } from '../../../utils/api';

const BlogCard = (
    {
        img, 
        category, 
        title, 
        comments,
        navigateToSingleBlog,
        date,
        month,
        start
    }) => {
    
    const stars = [
        {star: <FaStar size={14} />},
        {star: <FaStar size={14} />},
        {star: <FaStar size={14} />},
        {star: <FaStar size={14} />},
        {star: <CiStar size={14} />},
    ]

  return (
    <>
        <div className='blog-card' onClick={navigateToSingleBlog}>
            <div className='blog-card-image'>
                <div className='blog-date-tag'>
                    <p>{date}</p>
                    <p>{month}</p>
                </div>
                <img src={`${url}${img}`} alt='img' />
            </div>
            <div className='blog-arther-details'>
                {/* <p>{category}</p> */}
                <h3>{title}</h3>
                <div className='blog-created-by-and-comments'>
                    <div className='blog-star-rating'>
                        {stars.map((item, index) => (
                            <p key={index}>{item.star}</p>
                        ))}
                        (200)
                    </div>
                    <span className='mobile-view-blog-card-author'>By: <p>Furniture Mecca</p></span>
                    <p>{comments}</p>
                </div>
            </div>
            <div className='blog-para-and-see-more'>
                <p>
                {start.length > 200 ? `${start.substring(0, 200)}...` : start}
                </p>
                <button>
                    Read more
                    <img src={rightArrowWithooutOutline} alt='right arrow' />
                </button>
            </div>
        </div> 
    </>
  )
}

export default BlogCard
