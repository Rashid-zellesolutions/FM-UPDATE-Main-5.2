import React, { useState } from 'react'
import './DateTimeTab.css'
import { Calendar } from 'react-calendar'
import 'react-calendar/dist/cjs/Calendar.js'

const DateTimeTab = ({selectedTab, setSelectedTab}) => {
  const [dateState, setDateState] = useState(new Date());
  const timeSlots = [
    { time: '10:00 AM - 11: 00 AM'},
    { time: '11:00 AM - 12: 00 AM'},
    { time: '12:00 AM - 01: 00 AM'},
    { time: '01:00 AM - 02: 00 AM'},
    { time: '02:00 AM - 03: 00 AM'},
    { time: '03:00 AM - 04: 00 AM'},
    { time: '04:00 AM - 05: 00 AM'},
  ]

  const today = new Date();
  // Set today's time to midnight for accurate comparisons.
  today.setHours(0, 0, 0, 0);
  // Calculate the date 30 days from today.
  const maxDate = new Date(today);
  maxDate.setDate(today.getDate() + 30);

  const [showTimeSlots, setShowTimeSlots] = useState(false);
  const changeDate = (e) => {
    setDateState(e)
    setShowTimeSlots(true)
  }


  return (
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
          <p key={index} onClick={() => setSelectedTab(selectedTab + 1)} className='single-time-slot'>{item.time}</p>
        ))}
      </div>
    </div>
  )
}

export default DateTimeTab
