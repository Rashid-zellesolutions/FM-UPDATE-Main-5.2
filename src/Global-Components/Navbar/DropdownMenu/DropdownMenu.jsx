import React, { useState } from 'react'
import './DropdownMenu.css';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { formatedPrice, url } from '../../../utils/api';

const DropdownMenu = (
    {
        parentCategorySlug,
        navHeading,
        dropDownNavData,
        products
    }) => {
    // State and variables
    const location = useLocation();

    const segment = location.pathname.split('/');
    const lastSegment = segment[segment.length - 1];

    const [activeIndex, setActiveIndex] = useState(null);
    const navigate = useNavigate();

    const handleActiveIndex = (index) => {
        setActiveIndex(index);
    }

    const handleNavigate = (item) => {
        navigate(`/product/${item.slug}`, { state: item });
    }


    return ( 
        <div className='mattresses-main-div'>
            <div style={{ display: 'flex', width: '25%' }}>
                <div className='menu-links'>
                    {/* <h3 className='see-all-heading'>See All {navHeading}</h3> */}
                    <Link to={`/${parentCategorySlug}`} className='living-room-heading'>See All {navHeading}</Link>
                    <div className='mattresses-links-div'>
                        {dropDownNavData.map((item, index) => {
                            return <p className={`mattres-links ${lastSegment === item.slug ? 'active' : ''}`} key={index} onClick={() => handleActiveIndex(index)}>
                                <Link to={`/${parentCategorySlug}/${item.slug}`}>{item.name}</Link>
                            </p>
                        })}
                    </div>
                </div>
            </div>
            {
                products && <div className='mattresses-images-div'>
                    {products?.map((item, index) => {
                        return <Link
                            key={index}
                            className='mattress-image'
                            onClick={() => handleNavigate(item)}
                            to={{ pathname: `/product/${item.slug}`, state: item }}
                        >
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
                            </div>
                        </Link>
                    })}
                </div>
            }
        </div>
    )
}

export default DropdownMenu
