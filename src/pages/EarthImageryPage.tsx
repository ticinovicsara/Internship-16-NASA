import { useState, useEffect } from "react";
import LeafletMap from "../components/LeafletMap";
import useFetchEarthImage from "../hooks/useFetchEarthImage";
import { Link } from "react-router-dom";

interface SavedLocation {
  lat: number;
  lon: number;
}

const EarthImageryPage = () => {
  const [lat, setLat] = useState<number | null>(null);
  const [lon, setLon] = useState<number | null>(null);
  const { image, loading, error } = useFetchEarthImage(lat, lon);
  const [favorites, setFavorites] = useState<SavedLocation[]>([]);

  useEffect(() => {
    const savedLocations = localStorage.getItem("favorites");
    if (savedLocations) {
      setFavorites(JSON.parse(savedLocations));
    }
  }, []);

  const saveLocation = () => {
    if (lat !== null && lon !== null) {
      const newFavorites = [...favorites, { lat, lon }];
      setFavorites(newFavorites);
      localStorage.setItem("favorites", JSON.stringify(newFavorites));
    }
  };

  return (
    <div>
      <h1>Earth Imagery</h1>
      <p>Odaberite lokaciju klikom na mapu</p>

      <LeafletMap
        onLocationSelect={(latitude, longitude) => {
          setLat(latitude);
          setLon(longitude);
        }}
      />

      {loading && <p>Učitavanje slike...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {image && (
        <div>
          <h2>NASA Satelitska Slika</h2>
          <Link to={`/details/earth/${image.date}?lat=${lat}&lon=${lon}`}>
            <img src={image.url} alt="Satelitska slika" />
          </Link>
          <p>
            <strong>Datum snimanja:</strong> {image.date}
          </p>
          <button onClick={saveLocation}>Spremi lokaciju</button>
        </div>
      )}

      {favorites.length > 0 && (
        <div>
          <h2>Omiljene Lokacije</h2>
          <ul>
            {favorites.map((fav, index) => (
              <li key={index}>
                Lat: {fav.lat}, Lon: {fav.lon}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default EarthImageryPage;
