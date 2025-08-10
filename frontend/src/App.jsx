import './App.css'
import CharactersList from "./components/CharactersList.jsx";
import Header from "./components/Header.jsx";

function App() {

  return (
    <div style={{backgroundImage: "url('/mcu-background.jpg')"}} className="bg-cover bg-fixed flex flex-col gap-5">
      <Header/>
      <CharactersList/>
    </div>
  )
}

export default App
