import style from "../styles/Main.module.css";
import View from "./View";
import { UserContext, UserContextType } from "../context/UserContext";
import { useContext, useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import Navbar from "./Navbar";
import Date from "./Date";
import { getMonday } from "../utils/date.utils";
import Switch from "./Switch";
import { getPairByUserId } from "../utils/utils";
const Main = () => {
  const { user, isLoggedIn, setPair, pair } = useContext(
    UserContext
  ) as UserContextType;
  const [date, setDate] = useState<string>(getMonday(0));
  const [focus, setFocus] = useState<string>(user.username);
  console.log("FOCUS", focus);
  console.log("PAIR", pair);
  useEffect(() => {
    getPairByUserId(user.username, setPair);
  }, [user.username]);
  return (
    <div className={style.Main}>
      {!isLoggedIn && <Navigate to="/" />}
      <Switch
        userId={user.userId}
        focus={focus}
        status={pair.status}
        pairId={pair.pairId}
        username={user.username}
        pairName={pair.pairId}
        setFocus={setFocus}
      />
      {focus === user.username && (
        <h1 className={`p-3 `}>
          Here are your habits,{" "}
          <span className="text-indigo-500">{user.username}</span>.
        </h1>
      )}
      {focus !== user.username && (
        <h1 className={`p-3 `}>
          Here are <span className="text-indigo-500">{user.pairName}</span>'s
          habits.
        </h1>
      )}

      <Date date={date} setDate={setDate} />

      <View focus={focus} date={date} />
    </div>
  );
};

export default Main;
