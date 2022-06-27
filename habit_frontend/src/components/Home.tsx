import style from "../styles/Home.module.css";
import Login from "./Login";
import { useEffect, useContext, ContextType } from "react";
import { Navigate } from "react-router-dom";
import axios from "axios";
import { UserContext, UserContextType } from "../context/UserContext";
const Home = () => {
  const { setUser, isLoggedIn, user, setIsLoggedIn } = useContext(
    UserContext
  ) as UserContextType;
  console.log(user);
  useEffect(() => {
    const jwtToken = window.localStorage.getItem("jwt-token");
    if (jwtToken) {
      console.log(true);
    }
    axios
      .get("http://localhost:5656/user/login", {
        headers: { Authorization: `Bearer ${jwtToken}` },
      })
      .then(({ data }) => {
        if (data.username) {
          console.log("setting user");
          console.log(data);
          setIsLoggedIn(true);
          setUser({ username: data.username, userId: data._id });
        }
      });
  }, []);
  return (
    <div>
      <div className={style.Home}>
        {isLoggedIn && <Navigate to="/profile" />}
        <h1 className={style.Header}> Integrate </h1>
      </div>
      <Login />
    </div>
  );
};
export default Home;
