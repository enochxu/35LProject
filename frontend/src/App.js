import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import axios from "axios";
import "./App.css";
import Loading from "./Loading";
import CreateAccount from "./login/CreateAccount";
import Lists from "./Lists";
import Login from "./login/Login";

function App() {
  const [loading, setLoading] = useState(true);
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    checkLogin()
  }, []);

  const checkLogin = () => {
    axios({
      method: "get",
      url: `http://localhost:5000/authenticate`,
      withCredentials: true,
    })
      .then((res) => {
        setLoggedIn(true);
        setLoading(false);
      })
      .catch((err) => {
        setLoggedIn(false);
        setLoading(false);
      }); 
  }

  return (
    <Router>
      {loading ? (<Loading />) : (
        <Routes>
          <Route exact path="/" element={(loggedIn && <Lists/>) || (<Navigate to="/login"/>)}/>
          <Route exact path="/login" element={(!loggedIn && <Login checkLogin={checkLogin}/>) || (<Navigate to="/"/>)}/>
          <Route exact path="/createaccount" element={<CreateAccount/>}/>  
        </Routes>
      )}
    </Router>
  );
}

export default App;
