import React from "react";
import "./OrderConfirmationPage.css";
import { formatedPrice } from "../../../utils/api";
import { url } from "../../../utils/api";

export default function CartItemOC({image,name,quantity,options,sku,price,cart_protected,is_protected,protected_price}) {
    return(
        <div className="cartItemOc">
            <div className="cartItemOcImage">
                <img src={url+image}  alt="" />
                <div className="quantity">
                    {quantity}    
                </div>
            </div>
            <div className="cartItemOCDetails">
                <p className="product_name">{name}</p>
                <p className="product_description">{sku}</p>
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
        </div>  
    )
}