import React, { useState, useEffect } from 'react'
import './LoginRegister.css'
import Register from '../../Components/Login-Register-Components/Register/Register'
import Login from '../../Components/Login-Register-Components/Login/Login'
import RegisterMobileView from '../../Components/Login-Register-Components/RegisterMobileView/RegisterMobileView'
import LoginMobileView from '../../Components/Login-Register-Components/loginMobileView/LoginMobileView'
import { useLocation ,useNavigate } from 'react-router-dom';
import { url } from '../../../utils/api';
import { useUserDashboardContext } from '../../../context/userDashboardContext/userDashboard'
import { useGlobalContext } from '../../../context/GlobalContext/globalContext'

const LoginRegister = () => {

  const navigate = useNavigate();
  const [signinClicked, setSigninClicked] = useState(false)
  const [mobileSignupClicked, setMobileSignupClicked] = useState(true)

  const {setMainLoader} = useGlobalContext();
   const {setUserToken} =useUserDashboardContext();
  
    const [isTokenValid, setIsTokenValid] = useState(false); 
  
    const checkToken = async () => {
      const token = localStorage.getItem('userToken');
      if (token) {
          try {
            setMainLoader(true);
              const response = await fetch(`${url}/api/v1/web-users/verify-token`, {
                  method: "GET",
                  headers: {
                      authorization: `${token}`,
                  },
              });
              console.log("here is data2",response)
              if (response.ok) {
                  const data = await response.json();
                  setUserToken(token);
                  setIsTokenValid(true);
                  console.log("Token is valid:", data);
                  setMainLoader(false);
                  navigate("/user-dashboard")
                  console.log("here is data",data)
              } else {
                  console.warn("Token is invalid or expired. Removing it.");
                  localStorage.removeItem('userToken');
                  setUserToken(null);
                  setIsTokenValid(false);
                  setMainLoader(false);
              }
          } catch (error) {
              console.error("Error verifying token:", error);
              localStorage.removeItem('userToken');
              setUserToken(null);
              setIsTokenValid(false);
              setMainLoader(false);
          }
  
          setMainLoader(false);
      }
      else{
        setMainLoader(false);
      }
      
  };
  
  
  const moveToLoginDash = async () => {
    await checkToken();
  }

  // Get location and state from the previous route
  const location = useLocation();
  const prevState = location.state;

  // Check if the state exists and set default values accordingly
  useEffect(() => {
    if (!prevState) {
        moveToLoginDash();
    }
  }, [prevState]);

  const handleSigninSlide = () => {
    setSigninClicked(!signinClicked);
  }

  const handleMobileSignup = () => {
    setMobileSignupClicked(!mobileSignupClicked);
  }

  return (
    <>
      <div className='login-register-main-page'>
        <Register 
          handleBtnClicked={handleSigninSlide}
          signinClicked={signinClicked}
        />
        <Login 
          signupclicked={signinClicked}
        />
      </div>
      <div className='mobile-login-and-register-page'>
        <LoginMobileView 
          mobileSignupClicked={mobileSignupClicked}
          handleRegisteView={handleMobileSignup}
        />
        <RegisterMobileView 
          mobileSignupClicked={mobileSignupClicked}
          handleRegisterView={handleMobileSignup}
        />
      </div>
    </>
  )
}

export default LoginRegister
