import style from "../styles/Login.module.css";
import { useState } from "react";
import { Navigate } from "react-router-dom";
import axios from "axios";
const Login = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState({});
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  console.log(password);
  return (
    <div className={style.Login}>
      {isLoggedIn && <Navigate to="/profile" />}
      <h2> Do it over and over and over again </h2>

      <div className={style.FormContainer}>
        <form
          className={style.Form}
          onSubmit={(e) => {
            e.preventDefault();
            axios
              .post("http://localhost:5656/user/login", { username, password })
              .then(({ data }) => {
                setUser(data);
                setIsLoggedIn(true);
              });
          }}
        >
          <label htmlFor="username">username</label>
          <input
            id="username"
            type="text"
            className={style.Input}
            value={username}
            onChange={(e) => {
              setUsername(e.target.value);
            }}
          ></input>
          <label htmlFor="password">password</label>
          <input
            id="password"
            type="password"
            className={style.Input}
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          ></input>
          <input type="submit" className={style.Submit}></input>
        </form>
      </div>
    </div>
  );
};

export default Login;
