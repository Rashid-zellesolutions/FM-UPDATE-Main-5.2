import React, { useEffect, useState } from 'react'
import './RelatedCategories.css'
import { Link, useParams, useLocation } from 'react-router-dom'
import { url } from '../../../utils/api';

const RelatedCategories = () => {

    const { categorySlug } = useParams();
    const [categoryData, setCategoryData] = useState([])

    async function fetchHeaderPayloads() {
        try {
            const response = await fetch(`${url}/api/v1/header-payloads/get`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            });

            if (!response.ok) {
                throw new Error(`Error: ${response.status} ${response.statusText}`);
            }

            const data = await response.json();
            console.log("related categories ", data)
            return data;
        } catch (error) {
            console.error("Error fetching data:", error.message);
            throw error;
        }
    }

    const [relatedCategoriesData, setRelatedCategoriesData] = useState([])

    useEffect(() => {
        fetchHeaderPayloads().then(data => {
            setCategoryData(data.data[0].categories)
        }).catch(error => {
            console.error(error);
        });

        const unfilteredCategories = categoryData.find((item) => item.category_slug === categorySlug);

        setRelatedCategoriesData(unfilteredCategories?.subCategories)
    }, [])

    useEffect(() => { 
        const unfilteredCategories = categoryData.find((item) => item.category_slug === categorySlug);

        setRelatedCategoriesData(unfilteredCategories?.subCategories)
        // console.log("related categories", relatedCategoriesData) 
    }, [categoryData])

    

    return (
        <div className='related-categories-main-div'>
            <h3>Related Categories</h3>
            <div className='related-categories-items'>
                {relatedCategoriesData && relatedCategoriesData.map((item, index) => {
                    return <Link key={index} to={`/${categorySlug}/${item.slug}`}>{item.name}</Link>
                })}
            </div>
        </div>
    )
}

export default RelatedCategories
