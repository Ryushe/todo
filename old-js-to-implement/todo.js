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





