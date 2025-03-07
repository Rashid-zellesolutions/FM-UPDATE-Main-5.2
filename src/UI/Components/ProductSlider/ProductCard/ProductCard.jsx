import React from 'react';
import './ProductCard.css';
import arrowLeft from '../../../../Assets/icons/arrow-left-black.png';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { Link } from 'react-router-dom';

const ProductCard = ({
  productData,
  handleCardClicked,
  img,
  heading,
  para,
  btnTxt,
  productImageHeading,
  productImagePrice,
  productImageAbout,
  productLink,
  onImageDrage,
  index,
}) => {
  const backgroundColor = index % 2 === 0 ? '#F29039' : '#CC433B';

  return (
    <div className="product" >
      <div className="product-img">
        <img
          src={img}
          alt="product"
          onClick={(e) => {handleCardClicked(productData)}}
          onDragStart={(e) => e.preventDefault()} // Prevent drag behavior
        />
        <div className="product-img-detail">
          <div
            style={{ backgroundColor }}
            className="top_rated_head"
          >
            {/* TOP RATED */}
            Featured
          </div>
          <div className="top_rated_price_cont">
            <p>Starting From</p>
            <h3>{productImagePrice}</h3>
          </div>
        </div>
      </div>
      <div className="product-details">
        <p
          className='product-detail-heading'
          // to={{pathname: `/product/${productData?.slug}`, state: productData}}
          onClick={() => handleCardClicked(productData)}
        >
          {heading}
        </p>
        <Link 
          className='product-detail-btn'
          onClick={() => handleCardClicked(productData)}
          to={{pathname: `/product/${productData?.slug}`}}
        >
          <div href={productLink}>{btnTxt}</div>
          <img src={arrowLeft} alt="arrow left" />
        </Link>
      </div>
    </div>
  );
};

export default ProductCard;
