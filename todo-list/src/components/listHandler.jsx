import React, { useState, useEffect } from 'react';
import { fetchJsonData } from '../utils/dataHandler';

var list = "TodoList"

function CheckboxList({ listCategories, categoryData }) {
  const [items, setItems] = useState([]); // State to hold items for each category

  // Fetch data on component mount (assuming you have a fetch function)
  useEffect(() => {
    const fetchData = async () => {
        const data = await fetchJsonData(list);
        setItems(data); // Update state with fetched data
    };
    fetchData();
  }, []); // Empty dependency array ensures fetching happens only once on mount

  const handleCheckboxChange = (event) => {
    // Handle checkbox selection/deselection logic (optional)
    console.log('Checkbox changed:', event.target.value);
  };

  return (
    <div>
      {listCategories && listCategories.map((listCat) => (
        <ul key={listCat} id={listCat}>
          {/* Clear content before rendering new items */}
          <li key="clear">{''}</li> {/* Empty key for clearing previous content */}
          {items
            .filter((item) => item.category === listCat) // Filter items based on category
            .map((item) => (
              <li key={item.id} className="hilight">
                <input
                  type="checkbox"
                  id={item.id} // Use a unique identifier (e.g., item.id)
                  value={item.value}
                  onChange={handleCheckboxChange}
                />
                <label htmlFor={item.id}>{item.text}</label>
              </li>
            ))}
        </ul>
      ))}
      <button className="clear" onClick={() => {
        // Clear all checkboxes
        const checkboxes = document.querySelectorAll('input[type="checkbox"]');
        for (const checkbox of checkboxes) {
          checkbox.checked = false;
        }
      }}>
        Clear
      </button>
    </div>
  );
}

export default CheckboxList;