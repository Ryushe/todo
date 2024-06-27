(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
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

},{}],2:[function(require,module,exports){

 async function fetchJsonData(filename) {
      try {
        const response = await fetch('data', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ filename }) // Send filename in request body
        });

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
    
        const data = await response.json();

        const listCategories = Object.keys(data);
        const categoryData = Object.values(data);
        return {listCategories, categoryData};

      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }

function updateJsonData(){
 // post to api that updates after cache has been updated
}

function fetchCacheData(){

}

function updateCacheData(){

}




module.exports = fetchJsonData;
},{}],3:[function(require,module,exports){
function handleLists(listCategories, categoryData){
    if(listCategories) {
        for(const listCat of listCategories) { // for cat in datalist
            console.log(listCat);
            console.log(categoryData[listCategories.indexOf(listCat)]);
            items = categoryData[listCategories.indexOf(listCat)];
            createCheckboxList(listCat, items);
        }

    } 
}

function createCheckboxList(listCatagory, items) {
    const list = document.getElementById(listCatagory);
    list.innerHTML = ""; // Clear previous content
  
    for (const item of items) {
        const listItem = document.createElement("li");
        listItem.classList.add("hilight"); // hilights when hovered

        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.id = item; // Set unique ID for each checkbox
        checkbox.value = item; // Store item value in checkbox value
    
        const label = document.createElement("label");
        label.textContent = item;
        label.htmlFor = checkbox.id; 

  
        listItem.appendChild(checkbox);
        listItem.appendChild(label);
        list.appendChild(listItem);
    }
  }



// clear button == clear boxes
const uncheckAllButton = document.querySelector('.clear'); 
uncheckAllButton.addEventListener("click", ()=>{
    const checkboxes = document.querySelectorAll("input[type='checkbox']");
    for (const checkbox of checkboxes) {
      checkbox.checked = false;
    }
  });

// Function to get checked items (can be called on a button click or other event)
const getCheckedItems = () => {
    const checkedItems = [];
    const checkboxes = document.querySelectorAll("input[type='checkbox']:checked");
    for (const checkbox of checkboxes) {
        checkedItems.push(checkbox.value);
    }
    console.log("Checked items:", checkedItems);
    // You can further process the checkedItems here (e.g., store in local storage)
};


// see what is different between top fn and this, making id listHandler create catagories and list items
// https://www.dhiwise.com/post/step-by-step-tutorial-crafting-an-html-dynamic-list
function createCategory(category) {
    const categoryElement = document.createElement('div');
    categoryElement.classList.add('category');
    categoryElement.innerHTML = `<h2>${category.name}</h2><ul id="${category.name}-list"></ul>`;
    document.getElementById('categories').appendChild(categoryElement);

    // Add list items to the category's list
    const listElement = categoryElement.querySelector(`ul[id="${category.name}-list"]`);
    category.listItems.forEach(item => {
        const listItem = document.createElement('li');
        listItem.textContent = item;
        listElement.appendChild(listItem);
  });
}

module.exports = handleLists;
},{}],4:[function(require,module,exports){
// things I do per day:

// 1 medium post, blog read, etc
// 15 min looking through twitter (finding tricks/payloads/etc)
// if challenge - do challenge dont worry too much about below

// to do: 
// - add delete feature
// - add to the list - current
// - have categories displayed
// - can create cats

// - come back to promises / cache (can find in google ai chat)
// - draggable list (find a way to make cats output too)
    // also if cat has none dont display
    // (https://www.youtube.com/watch?v=wv7pvH1O5Ho)


// idea 
// - can have ex: todo have button beside it upon hover to add to it
// - can have move to bottom once completed
// - multiple lists (hehe)
const handleAddPopup = require('./add')
const fetchJsonData = require('./dataHandler')
const handleLists = require('./listHandler')

var list = "TodoList";
var bounty = false;

if (bounty) {
    
}

// add button popup
handleAddPopup();
(async () => {
    try {
        // want to add cache, so if no cache we pull from json
        const { listCategories, categoryData } = await fetchJsonData(list);

        // if list and data exist go thru catagories and return the right one
        if (listCategories != null && categoryData != null) {
            handleLists(listCategories, categoryData);
        }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  })();






},{"./add":1,"./dataHandler":2,"./listHandler":3}]},{},[4]);
