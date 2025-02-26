import React, { useEffect, useRef, useState } from 'react'
import './BlogHead.css'
import { useBlog } from '../../../../context/BlogsContext/blogsContext';

const BlogHead = ({blogCategories }) => {

    
  // const [activeCategory, setActiveCategory] = useState(0);
  const {
    activeCategory,
      setActiveCategory
  } = useBlog()

  const [sliderStyle, setSliderStyle] = useState({ width: "0px", left: "0px" });

  const categoryRefs = useRef([]);

  useEffect(() => {
    if (categoryRefs.current[activeCategory]) {
      const selectedCategory = categoryRefs.current[activeCategory];
      setSliderStyle({
        width: `${selectedCategory.offsetWidth}px`,
        left: `${selectedCategory.offsetLeft}px`,
      });
    }
  }, [activeCategory, blogCategories]);

  const handleSelectedCategory = (index) => {
    setActiveCategory(index);
  }
  return (
    <>
    <div className='blog-head-main-container'>
      {blogCategories.map((item, index) => (
        <p 
          key={index} 
          ref={(el) => (categoryRefs.current[index] = el)}
          className={`blog-head-category-type ${activeCategory === index ? 'active-category' : ''}`}
          onClick={() => handleSelectedCategory(index)}
        >
          {item.name}
        </p>
      ))}
        {/* Background slider div with dynamic width and position */}
        <div className="bg-slider" style={sliderStyle} />
    </div>
    <div className='mobile-view-blog-head-main-container'>
      {blogCategories.slice(0, 6).map((item, index) => (
        <p className='mobile-view-blog-head-category-type'>{item.name}</p>
      ))}
    </div>
    </>
  )
}

export default BlogHead
