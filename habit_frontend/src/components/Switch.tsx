import { Link } from "react-bootstrap/lib/Navbar";
import { useNavigate } from "react-router-dom";
import style from "../styles/Switch.module.css";
const Switch = ({
  setFocus,
  username,
  pairName,
  userId,
  pairId,
  focus,
}: {
  username: string;
  pairName: string;
  setFocus: Function;
  userId: string;
  pairId: string;
  focus: string;
}) => {
  const navigate = useNavigate();
  return (
    <div className={`${style.Switch} `}>
      <button
        className={`font-bold mt-10 mb-10 p-4 w-40 md:w-60 rounded-l-lg bg-color-blue ${
          focus === username
            ? "bg-indigo-500 text-indigo-100"
            : "bg-indigo-100 text-indigo-500 text-bold"
        }`}
        onClick={() => {
          setFocus(username);
        }}
      >
        {username}
      </button>
      {pairName && (
        <button
          className={`font-bold mt-10 mb-10 bg-indigo-500 p-4 w-40 md:w-60 rounded-r-lg   ${
            focus === pairName
              ? "bg-indigo-500 text-indigo-100"
              : "bg-indigo-100 text-indigo-500 text-bold"
          } `}
          onClick={() => {
            setFocus(pairName);
          }}
        >
          {pairName}
        </button>
      )}
      {!pairName && (
        <button
          className={`font-bold mt-10 mb-10 bg-indigo-500 p-4 w-40 md:w-60 rounded-r-lg   ${
            focus === pairName
              ? "bg-indigo-500 text-indigo-100"
              : "bg-indigo-100 text-indigo-500 text-bold"
          } `}
          onClick={() => {
            navigate("/pair");
          }}
        >
          Add a Pair
        </button>
      )}
    </div>
  );
};
export default Switch;
