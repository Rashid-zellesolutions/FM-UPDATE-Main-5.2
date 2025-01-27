// import React, { useState } from 'react'
// import './Shopvia.css'
// import closeIcon from '../../../Assets/icons/cancel.png'
// import { Link } from 'react-router-dom';

// const Shopvia = () => {
//   const [closeBanner, setCloseBanner] = useState(false);
//   const handleCloseBanner = () => {
//     setCloseBanner(!closeBanner);
//   }
//   return (
//     <div className={`shop-via-banner ${closeBanner ? 'close' : ''}`}>
//         <div className='text-div'>
//             <span> <Link to={'/contact-us'}> Get Help </Link> <a href='#'>860-812-111</a></span>
//         </div>
//         <img src={closeIcon} alt="close" onClick={handleCloseBanner} />
//     </div>
//   )
// }

// export default Shopvia


import React, { useState } from 'react'
import './Shopvia.css'
import closeIcon from '../../../Assets/icons/cancel.png'

const Shopvia = () => {
  const [closeBanner, setCloseBanner] = useState(false);
  const handleCloseBanner = () => {
    setCloseBanner(!closeBanner);
  }
  return (
    <div className={`shop-via-banner ${closeBanner ? 'close' : ''}`}>
        <div className='text-div'>
            <span> Shop via <a  href='tel:2153521600'>215 352 1600</a></span>
        </div>
        <img src={closeIcon} alt="close" onClick={handleCloseBanner} />
    </div>
  )
}

export default Shopvia