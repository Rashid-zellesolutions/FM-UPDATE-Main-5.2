import React ,{useState,useEffect}from 'react'
import './UserDashboard.css';
import DashboardTabs from '../../Components/User-Dashboard-Components/DashboardTabs/DashboardTabs';
import { url } from '../../../utils/api';
import { useLocation, useNavigate, useParams  } from 'react-router-dom';
import { useUserDashboardContext } from '../../../context/userDashboardContext/userDashboard';
import { useGlobalContext } from '../../../context/GlobalContext/globalContext';

const UserDashboard = () => {
  const navigate = useNavigate();
  const { setMainLoader } = useGlobalContext();
  const { setUserToken } = useUserDashboardContext();
  const [isTokenValid, setIsTokenValid] = useState(false);
  const [userData,setUserData] = useState({})

  const { id } = useParams();

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
        console.log("here is data2", response)
        if (response.ok) {
          const data = await response.json();
          const response2 = await fetch(`${url}/api/v1/web-users/get/${id}`, {
            method: "GET",
            headers: {
              authorization: `${token}`,
            },
          });
          if (response2.ok) {
            const data = await response2.json();
            console.log(data,"here is rep")
            setUserData(data.data)
            setIsTokenValid(true);
            setMainLoader(false);
          }else{

          }
          
        } else {
          localStorage.removeItem('userToken');
          setUserToken(null);
          setIsTokenValid(false);
          setMainLoader(false);
          navigate("/my-account")
        }
      } catch (error) {
        localStorage.removeItem('userToken');
        setUserToken(null);
        setIsTokenValid(false);
        setMainLoader(false);
        navigate("/my-account")
      }

      setMainLoader(false);
    }
    else {
      setMainLoader(false);
      navigate("/my-account")
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
    
  return (
    <div className='user-dashboard-main-page'>
      <div className='user-dashboard-main-heading'>
        <h3>My Account</h3>
      </div>
      <DashboardTabs data={userData}  />
    </div>
  )
}

export default UserDashboard
