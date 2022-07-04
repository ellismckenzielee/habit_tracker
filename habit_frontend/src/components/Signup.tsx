import { useState } from "react";
import style from "../styles/Signup.module.css";
import axios from "axios";
const Signup = ({
  setHasAccount,
}: {
  setHasAccount: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  return (
    <div className={style.Signup}>
      <h2> Sign up </h2>
      <div className={style.FormContainer}>
        <form
          className={style.Form}
          onSubmit={(e) => {
            e.preventDefault();
            axios.post("http://localhost:5656/user/signup", {
              username,
              password,
            });
            setHasAccount(true);
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
