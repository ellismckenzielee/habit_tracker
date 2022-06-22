import style from "../styles/Login.module.css";
import { useState, useContext } from "react";
import { UserContext, UserContextType } from "../context/UserContext";
import { Navigate } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const userContext = useContext(UserContext) as UserContextType;
  const isLoggedIn = userContext.isLoggedIn;
  const setIsLoggedIn = userContext.setIsLoggedIn;
  const setUser = userContext.setUser;
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
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
