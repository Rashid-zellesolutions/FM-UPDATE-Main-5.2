import React from 'react'
import './RelatedCategories.css'
import { Link, useParams, useLocation } from 'react-router-dom'

const RelatedCategories = () => {
    // const {parentCategory} = window.location
    // console.log("product archive parent category", parentCategory)
    const { categorySlug } = useParams();
    const relatedCategoriesData = [
        { categoryName: 'Leather Living Room Sets', slug: 'living-room-sets'},
        { categoryName: 'Reclining Living Room Sets', slug: 'sofa-loveseat-sets'},
        { categoryName: 'Small Space Living Room Sets', slug: 'sectionals'},
        { categoryName: 'Sleeper Sofa Living Room Sets', slug: 'reclining-furniture'},
        {categoryName: 'Sofa & Loveseat Sets', slug: '#'},
        {categoryName: 'Sofa & Chair Sets', slug: '#'},
        {categoryName: 'Sofa & Chair Sets', slug: '#'},
        {categoryName: 'Sofa & Chair Sets', slug: '#'},
        {categoryName: 'Sofa & Chair Sets', slug: '#'},
    ]

    const fetchSubCategories = () => {
        // const api = `/api/v1/sub-category/get/${categoryData.slug}`
    }

  return (
    <div className='related-categories-main-div'>
            <h3>Related Categories</h3>
            <div className='related-categories-items'>
                {relatedCategoriesData.map((item, index) => {
                    return <Link key={index} to={`/${categorySlug}/${item.slug}`}>{item.categoryName}</Link>
                })}
            </div>
        </div>
  )
}

export default RelatedCategories
