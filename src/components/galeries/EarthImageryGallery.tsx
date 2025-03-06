import { Link } from "react-router-dom";

const EarthImageryGallery: React.FC<{
  loadingData: any;
  lat: number | null;
  lon: number | null;
  saveLocation: () => void;
  favorites: { lat: number; lon: number }[];
}> = ({ loadingData, lat, lon, saveLocation, favorites }) => {
  return (
    <div className="earth-page">
      {loadingData && (
        <div className="earth-image">
          <h1 className="satelite-title">NASA Satelitska Slika</h1>
          <Link to={`/details/earth/${loadingData.date}?lat=${lat}&lon=${lon}`}>
            <img
              src={loadingData.url}
              alt="Satelitska slika"
              className="satelite-image"
            />
          </Link>
          <p className="earth-paragraph">
            <strong>Datum snimanja:</strong> {loadingData.date}
          </p>
          <button className="button" onClick={saveLocation}>
            Spremi lokaciju
          </button>
        </div>
      )}

      {favorites.length > 0 && (
        <div className="earth-fav-locations">
          <h2>Omiljene Lokacije</h2>
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
