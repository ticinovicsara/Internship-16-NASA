import { useContext } from "react";
import { ThemeContext } from "../contexts/ThemeContext";

const ToggleSwitch = () => {
  const themeContext = useContext(ThemeContext);

  if (!themeContext) {
    return null;
  }

  const { isDarkMode, toggleTheme } = themeContext;

  return (
    <button onClick={toggleTheme}>
      {isDarkMode ? "Light Mode" : "Dark Mode"}
    </button>
  );
};

export default ToggleSwitch;
