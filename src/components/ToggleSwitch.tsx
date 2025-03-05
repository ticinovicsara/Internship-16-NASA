import withTheme from "../hoc/withTheme";

interface ToggleSwitchProps {
  themeContext: {
    isDarkMode: boolean;
    toggleTheme: () => void;
  };
}

const ToggleSwitch: React.FC<ToggleSwitchProps> = ({ themeContext }) => {
  const { isDarkMode, toggleTheme } = themeContext;

  return (
    <button className="button" onClick={toggleTheme}>
      {isDarkMode ? "Light Mode" : "Dark Mode"}
    </button>
  );
};

export default withTheme(ToggleSwitch);
