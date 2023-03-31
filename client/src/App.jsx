import './App.css';
import Form from "./components/Form";
import MyNavbar from "./components/Navbar"
// import { useMediaQuery } from "react-responsive";


function App() {

  return (
    <div className="App">
      {/* <MyNavbar /> */}
      <header>
        <h1>weather API</h1>
      </header>
      <Form />
    </div>
  );
}

export default App;