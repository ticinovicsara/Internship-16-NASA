import { Link, Outlet } from "react-router-dom";
import "../styles/navbar/navbar.css";
import ToggleSwitch from "./ToggleSwitch";

export const Layout = () => {
  return (
    <>
      <nav className="navbar">
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/apod">APOD</Link>
          </li>
          <li>
            <Link to="/mars">Mars Rover Photos</Link>
          </li>
          <li>
            <Link to="/neo">NEO Tracker</Link>
          </li>
          <li>
            <Link to="/earth">Earth Imagery</Link>
          </li>
        </ul>
      </nav>

      <main>
        <Outlet />
      </main>
    </>
  );
};
