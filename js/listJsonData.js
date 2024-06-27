async function fetchJsonData(currentList) {
    try {
        const res = await fetch("/listData.json");
        if (!res.ok) {
            throw new Error(`HTTP error! Status: ${res.status}`);
        }
        listJsonData = await res.json();

        const listCategories = Object.keys(listJsonData[currentList]);
        const categoryData = Object.values(listJsonData[currentList]);

        return {listCategories, categoryData};
    } catch (error) {
        console.error("Unable to fetch data:", error);
        return null; 
    }
  }


module.exports = fetchJsonData;