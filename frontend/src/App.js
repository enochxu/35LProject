import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import CreateAccount from "./login/CreateAccount";
import Lists from "./Lists";

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Lists/>}/>
        <Route exact path="/createaccount" element={<CreateAccount/>}/>  
      </Routes>
    </Router>
  );
}

export default App;
