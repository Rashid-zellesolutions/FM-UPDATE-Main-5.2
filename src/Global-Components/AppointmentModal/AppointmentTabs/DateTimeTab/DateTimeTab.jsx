import React, { useEffect, useState } from 'react'
import './DateTimeTab.css'
import { Calendar } from 'react-calendar'
import 'react-calendar/dist/cjs/Calendar.js'
import { useAppointment } from '../../../../context/AppointmentContext/AppointmentContext'

const DateTimeTab = ({selectedTab, setSelectedTab}) => {
  const { appointmentPayload, setAppointmentPayload } = useAppointment();
  const [dateState, setDateState] = useState(new Date().toISOString().split('T')[0]);
  const timeSlots = [
    { time: '10:00 AM - 11: 00 PM'},
    { time: '11:00 AM - 12: 00 PM'},
    { time: '12:00 AM - 01: 00 PM'},
    { time: '01:00 AM - 02: 00 PM'},
    { time: '02:00 AM - 03: 00 PM'},
    { time: '03:00 AM - 04: 00 PM'},
    { time: '04:00 AM - 05: 00 PM'},
  ]

  const today = new Date();
  // Set today's time to midnight for accurate comparisons.
  today.setHours(0, 0, 0, 0);
  // Calculate the date 30 days from today.
  const maxDate = new Date(today);
  maxDate.setDate(today.getDate() + 30);

  const [showTimeSlots, setShowTimeSlots] = useState(false);

  useEffect(() => {
    const todayDate = new Date().toISOString().split('T')[0];
    setDateState(todayDate); // Ensure dateState is set
    setAppointmentPayload((prev) => ({
      ...prev,
      selectedDate: todayDate,
    }));
  }, []);

  const changeDate = (e) => {
    // setDateState(e)
    const selectedDate = new Date(e);
    selectedDate.setMinutes(selectedDate.getMinutes() - selectedDate.getTimezoneOffset());
    setAppointmentPayload((prev) => ({
      ...prev,
      selectedDate: selectedDate.toISOString().split('T')[0]
    }))
    
    console.log("Selected New Date", selectedDate.toISOString().split('T')[0])

    setShowTimeSlots(true)
  }

  useEffect(() => { console.log("set new date", dateState) }, [dateState])
  const  handleSelectTimeSlote = (item) => {
    setAppointmentPayload((prev) => ({
      ...prev, 
      selectedSlot: item,
    }))
  }


  return (
    <div className='date-time-outer-core-container'>
      <div className='date-time-tab-main-container'>
        <div className='date-time-tab-calender-section'>
          <Calendar
            value={dateState}
            onChange={changeDate}
            // tileDisabled={({ date }) => date < new Date().setHours(0, 0, 0, 0)}
            tileDisabled={({ date }) => date < today || date > maxDate}
            formatShortWeekday={(locale, date) =>
              date.toLocaleDateString(locale, { weekday: 'short' }).slice(0, 2)
            }
            tileClassName={() => 'custom-tile'}
          />
        </div>
        <div className='date-time-tab-times-slots'>
          {timeSlots.map((item, index) => (
            <p key={index} onClick={() => { handleSelectTimeSlote(item.time); setSelectedTab(selectedTab + 1) }} className='single-time-slot'>{item.time}</p>
          ))}
        </div>
      </div>

      <div className='location-tab-buttons-container'>
        <button onClick={() => setSelectedTab(selectedTab - 1)}>Previous</button>
      </div>
    </div>
   
  )
}

export default DateTimeTab
