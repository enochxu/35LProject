import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "../index.css";

const CreateAccount = () => {
  useEffect(() => {
    document.title = "Sign Up";
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
      url: `http://localhost:5000/createaccount`,
      withCredentials: true,
    }).then((res) => {
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
        <h2 className="pagename">Create account</h2>
        <form>
          <input
            type="text"
            required
            value={username}
            onChange={(e) => setName(e.target.value)}
            placeholder="Create Username"
          />
          <input
            type="text"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Create Password"
          />
          <button onClick={handleButton}> Create Account </button>
        </form>
      </div>
      <div className="redirect">
        <label className="message">Already have an account?</label>
        <div className="accountlinks">
          {/* <Link to="/login" className="link">Log in</Link> */}
        </div>
      </div>
    </div>
  );
};
export default CreateAccount;
