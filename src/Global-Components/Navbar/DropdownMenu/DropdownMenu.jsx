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

    const chunkArray = (arr, size) => {
        const result = [];
        for (let i = 0; i < arr.length; i += size) {
            result.push(arr.slice(i, i + size));
        }
        return result;
    };

    const chunkedNavData = chunkArray(dropDownNavData, 11);

    const handleNavigate = (item) => {
        navigate(`/product/${item.slug}`, { state: item });
    }


    return (
        <div className='mattresses-main-div'>
            <div style={{ display: 'flex' }}>
                <div className='menu-links'>
                    {/* <h3 className='see-all-heading'>See All {navHeading}</h3> */}
                    <Link to={`/${parentCategorySlug}`} className='living-room-heading'>{`See All ${navHeading}`}</Link>
                    
                    <div className='mattresses-links-div'>
                        {chunkedNavData.map((chunk, columnIndex) => (
                            <div className='mattress-column' key={columnIndex}>
                                {chunk.map((item, index) => (
                                    <p
                                        className={`mattres-links ${lastSegment === item.slug ? 'active' : ''}`}
                                        key={index}
                                        onClick={() => handleActiveIndex(index)}
                                    >
                                        <Link to={`/${parentCategorySlug}/${item.slug}`}>{item.name}</Link>
                                    </p>
                                ))}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            {
                products && <div className='mattresses-images-div' >
                    {products?.map((item, index) => {
                        return <Link
                            key={index}
                            className='mattress-image'
                            onClick={() => handleNavigate(item)}
                            to={{ pathname: `/product/${item.slug}`, state: item }}
                        >
                            <img src={url + item.image} alt={item.name} />
                            <Link className='image-title' to={item.slug}>{item.name}</Link>
                            <div className='pricing'>
                                {item.sale_price === "" ?
                                    <p className='price'>${item.regular_price}</p>
                                    : <span className='sale-price-container'>
                                        <p className='price-sale-price'>{formatedPrice(item.sale_price)}</p>
                                        <del className='price'>{formatedPrice(item.regular_price)}</del>
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
