import React from 'react'
import './RelatedCategories.css'
import { Link, useParams, useLocation } from 'react-router-dom'

const RelatedCategories = () => {
    // const {parentCategory} = window.location
    // console.log("product archive parent category", parentCategory)
    const relatedCategoriesData = [
        {categoryName: 'Leather Living Room Sets', link: '#'},
        {categoryName: 'Reclining Living Room Sets', link: '#'},
        {categoryName: 'Small Space Living Room Sets', link: '#'},
        {categoryName: 'Sleeper Sofa Living Room Sets', link: '#'},
        {categoryName: 'Sofa & Loveseat Sets', link: '#'},
        {categoryName: 'Sofa & Chair Sets', link: '#'},
        {categoryName: 'Sofa & Chair Sets', link: '#'},
        {categoryName: 'Sofa & Chair Sets', link: '#'},
        {categoryName: 'Sofa & Chair Sets', link: '#'},
    ]

    const fetchSubCategories = () => {
        // const api = `/api/v1/sub-category/get/${categoryData.slug}`
    }

  return (
    <div className='related-categories-main-div'>
            <h3>Related Categories</h3>
            <div className='related-categories-items'>
                {relatedCategoriesData.map((item, index) => {
                    return <Link key={index} to={item.link}>{item.categoryName}</Link>
                })}
            </div>
        </div>
  )
}

export default RelatedCategories
