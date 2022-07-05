import { useState } from "react";
import style from "../styles/Signup.module.css";
import axios from "axios";
import { checkPassword, checkUsername } from "../utils/security.utils";
const Signup = ({
  setHasAccount,
}: {
  setHasAccount: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [usernameMessage, setUsernameMessage] = useState("");
  const [passwordMessage, setPasswordMessage] = useState("");
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
              setPasswordMessage("");
              setUsernameMessage("");
              axios
                .post("http://localhost:5656/user/signup", {
                  username,
                  password,
                })
                .then(() => {
                  setHasAccount(true);
                })
                .catch((err) => {
                  console.dir(err);
                  if (err.response.status === 409) {
                    setUsernameMessage("username already taken");
                  }
                });
            }
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
              const usernameCheck = checkUsername(e.target.value);
              if (!usernameCheck.success) {
                setUsernameMessage(usernameCheck.message);
              } else {
                setUsernameMessage("");
              }
            }}
          ></input>
          <p>{usernameMessage}</p>

          <label htmlFor="password">password</label>
          <input
            id="password"
            type="password"
            className={style.Input}
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              const passwordCheck = checkPassword(e.target.value);
              if (!passwordCheck.success) {
                setPasswordMessage(passwordCheck.message);
              } else {
                setPasswordMessage("");
              }
            }}
          ></input>
          <p>{passwordMessage}</p>

          <input type="submit" className={style.Submit}></input>
          <p
            onClick={() => {
              setHasAccount(true);
            }}
          >
            Already have an account?
          </p>
        </form>
      </div>
    </div>
  );
};

export default Signup;
