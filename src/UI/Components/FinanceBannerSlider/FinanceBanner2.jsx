import React, { useEffect, useState } from "react";
import './FinanceBannerSlider.css';
import { url } from "../../../utils/api";
import { useNavigate } from "react-router-dom";


function FinanceBanner2({heading,image,mobileImage}) {
  const navigate = useNavigate();
  const handleNavigate = () => {
    navigate(`/financing`);
  }
  return (
    <div className="finance_banner_2">
        <div className="finance_banner_2_desktop" >
            <img src={url+image?.image_url} alt="" srcset="" onClick={handleNavigate}/>
        </div>
        <div className="finance_banner_2_mobile">
            <img src={url+mobileImage?.image_url} alt="" srcset="" />
        </div>
    </div>
  );
}

export default FinanceBanner2;
