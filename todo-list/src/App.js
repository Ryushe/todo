import { React } from "react";
import "./App.css";
import { AddButton, Popup } from "./components/AddButton";
import { DndContext, KeyboardSensor, PointerSensor, TouchSensor, closestCorners, useSensor, useSensors} from "@dnd-kit/core";
import { FetchJsonData } from "./utils/dataHandler";
import { useState, useEffect } from "react";
import { Column } from "./components/Column";
import { SortableContext, arrayMove, sortableKeyboardCoordinates } from "@dnd-kit/sortable";





const App = () => {
  // gets data using dataHandler.js
  const { data, isLoading, error } = FetchJsonData("TodoList");
  const [tasks, setTaskData] = useState([]); 

  console.log(data)
  useEffect(() => {
    if (data) { // Update listData only when data is available
      setTaskData(data);
    }
  }, [data]);

  const getTaskPos = id => tasks.findIndex(task => task.id === id)

  const handleDragEnd = event => {
    const {active, over} = event

    if(active.id === over.id) return;

    setTaskData(tasks => {
      const originalPos = getTaskPos(active.id);
      const newPos = getTaskPos(over.id);

      return arrayMove(tasks, originalPos, newPos)

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

        {tasks.length ? (
          <Column tasks={tasks}/>
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
