import React from "react";
import "./OrderConfirmationPage.css";
import { formatedPrice, truncateTitle } from "../../../utils/api";
import { url } from "../../../utils/api";

export default function CartItemOC({image,name,quantity, regular_price, options,sku,price,cart_protected,is_protected,protected_price}) {
    
    return(
        <>
            {/* <div className="cartItemOc">
                <div className="cartItemOcImage">
                    <img src={url+image}  alt="" />
                    <div className="quantity">
                        {quantity}    
                    </div>
                </div>
                <div className="cartItemOCDetails">
                    <p className="product_name">{name}</p>
                    {options && options?.map((item,index)=>{
                            return(
                                <p className="product_description">{item?.options[0].name}</p>
                            )
                    })}
                    {cart_protected===0 && is_protected===1 ? <p className="product_description">Protection Plan Applied (+ ${protected_price})</p> :<></>}
                </div>
                <div className="cartItemOCPrice">
                    <p>{formatedPrice(price)}</p>
                </div>
            </div> */}
            <div className="confirmed-order-product-main">
                <div className="confirmed-order-product-image">
                    <p>{quantity}</p>
                    <img src={`${url}${image}`} alt="product" />
                </div>
                <div className="confirmed-order-product-details">
                    <div className="confirmed-order-name-and-price">
                        <h3>{truncateTitle(name, 15)}</h3>
                        <span>
                            <del>{regular_price}</del>
                            <p>{formatedPrice(price)}</p>
                        </span>
                    </div>
                    {options && options.map((item, index) => (
                        <p key={index}>{item?.options[0].name}</p>
                    ))}
                    
                </div>
            </div>
        </>  
    )
}