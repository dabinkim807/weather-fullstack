import { useState, useEffect } from "react";
import { FaCheckCircle } from "react-icons/fa";
import Card from "./Card";
import { FaSearch } from "react-icons/fa";

const UserForm = () => {
  const [user, setUser] = useState("");
  const [id, setId] = useState(0);
  const [allowSearch, setAllowSearch] = useState(false)
  const [data, setData] = useState(null);
  const [city, setCity] = useState("");

  const getRequest = () => {
    if (user === "") {
      alert("Fill in user name field");
      return;
    }
    // don't need to return all users
    fetch(`http://localhost:8080/api/users`)
      .then((response) => response.json())
      .then((existingUsers) => {
        console.log(`Existing users: ${existingUsers}`);
        console.log(existingUsers)
        console.log(`Current user from onChange: ${user}`);

        for (const u of existingUsers) {
          if (u.name === user) {
            alert(`Welcome back, ${u.name}! Please confirm your User ID.`);
            return;
          }
        }
        postRequest();
      });
  }

  const postRequest = () => {
    fetch(`http://localhost:8080/api/users`, {
      method: "POST",
      headers: {
        "Content-type": "application/JSON"
      },
      body: JSON.stringify({name: user, fave_city: ""})
    })
      .then((response) => {
        if (response.status === 400) {
          response.text().then(function (text) {
            alert(text);
          });
          return null;
        } else {
          return response.json();
        }})
      .then((response) => {
        if (response !== null) {

          alert( `Welcome, ${response.name}! Your User ID is ${response.id}. You'll need this ID to log back in.`);
          // setNewContact(defaultContact); // want to do this onSubmit for Search button ?
        }
      });
  }

  const checkId = () => {
    fetch(`http://localhost:8080/api/validate`, {
      method: "POST",
      headers: {
        "Content-type": "application/JSON"
      },
      body: JSON.stringify({name: user, id: Number(id)})
    })
      .then((response) => {
        if (response.status !== 200) {
          alert("wrong user id, try again");
        } else {
          alert("search away!")
          setAllowSearch(true);
        }});
  }

  const getWeatherRequest = () => {
    fetch(`http://localhost:8080/api/weather?cityName=${city}&user=${user}&id=${id}`)
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
        onChange={(e) => setUser(e.target.value)}
      />
      <button
        id="check-user"
        type="button"
        className="icon"
        onClick={getRequest}>
        <FaCheckCircle style={{cursor: "pointer"}} />
      </button>
      <input
        type="text"
        id="id"
        placeholder="User ID"
        onChange={(e) => setId(e.target.value)}
      />
      <button
        id="check-id"
        type="button"
        className="icon"
        onClick={checkId}>
        <FaCheckCircle style={{cursor: "pointer"}} />
      </button>
        <input
          disabled={!allowSearch}
          type="text"
          id="city"
          placeholder="City name"
          onChange={(event) => setCity(event.target.value)}
        />
 
        <button
          disabled={!allowSearch}
          id="search"
          type="button"
          className="icon"
          onClick={getWeatherRequest}
          aria-label="Search">
          <FaSearch style={{cursor: "pointer"}} />
        </button>

      {data !== null ? (
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
    </div>
  );
};

export default UserForm;