import CharactersList from "./components/CharactersList.jsx";
import Header from "./components/Header.jsx";
import Footer from "./components/Footer.jsx";

function App() {

  return (
    <div style={{backgroundImage: "url('/mcu-background.jpg')"}} className="bg-cover bg-fixed flex flex-col gap-5">
      <Header/>
      <CharactersList/>
      <Footer/>
    </div>
  )
}

export default App
