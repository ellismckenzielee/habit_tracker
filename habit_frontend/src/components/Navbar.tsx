import style from "../styles/Navbar.module.css";
import { UserContext, UserContextType } from "../context/UserContext";
import { useContext } from "react";
const Navbar = () => {
  const { logout, setIsLoggedIn } = useContext(UserContext) as UserContextType;
  return (
    <div className={style.Navbar}>
      <h1 className={style.Title}>Habits </h1>

      <button
        onClick={() => {
          logout();
          setIsLoggedIn(false);
        }}
        className={style.SignoutButton}
      >
        {" "}
        Sign Out{" "}
      </button>
    </div>
  );
};
export default Navbar;
