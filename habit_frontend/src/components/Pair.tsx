import Navbar from "./Navbar";
import style from "../styles/Pair.module.css";
import { useContext } from "react";
import { UserContext, UserContextType } from "../context/UserContext";
const Pair = () => {
  const { user, isLoggedIn } = useContext(UserContext) as UserContextType;
  console.log(isLoggedIn);
  return (
    <div className={`${style.Pair} `}>
      <Navbar />
      <div className={`w-8/12 m-auto p-1`}>
        <h1
          className={
            "text-left text-indigo-900 font-bold bg-indigo-50 h-10 mt-2 rounded-lg"
          }
        >
          {" "}
          Pair Settings{" "}
        </h1>
        <h5 className={"text-left  rounded-lg"}>
          Choose and remove your habit pair!{" "}
        </h5>
        <h2 className={"text-left text-white p-2 bg-indigo-900 rounded-lg"}>
          {user.pairId ? "Your Pair" : "You don't have a pair, yet"}
        </h2>
        {user.pairId && (
          <div
            className={
              "flex flex-column bg-indigo-50 rounded-lg p-5 max-w-md m-auto"
            }
          >
            <h2 className={"rounded-lg basis-1/4 m-auto align-center"}>
              {user.pairName}
            </h2>
            <div
              className={"rounded-full  grow-0 overflow-hidden m-auto my-3 "}
            >
              <img src={"images/waldo.jpg"} alt="" className={"object-cover"} />
            </div>

            <div className={"align-middle"}>
              <button
                className={
                  "rounded-md bg-indigo-500 hover:text-white hover:uppercase p-2 m-auto w-20"
                }
              >
                Remove
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Pair;
