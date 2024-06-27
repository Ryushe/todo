// add button hehe

const addButton = document.querySelector('.add_button');
const popupContainer = document.querySelector('.popup-container');
const submitBtn = document.querySelector('.submit-btn');
const closeBtn = document.querySelector('.close-btn');

function handleAddPopup(){
  addButton.onclick = ()=> {
      popupContainer.classList.add('active');
  }
  closeBtn.onclick = ()=> {
      popupContainer.classList.remove('active');
  }
  submitBtn.onclick = ()=> {
      popupContainer.classList.remove('active');
  }

  // esc to close input popup
  document.addEventListener('keydown', function(event) { 
    if (event.key === 'Escape' && popupContainer.classList.contains('active')) { 
      popupContainer.classList.remove('active'); 
    }
});
}
module.exports = handleAddPopup;
// export function updateJson(data){

// }
