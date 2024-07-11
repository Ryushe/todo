import { React } from "react";
import "./App.css";
import { AddButton, Popup } from "./components/AddButton";
import { DndContext, KeyboardSensor, PointerSensor, TouchSensor, closestCorners, useSensor, useSensors} from "@dnd-kit/core";
import { FetchJsonData } from "./utils/dataHandler";
import { useState, useEffect } from "react";
import { SortableContext, arrayMove, sortableKeyboardCoordinates } from "@dnd-kit/sortable";
import { Collumn } from "./components/Collumn";




const App = () => {
  // gets data using dataHandler.js
  const { jsonData, isLoading, error } = FetchJsonData("TodoList");
  const [data, setData] = useState([]); 
  const[activeId, setActiveId] = useState();

  console.log(jsonData)
  useEffect(() => {
    if (jsonData) { // Update listData only when data is available
      setData(jsonData);
    }
  }, [jsonData]);

  const getTaskPos = id => data.items.findIndex(task => task.id === id)

  const handleDragEnd = event => {
    const {active, over} = event
    if(active.id === over.id) return;

    setData(data => {
      const originalPos = getTaskPos(active.id);
      const newPos = getTaskPos(over.id);
      return arrayMove(data, originalPos, newPos)
    })
  };

  const sensors = useSensors(
    useSensor(PointerSensor),
    // useSensor(TouchSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );


  return (
    <div className="app" >  
    <h1>Did You Do Your Shit?</h1>
      <DndContext 
        sensors={sensors} 
        onDragEnd={handleDragEnd} 
        collisionDetection={closestCorners}>
        {data.length ? (
          <Collumn data={data}/>
        ) : (
          <p>loading...</p>
        )
      }
      </DndContext>
      <AddButton /> 
      <Popup />     {/* Render the Popup component */}
    </div>
  );

}

export default App;
