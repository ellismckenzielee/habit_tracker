import style from "../styles/Login.module.css";
import { useState, useContext } from "react";
import { UserContext, UserContextType } from "../context/UserContext";
import { Navigate } from "react-router-dom";
import axios from "axios";

const Login = ({
  setHasAccount,
}: {
  setHasAccount: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
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
                const token = data.token;
                window.localStorage.setItem("jwt-token", token);
                const user = {
                  username: data.username,
                  userId: data.userId,
                  pairId: data.pairId,
                  pairName: data.pairName,
                };
                setUser(user);
                setIsLoggedIn(true);
              });
          }}
        >
          <label htmlFor="username">username</label>
          <input
            id="username"
            type="text"
            className={`${style.Input} focus:border-5 focus:border-indigo-500`}
            value={username}
            onChange={(e) => {
              setUsername(e.target.value);
            }}
          ></input>
          <label htmlFor="password">password</label>
          <input
            id="password"
            type="password"
            className={`${style.Input}  focus:border-5 focus:border-indigo-500`}
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          ></input>
          <input
            type="submit"
            className={`${style.Submit} hover:uppercase hover:font-bold hover:text-indigo-500`}
          ></input>
          <p
            onClick={() => {
              setHasAccount(false);
            }}
          >
            Don&apos;t have an account?
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
