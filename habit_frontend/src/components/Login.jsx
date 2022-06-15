import style from "../styles/Login.module.css";
const Login = () => {
  return (
    <div className={style.Login}>
      <h2> Do it over and over and over again </h2>

      <div className={style.FormContainer}>
        <form className={style.Form}>
          <label>username</label>
          <input type="text"></input>
          <label>password</label>
          <input type="password"></input>
          <input type="submit"></input>
        </form>
      </div>
    </div>
  );
};

export default Login;
