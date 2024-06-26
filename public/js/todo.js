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

var currentList = "TodoList";
var listJsonData;
 
var bounty = false;
if (bounty) {
    
}

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

async function fetchJsonData() {
    try {
        const res = await fetch("/listData.json");
        if (!res.ok) {
            throw new Error(`HTTP error! Status: ${res.status}`);
        }
        return await res.json();
    } catch (error) {
        console.error("Unable to fetch data:", error);
        return null; 
    }
  }
  
// gets data using fetchJsonData
(async () => {
    try {
        listJsonData = await fetchJsonData();

        // getting data dynamically
        const listCategories = Object.keys(listJsonData[currentList]);
        const categoryData = Object.values(listJsonData[currentList]);
        handleLists(listCategories, categoryData);
        sendOff(listJsonData);

                  console.log(listJsonData); 
    } catch (error) {
        console.error("Error fetching data:", error);
    }

})();


function sendOff(listJsonData){
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