import style from "../styles/Home.module.css";
import Login from "./Login";
import { useEffect, useContext, useState } from "react";
import { Navigate } from "react-router-dom";
import axios from "axios";
import Signup from "./Signup";
import { UserContext, UserContextType } from "../context/UserContext";
const Home = () => {
  const { setUser, isLoggedIn, user, setIsLoggedIn } = useContext(
    UserContext
  ) as UserContextType;
  const [hasAccount, setHasAccount] = useState(true);
  console.log(user, isLoggedIn);
  useEffect(() => {
    const jwtToken = window.localStorage.getItem("jwt-token");
    if (jwtToken) {
      console.log(true);

      axios
        .get("http://localhost:5656/user/login", {
          headers: { Authorization: `Bearer ${jwtToken}` },
        })
        .then(({ data }) => {
          if (data.username) {
            console.log("setting user");
            console.log(data);
            setIsLoggedIn(true);
            setUser({
              username: data.username,
              userId: data.userId,
              pairId: data.pairId,
              pairName: data.pairName,
            });
          }
        });
    }
  }, []);
  return (
    <div>
      <div className={style.Home}>
        {isLoggedIn && <Navigate to="/profile" />}
        <h1 className={`${style.Header} text-indigo-900 rounded-lg`}>
          {" "}
          Integrate{" "}
        </h1>
      </div>
      {hasAccount && <Login setHasAccount={setHasAccount} />}
      {!hasAccount && <Signup setHasAccount={setHasAccount} />}
    </div>
  );
};
export default Home;
