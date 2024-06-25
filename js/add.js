// add button hehe
const addButton = document.querySelector('.add_button');
const closeModalButtons = document.querySelectorAll('[data-close-button]')
const overlay = document.getElementById('overlay')

addButton.addEventListener('click', (event)=>{
    event.preventDefault(); // Prevent default navigation
    const modal = document.querySelector(button.dataset.modalTarget)
    openModal(modal)
});

