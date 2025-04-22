import React, { useState, useRef, useEffect } from 'react'
import './AccountDetailsTab.css';
import { CiUser, CiCircleMinus, CiCirclePlus } from "react-icons/ci";
import { capitalize, formatPhoneNumber, useDisableBodyScroll } from '../../../../utils/api';
import { FaEdit, FaEye, FaEyeSlash } from "react-icons/fa";
import BillingAddressModal from '../../../../Global-Components/BillingAddressModal/BillingAddressModal';
// import { CiCircleMinus } from "react-icons/ci";

const AccountDetailsTab = () => {
  const fileInputRef = useRef(null)
  const [userDetails, setUserDetails] = useState({
    first_name: '',
    last_name: '',
    user_name: '',
    contact: '',
    email: '',
    profile_image: null
  })

  const [password, setPassword] = useState({
    old_password: '',
    new_password: ''
  })

  const [imgUrl, setImgUrl] = useState('')

  const [showInputs, setShowInputs] = useState(false)
  const [showOldPass, setShowOldPass] = useState(false);
  const [showNewPass, setShowNewPass] = useState(false);

  const handleShowPasswordContainer = () => {
    setShowInputs(!showInputs)
  }

  const handleShowHidePassword = (type) => {
    if(type === 'old_password') {
      setShowOldPass(!showOldPass);
    } else if (type === 'new_password') {
      setShowNewPass(!showNewPass)
    }
  } 

  const handleButtonclick = () => {
    fileInputRef.current.click();
  }

  const handleProfileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setImgUrl(imageUrl)
    }
    setUserDetails((prevInfo) => ({
      ...prevInfo,
      profile_image: file
    }))

  }

  const handleUserDetailsChange = (e) => {
    const { name, value } = e.target;
    setUserDetails((prevInfo) => ({
      ...prevInfo,
      [name]: name === 'contact' ? formatPhoneNumber(value) : value
    }));
  }

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPassword((prevPass) => ({
      ...prevPass,
      [name]: value
    }))
  }

  const [openBillingModal, setOpenBillingModal] = useState(false);
  const handleOpenBillingModal = () => {
    setOpenBillingModal(true)
  }


  const handleBillingModalclose = () => {
    setOpenBillingModal(false);
  }

  
  useDisableBodyScroll(openBillingModal)

  useEffect(() => { console.log("user detail", userDetails) }, [userDetails])

  return (
    <div className='account-details-main-section'>
      <div className='account-details-inner-section'>
        <div className='account-detail-user-profile'>
          <div className='account-detail-user-profile-container'>
            {userDetails.profile_image !== null ? (
              <img src={imgUrl} alt='user profile' className='user-profile-picture' />
            ) : (
              <CiUser color='var(--secondary-color)' size={80} />
            )}
          </div>

          <input type='file' ref={fileInputRef} style={{ display: 'none' }} onChange={handleProfileChange} />
          <button className='upload-image-button' onClick={handleButtonclick}>
            Change
          </button>
        </div>

        <div className='account-details-user-info'>

          <div className='user-info-head'>
            <h3>User Information</h3>
            <button>
              <FaEdit size={24} color='var(--secondary-color)' onClick={handleOpenBillingModal} />
            </button>
          </div>

          <div className='user-info-body'>
            {Object.entries(userDetails).map((([key, value]) =>
              key !== 'profile_image' && (
                <label>
                  {/* {key.replace("_", " ").toUpperCase()}  */}
                  {capitalize(key)}
                  <input
                    type='text'
                    name={key}
                    value={value}
                    onChange={handleUserDetailsChange}
                  />
                </label>
              )
            ))}
          </div>
          <div className='user-info-password-container'>
            <div className='user-info-pass-head' onClick={handleShowPasswordContainer}>
              <h3>Update Password</h3>
              <button>
                {showInputs ? <CiCircleMinus size={24} color='var(--secondary-color)' /> : <CiCirclePlus size={24} color='var(--secondary-color)' />}
              </button>
            </div>

            <div className={`user-info-passwords-inputs ${showInputs ? 'show-pass-container' : ''}`}>

              <label>
                <p>Old Password</p>
                <div className='input-pass-container'>
                  <input type={showOldPass ? 'text' : 'password'} name='old_password' value={password.old_password} onChange={handlePasswordChange} />
                  {showOldPass ? <FaEyeSlash size={18} color='var(--secondary-color)' onClick={() => handleShowHidePassword('old_password')} /> : <FaEye size={18} color='var(--secondary-color)' onClick={() => handleShowHidePassword('old_password')} /> }
                </div>
              </label>

              <label>

                <p>New Password</p>
                <div className='input-pass-container'>
                  <input type={showNewPass ? 'text' : 'password'} name='new_password' value={password.new_password} onChange={handlePasswordChange} />
                  {showNewPass ? <FaEyeSlash size={18} color='var(--secondary-color)' onClick={() => handleShowHidePassword('new_password')} /> : <FaEye size={18} color='var(--secondary-color)' onClick={() => handleShowHidePassword('new_password')} /> }
                </div>
              </label>

              <div className='user-info-save-container'>
                <button>Save</button>
              </div>
            </div>
          </div>
        </div>

      </div>



      

        <BillingAddressModal 
          showBilling={openBillingModal}
          handleCloseBillingModal={handleBillingModalclose}
        />
    </div>
  )
}

export default AccountDetailsTab
