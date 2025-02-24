import React, { useState } from 'react'
import './AppointmentModal.css';
import { IoIosClose } from "react-icons/io";
import { SlCalender } from "react-icons/sl";
import TypeTab from './AppointmentTabs/TypeTab/TypeTab';
import LocationTab from './AppointmentTabs/LocationTab/LocationTab';
import DateTimeTab from './AppointmentTabs/DateTimeTab/DateTimeTab';
import ReviewTab from './AppointmentTabs/ReviewTab/ReviewTab';

const AppointmentModal = ({showAppointMentModal, handleCloseModal}) => {

    const tabs = [
        {id: 1, title: 'Type'},
        {id: 2, title: 'Location'},
        {id: 3, title: 'Date/Time'},
        {id: 4, title: 'Review'},
    ]
    const [selectedTab, setSelectedTab] = useState(1);
    const handleSelectedTab = (tab) => {
        setSelectedTab(tab);
    }

    

  return (
    <div className={`appointment-modal-main-container ${showAppointMentModal ? 'show-appointment-modal' : ''}`} onClick={handleCloseModal}>
        <div className='appointment-modal-inner-container' onClick={(e) => e.stopPropagation()}>
            <button className='appointment-modal-close-btn' onClick={handleCloseModal}>
                <IoIosClose size={22} color='#595959' />
            </button>
            
            <div className='appointment-modal-head'>
                <SlCalender size={25} color='#4487C5' />
                  <p>Schedule a Consultation</p>
            </div>

            {/*Tab Pagination */}
            <div className='pagination-tab-section-container'>
                <div className={`pagination-tab-line`}></div>
                <div className='appointment-modal-tab-pagination'>
                    {tabs.map((item, index) => (
                        <div className='appointment-modal-tab-btn-container'>
                            <button key={index} onClick={() => handleSelectedTab(index + 1)} className={`appointment-modal-tab-btn ${selectedTab === index + 1 ? 'selected-tab' : ''}`}>{item.id}</button>
                            <p>{item.title}</p>
                        </div>
                    ))}
                </div>
            </div>

            <div className='appointment-modal-tab-content'>
                  {
                      selectedTab === 1 ? <TypeTab selectedTab={selectedTab} setSelectedTab={setSelectedTab} />
                          : selectedTab === 2 ? <LocationTab selectedTab={selectedTab} setSelectedTab={setSelectedTab} />
                              : selectedTab === 3 ? <DateTimeTab selectedTab={selectedTab} setSelectedTab={setSelectedTab} />
                                  : <ReviewTab />
                  }
            </div>

            

        </div>
    </div>
  )
}

export default AppointmentModal
