import { useState, useEffect } from "react";
import Card from "./Card";
import { FaSearch } from "react-icons/fa";


const UserForm = () => {
  const [data, setData] = useState();
  const [city, setCity] = useState();

  const getRequest = () => {
    fetch(`http://localhost:8080/api/weather?cityName=${city}`)
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
        setData(result);
      });
  }

  return (
    <div className="form">
      <input
        type="text"
        id="user"
        placeholder="User name"
        onChange={(event) => setCity(event.target.value)}
      />

    </div>
  );
};

export default UserForm;