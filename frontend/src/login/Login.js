import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button, Alert } from "react-bootstrap";
import axios from "axios";
import "./login.css";

const Login = ({checkLogin}) => {
  useEffect(() => {
    document.title = "Login";
  });

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showError, setShowError] = useState(false);
  
  const navigate = useNavigate();

  const handleChange = (e) => {
    if (e.target.id === "username") {
      setUsername(e.target.value);
    } else if (e.target.id === "password") {
      setPassword(e.target.value);
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    axios({
      method: "post",
      data: {
        username: username,
        password: password,
      },
      url: `http://localhost:5000/signin`,
      withCredentials: true,
    }).then((res) => {
      checkLogin();
      navigate("/");
    }).catch((err) => {
      setShowError(true);
    });
  }

  return (
    <div className="main">
      <div className="login">
        <div className="header">
          <h1>Login</h1>
          {showError && <Alert variant="danger">Invalid Credentials</Alert>}
        </div>
        <form onSubmit={handleSubmit}>
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            required
            placeholder="Username"
            onChange={handleChange}
          />
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            required
            placeholder="Password"
            onChange={handleChange}
          />
          <Button variant="primary" type="submit"> 
            Login
          </Button>
        </form>
        
        <div className="create-account">
          No account? <Link to="/createaccount">Create one</Link>
        </div>
      </div>
    </div>
  );
};
export default Login;
