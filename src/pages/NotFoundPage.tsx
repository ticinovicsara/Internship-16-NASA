import { useNavigate } from "react-router-dom";
import "../styles/404/404.css";

export const NotFoundPage = () => {
  const navigate = useNavigate();

  return (
    <div className="not-found-page">
      <img src="/404.png" className="not-found-image" />
      <button className="button not-found-btn" onClick={() => navigate("/")}>
        Return to Home
      </button>
    </div>
  );
};
