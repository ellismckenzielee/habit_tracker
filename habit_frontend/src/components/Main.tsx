import style from "../styles/Main.module.css";
import View from "./View";
import { UserContext, UserContextType } from "../context/UserContext";
import { useContext } from "react";
import { Navigate } from "react-router-dom";
import Navbar from "./Navbar";

const Main = () => {
  const { user, isLoggedIn } = useContext(UserContext) as UserContextType;
  console.log(user);
  return (
    <div className={style.Main}>
      {!isLoggedIn && <Navigate to="/" />}
      <Navbar />
      {user && <p> hello {user.username}</p>}
      <View />
    </div>
  );
};

export default Main;
