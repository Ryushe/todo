import "./style.css";
import { AddButton, Popup } from "./components/AddButton";
import CheckboxList from "./components/listHandler";

const App  = () => {
  return (
    <div className="App">  

      <CheckboxList/>
      <AddButton /> {/* Render the AddButton component */}
      <Popup />     {/* Render the Popup component */}
    </div>
  );

}

export default App;
