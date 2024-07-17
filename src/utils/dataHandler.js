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
        const response = await fetch('/data', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ filename }) // Send filename in request body
        });

        const data = await response.json();
        if(data){
          setData(data);
          setIsLoading(false);
        } 
        
      } catch (error) {
        setError("Error in datahandler, fetch data");
      }
  };
  return {jsonData, isLoading, error}
}


export function setJsonData(data, filename){
  
  (async () => {
    try {
      const response = await fetch('/updateData', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ data, filename }),
      });

    } catch (error) {
        console.log("Error sending json", error);
    }
  })();
}

function fetchCacheData(){

}

function updateCacheData(){

}



