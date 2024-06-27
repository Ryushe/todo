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


module.exports = fetchJsonData;
},{}],3:[function(require,module,exports){
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
const fetchJsonData = require('./listJsonData')



var list = "TodoList";
var bounty = false;

 
if (bounty) {
    
}

// add button popup
handleAddPopup();

(async () => {
    try {
        const { listCategories, categoryData } = await fetchJsonData(list);

        // if list and data exist go thru catagories and return the right one
        if (listCategories != null && categoryData != null) {
            handleLists(listCategories, categoryData);
        }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  })();

function createCheckboxList(listId, items) {
    const list = document.getElementById(listId);
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

function handleLists(listCategories, categoryData){
    if(listCategories) {
        for(const listCat of listCategories) { // for cat in datalist
            console.log(listCat);
            console.log(categoryData[listCategories.indexOf(listCat)]);
            specificData = categoryData[listCategories.indexOf(listCat)];
            createCheckboxList(listCat, specificData);
        }

    } 
}

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

// clear button == clear boxes
const uncheckAllButton = document.querySelector('.clear'); 
uncheckAllButton.addEventListener("click", ()=>{
    const checkboxes = document.querySelectorAll("input[type='checkbox']");
    for (const checkbox of checkboxes) {
      checkbox.checked = false;
    }
  });


// async function fetchJsonData() {
//     try {
//         const res = await fetch("/listData.json");
//         if (!res.ok) {
//             throw new Error(`HTTP error! Status: ${res.status}`);
//         }
//         return await res.json();
//     } catch (error) {
//         console.error("Unable to fetch data:", error);
//         return null; 
//     }
//   }
  
// // gets data using fetchJsonData
// (async () => {
//     try {
//         listJsonData = await fetchJsonData();

//         // getting data dynamically
//         const listCategories = Object.keys(listJsonData[currentList]);
//         const categoryData = Object.values(listJsonData[currentList]);
//         handleLists(listCategories, categoryData);
//         sendOff(listJsonData);

//                   console.log(listJsonData); 
//     } catch (error) {
//         console.error("Error fetching data:", error);
//     }

// })();


},{"./add":1,"./listJsonData":2}]},{},[3]);
