import React, { useState } from 'react'
import './BlogPage.css';
import BlogHead from '../../Components/Blogs-Components/BlogsHead/BlogHead'
import AllBlogs from '../../Components/Blogs-Components/AllBlogs/AllBlogs';
import BlogPagination from '../../Components/Blogs-Components/BlogsPaginations/BlogPagination';
import { useBlog } from '../../../context/BlogsContext/blogsContext';

const BlogPage = () => {


  const {blogs} = useBlog()

  const blogsPerPage = 9; // Number of blogs to show per page
  const [currentPage, setCurrentPage] = useState(1);

  const totalBlogs = blogs?.length || 0;
  const totalPages = Math.ceil(totalBlogs / blogsPerPage);

  // Calculate the blogs to show for the current page
  const startIndex = (currentPage - 1) * blogsPerPage;
  const endIndex = startIndex + blogsPerPage;
  const blogsToShow = blogs.slice(startIndex, endIndex);

  // Handle next and previous buttons
  const handleNext = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrev = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div className='blogs-page-main-container'>
      <div className='blogs-page-main-heading-div'>
        <h3 className='blogs-page-main-heading'>Exciting Blogs Created by <span> Furniture Mecca </span></h3>
        <h3 className='mobile-view-blog-page-main-heading'>Exciting Blogs</h3>
      </div>
      <BlogHead />
      <AllBlogs blogData={blogsToShow} />
      <BlogPagination currentPage={currentPage} totalPages={totalPages} setCurrentPage={setCurrentPage} handlePrev={handlePrev} handleNext={handleNext} />
    </div>
  )
}

export default BlogPage
