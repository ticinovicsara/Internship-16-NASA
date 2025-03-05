import { LoadingProvider } from "./contexts/LoadingContext";
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
