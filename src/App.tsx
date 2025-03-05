import ThemeProvider from "./contexts/ThemeContext";
import AppRouter from "./Router";

function App() {
  return (
    <ThemeProvider>
      <AppRouter />
    </ThemeProvider>
  );
}

export default App;
