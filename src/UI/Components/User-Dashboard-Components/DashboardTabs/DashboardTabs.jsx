import React, { useEffect, useState } from 'react'
import './DashboardTabs.css';
import DashTab from '../DashTab/DashTab';
import OrdersTab from '../OrderTab/OrdersTab';
import DownloadsTab from '../DownloadsTab/DownloadsTab';
import AddressesTab from '../AddressesTab/AddressesTab';
import PaymentMethodTab from '../PaymentMethodTab/PaymentMethodTab';
import AccountDetailsTab from '../AccountDetailsTab/AccountDetailsTab';
import Loader from '../../Loader/Loader';
import { url } from '../../../../utils/api';
import axios from 'axios';

const DashboardTabs = ({ data }) => {
    const [loading, setLoading] = useState(false);
    const [trigerApi, setTrigerApi] = useState(false);
    // const [userToken, setUserTocken] = useState('');

    const [userData, setUserData] = useState();
    const getBillingData = async (userId, authToken) => {
        try {
            if (!authToken) {
                throw new Error("Authorization token missing");
            }

            const response = await axios.get(
                `${url}/api/v1/web-users/get/${userId}`,
                {
                    headers: {
                        authorization: `${authToken}`,
                    }
                }
            );
            if (response.status === 200) {
                //   console.log("Billing address data:", response.data.data);

                setUserData(response.data.data)
                setTrigerApi(false)
            } else {
                console.log("Error fetching billing address data");
            }


        } catch (error) {
            console.error("Error fetching billing address:", error.message);
            throw error;
        }
    }

    useEffect(() => {
        const userId = localStorage.getItem('uuid')
        const authToken = localStorage.getItem('userToken')
        if (authToken) {
            getBillingData(userId, authToken)
        }
    }, [])

    useEffect(() => {
        const userId = localStorage.getItem('uuid')
        const authToken = localStorage.getItem('userToken')
        if (authToken) {
            getBillingData(userId, authToken)
        }
    }, [trigerApi === true])

    const dashTabsTitles = [
        'Dashboard',
        'Orders',
        'Addresses',
        'Payment Methods',
        'Profile'
    ]

    const [currentTabIndex, setCurrentTabIndex] = useState(0)
    const handleTabOpen = (index) => {
        setLoading(true)
        setCurrentTabIndex(index);
        setTimeout(() => setLoading(false), 1000);
    }

    

    return (
        <div className='dashboard-all-tabs-toggler-main-container'>
            {loading && <Loader />}
            <div className='dashboard-tabs-toggle-nav'>
                {dashTabsTitles.map((item, index) => (
                    <h3
                        key={index}
                        className={`dash-single-tab-title ${currentTabIndex === index ? 'active-dash-tab' : ''}`}
                        onClick={() => handleTabOpen(index)}
                    >
                        {item}
                    </h3>
                ))}
            </div>
            {
                currentTabIndex === 0 ? <DashTab data={data} /> :
                    currentTabIndex === 1 ? <OrdersTab /> :
                        currentTabIndex === 2 ? <AddressesTab userAddresses={userData} setTrigerPoint={setTrigerApi} /> :
                            currentTabIndex === 3 ? <PaymentMethodTab /> :
                                currentTabIndex === 4 ? <AccountDetailsTab /> : <></>
            }
        </div>
    )
}

export default DashboardTabs
