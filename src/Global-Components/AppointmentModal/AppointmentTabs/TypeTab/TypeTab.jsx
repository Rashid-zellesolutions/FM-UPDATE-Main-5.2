import React from 'react'
import './TypeTab.css';
import { IoStorefrontOutline } from "react-icons/io5";
import { CiVideoOn } from "react-icons/ci";

const TypeTab = ({selectedTab, setSelectedTab}) => {

  console.log("Select Tab", selectedTab)

  const chatOptions = [
    {id: 1, title: 'In-Store', description: 'Select a showroom to meet with a Home Furnishing Consultant', icon: <IoStorefrontOutline size={20} color='#4487C5' />},
    {id: 2, title: 'Video Call', description: 'Set up a video call with a local Home Furnishing Consultant', icon: <CiVideoOn size={20} color='#4487C5' />}
  ]

  const categories = [
    {id: 1, title: 'Living Room'},
    {id: 2, title: 'Dining Room'},
    {id: 3, title: 'Bedroom'},
    {id: 4, title: 'Home Office'},
    {id: 5, title: 'Outdoor'},
    {id: 6, title: 'Decor & Accessories'},
    {id: 7, title: 'Lighting'},
    {id: 8, title: 'Rugs'},
    {id: 9, title: 'Mattresses'},
    {id: 10, title: 'Custom Furniture'},
    {id: 11, title: 'Other'}
  ]



  return (
    <div className='type-tab-main-container'>

      <h3>How would you like your consultation to take place?</h3>

      <div className='type-options-container'>
        {chatOptions.map((item, index) => (
          <div className='type-option' key={item.id}>

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
        {categories.map((item, index) => (
          <div className='type-category' key={item.id}>
            <p>
              {item.title}
            </p>
          </div>
        ))}
      </div>

      <button className='type-submit-button' onClick={() =>  setSelectedTab(selectedTab + 1)} >
        Next
      </button>

    </div>
  )
}

export default TypeTab
