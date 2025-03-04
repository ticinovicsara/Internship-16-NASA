import { useContext } from "react";
import PlanetAnimation from "../components/PlanetAnimation";
import ToggleSwitch from "../components/ToggleSwitch";
import { ThemeContext } from "../contexts/ThemeContext";
import "../styles/home/home.css";
import { Cards } from "../components/Cards";

export const HomePage = () => {
  const themeContext = useContext(ThemeContext);
  if (!themeContext) return null;

  const { isDarkMode } = themeContext;

  return (
    <>
      <div className="homepage">
        <h1 className="title">Welcome to the NASA Explorer</h1>
        <p className="description">
          Explore images, data, and information from NASA's missions, rovers,
          and space observatories.
        </p>

        <div className="theme-image-container">
          <img
            src={isDarkMode ? "/spaceship.png" : "/spacemen.png"}
            alt="Theme Image"
            className="theme-image"
          />
        </div>

        <PlanetAnimation />
        <div className="dark-mode-toggle">
          <ToggleSwitch />
        </div>

        <div className="cards-section">
          <Cards />
        </div>
      </div>
    </>
  );
};
