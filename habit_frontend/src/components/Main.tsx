import style from "../styles/Main.module.css";
import View from "./View";
import { UserContext, UserContextType } from "../context/UserContext";
import { useContext } from "react";
import { Navigate } from "react-router-dom";
import Date from "./Date";
import Switch from "./Switch";
import usePair from "../hooks/usePair";
const Main = () => {
  const { user, isLoggedIn, setPair, pair } = useContext(
    UserContext
  ) as UserContextType;
  const { focus, setFocus, date, setDate } = usePair(user, pair, setPair);
  return (
    <div className={style.Main}>
      {!isLoggedIn && <Navigate to="/" />}
      {setFocus && (
        <>
          <Switch
            focus={focus}
            status={pair.status}
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
              Here are <span className="text-indigo-500">{pair.pairId}</span>
              &#39;s habits
            </h1>
          )}

          <Date date={date} setDate={setDate} />

          <View focus={focus} date={date} />
        </>
      )}
    </div>
  );
};

export default Main;
