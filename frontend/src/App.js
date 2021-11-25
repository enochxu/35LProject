import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import CreateAccount from "./login/CreateAccount";
import Lists from "./Lists";
import Login from "./login/Login";

function App() {
  const [loading, setLoading] = useState(true);
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {

  });

  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Lists/>}/>
        <Route exact path="/login" element={<Login/>}/>
        <Route exact path="/createaccount" element={<CreateAccount/>}/>  
      </Routes>
    </Router>
  );
}

export default App;
