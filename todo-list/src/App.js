import { React } from "react";
import "./App.css";
import { AddButton, Popup } from "./components/AddButton";
// import FuckMe from "./components/DraggableList";
// import CheckboxList from "./components/listHandler";
// import MoveableList from "./components/listHandler";
import { DndContext, closestCorners } from "@dnd-kit/core";
import { FetchJsonData } from "./utils/dataHandler";
import { useState, useEffect } from "react";
import { Column } from "./components/Column";
import { arrayMove } from "@dnd-kit/sortable";





const App = () => {
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
  }

  return (
    <div className="app" >  

    <h1>Did You Do Your Shit?</h1>

      <DndContext onDragEnd={handleDragEnd} collisionDetection={closestCorners}>
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
