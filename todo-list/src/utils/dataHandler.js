
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


        // getting json from todolist.json 
        // change below to return the list and make
        // draggable list from it
        // const listCategories = data.map(categories => categories.category);
        // const categoryData = data[listCategories].map(item => item.items);
        return data;

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




export {fetchJsonData};