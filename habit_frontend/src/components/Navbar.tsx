import style from "../styles/Navbar.module.css";
import { UserContext, UserContextType } from "../context/UserContext";
import { useContext } from "react";
import { Navbar as Nav, Container } from "react-bootstrap";

const Navbar = () => {
  const { user, logout, setIsLoggedIn } = useContext(
    UserContext
  ) as UserContextType;
  return (
    <div className={style.Navbar}>
      <h1 className={style.Title}>Habits </h1>

      <Nav>
        <Nav.Collapse className="justify-content-end">
          <Nav.Text>Signed in as: {user.username}</Nav.Text>
          <button
            onClick={() => {
              logout();
              setIsLoggedIn(false);
            }}
            className={style.SignoutButton}
          >
            Sign Out
          </button>
        </Nav.Collapse>
      </Nav>
    </div>
  );
};
export default Navbar;
