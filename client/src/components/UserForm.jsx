import { useState, useEffect } from "react";
import { FaCheckCircle } from "react-icons/fa";

const UserForm = () => {
  const [allUsers, setAllUsers] = useState([]);
  const [user, setUser] = useState();

  const defaultUser = {
    name: "",
		fave_city: ""
  }
  const [newUser, setNewUser] = useState(defaultUser);

  const getRequest = () => {
    fetch(`http://localhost:8080/api/users`)
      .then((response) => response.json())
      .then((existingUsers) => {
        console.log(`Existing users: ${existingUsers}`);
        console.log(existingUsers)
        console.log(`Current user from onChange: ${user}`);

        setAllUsers(existingUsers);
        console.log(`All users: ${allUsers}`);

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
          console.log(allUsers);
          let n = [...allUsers, response];
          setAllUsers(n);

          alert( `Welcome, ${response.name}! Your User ID is ${response.id}. You'll need this ID to log back in.`);
          // setNewContact(defaultContact); // want to do this onSubmit for Search button
        }
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
        onClick={() => {getRequest(user)}}>
        <FaCheckCircle style={{cursor: "pointer"}} />
      </button>
    </div>
  );
};

export default UserForm;