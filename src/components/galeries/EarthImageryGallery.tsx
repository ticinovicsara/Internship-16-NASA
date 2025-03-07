import { Link } from "react-router-dom";
import ToastNotification from "../ToastNotification";

const EarthImageryGallery: React.FC<{
  loadingData: any;
  lat: number | null;
  lon: number | null;
  saveLocation: () => void;
  favorites: { lat: number; lon: number }[];
}> = ({ loadingData, lat, lon, saveLocation, favorites }) => {
  const handleSaveLocation = () => {
    saveLocation();
    ToastNotification("Location saved successfully!");
  };

  return (
    <div className="earth-page">
      {loadingData && (
        <div className="earth-image">
          <h1 className="satelite-title">NASA Satelite Image</h1>
          <Link to={`/details/earth/${loadingData.date}?lat=${lat}&lon=${lon}`}>
            <img src={loadingData.url} className="satelite-image" />
          </Link>
          <p className="earth-paragraph">
            <strong>Date of recording:</strong> {loadingData.date}
          </p>
          <button className="button" onClick={handleSaveLocation}>
            Save location
          </button>
        </div>
      )}

      {favorites.length > 0 && (
        <div className="earth-fav-locations">
          <h2>Favorite locations</h2>
          <ul className="earth-fav-list">
            {favorites.map((fav, index) => (
              <li key={index} className="earth-fav-item">
                Lat: {fav.lat}, Lon: {fav.lon}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default EarthImageryGallery;
