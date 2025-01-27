import React, { useState } from 'react'
import './DropdownMenu.css';
import { Link, useNavigate } from 'react-router-dom';
import { formatedPrice, url } from '../../../utils/api';

const DropdownMenu = (
    {
        parentCategorySlug,
        navHeading,
        dropDownNavData,
        products
    }) => {
    // State and variables
    const [activeIndex, setActiveIndex] = useState(null);
    const navigate = useNavigate();

    const handleActiveIndex = (index) => {
        setActiveIndex(index);
    }

    const handleNavigate = (item) => {
        console.log("nav product", item)
        navigate(`/product/${item.slug}`, { state: item });
    }


    return (
        <div className='mattresses-main-div'>
            <div style={{ display: 'flex', width: '25%' }}>
                <div className='menu-links'>
                    <h3 className='living-room-heading'>{navHeading}</h3>
                    <div className='mattresses-links-div'>
                        {dropDownNavData.map((item, index) => {
                            return <p className={`mattres-links ${activeIndex === index ? 'active' : ''}`} key={index} onClick={() => handleActiveIndex(index)}>
                                <Link to={`/${parentCategorySlug}/${item.slug}`}>{item.name}</Link>
                            </p>
                        })}
                    </div>
                </div>
            </div>
            {
                products && <div className='mattresses-images-div'>
                    {products?.map((item, index) => {
                        return <div key={index} className='mattress-image' onClick={() => handleNavigate(item)}>
                            <img src={url + item.image} alt={item.name} />
                            <p className='image-title'><Link to={item.slug}>{item.name}</Link> </p>
                            <div className='pricing'>
                                {item.sale_price === "" ?
                                    <p className='price'>${item.regular_price}</p>
                                    : <span className='sale-price-container'>
                                        <del className='price'>{formatedPrice(item.regular_price)}</del>
                                        <p className='price-sale-price'>{formatedPrice(item.sale_price)}</p>
                                    </span> 
                                }
                                {/* <p className='price new'>${item.sale_price}</p> */}
                            </div>
                        </div>
                    })}
                </div>
            }
        </div>
    )
}

export default DropdownMenu
