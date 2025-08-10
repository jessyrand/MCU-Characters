import './App.css'
import CharactersList from "./components/CharactersList.jsx";
import * as url from "node:url";

function App() {

  return (
    <div style={{backgroundImage: "url('/mcu-background.jpg')"}} className="bg-cover">
      <h1>Welcome to the MCU characters database</h1>
      <CharactersList/>
    </div>
  )
}

export default App
