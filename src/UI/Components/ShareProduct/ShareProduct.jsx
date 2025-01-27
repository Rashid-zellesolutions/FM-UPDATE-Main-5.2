import React, { useEffect, useRef, useState } from 'react'
import './ShareProduct.css';
import closeBtn from '../../../Assets/icons/cancel.png';
import twitter from '../../../Assets/icons/x-charcol.png'
import facebook from '../../../Assets/icons/facebook-charcol.png'
import insta from '../../../Assets/icons/insta-charcol.png'
import mail from '../../../Assets/icons/mail-charcol.png'
import copyCharcol from '../../../Assets/icons/copy-charcol.png'
import copySuccess from '../../../Assets/icons/copy-success.png'
import star from '../../../Assets/icons/Star 19.png'
import { formatedPrice, url } from '../../../utils/api';
import copy from 'copy-to-clipboard';
import RatingReview from '../starRating/starRating';

import { FaFacebook, FaInstagram, FaRegEnvelope, FaWhatsapp, FaFacebookMessenger } from "react-icons/fa";
import { Link } from 'react-router-dom';

const ShareProduct = ({ isSharePopup, setIsSharePopup, selectedUid, selectedProduct }) => {

    // console.log("selected product uid in share modal", selectedProduct?.uid)
    // console.log("selected product uid in share modal", isSharePopup)
    const copyRef = useRef()
    let generatedLink = `https://furnituremecca.zellesolutions.com/product/${selectedProduct?.slug}`

    const handleCloseShareProductPopup = () => {
        setIsSharePopup(null)
        setIsCpoied(false)
    }

    const socialPlatforms = [
        { name: 'Facebook', img: <FaFacebook size={38} style={{color: '#595959'}} /> , link: 'https://www.facebook.com/myfurnituremecca' },
        { name: 'Instagram', img: <FaFacebookMessenger size={38} style={{color: '#595959'}} /> , link: '#' },
        { name: 'Email', img: <FaInstagram size={38} style={{color: '#595959'}} /> , link: 'https://www.instagram.com/myfurnituremecca/?igshid=MzRlODBiNWFlZA%3D%3D' },
        { name: 'Email', img: <FaWhatsapp size={38} style={{color: '#595959'}} /> , link: '#' },
        { name: 'Email', img: <FaRegEnvelope size={38} style={{color: '#595959'}} /> , link: '#' }
    ]
    
    const [isCopied, setIsCpoied] = useState(false);
    const copyToClipboard = () => {
        let copyText = copyRef.current.value;
        let isCopy = copy(copyText);
        if(isCopy){
            setIsCpoied(true);
        }
    }
    return (
        <div className={`share-product-link-pop-up-main ${isSharePopup === selectedProduct?.uid ? 'show-product-share-pop-up' : ''}`} onClick={handleCloseShareProductPopup}>
            
            <div className='share-product-link-pop-up-inner' onClick={(e) => e.stopPropagation()}>
                <button className='share-product-link-pop-up-close-btn' onClick={handleCloseShareProductPopup}>
                    <img src={closeBtn} alt='close' />
                </button>

                <div className='share-product-popup-product-div'>
                    <img
                        src={`${url}${selectedProduct?.images?.[0]?.image_url}`}
                        alt='main-img'
                        className='share-product-selected-product-main-img'
                    />
                    <div className='share-product-selected-product-details'>
                        <h3 className='shared-products-product-name'>{selectedProduct?.name}</h3>
                        <p className='shared-product-sku'>SKU: {selectedProduct?.sku}</p>
                        <p className='shared-product-brand-name'>Brand: {selectedProduct?.brand}</p>
                        <div className='share-product-selected-product-rating'>
                            {/* {Array.from({ length: 5 }).map((itm, indx) => (
                                <img key={indx} src={star} alt='star icon' />
                            ))} */}
                            <RatingReview rating={(selectedProduct?.average_rating)} disabled={true} size={"20px"} />
                        </div>
                        {selectedProduct?.sale_price === ''
                            ? <p className='share-product-selected-product-regural-price'>{formatedPrice(selectedProduct?.regular_price)}</p>
                            : <span className='share-product-selected-product-regular-and-sale-price'>
                                <del>{formatedPrice(selectedProduct?.regular_price)}</del>
                                <h3>{formatedPrice(selectedProduct?.sale_price)}</h3>
                            </span>}
                    </div>
                </div>
                <div className='share-product-social-platforms'>
                    {socialPlatforms.map((item, index) => (
                        <div className='share-product-single-social-platform'>
                            {/* <img src={item.img} alt={item.name} /> */}
                            <Link to={item.link} target='_blank'>{item.img}</Link>
                            {/* <p>{item.name}</p> */}
                        </div>
                    ))}
                </div>
                <div className='share-product-generated-link-main-div'>
                    <input 
                        type='text' 
                        value={generatedLink}
                        // value={'text-to-copy'} 
                        ref={copyRef}
                        disabled 
                        className='share-product-generated-link' 
                        placeholder={ generatedLink} 
                    />
                    <button className={`share-product-link-generator-btn ${isCopied ? 'share-products-copy-btn' : ''}`} onClick={copyToClipboard}>
                        {isCopied ? 'Copied' : 'Copy'} 
                        <img src={isCopied ? copySuccess : copyCharcol} alt='copy' />
                    </button>
                </div>
            </div>
        </div>
    )
}

export default ShareProduct
