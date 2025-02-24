import React, { useEffect, useState } from 'react'
import './LocationTab.css';
import { IoIosSearch, IoIosArrowDown } from "react-icons/io";
import { FaPhoneAlt } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import axios from 'axios';
import { url } from '../../../../utils/api';

const LocationTab = ({selectedTab, setSelectedTab}) => {

  // const nearStores = [
  //   {
  //     name: 'Roosevelt Blvd',
  //     miles: '2.5',
  //     address: '4640 Roosevelt Blvd, Philadelphia, PA 19124',
  //     phone: '215 533 5011 ',
  //     timings: [
  //       {day: 'Monday', time: '10:00 AM - 9:00 PM'},
  //       {day: 'Tuesday', time: '10:00 AM - 9:00 PM'},
  //       {day: 'Wednesday', time: '10:00 AM - 8:00 PM'},
  //       {day: 'Thursday', time: '10:00 AM - 9:00 PM'},
  //       {day: 'Friday', time: '10:00 AM - 8:00 PM'},
  //       {day: 'Saturday', time: '10:00 AM - 8:00 PM'},
  //       {day: 'Sunday', time: '11:00 AM - 6:00 PM'},
  //     ]
  //   },
  //   {
  //     name: 'Columbus Boulevard',
  //     miles: '5.5',
  //     address: `2110 S. Christopher Columbus Blvd. Philadelphia, PA 19148`,
  //     phone: '267-773-5211 ',
  //     timings: [
  //       {day: 'Monday', time: '10:00 AM - 9:00 PM'},
  //       {day: 'Tuesday', time: '10:00 AM - 9:00 PM'},
  //       {day: 'Wednesday', time: '10:00 AM - 8:00 PM'},
  //       {day: 'Thursday', time: '10:00 AM - 9:00 PM'},
  //       {day: 'Friday', time: '10:00 AM - 8:00 PM'},
  //       {day: 'Saturday', time: '10:00 AM - 8:00 PM'},
  //       {day: 'Sunday', time: '11:00 AM - 6:00 PM'},
  //     ]
  //   },
  //   {
  //     name: 'Roosevelt Blvd',
  //     miles: '2.5',
  //     address: '4640 Roosevelt Blvd, Philadelphia, PA 19124',
  //     phone: '215 533 5011 ',
  //     timings: [
  //       {day: 'Monday', time: '10:00 AM - 9:00 PM'},
  //       {day: 'Tuesday', time: '10:00 AM - 9:00 PM'},
  //       {day: 'Wednesday', time: '10:00 AM - 8:00 PM'},
  //       {day: 'Thursday', time: '10:00 AM - 9:00 PM'},
  //       {day: 'Friday', time: '10:00 AM - 8:00 PM'},
  //       {day: 'Saturday', time: '10:00 AM - 8:00 PM'},
  //       {day: 'Sunday', time: '11:00 AM - 6:00 PM'},
  //     ]
  //   },
  //   {
  //     name: 'Roosevelt Blvd',
  //     miles: '2.5',
  //     address: '4640 Roosevelt Blvd, Philadelphia, PA 19124',
  //     phone: '215 533 5011 ',
  //     timings: [
  //       {day: 'Monday', time: '10:00 AM - 9:00 PM'},
  //       {day: 'Tuesday', time: '10:00 AM - 9:00 PM'},
  //       {day: 'Wednesday', time: '10:00 AM - 8:00 PM'},
  //       {day: 'Thursday', time: '10:00 AM - 9:00 PM'},
  //       {day: 'Friday', time: '10:00 AM - 8:00 PM'},
  //       {day: 'Saturday', time: '10:00 AM - 8:00 PM'},
  //       {day: 'Sunday', time: '11:00 AM - 6:00 PM'},
  //     ]
  //   },
  //   {
  //     name: 'Roosevelt Blvd',
  //     miles: '2.5',
  //     address: '4640 Roosevelt Blvd, Philadelphia, PA 19124',
  //     phone: '215 533 5011 ',
  //     timings: [
  //       {day: 'Monday', time: '10:00 AM - 9:00 PM'},
  //       {day: 'Tuesday', time: '10:00 AM - 9:00 PM'},
  //       {day: 'Wednesday', time: '10:00 AM - 8:00 PM'},
  //       {day: 'Thursday', time: '10:00 AM - 9:00 PM'},
  //       {day: 'Friday', time: '10:00 AM - 8:00 PM'},
  //       {day: 'Saturday', time: '10:00 AM - 8:00 PM'},
  //       {day: 'Sunday', time: '11:00 AM - 6:00 PM'},
  //     ]
  //   },
  // ]

  const [nearStores, setNearStores] = useState([]);

  const handleStorsData = async () => {
    const api = `/api/v1/stores/get`;
    try {
      const response = await axios.get(url+api);
      console.log("res response ", response)
      if(response.status === 200) {
        console.log("Response", response);
        setNearStores(response.data.data);
      }else {
        console.error("Error Fetching Stores Data", response.status);
      }
    } catch (error) {
      console.error("UnExpected Server Error", error);
    }
  }

  useEffect(() => {handleStorsData()}, [])

  const [showLocationDetails, setShowLocationDetails] = useState(null);
  const handleLocationDetails = (index) => {
    setShowLocationDetails((prevIndex) => prevIndex === index ? null : index)
  }

  

  return (
    <div className='location-tab-main-container'>
      <div className='location-tab-header'>
        <h3>
          Set up a time to consult with our room specialists to guide you through your shopping journey.
        </h3>

        <div className='location-search-container'>
          <IoIosSearch size={25} color='#595959' />
          <label>
            {/* Enter Zip Code or City  */}
            <input type='text' placeholder='Enter Zip Code or City' />
          </label>
        </div>

      </div>
      <div className='location-tab-body'>
        <div className='location-body-heading-and-title'>
          <h3>Select your Showroom</h3>
          <p>Displaying closest locations to <span>19134</span></p>
        </div>

        <div className='location-tab-store-list'>
          {nearStores.map((item, index) => (
            <div className='location-tab-store-item' key={index}>

              <div className='location-tab-store-head'>

                <div className='location-head-title-and-miles'>
                  <h3>{item.name}</h3>
                  <span>
                    <p>2.5 miles</p>
                    <IoIosArrowDown 
                      className={`location-tab-arrow ${showLocationDetails === index ?'rotate-location-tab-arrow' : ''}`} 
                      onClick={() => handleLocationDetails(index)} 
                      size={20} 
                      color='#595959' 
                    />
                  </span>
                </div>
                <button onClick={() => setSelectedTab(selectedTab + 1)}>SELECT STORE</button>
              </div>

              <div className={`location-tab-store-details ${showLocationDetails === index ? 'show-location-details' : ''}`}>

                <div className='location-tab-store-left-section'>
                  <p>{item.address_1}</p>
                  <div className='location-tab-phone-and-direction'>
                    <span>
                      <FaPhoneAlt size={15} color='#595959' />
                      <p>{item.phone}</p>
                    </span>
                    <span>
                      <FaLocationDot size={15} color='#595959' />
                      <p>Get Directions</p>
                    </span>
                  </div>
                </div>

                <div className='location-tab-right-section'>
                  {item.timings.map((time, index) => (
                    <div className='location-tab-timing-single-card' key={index}>
                      <p>{time.day}</p>
                      <p>{time.time}</p>
                    </div>
                  ))}
                </div>

              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default LocationTab
