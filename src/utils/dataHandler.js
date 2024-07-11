import { useEffect, useState } from "react";
// getting json from todolist.json 
// change below to return the list and make
// draggable list from it
// const listCategories = data.map(categories => categories.category);
// const categoryData = data[listCategories].map(item => item.items);

export function FetchJsonData (filename) {
  const[jsonData, setData] = useState([]); //not sure if needed
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

 // update when filename is changed
  useEffect(() => {
    fetchData();
  }, [filename]);

  const fetchData = async () => {

      try {
        const response = await fetch('data', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ filename }) // Send filename in request body
        });

        const data = await response.json();
        setData(data);
        setIsLoading(false);
      } catch (error) {
        setError("Error in datahandler, fetch data");
      }
  };
  return {jsonData, isLoading, error}
}


function updateJsonData(){
 // post to api that updates after cache has been updated
}

function fetchCacheData(){

}

function updateCacheData(){

}



