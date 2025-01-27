import React, {useState} from 'react'
import './InstaTwoImageGallery.css';
import instaIcon from '../../../Assets/Furniture Mecca/Landing Page/instagram images/insta-icon.png'
import instaOne from '../../../Assets/Furniture Mecca/Landing Page/instagram images/Rectangle 874.png'
import instaTwo from '../../../Assets/Furniture Mecca/Landing Page/instagram images/Rectangle 875.png'
import { Link } from 'react-router-dom';

const InstaTwoImageGallery = () => {
    const [animateMouse, setAnimateMouse] = useState(false);
    const handleMouseMove = () => {
        setAnimateMouse(true)

        setTimeout(() => {
            setAnimateMouse(false);
        }, 1500)
    }
  return (
    <div className={`insta-two-image-gallery ${animateMouse ? 'animate' : ''}`} onMouseMove={handleMouseMove}>
        <Link target='_blank' to={'https://www.instagram.com/myfurnituremecca/?igshid=MzRlODBiNWFlZA%3D%3D'}>
            <img src={instaIcon} alt='icon' className={`${animateMouse ? 'animate' : ''}`}/>
        </Link>
        {/* <div className='insta-image-one'>
            <img src={instaOne} alt='img one' />
        </div> */}
        {/* <div className='insta-image-one'>
            <img src={instaTwo} alt='img one' />
        </div> */}
    </div>
  )
}

export default InstaTwoImageGallery
