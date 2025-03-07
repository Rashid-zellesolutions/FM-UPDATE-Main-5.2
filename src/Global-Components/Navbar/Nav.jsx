import React, { useEffect, useState } from 'react'
import './Nav.css';
import DropdownMenu from './DropdownMenu/DropdownMenu';
import { useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';

const Nav = ({ navLinks, sale_data }) => {

    // States and variables
    const [dropdownOpen, setDropdownOpen] = useState(null);
    const [activeIndex, setActiveIndex] = useState(null)
    const location = useLocation()

    // Functions
    const handleMouseEnter = (index) => {
        setDropdownOpen(index)
    }

    const handleMouseLeave = () => {
        setDropdownOpen(null);
    }

    useEffect(() => {
        setDropdownOpen(null)
        setActiveIndex(location.pathname)
    }, [location])


    return (
        <div className='navbar'>
            {navLinks?.length > 0 ? (
                <nav className='navar-links-container'>
                    {navLinks.map((item, index) => {
                        return <h3 key={index} onMouseEnter={() => item.subCategories.length > 0 && handleMouseEnter(index)}
                            onMouseLeave={handleMouseLeave}
                            className={`nav-item ${activeIndex === `/${item.category_slug}` ? 'active' : ''}`}>
                            
                            <Link to={`/${item.category_slug}`} className={`nav-link ${activeIndex === `/${item.category_slug}` ? 'active-nav-link' : ''}`}> {item.category} </Link>

                            {/* {dropdownOpen === index && ( */}
                                <div className={`dropdown ${dropdownOpen === index ? 'show-drop-down' : ''}`}>
                                    <DropdownMenu
                                        parentCategorySlug={item.category_slug}
                                        navHeading={item.category}
                                        dropDownNavData={item.subCategories}
                                        products={item.products}
                                    />
                                </div>
                             {/* )} */}
                        </h3>
                    })}

                    <h3
                        className={`nav-item ${activeIndex === sale_data.link ? 'active' : ''}`}>
                        <Link
                            to={{
                                pathname: `/${sale_data.category_slug}`,
                                state: { sale_data } // Passing data via state
                            }}
                            className='nav-link'
                        >
                            {sale_data.category}
                        </Link>
                    </h3>

                </nav>
            ) : (
                <div className='shimmer-nav-item-container'>
                    {Array.from({length: 6}).map((_, index) => (
                        <div className='nav-item-shimmer'></div>
                    ))}
                </div>
            )}


            {navLinks?.length > 0 ? (
                <div className='mobile-navbar'>
                    {navLinks.map((item, index) => {
                        return <h3 key={index} onMouseEnter={() => item.subCategories.length > 0 && handleMouseEnter(index)}
                            onMouseLeave={handleMouseLeave}
                            className={`mobile-nav-link ${activeIndex === item.link ? 'active' : ''}`}>
                            <Link to={`/${item.category_slug}`} > {item.category} </Link>
                        </h3>
                    })}
                </div>
            ) : (
                    <div className='mobile-shimmer-nav-item-container'>
                        {Array.from({ length: 4 }).map((_, index) => (
                            <div className='mobile-nav-item-shimmer'></div>
                        ))}
                    </div>
            )}
            
        </div>
    )
}

export default Nav
