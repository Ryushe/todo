import { React } from "react";
import "./App.css";
import { AddButton, Popup } from "./components/AddButton";
import FuckMe from "./components/DraggableList";
// import DraggableList from "./components/DraggableList";
// import CheckboxList from "./components/listHandler";
// import MoveableList from "./components/listHandler";

const App = () => {
  return (
    <div className="app" >  
    <h1>Did You Do Your Shit?</h1>
      {/* <CheckboxList /> */}
      {/* <MoveableList/> */}
      {/* <Test /> */}
      {/* <DraggableList /> */}
      <FuckMe/>
      <AddButton /> 
      <Popup />     {/* Render the Popup component */}
    </div>
  );

}

export default App;
