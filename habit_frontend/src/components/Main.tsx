import style from "../styles/Main.module.css";
import Actions from "./Actions";
import View from "./View";
import { UserContext, UserContextType } from "../context/UserContext";
import { useContext } from "react";

const Main = () => {
  const { user } = useContext(UserContext) as UserContextType;
  console.log(user);
  return (
    <div className={style.Main}>
      <h1> This is the main page </h1>
      {user && <p> hello {user.username}</p>}
      <View />
      <Actions  />
    </div>
  );
};

export default Main;
