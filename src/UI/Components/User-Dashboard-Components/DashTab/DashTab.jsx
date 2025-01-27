import React from 'react'
import './DashTab.css';
import DashboardTab from './DashboardComponents/dashTab';
import SalesPerformance from './DashboardComponents/SalesPerformance';
import BarChart from './DashboardComponents/ordersChart';
import DashboardTab2 from './DashboardComponents/dashTab2';
import { IoMdLogOut } from "react-icons/io";
import { useUserDashboardContext } from '../../../../context/userDashboardContext/userDashboard';
import { useNavigate } from 'react-router-dom';


const DashTab = ({data}) => {
  const navigate = useNavigate();
  const { setUserToken } = useUserDashboardContext();

  const logout = async () =>{
    localStorage.removeItem('userToken');
    localStorage.removeItem('uuid');
    setUserToken(null);
    navigate("/my-account",{state:{message:"decided"}})
  }
  return (
    <div className='dash-tab-main-container'>
      <div className="most_upper_section">
        <div className="most_upper_section_left">
        <h2 className='greeting'><strong>Hey</strong>, {data?.first_name} {data?.last_name}</h2>
        <h3 className='descri'>Analyze your report</h3>
        </div>
        <div className="most_upper_section_right">
          <div className="profileAvatar">
            <img src="https://cdn-icons-png.flaticon.com/128/149/149071.png" alt="" srcset="" />
          </div>
          <div className="logoutButton">
            <button onClick={()=>{logout()}} >
              <p>Logout</p>
              <IoMdLogOut/>
            </button>
          </div>
        </div>
      
      </div>
      <div className='upper_tabs'>
        <DashboardTab name={"Total Orders"} value={"0"} unit={"order"} slug={"total-orders"} />
        <DashboardTab name={"Total Orders"} value={"0"} unit={"order"} slug={"total-orders"} style_name={"white"} />
        <DashboardTab name={"Total Orders"} value={"0"} unit={"order"} slug={"total-orders"} />
      </div>

      <div className="lower_charts">
        <div className="lower_charts_1">
          <SalesPerformance />
          {/* <DashboardTab2/> */}
        </div>
        <div className="lower_charts_2">
          <BarChart />
        </div>

      </div>
    </div>
  )
}

export default DashTab
