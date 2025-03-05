import React from 'react'
import './FinancingModal.css';
import { IoIosClose } from "react-icons/io";
import snapIcon from '../../../Assets/icons/snap.webp'
import accimaIcon from '../../../Assets/icons/accima.webp'
import progressiveIcon  from '../../../Assets/icons/progressive.webp'
import ammericanFinanceIcon from '../../../Assets/icons/ammerican-financ.webp'
import welFragoIcon from '../../../Assets/icons/visa.png'
import { Link } from 'react-router-dom';

const FinancingModal = ({applyFinancing, handleCloseModal}) => {

    const financingOptions = [
        {
            name: 'Snap Finance', 
            icon: snapIcon, 
            link: 'https://apply.snapfinance.com/snap-com?paramId=Hq1qQmOsEuVFOlP6bdRg2D3%2BxnW9U1eKtIkrDRYxxSNWnLK4%2F6jHOC57%2FaFXzbBqmSADc%2B25IrUh0fLOir2w4pCWfkdCvNKE7NiJor%2BcWcRld9e3IFdUTA%3D%3D&source=INTERNET&merchantGroupId=36354109'
        },
        {
            name: 'Acima',
            icon: accimaIcon,
            link: `https://apply.acima.com/lease/select-location?app_id=lo&merchant_guid=merc-3bd04932-d6a0-4848-8a30-af0a9d935f25&utm_campaign=merchant&utm_source=web&lang=en`
        },
        {
            name: 'Progressive Leasing',
            icon: progressiveIcon,
            link: `https://approve.me/s/furnituremecca/https://approve.me/s/furnituremecca/129301`
        },
        {
            name: 'American First Finance',
            icon: ammericanFinanceIcon,
            link: `https://sv1.americanfirstfinance.com/v2/kwik/10609`
        },
        {
            name: 'Wells Fergo',
            icon: welFragoIcon,
            link: `https://retailservices.wellsfargo.com/ahapp/init-app?m=2176068377&l=en_US`
        }
    ]

  return (
    <div className={`apply-for-financing-modal-main-container ${applyFinancing ? 'show-financing-modal' : ''}`}>
      <div className='financing-modal-inner-container'>
        <button className='financing-modal-close-btn' onClick={handleCloseModal}><IoIosClose size={20} color='#959595' /></button>

        <h3>Apply for Financing</h3>

        {financingOptions.map((item, index) => (
            <Link className='financing-option-button' key={index} to={item.link} target='_blank' onClick={handleCloseModal}>
                {item.icon && <img src={item.icon} alt='icon' />}
                {item.name}
            </Link>
        ))}

      </div>
    </div>
  )
}

export default FinancingModal
