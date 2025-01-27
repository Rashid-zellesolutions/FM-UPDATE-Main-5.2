import React, { useEffect, useState } from 'react'
import './MobileViewProductFilters.css'
import crossBtn from '../../../Assets/icons/close-btn.png'
import mainLogo from '../../../Assets/Logo/m_logo_360 2.png';
import AddBtn from '../../../Assets/icons/add-bold-btn.png'
import axios from 'axios';
import { url } from '../../../utils/api';
import RatingReview from '../starRating/starRating';
import DoubleRangeSlider from '../../../Global-Components/MultiRangeBar/MultiRange';

const MobileViewProductFilters = (
    {
        showMobileFilters,
        setMobileFilters,
        filtersData,
        priceRange,
        setPriceRange,
        handleColor,
        handleRating,
        handleCategory,
        colorValue,
        setColorValue,
        handlePriceRange,
        // tempRange, setTampRange
    }) => {

    // console.log("FILTERS DATA", filtersData)

    const handleFiltersClose = () => {
        setMobileFilters(false)
    }

    const [colorFilter, setColorFilter] = useState('');
    const [ratingFilter, setRatingFilter] = useState('')
    const [categoryFilter, setCategoryFilter] = useState('')

    const handleFilterType = (type) => {
        setColorFilter((prevOpen) => prevOpen === type ? '' : type)
        setRatingFilter((prevOpen) => prevOpen === type ? '' : type);
        setCategoryFilter((prevOpen) => prevOpen === type ? '' : type)
    }
    const [showAllFilters, setShowAllFilters] = useState(false)
    const handleShowAllFilters = () => {
        setShowAllFilters(!showAllFilters)
    }

    // const [tempRange, setTampRange] = useState([])
    const [tempColorValue, setTempColorValue] = useState([]);
    const [tempRatingValue, setTempRatingValue] = useState([]);
    const [tempCategoryValue, setTempCategoryValue] = useState([])

    // useEffect(() => {
    //     setTampRange([filtersData?.priceRange?.minPrice, filtersData?.priceRange?.maxPrice])
    //     console.log("price range on effect", tempRange)
    // }, [])


    // const handleMobileRangeChange = (newRange) => {

    //     setTampRange(newRange)
    //     // handlePriceRange(tempRange)
    //     console.log("temp range", newRange)
    //     // console.log("price range filter call", newRange)
    // }


    const handleMobileColorCheck = (value) => {
        const updatedColorValue = tempColorValue.includes(value) ?
            tempColorValue.filter((item) => item !== value) :
            [...colorValue, value]

        setTempColorValue(updatedColorValue)
    }

    const handleMobileRatingFilter = (value) => {
        const updatedRating = tempRatingValue.includes(value) ?
            tempRatingValue.filter((item) => item !== value) :
            [...tempRatingValue, value];

        setTempRatingValue(updatedRating)
    }

    const handleMobileCategorySelect = (value) => {
        const updatedCategory = tempCategoryValue.includes(value) ?
            tempCategoryValue.filter((item) => item !== value) :
            [...tempCategoryValue, value]

        setTempCategoryValue(updatedCategory)
    }

    const handlePriceRangeClick = () => {
        // if (tempRange[0] !== priceRange[0] || tempRange[1] !== priceRange[1]) {
            handlePriceRange(priceRange)
        // }

        if(tempColorValue.length > 0) {
            handleColor(tempColorValue)
        }
        if(tempRatingValue.length > 0) {
            handleRating(tempRatingValue);
        }
        if(tempCategoryValue.length > 0) {
            handleCategory(tempCategoryValue)
        }

        setMobileFilters(false)

    }

    return (
        <div className={`mobile-view-flters-popup ${showMobileFilters ? 'show-mobile-filter-popup' : ''}`}>
            <button className='close-mobile-filters' onClick={handleFiltersClose}>
                <img src={crossBtn} alt='close btn' />
            </button>
            <div className='mobile-view-filters-head'>
                <a href='/'>
                    <img src={mainLogo} alt='logo' />
                </a>
            </div>

            <div className='mobile-view-filters-body'>
                <div className='mobile-view-filters-body-head'>
                    <h3>Filters</h3>
                    <a>Clear Filters</a>
                </div>
                <div className='mobile-view-filters-div'>

                    <DoubleRangeSlider
                        min={filtersData?.priceRange?.minPrice}
                        max={filtersData?.priceRange?.maxPrice}
                        initialRange={priceRange}
                        setInitialRange={setPriceRange}
                        onRangeChange={handlePriceRange}
                        minLabel='Min Price:'
                        maxLabel='Max Price:'
                    />

                    <div className='mobile-view-single-filter-dropdown'>
                        <div className='mobile-view-single-type'
                            onClick={() => handleFilterType('open-color')}
                        >
                            <p>{filtersData?.colors?.[0]?.name}</p>
                            <img src={AddBtn} alt='add btn' className={`show-filter-add-button 
                                     ${colorFilter === 'open-color' ? 'mobile-filter-section-button-rotate' : ''}`
                            } />
                        </div>
                        <div className={`mobile-single-type-filters 
                                ${colorFilter === 'open-color' ? 'show-filter-type' : ''}`
                        }>
                            {filtersData?.colors?.[0]?.options.map((item, index) => (
                                <label className='single-filter-label' key={index}>
                                    <input
                                        type='checkbox'
                                        placeholder='checkbox'
                                        value={item.name}
                                        onChange={(e) => handleMobileColorCheck(e.target.value)}
                                        style={{ backgroundColor: item.value, border: `2px solid ${item.value}` }}
                                        className='color-custom-checkbox'
                                        id={`filter-${index}`}
                                    />
                                    {item.name}
                                </label>
                            ))}
                        </div>
                    </div>

                    {/* Rating Filter */}

                    <div className='mobile-view-single-filter-dropdown'>
                        <div className='mobile-view-single-type'
                            onClick={() => handleFilterType('open-rating')}
                        >
                            <p>Ratings</p>
                            <img src={AddBtn} alt='add btn' className={`show-filter-add-button 
                                     ${colorFilter === 'open-rating' ? 'mobile-filter-section-button-rotate' : ''}`
                            } />
                        </div>
                        <div className={`mobile-single-type-filters 
                                ${colorFilter === 'open-rating' ? 'show-filter-type' : ''}`
                        }>
                            {[...Array(5).keys()].reverse().map((item, index) => (
                                <span key={index} className={`color-span`} >
                                    <input
                                        type='checkbox'
                                        placeholder='checkbox'
                                        value={item + 1}
                                        onChange={(e) => handleMobileRatingFilter(e.target.value)}
                                        className='custom-checkbox'
                                        id={`filter-${index}`}
                                    />
                                    <label htmlFor={`filter-${5 - item}`}>
                                        <RatingReview rating={item + 1} disabled={true} size={"20px"} />
                                    </label>
                                </span>
                            ))}
                        </div>
                    </div>

                    <div className='mobile-view-single-filter-dropdown'>
                        <div className='mobile-view-single-type'
                            onClick={() => handleFilterType('open-category')}
                        >
                            <p>Categories</p>
                            <img src={AddBtn} alt='add btn' className={`show-filter-add-button 
                                     ${categoryFilter === 'open-category' ? 'mobile-filter-section-button-rotate' : ''}`
                            } />
                        </div>
                        <div className={`mobile-single-type-filters 
                                ${categoryFilter === 'open-category' ? 'show-filter-type' : ''}`
                        }>
                            {filtersData?.categories?.map((item, index) => (
                                <span key={index} className={`color-span`} >
                                    <input
                                        type='checkbox'
                                        placeholder='checkbox'
                                        value={item.name}
                                        onChange={(e) => handleMobileCategorySelect(e.target.value)}
                                        className='custom-checkbox'
                                        id={`filter-${index}`}
                                    />
                                    <label htmlFor={`filter-${index}`}>{item.name}</label>
                                </span>
                            ))}
                        </div>
                    </div>

                </div>

                <div className='mobile-view-filters-togle-button'>
                    <button className='mobile-view-more-filters-button' onClick={handleShowAllFilters}>
                        {showAllFilters ? 'View Less Filters' : 'View All Filters'}
                    </button>
                </div>
                <div className='mobile-view-filters-togle-button'>
                    <button className='mobile-view-result-button' onClick={handlePriceRangeClick}>
                        View Result
                    </button>
                </div>
            </div>

        </div>
    )
}

export default MobileViewProductFilters
