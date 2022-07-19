import style from "../styles/Login.module.css";
import { useState, useContext } from "react";
import { UserContext, UserContextType } from "../context/UserContext";
import { Navigate } from "react-router-dom";
import axios from "axios";
import { setErrorMessages } from "../utils/security.utils";

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
  const [usernameError, setUsernameError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  return (
    <div className={style.Login}>
      {isLoggedIn && <Navigate to="/dashboard" />}
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
              })
              .catch(({ response }) => {
                console.log(response);
                console.log(
                  response.status,
                  response.data.message,
                  response.data.errorCause
                );
                setErrorMessages(
                  {
                    status: response.status,
                    message: response.data.message,
                    errorCause: response.data.errorCause,
                  },
                  setUsernameError,
                  setPasswordError
                );
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
          <p className="h-2">{usernameError}</p>
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
          <p className="h-2">{passwordError}</p>

          <input
            type="submit"
            className={`${style.Submit} rounded-lg bg-white hover:text-indigo-900 hover:font-bold`}
          ></input>
          <p
            onClick={() => {
              setHasAccount(false);
            }}
            className={
              "p-2 bg-indigo-900 rounded-lg hover:uppercase hover:font-bold hover:cursor-pointer"
            }
          >
            Don&apos;t have an account?
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
