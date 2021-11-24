import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "../index.css";

const Login = () => {
  useEffect(() => {
    document.title = "Sign In";
  });

  const [username, setName] = useState("");
  const [password, setPassword] = useState("");

  const user = {
    username: username,
    password: password,
  };

  const navigate = useNavigate();
  const handleButton = (e) => {
    e.preventDefault();
    axios({
      method: "post",
      data: {
        username: username,
        password: password,
      },
      url: `http://localhost:5000/verifyaccount`,
      withCredentials: true,
    }).then(
      (res) => {
        console.log(res)
        if (res == "true") {
          // send user to login page 
        }
        else {
          // display error message
        }
      // navigate.push('/');
    }).catch((err) => {
      console.log(err);
      // create error message / banner?
    });
    // redirect to list or somewhere you want
    // navigate.push('/');
  };

  return (
    <div className="create">
      <div className="userform">
        <h2 className="pagename">Login</h2>
        <form>
          <input
            type="text"
            required
            value={username}
            onChange={(e) => setName(e.target.value)}
            placeholder="Username"
          />
          <input
            type="text"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
          />
          <button onClick={handleButton}> Login </button>
        </form>
      </div>
      <div className="redirect">
        <label className="message">Create an account</label>
        <div className="accountlinks">
          {/* <Link to="/createAccount" className="link">Create Account</Link> */}
        </div>
      </div>
    </div>
  );
};
export default Login;
