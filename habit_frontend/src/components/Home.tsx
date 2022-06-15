import style from "../styles/Home.module.css";
import Login from "./Login";
const Home = () => {
  return (
    <div>
      <div className={style.Home}>
        <h1 className={style.Header}> Integrate </h1>
      </div>
      <Login />
    </div>
  );
};
export default Home;
