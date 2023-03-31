import { useState, useEffect } from "react";
import Card from "./Card";
import { FaSearch } from "react-icons/fa";


const Form = () => {
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
    <>
      <div className="form">
        <input
          type="text"
          id="city"
          placeholder="Type in a city name"
          onChange={(event) => setCity(event.target.value)}
        />

        <button
          id="button"
          type="button"
          className="icon"
          onClick={getRequest}
          aria-label="Search">
          <FaSearch />
        </button>
      </div>

      {data ? (
        <Card
          icon={data.weather[0].icon}
          description={data.weather[0].description}
          city={data.name}
          tempMax={data.main.temp_max}
          tempMin={data.main.temp_min}
          feelsLike={data.main.feels_like}
          pressure={data.main.pressure}
          humidity={data.main.humidity}
        />
      ) : (
        <div className="empty"></div>
      )}
    </>
  );
};

export default Form;