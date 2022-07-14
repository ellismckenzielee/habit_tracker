import Navbar from "./Navbar";
import style from "../styles/Pair.module.css";
import { useContext, useEffect, useState } from "react";
import { UserContext, UserContextType } from "../context/UserContext";
import {
  acceptPairRequest,
  addPair,
  deletePair,
  getPairByUserId,
} from "../utils/utils";
const Pair = () => {
  const { user, isLoggedIn, setPair, pair } = useContext(
    UserContext
  ) as UserContextType;
  const [pairInput, setPairInput] = useState("");
  useEffect(() => {
    getPairByUserId(user.username, setPair);
  }, [user.username]);
  return (
    <div className={`${style.Pair} `}>
      <Navbar />
      <div className={`w-9/12 md:w-128 m-auto p-1`}>
        <h1
          className={
            "text-left  text-indigo-900 font-bold  p-2 mt-5 rounded-lg"
          }
        >
          {" "}
          Pair Settings{" "}
        </h1>
        <div>
          <h3 className="bg-indigo-900 align-middle text-white mb-1 p-2 rounded-lg">
            Your Pair{" "}
          </h3>

          {pair.pairId && pair.status === "accepted" && (
            <div
              className={
                "flex flex-column bg-indigo-900 rounded-t-lg p-5  m-auto my-0 w-full "
              }
            >
              <h2
                className={
                  "rounded-lg basis-1/4 m-auto align-center text-white font-bold"
                }
              >
                {pair.pairId}
              </h2>
              <div
                className={
                  "rounded-full border-2 border-indigo-500 grow-0 overflow-hidden m-auto my-3 "
                }
              >
                <img
                  src={"images/waldo.jpg"}
                  alt=""
                  className={"object-cover"}
                />
              </div>

              <div className={"align-middle"}>
                <button
                  className={
                    "w-full p-3 rounded-md bg-indigo-500 text-white hover:text-white hover:font-bold hover:uppercase m-auto mt-2 "
                  }
                  onClick={() => {
                    deletePair(pair._id, setPair);
                  }}
                >
                  Remove
                </button>
              </div>
            </div>
          )}
          {!pair.pairId && (
            <form
              className="flex flex-column align-center gap-2  w-full   m-auto mt-4"
              onSubmit={(e) => {
                addPair(user.username, pairInput);
              }}
            >
              <h2 className={"m-auto p-2 rounded-lg"}>
                {pair.pairId ? "Your Pair" : "You don't have a pair, yet."}
              </h2>
              <label htmlFor="username">
                Enter the username of the pair you want to add{" "}
              </label>
              <input
                className="m-auto text-center p-3 my-2 w-full border-2 border-indigo-500"
                type="text"
                value={pairInput}
                onChange={(e) => {
                  setPairInput(e.target.value);
                }}
              ></input>
              <button
                className={`${style.FormButton} rounded-md bg-indigo-500 hover:text-indigo-900 hover:uppercase hover:font-bold  p-2 m-auto w-25`}
              >
                Add a Pair
              </button>
            </form>
          )}
        </div>
        <div className="">
          {pair.status === "pending" && pair.recipient && (
            <div>
              <h3 className="bg-indigo-500 align-middle text-white mb-1 p-2 rounded-lg">
                Requests{" "}
              </h3>
              <h2>{pair.pairId}</h2>
              <button
                className="bg-indigo-900 text-white rounded-lg w-20 h-10 m-1 hover:uppercase hover:font-bold"
                onClick={() => {
                  acceptPairRequest(pair._id);
                }}
              >
                Accept
              </button>
              <button
                className="bg-indigo-900 text-white rounded-lg w-20 h-10 m-1 hover:uppercase hover:font-bold"
                onClick={() => {
                  deletePair(pair._id, setPair);
                }}
              >
                Reject{" "}
              </button>
            </div>
          )}
        </div>
        <div className="">
          {pair.status === "pending" && !pair.recipient && (
            <div>
              <h3 className="bg-indigo-500 align-middle text-white mb-1 p-2 rounded-lg">
                Pending Requests{" "}
              </h3>

              <h2>{pair.pairId}</h2>
              <button
                className={`${style.FormButton} rounded-md bg-indigo-500 hover:text-indigo-900 hover:uppercase hover:font-bold  p-2 m-auto w-25`}
                onClick={() => {
                  deletePair(pair._id, setPair);
                }}
              >
                Cancel Request
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Pair;
