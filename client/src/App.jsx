import './App.css';
import WeatherForm from "./components/WeatherForm";
import UserForm from "./components/UserForm";
import MyNavbar from "./components/Navbar"
// import { useMediaQuery } from "react-responsive";


function App() {

  return (
    <div className="App">
      {/* <MyNavbar /> */}
      <header>
        <h1>weather API</h1>
      </header>
      <UserForm />
      <WeatherForm />
    </div>
  );
}

export default App;