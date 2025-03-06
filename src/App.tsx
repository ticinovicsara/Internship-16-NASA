import { LoadingProvider } from "./providers/LoadingProvider";
import ThemeProvider from "./contexts/ThemeContext";
import AppRouter from "./Router";

function App() {
  return (
    <ThemeProvider>
      <LoadingProvider>
        <AppRouter />
      </LoadingProvider>
    </ThemeProvider>
  );
}

export default App;
