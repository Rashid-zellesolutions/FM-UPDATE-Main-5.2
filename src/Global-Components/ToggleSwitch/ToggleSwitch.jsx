import React from 'react';
import './ToggleSwitch.css'; 

const ToggleSwitch = ({ id, checked, onChange }) => {
  return (
    <div className="checkbox-wrapper-7">
      <input 
        className="tgl tgl-ios" 
        id={id} 
        type="checkbox" 
        checked={checked} 
        onChange={onChange} 
      />
      <label className="tgl-btn" htmlFor={id}>
      <span className="toggle-text">{checked ? 'Yes Protect it' : 'No Thanks'}</span>
      </label>
    </div>
  );
};

export default ToggleSwitch;