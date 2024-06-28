import { React } from "react";
import "./App.css";
import { AddButton, Popup } from "./components/AddButton";
// import CheckboxList from "./components/listHandler";
// import MoveableList from "./components/listHandler";
import { Test } from "./components/listHandler";

const App = () => {
  return (
    <div className="app" >  
    <h1>Did You Do Your Shit?</h1>
      {/* <CheckboxList /> */}
      {/* <MoveableList/> */}
      {/* <Test /> */}
      <AddButton /> {/* Render the AddButton component */}
      <Popup />     {/* Render the Popup component */}
    </div>
  );

}

export default App;
