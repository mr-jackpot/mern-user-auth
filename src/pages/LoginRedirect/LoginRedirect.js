import React from "react";
import { useHistory } from "react-router-dom";
import "./LoginRedirect.css";
import axios from "axios";

const env = require("../../server/props");

const LoginRedirect = () => {
  let history = useHistory();

  const handleRoute = () => {
    history.push("/");
  };

  const logout = () => {
    axios
      .get(`${env.SERVER_URL}${env.SERVER_PORT}/logout`, {
        withCredentials: true,
      })
      .then((x) => {
        console.log(x);
      });
    history.push("/");
  };

  return (
    <div className="SuccessMessage">
      <h1>Success! You are now logged in.</h1>
      <br />
      <input type="submit" value="Go Back" onClick={handleRoute} />
      <input type="submit" value="Logout" onClick={logout} />
    </div>
  );
};

export default LoginRedirect;
