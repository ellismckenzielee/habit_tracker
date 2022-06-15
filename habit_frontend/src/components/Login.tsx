import style from "../styles/Login.module.css";
import { useState } from "react";
import { Navigate } from "react-router-dom";
const Login = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  return (
    <div className={style.Login}>
      {isLoggedIn && <Navigate to="/profile" />}
      <h2> Do it over and over and over again </h2>

      <div className={style.FormContainer}>
        <form
          className={style.Form}
          onSubmit={(e) => {
            e.preventDefault();
            setIsLoggedIn(true);
          }}
        >
          <label htmlFor="username">username</label>
          <input id="username" type="text" className={style.Input}></input>
          <label htmlFor="password">password</label>
          <input id="password" type="password" className={style.Input}></input>
          <input type="submit" className={style.Submit}></input>
        </form>
      </div>
    </div>
  );
};

export default Login;
