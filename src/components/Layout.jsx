import { useNavigate } from "react-router-dom";
import { Outlet } from "react-router-dom";
import classes from "./Layout.module.css";

export default function Layout() {
  const navigate = useNavigate();

  function handleLogout() {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("currentUser");
    navigate("/signin");
  }
  return (
    <main className={classes.dashboard}>
      <header className={classes["navigation-wrapper"]}>
        <div className={classes.navigation}>
          <img
            className={classes.logo}
            src="https://static.wixstatic.com/media/cfbdf7_e70ecba9aeee4db7a5e8275af188aa60~mv2.png/v1/crop/x_0,y_130,w_500,h_163/fill/w_194,h_62,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/cfbdf7_e70ecba9aeee4db7a5e8275af188aa60~mv2.png"
          />
          <nav className={classes["nav-links"]}>
            <a>Dashboard</a>
            <a>Invoices</a>
            <a>Users</a>
            <a>Settings</a>
            <a onClick={handleLogout}>Log Out</a>
          </nav>
        </div>
      </header>

      <Outlet />
    </main>
  );
}
