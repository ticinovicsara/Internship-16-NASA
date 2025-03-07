import { LoadingProvider } from "./providers/LoadingProvider";
import ThemeProvider from "./contexts/ThemeContext";
import AppRouter from "./Router";
import { ToastContainer } from "react-toastify";
import ErrorBoundary from "./utils/ErrorBoundary";

function App() {
  return (
    <ThemeProvider>
      <LoadingProvider>
        <ErrorBoundary>
          <AppRouter />
        </ErrorBoundary>
        <ToastContainer />
      </LoadingProvider>
    </ThemeProvider>
  );
}

export default App;
