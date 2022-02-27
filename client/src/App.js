import React, { useState, useEffect } from 'react';
import './App.css';
import { Outlet } from "react-router-dom";
import Navbar from './component/navbar/Navbar';



function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (localStorage.getItem("verifyToken")) {
      var body = {
        token : localStorage.getItem("verifyToken")
      }
      var header = {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(body),
      }
      fetch("http://localhost:5000/user",header)
        .then(response => {
          return response.json();
        })
        .then(data => {
          if (data.message === "successful") {
            setUser(data.user);
          }
          if (data.message === "error") {
            localStorage.removeItem("verifyToken");
          }
        })
        .catch(error => {
          console.log(error);
        })
    }
  }, [])

  return (
    <>
      <div className="App">
        <Navbar user={user} />
      </div>
      <Outlet context={[setUser]} />
    </>
  );
}

export default App;
