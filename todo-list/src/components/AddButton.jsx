
// Popup.jsx
import React from 'react';
function AddButton() {
  return (
    <a href="#" className="add_button" onClick={(e) => e.preventDefault()}> 
      <i className="label">+</i>
    </a>
  );
}



function Popup({ open, children }) {
  const classes = open ? 'popup-container active' : 'popup-container';
  return (
    <div className={classes}>
      <div className="popup-box">
        <h1>Enter Input:</h1>
        <input type="text" />
        <br />
        <div className="popup-button">
          <button className="submit-btn">Add</button>
          <button className="close-btn">Exit</button>
        </div>
        {children}
      </div>
    </div>
  );
}

export {AddButton, Popup};