async function fileExists(list) {
    try {
        const response = await fetch(`notes/${list}.json`);
        if (response.ok) {
            return true;
        } else {
          console.log('Creating file since it does not exist', await response.text());
            return false;
        }
      } catch (error) {
        console.error('Error checking file:', error);
      }
}


async function fetchJsonData(list) {
    // if file doesnt exist
    if (await fileExists(list)) {
        // going to have in other file
        // createFile();
    }
        try {
            const res = await fetch(`notes/${list}.json`);
            if (!res.ok) {
                throw new Error(`HTTP error! Status: ${res.status}`);
            }
            listJsonData = await res.json();

            const listCategories = Object.keys(listJsonData);
            const categoryData = Object.values(listJsonData);

            return {listCategories, categoryData};
        } catch (error) {
            console.error("Unable to fetch data:", error);
            return null; 
        }
    
  }


module.exports = fetchJsonData;