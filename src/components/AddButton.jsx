
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

// from add.js

// const addButton = document.querySelector('.add_button');
// const popupContainer = document.querySelector('.popup-container');
// const submitBtn = document.querySelector('.submit-btn');
// const closeBtn = document.querySelector('.close-btn');

// function handleAddPopup(){
//   addButton.onclick = ()=> {
//       popupContainer.classList.add('active');
//   }
//   closeBtn.onclick = ()=> {
//       popupContainer.classList.remove('active');
//   }
//   submitBtn.onclick = ()=> {
//       popupContainer.classList.remove('active');
//   }

//   // esc to close input popup
//   document.addEventListener('keydown', function(event) { 
//     if (event.key === 'Escape' && popupContainer.classList.contains('active')) { 
//       popupContainer.classList.remove('active'); 
//     }
// });
// }
// module.exports = handleAddPopup;