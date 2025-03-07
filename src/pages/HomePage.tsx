import { useContext } from "react";
import PlanetAnimation from "../components/PlanetAnimation";
import ToggleSwitch from "../components/ToggleSwitch";
import { ThemeContext } from "../contexts/ThemeContext";
import "../styles/home/home.css";
import { Cards } from "../components/Cards";

export const HomePage = () => {
  const themeContext = useContext(ThemeContext);

  if (!themeContext) {
    console.error(
      "ThemeContext is not available in HomePage. Make sure ThemeProvider is correctly wrapped."
    );
    return <p>Error: Theme not loaded.</p>;
  }

  const { isDarkMode } = themeContext;

  document.body.className = isDarkMode ? "dark-theme" : "light-theme";

  return (
    <>
      <div className="homepage">
        <h1 className="title">Welcome to the NASA Explorer</h1>
        <p className="description">
          Explore images, data and information from NASA missions, rovers and
          space observatories.
          <br />
          Discover the wonders of space, follow rovers on Mars, or investigate
          near-Earth asteroid threats.
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
          <ToggleSwitch
            themeContext={{
              isDarkMode: false,
              toggleTheme: function (): void {
                throw new Error("Function not implemented.");
              },
            }}
          />
        </div>

        <div className="cards-section">
          <Cards />
        </div>
      </div>
    </>
  );
};
