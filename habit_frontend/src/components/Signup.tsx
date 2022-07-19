import { useState } from "react";
import style from "../styles/Signup.module.css";
import axios from "axios";
import {
  checkPassword,
  checkUsername,
  setErrorMessages,
} from "../utils/security.utils";
const Signup = ({
  setHasAccount,
}: {
  setHasAccount: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [usernameError, setUsernameError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  return (
    <div className={style.Signup}>
      <h2> Sign up </h2>
      <div className={style.FormContainer}>
        <form
          className={style.Form}
          onSubmit={(e) => {
            e.preventDefault();
            const passwordResult = checkPassword(password);
            const usernameResult = checkUsername(username);
            if (passwordResult.success && usernameResult.success) {
              setPasswordError("");
              setUsernameError("");
              axios
                .post("http://localhost:5656/user/signup", {
                  username,
                  password,
                })
                .then(() => {
                  setHasAccount(true);
                })
                .catch(({ response }) => {
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
            }
          }}
        >
          <label htmlFor="username">username</label>
          <input
            id="username"
            type="text"
            className={`${style.Input} ${
              username.length > 0 && usernameError === ""
                ? style.SuccessInput
                : ""
            } focus:border-indigo-500`}
            value={username}
            onChange={(e) => {
              setUsername(e.target.value);
              console.log(e.target.value);
              const usernameCheck = checkUsername(e.target.value);
              console.log(usernameCheck);
              if (!usernameCheck.success) {
                console.log("unsucc");
                setUsernameError(usernameCheck.message);
              } else {
                setUsernameError("");
              }
            }}
          ></input>
          <p className="h-2">{usernameError}</p>

          <label htmlFor="password">password</label>
          <input
            id="password"
            type="password"
            className={`${style.Input} ${
              password.length > 0 && passwordError === ""
                ? style.SuccessInput
                : ""
            } focus:border-indigo-500`}
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              const passwordCheck = checkPassword(e.target.value);
              if (!passwordCheck.success) {
                setPasswordError(passwordCheck.message);
              } else {
                setPasswordError("");
              }
            }}
          ></input>
          <p className="h-2">{passwordError}</p>

          <input type="submit" className={style.Submit}></input>
          <p
            onClick={() => {
              setHasAccount(true);
            }}
            className={
              "p-2 bg-indigo-900 rounded-lg hover:uppercase hover:font-bold hover:cursor-pointer"
            }
          >
            Already have an account?
          </p>
        </form>
      </div>
    </div>
  );
};

export default Signup;
