import React, { createContext, useContext, useEffect, useState } from 'react';
import { url } from '../../utils/api';
import axios from 'axios';

// Create a Context for the blogs
const BlogsContext = createContext();

// Create a provider component
export const BlogsProvider = ({ children }) => {
    const [activeCategory, setActiveCategory] = useState(0);

    const [blogs, setBlogs] = useState([]);

    const customCategory = {
        _id: null,
        name: "All Blogs",
        slug: "all-blogs",
        description: "This category contains all blog posts.",
        status: "active",
        parentCategory: null,
        metaKeywords: [],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        __v: 0
    };

    const [blogCategories, setBlogCategories] = useState([])
    const fetchBlogCategories = async () => {
        const api = `/api/v1/blog-categories/get`;
        try {
            if (!blogCategories.length) {
                const response = await axios.get(`${url}${api}`);
                if (response.status === 200) {
                    // let result = response.data.categories;
                    setBlogCategories([customCategory, ...response.data.categories]);
                } else {
                    console.error("UnExpected Error", response.status)
                }
            }
        } catch (error) {
            console.error("Unexpected Server Error:", error)
            throw new Error("UnExpected Server Error")
        }
    }

    const fetchBlogs = async (categoryId) => {
        const api = `/api/v1/blogs/get`;
        try {
            let response
            if (categoryId === null) {
                response = await axios.get(`${url}${api}`);
                if (response.status === 200 && response.data.blogs) {
                    setBlogs(response.data.blogs);
                } else {
                    console.error("UnExpected Error", response.status);
                }
            } else {
                response = await axios.get(`${url}${api}?category=${categoryId}`);
                setBlogs(response.data.blogs);
            }
        } catch (error) {
            console.error("UnExpected Server Error", error);
        }
    }

    useEffect(() => {
        fetchBlogCategories()
        fetchBlogs(null)
      }, [])

    


    return (
        <BlogsContext.Provider value={{
            blogs,
            setBlogs,
            fetchBlogCategories,
            blogCategories,
            setBlogCategories,
            fetchBlogs,
            activeCategory,
            setActiveCategory,
        }}>
            {children}
        </BlogsContext.Provider>
    );
};

// export { BlogsContext, BlogsProvider };
export const useBlog = () => useContext(BlogsContext);