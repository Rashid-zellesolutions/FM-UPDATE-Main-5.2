import React, { useState } from 'react'
import './ReviewTab.css';

const ReviewTab = () => {
  const [value, setValue] = useState('');
  const [focused, setFocused] = useState(false);
  return (
    <div className='review-tab-main-container'>
      <h3>Please provide your details to be added to our appointment book</h3>
      
      <div className='review-tab-form'>

        <label>
          <input type='text' placeholder='First Name' />
        </label>
        
        {/* <div className="floating-input-container">
          <input
            type="text"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
          />
          <label className={focused || value ? 'float' : ''}>Your Label</label>
        </div> */}

        {/* <TextField
          id="filled-password-input"
          label="First Name"
          type="text"
          autoComplete="current-password"
          variant="filled"
        /> */}

        <label>
          <input type='text' placeholder='Last Name' />
        </label>

        <label>
          <input type='text' placeholder='Email Address' />
        </label>

        <label>
          <input type='text' placeholder='Contact Phone' />
        </label>

        <h3>Was there an associate that you were working with?</h3>

        <label>
          <input type='text' placeholder='Associate Name' />
        </label>

        <button>
          Book Consultant
        </button>
      </div>

    </div>
  )
}

export default ReviewTab
