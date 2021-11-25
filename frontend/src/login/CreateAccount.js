import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button, Alert } from "react-bootstrap";
import axios from "axios";
import "./login.css";

const CreateAccount = () => {
  useEffect(() => {
    document.title = "Sign Up";
  });

  const [username, setName] = useState("");
  const [password, setPassword] = useState("");
  const [showError, setShowError] = useState(false);

  const user = {
    username: username,
    password: password,
  };

  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    axios({
      method: "post",
      data: {
        username: username,
        password: password,
      },
      url: `http://localhost:5000/createaccount`,
      withCredentials: true,
    }).then((res) => {
      navigate('/login');
    }).catch((err) => {
      console.log(err);
      // create error message / banner?
      setShowError(true);
    });
    // redirect to list or somewhere you want
    // navigate.push('/');
  };

  return (
    <div className="main">
      <div className="login">
        <h1 className="header">Create account</h1>
        { showError && <Alert variant="danger">Account Exists</Alert> }
        <form onSubmit={ handleSubmit }>
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            required
            value={username}
            onChange={(e) => setName(e.target.value)}
            placeholder="Create Username"
          />
          <label htmlFor="password">Password:</label>
          <input
            type="text"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Create Password"
          />
          {/* <button onClick={handleButton}> Create Account </button> */}
          <Button variant="primary" type="submit"> 
            Login
          </Button>
        </form>
        <div className="accountlinks">
          Already have an account? <Link to="/login" className="link">Log in</Link>
        </div>
      </div>
    </div>
  );
};
export default CreateAccount;
