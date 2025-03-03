import React, { useState } from 'react'
import './ReviewTab.css';
import { useAppointment } from '../../../../context/AppointmentContext/AppointmentContext';

const ReviewTab = ({ handleSubmitAppointment }) => {
  const [value, setValue] = useState('');
  const [focused, setFocused] = useState(false);

  const { appointmentPayload, setAppointmentPayload } = useAppointment();
  const handleUserDataChange = (e) => {
    const {name, value} = e.target;
    setAppointmentPayload((prev) => ({
      ...prev,
      details: {
        ...prev.details,
        [name]: value
      }
    }))
  }
  return (
    <div className='review-tab-main-container'>
      <h3>Please provide your details to be added to our appointment book</h3>
      
      <div className='review-tab-form'>

        <label>
          <input type='text' name='firstName' value={appointmentPayload.details.firstName} placeholder='First Name' onChange={handleUserDataChange} />
        </label>

        <label>
          <input type='text' name='lastName' value={appointmentPayload.details.lastName} placeholder='Last Name' onChange={handleUserDataChange} />
        </label>

        <label>
          <input type='text' name='email' value={appointmentPayload.details.email} placeholder='Email Address' onChange={handleUserDataChange} />
        </label>

        <label>
          <input type='text' name='contact' value={appointmentPayload.details.contact} placeholder='Contact Phone' onChange={handleUserDataChange} />
        </label>

        <h3>Was there an associate that you were working with?</h3>

        <label>
          <input type='text' name='associate' value={appointmentPayload.details.associate} placeholder='Associate Name' onChange={handleUserDataChange} />
        </label>

        <button onClick={handleSubmitAppointment}>
          Book Consultant
        </button>
      </div>

    </div>
  )
}

export default ReviewTab
