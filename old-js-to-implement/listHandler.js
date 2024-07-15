function handleLists(listCategories, categoryData){
    if(listCategories) {
        for(const listCat of listCategories) { // for cat in datalist
            // console.log(listCat);
            // console.log(categoryData[listCategories.indexOf(listCat)]);
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