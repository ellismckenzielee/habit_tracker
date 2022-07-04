import style from "../styles/Navbar.module.css";
const Navbar = () => {
  return (
    <div className={style.Navbar}>
      <h1 className={style.Title}>Habits </h1>

      <button className={style.SignoutButton}> Sign Out </button>
    </div>
  );
};
export default Navbar;
