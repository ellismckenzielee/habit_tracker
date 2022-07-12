import style from "../styles/Main.module.css";
import View from "./View";
import { UserContext, UserContextType } from "../context/UserContext";
import { useContext, useState } from "react";
import { Navigate } from "react-router-dom";
import Navbar from "./Navbar";
import FriendView from "./FriendView";
import Date from "./Date";
import { getMonday } from "../utils/date.utils";
import Switch from "./Switch";
const Main = () => {
  const { user, isLoggedIn } = useContext(UserContext) as UserContextType;
  const [date, setDate] = useState<string>(getMonday(0));
  const [focus, setFocus] = useState<string>(user.userId);
  console.log("FOCUS", focus);
  return (
    <div className={style.Main}>
      {!isLoggedIn && <Navigate to="/" />}
      <Navbar />
      <Switch
        userId={user.userId}
        focus={focus}
        pairId={user.pairId}
        username={user.username}
        pairName={user.pairName}
        setFocus={setFocus}
      />
      {focus === user.userId && (
        <h1 className={`p-3 `}>
          Here are your habits,{" "}
          <span className="text-indigo-500">{user.username}</span>.
        </h1>
      )}
      {focus !== user.userId && (
        <h1 className={`p-3 `}>
          Here are <span className="text-indigo-500">{user.pairName}</span>'s
          habits.
        </h1>
      )}

      <Date date={date} setDate={setDate} />

      <View focus={focus} date={date} />
      {/* <FriendView date={date} pairId={user.pairId} /> */}
    </div>
  );
};

export default Main;
