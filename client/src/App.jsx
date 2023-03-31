import './App.css';
import WeatherForm from "./components/WeatherForm";
import MyNavbar from "./components/Navbar"
// import { useMediaQuery } from "react-responsive";


function App() {

  return (
    <div className="App">
      {/* <MyNavbar /> */}
      <header>
        <h1>weather API</h1>
      </header>
      <WeatherForm />
    </div>
  );
}

export default App;