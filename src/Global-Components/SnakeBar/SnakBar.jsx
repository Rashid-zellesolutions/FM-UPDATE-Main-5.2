import React, { useEffect, useState } from 'react'
import './SnakeBar.css';
import closeButton from '../../Assets/icons/cancel.png'
import { RxCross1 } from "react-icons/rx";
import { truncateTitle } from '../../utils/api';

const SnakBar = ({ snakeBarClass, message, openSnakeBarProp, setOpenSnakeBar, onClick }) => {

    // const [openSnakeBar, setOpenSnakeBar] = useState(openSnakeBarProp);
    useEffect(() => {

        if (openSnakeBarProp === true) {
            const timeOut = setTimeout(() => {
                setOpenSnakeBar(false);
            }, 3000);

            // Cleanup function to clear the timeout if needed
            return () => clearTimeout(timeOut);
        }
    }, [openSnakeBarProp])

    return (
        <div className={`${snakeBarClass} snake-bar-main-container ${openSnakeBarProp ? 'show-snake-container' : ''}`}>
            <div className='snake-bar-inner-container'>
                <p className='snake-bar-main-container-text'>{message ? truncateTitle(message, 35) : ''}</p>
                <button className='snake-bar-close-button' onClick={onClick}>
                    {/* <img src={closeButton} alt='close button' /> */}
                    <RxCross1 color='#FFFFFF' size={20} />
                </button>
            </div>
        </div>
    )
}

export default SnakBar
