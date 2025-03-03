import React, { useEffect } from 'react'
import './TypeTab.css';
import { IoStorefrontOutline } from "react-icons/io5";
import { CiVideoOn } from "react-icons/ci";
import axios from 'axios';
import { url } from '../../../../utils/api';
import { useAppointment } from '../../../../context/AppointmentContext/AppointmentContext';

const TypeTab = ({ selectedTab, setSelectedTab, handleServiceType, handleCategorySelect, serviceIndex, setServiceTypeIndex }) => {


  const chatOptions = [
    { id: 1, title: 'In-Store', serviceType: 'in-store', description: 'Select a showroom to meet with a Home Furnishing Consultant', icon: <IoStorefrontOutline size={20} color='#4487C5' />},
    { id: 2, title: 'Video Call', serviceType: 'video-call', description: 'Set up a video call with a local Home Furnishing Consultant', icon: <CiVideoOn size={20} color='#4487C5' />}
  ]

  const { appointmentPayload, parentCategories } = useAppointment()



  return (
    <div className='type-tab-main-container'>

      <h3>How would you like your consultation to take place?</h3>

      <div className='type-options-container'>
        {chatOptions.map((item, index) => (
          <div className={`type-option ${serviceIndex === index ? 'select-service-option' : ''}`} key={item.id} onClick={() => {handleServiceType(item.serviceType, index)}}>

            <div className='type-option-title-and-icon'>
              {item.icon}
              <p>{item.title}</p>
            </div>

            <p>{item.description}</p>
          </div>
        ))}
      </div>

      <h3>Which category are you looking to speak to a Home Furnishing Consultant about? (Select all that apply)</h3>
      
      <div className='type-categories-container'>
        {parentCategories && parentCategories.map((item, index) => {
          const isSelected = appointmentPayload?.selectedCategories?.some(
            (select) => select.uid === item.uid
          ) || false;
          console.log(`Category: ${item.name}, Selected: ${isSelected}`);
        return (
          <div className={`type-category ${isSelected ? 'select-category' : ''}`} key={item?._id} onClick={() => handleCategorySelect(item)}>
            <p>
              {item?.name}
            </p>
          </div>
        )})}
      </div>

      <button disabled={appointmentPayload.serviceType === "" || appointmentPayload.selectedCategories.length === 0} className='type-submit-button' onClick={() =>  setSelectedTab(selectedTab + 1)} >
        Next
      </button>

    </div>
  )
}

export default TypeTab
