import { FC } from "react";
import "../styles/error.css";

interface ErrorFallbackProps {
  error: Error;
  resetErrorBoundary: () => void;
}

export const ErrorFallback: FC<ErrorFallbackProps> = ({
  error,
  resetErrorBoundary,
}) => {
  return (
    <div className="error-fallback-container">
      <h2 className="error-header">Oops, something went wrong!</h2>
      <p className="error-message">Error: {error.message}</p>
      <button onClick={resetErrorBoundary} className="retry-button">
        Try again
      </button>
    </div>
  );
};
