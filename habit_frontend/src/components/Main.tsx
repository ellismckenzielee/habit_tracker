import style from "../styles/Main.module.css";
import View from "./View";
import { UserContext, UserContextType } from "../context/UserContext";
import { useContext, useState } from "react";
import { Navigate } from "react-router-dom";
import Navbar from "./Navbar";
import FriendView from "./FriendView";
import Date from "./Date";
import { getMonday } from "../utils/date.utils";

const Main = () => {
  const { user, isLoggedIn } = useContext(UserContext) as UserContextType;
  const [date, setDate] = useState<string>(getMonday(0));

  console.log(date);
  return (
    <div className={style.Main}>
      {!isLoggedIn && <Navigate to="/" />}
      <Navbar />
      <Date date={date} setDate={setDate} />

      <View date={date} />
      {/* <FriendView date={date} pairId={user.pairId} /> */}
    </div>
  );
};

export default Main;
