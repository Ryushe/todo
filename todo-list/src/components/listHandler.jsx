// import React, { useState, useEffect } from 'react';
// import { fetchJsonData } from '../utils/dataHandler';

// var list = "TodoList"

// function CheckboxList({ listCategories, categoryData }) {
//   const [items, setItems] = useState([]); // State to hold items for each category

//   // Fetch data on component mount (assuming you have a fetch function)
//   useEffect(() => {
//     const fetchData = async () => {
//         const data = await fetchJsonData(list);
//         console.log(data);
//         setItems(data); // Update state with fetched data
//     };
//     fetchData();
//   }, []); // Empty dependency array ensures fetching happens only once on mount

//   const handleCheckboxChange = (event) => {
//     // Handle checkbox selection/deselection logic (optional)
//     console.log('Checkbox changed:', event.target.value);
//   };

//   return (
//     <div>
//       {listCategories && listCategories.map((listCat) => (
//         <ul key={listCat} id={listCat}>
//           {/* Clear content before rendering new items */}
//           <li key="clear">{''}</li> {/* Empty key for clearing previous content */}
//           {items
//             .filter((item) => item.category === listCat) // Filter items based on category
//             .map((item) => (
//               <li key={item.id} className="hilight">
//                 <input
//                   type="checkbox"
//                   id={item.id} // Use a unique identifier (e.g., item.id)
//                   value={item.value}
//                   onChange={handleCheckboxChange}
//                 />
//                 <label htmlFor={item.id}>{item.text}</label>
//               </li>
//             ))}
//         </ul>
//       ))}
//       <button className="clear" onClick={() => {
//         // Clear all checkboxes
//         const checkboxes = document.querySelectorAll('input[type="checkbox"]');
//         for (const checkbox of checkboxes) {
//           checkbox.checked = false;
//         }
//       }}>
//         Clear
//       </button>
//     </div>
//   );
// }

// export default CheckboxList;


// incorporate this with list.json 
// need to set up getjsondata first 

// https://www.geeksforgeeks.org/drag-and-drop-sortable-list-using-reactjs/

import React, { Component } from 'react'; 
import { RiDragMove2Line } from 'react-icons/ri'; 
import { fetchJsonData } from '../utils/dataHandler';

export async function Test(){
    try {
        const data = await fetchJsonData("TodoList");
        console.log(data);
    } catch (error) {
        console.error("Error fetching data:", error);
    }

}

(async () => {
    try {
      const data = await Test();
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  })();


// var draggingItem = null;
// var newItemName = '';
// var newItemImage = '';

  
// class MoveableList extends Component { 
//     constructor(props) { 
//         super(props); 
//         this.state = { 
//             items: [ 
//                 { 
//                     id: 1, 
//                     name: 'Kristina Zasiadko', 
//                     image: 
//                         'https://media.geeksforgeeks.org/wp-content/uploads/20230816223829/geeksgforgeeks-logo-1.png', 
//                 }, 
//                 { 
//                     id: 2, 
//                     name: 'John Doe', 
//                     image: 
// 'https://media.geeksforgeeks.org/wp-content/uploads/20230721212159/gfg-logo.jpeg', 
//                 }, 
//                 { 
//                     id: 3, 
//                     name: 'Jane Smith', 
//                     image: 
// 'https://media.geeksforgeeks.org/wp-content/uploads/20230909123918/GeeksforGeeks-Wide-logo-black.png', 
//                 }, 
//                 // Add more items here 
//             ], 
//             draggingItem: null, 
//             newItemName: '', 
//             newItemImage: '', 
//         }; 
//     } 
  
//     handleDragStart = (e, item) => { 
//         this.setState({ draggingItem: item }); 
//         e.dataTransfer.setData('text/plain', ''); 
//     }; 
  
//     handleDragEnd = () => { 
//         this.setState({ draggingItem: null }); 
//     }; 
  
//     handleDragOver = (e) => { 
//         e.preventDefault(); 
//     }; 
  
//     handleDrop = (e, targetItem) => { 
//         const { draggingItem, items } = this.state; 
//         if (!draggingItem) return; 
  
//         const currentIndex = items.indexOf(draggingItem); 
//         const targetIndex = items.indexOf(targetItem); 
  
//         if (currentIndex !== -1 && targetIndex !== -1) { 
//             items.splice(currentIndex, 1); 
//             items.splice(targetIndex, 0, draggingItem); 
//             this.setState({ items }); 
//         } 
//     }; 
  
//     handleNameChange = (e) => { 
//         this.setState({ newItemName: e.target.value }); 
//     }; 
  
//     handleImageChange = (e) => { 
//         this.setState({ newItemImage: e.target.value }); 
//     }; 
  
//     addNewItem = () => { 
          
//         // Generate a unique ID for the new item 
//         const newItemId =  
//             Math.max(...this.state.items.map((item) => item.id)) + 1; 
//         const newItem = { 
//             id: newItemId, 
//             name: this.state.newItemName, 
//             image: this.state.newItemImage, 
//         }; 
  
//         // Add the new item to the state 
//         this.setState({ 
//             items: [...this.state.items, newItem], 
//             newItemName: '', // Clear the input fields 
//             newItemImage: '', 
//         }); 
//     }; 
  
//     render() { 
//         return ( 
//             <div className="sortable-list"> 
//                 <div className="new-item"> 
//                     <input 
//                         type="text"
//                         placeholder="Name"
//                         value={this.state.newItemName} 
//                         onChange={this.handleNameChange} 
//                         className="input-field"
//                     /> 
//                     <input 
//                         type="text"
//                         placeholder="Image URL"
//                         value={this.state.newItemImage} 
//                         onChange={this.handleImageChange} 
//                         className="input-field"
//                     /> 
//                     <button onClick={this.addNewItem}  
//                             className="add-button"> 
//                         Add New Item 
//                     </button> 
//                 </div> 
//                 {this.state.items.map((item, index) => ( 
//                     <div 
//                         key={item.id} 
//                         className= 
//                             {`item ${item === this.state.draggingItem ?  
//                                 'dragging' : ''
//                             }`} 
//                         draggable="true"
//                         onDragStart={(e) =>  
//                             this.handleDragStart(e, item)} 
//                         onDragEnd={this.handleDragEnd} 
//                         onDragOver={this.handleDragOver} 
//                         onDrop={(e) => this.handleDrop(e, item)} 
//                     > 
//                         <div className="details"> 
//                             <img src={item.image} alt={item.name} /> 
//                             <span>{item.name}</span> 
//                         </div> 
                          
//                         {/* Use the React icon component */} 
//                         <RiDragMove2Line />  
//                     </div> 
//                 ))} 
//             </div> 
//         ); 
//     } 
// } 
  
// export default MoveableList;