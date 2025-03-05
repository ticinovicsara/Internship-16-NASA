import { useContext } from "react";
import { ThemeContext } from "../contexts/ThemeContext";

const withTheme = <P extends object>(
  WrappedComponent: React.ComponentType<P>
) => {
  return (props: P) => {
    const themeContext = useContext(ThemeContext);

    if (!themeContext) {
      return null;
    }

    return <WrappedComponent {...props} themeContext={themeContext} />;
  };
};

export default withTheme;
