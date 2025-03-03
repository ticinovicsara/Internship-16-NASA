import PlanetAnimation from "../components/PlanetAnimation";
import ToggleSwitch from "../components/ToggleSwitch";
import ThemeProvider from "../contexts/ThemeContext";
import "../styles/home/home.css";

export const HomePage = () => {
  return (
    <ThemeProvider>
      <div className="homepage">
        <h1 className="title">Welcome to the NASA API Explorer</h1>
        <p className="description">
          Explore images, data, and information from NASA's missions, rovers,
          and space observatories.
        </p>
        <PlanetAnimation />
        <div className="dark-mode-toggle">
          <ToggleSwitch />
        </div>
      </div>
    </ThemeProvider>
  );
};
