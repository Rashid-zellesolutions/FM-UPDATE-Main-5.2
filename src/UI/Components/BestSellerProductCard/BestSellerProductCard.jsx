import React from 'react'
import './BestSellerProductCard.css';
import heartIcon from '../../../Assets/icons/like.png'
import { VscHeartFilled } from "react-icons/vsc";
import { useList } from '../../../context/wishListContext/wishListContext';
import RatingReview from '../starRating/starRating';
import { formatedPrice, truncateTitle, url } from '../../../utils/api';
import { Link } from 'react-router-dom';

const BestSellerProductCard = (
    { 
        productMainImage, 
        handleWishListClicked, 
        productData, 
        productName, 
        oldPrice, 
        newPrice, 
        handleCardClicked
    }) => {
    
    // States and Variables
    const {isInWishList} = useList()

    // Functions
    const maxLength = 40;
    

    

    

  return (
    <Link 
        className='category-product-card' 
        // onClick={() => handleCardClicked(productData)}
        to={{pathname: `/product/${productData.slug}`, state: productData}}
    >
        {/* <img src={heartIcon} alt='heart' className='show-on-mobile' /> */}
        <div className='category-product-image'>
            <img src={`${url}${productMainImage}`} alt='product' effect='blur' />
        </div>
        <div className='category-containt-section'>
            <div className='category-product-rating-and-name'>
                <div className='category-product-name'>
                    <h3>{truncateTitle(productName, maxLength)}</h3>
                    {/* <h3>{productName}</h3> */}
                </div>
            </div>
            <div className='best-seller-rating-and-review'>
                <RatingReview rating={productData.rating} disabled={true} size={"12px"} />
                <p>(200)</p>
            </div>
           
            <div className='category-product-price-and-heart'>
                <div className='category-product-price'>
                    {productData.sale_price === '' ? <p>{formatedPrice(newPrice)}</p> : <del>{formatedPrice(oldPrice)}</del>}
                    <p>{formatedPrice(newPrice)}</p>  
                </div>
                {isInWishList(productData.uid) ? <VscHeartFilled size={25} style={{color: '#C61B1A'}} onClick={(e) => {e.stopPropagation(); handleWishListClicked(productData)}} /> : <img src={heartIcon} alt='heart' className='hide-on-mobile' onClick={(e) => {e.stopPropagation(); handleWishListClicked(productData)}} />}
                
            </div>
        </div>
    </Link>
  )
}

export default BestSellerProductCard
