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
};
export default Login;
