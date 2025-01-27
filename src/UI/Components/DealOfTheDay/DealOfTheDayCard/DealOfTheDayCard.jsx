import React, {useState} from 'react';
import './DealOfTheDayCard.css';
import testImage from '../../../../Assets/Furniture Mecca/product page/frequently bought/MN600__04-300x200 1.png'
import star from '../../../../Assets/icons/Star 19.png'
// import cartIcon from '../../../../Assets/icons/cart-bag-charcol.png';
// import cartWhite from '../../../../Assets/icons/cart-bag-white.png'
import heartIcon from '../../../../Assets/icons/heart-charcol.png';
// import heartWhite from '../../../../Assets/icons/heart-white.png'
// import combinedArrows from '../../../../Assets/icons/multi-arrow-charcol.png'
// import multiArrowWhite from '../../../../Assets/icons/multi-arrow-white.png'
// import leftArrow from '../../../../Assets/icons/arrow-left-white.png';
// import rightArrow from '../../../../Assets/icons/right-arrow-white.png';
import { url } from '../../../../utils/api';
import { img } from 'react-lazy-load-image-component';
import { useList } from '../../../../context/wishListContext/wishListContext';
import RatingReview from '../../starRating/starRating';
import { LiaShoppingBagSolid } from "react-icons/lia";
import { RiShareBoxLine } from "react-icons/ri";
import { IoMdHeartEmpty } from "react-icons/io";


const DealOfTheDayCard = ({
    index, 
    name, 
    rating, 
    review, 
    price, 
    newPrice, 
    isDiscountable,
    productImage, 
    handleDealCardClick, 
    dealDayData,
    handleWishListClick,
    handleCartSection,
    handleShareProduct,
  }) => {

    const formatePrice = (price) => {
      return new Intl.NumberFormat('en-us', {
        style: 'currency',
        currency: 'USD'
      }).format(price)
    }
    // const [isHovered, setIsHovered] = useState(null);

    

    // Deal of the day product name limitations
    const maxLength = 40;
    const truncateTitle = (title, maxLength) => {
      if(!title) return '';  
      return title.length > maxLength ? title.slice(0, maxLength) + '...' : title 
      
    };
    // console.log("deal day data", url,productImage)
    const {isInWishList} = useList()
    return (
      <div 
        index={index} 
        className='deal-of-the-day-product-card' 
        onClick={() => handleDealCardClick(dealDayData)}
      >
        <div 
            className='deal-of-the-day-product-rating-and-name'
          >
          <h3 className='deal-of-the-day-product-name'>
            {truncateTitle(name, maxLength)}
          </h3>
          <div 
            className='deal-of-the-day-price'
          >
              {isDiscountable ? <del>{formatePrice(price)}</del> : <></>}
              <p>{formatePrice(newPrice)}</p>
          </div>
          <div 
              className='deal-of-the-day-rating-and-reviews'>
            <div 
                className='deal-of-the-day-card-stars'>
            
              <RatingReview  size={"12px"} rating={rating} />
              </div>
            {/* <p>({review})</p> */}
          </div>
        </div>

        <div className='deal-of-the-day-product-image'>
          <img src={heartIcon} alt='heart-icon' className='mobile-view-deal-day-card-heart-icon' />
          <div className='deal-of-the-day-product-discount'><p>-12%</p></div>
          <img src={`${url}${productImage}`} alt='img' effect='blur' />
          <div className='deal-of-the-day-card-icons-div'>
              <button 
                  className={`deal-of-the-day-icon-one`}
                  onClick={() => handleCartSection(dealDayData)} 
              > 
                <LiaShoppingBagSolid className='deal-of-month-cart-icon' size={20}/>
              </button>
            
              <button  
                  className={`deal-of-the-day-icon-two ${isInWishList(dealDayData.uid) ? 'active-wish-list-btn' : ''}`}
                  onClick={(e) => {e.stopPropagation(); handleWishListClick(dealDayData)}} 
              >
                <IoMdHeartEmpty className='deal-of-month-heart-icon' size={20} />
              </button>

              <button 
                  className={`deal-of-the-day-icon-three `} 
                  onClick={(e) => {e.stopPropagation() ; handleShareProduct(dealDayData)}}
              >
                <RiShareBoxLine className='deal-of-month-share-icon' size={20} />
              </button>
          </div> 
        </div>

        <div className='mobile-view-deal-of-the-day-product-details'>
            <div className='mobile-view-star-rating-and-review'>
                <div className='mobile-view-product-stars'>
                <RatingReview  size={"12px"} rating={rating} />
                </div>
            </div>
            <h3 className='mobile-view-deal-of-the-day-product-name'>
                {name}
            </h3>
          
            <div 
            className='mobile-view-deal-of-the-day-price'>
              {isDiscountable ? <del>{formatePrice(price)}</del> : <></>}
              <p>{formatePrice(newPrice)}</p>
          </div>
        </div>
      </div>
    );
};

export default DealOfTheDayCard;
