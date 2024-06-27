
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