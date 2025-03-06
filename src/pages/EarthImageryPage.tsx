import { useState, useEffect } from "react";
import LeafletMap from "../components/LeafletMap";
import EarthImageryGallery from "../components/galeries/EarthImageryGallery";
import "../styles/earth/earth.css";
import { withLoader } from "../hoc/withLoader";
import { fetchEarthData } from "../services/fetchEarthData";

interface SavedLocation {
  lat: number;
  lon: number;
}

const EarthImageryGalleryWithLoading = withLoader(
  (props) => (
    <EarthImageryGallery
      lat={null}
      lon={null}
      saveLocation={function (): void {
        throw new Error("Function not implemented.");
      }}
      favorites={[]}
      {...props}
    />
  ),
  async ({ lat, lon }: { lat: number; lon: number }) => fetchEarthData(lat, lon)
);

const EarthImageryWithLoading = ({
  lat,
  lon,
  saveLocation,
  favorites,
}: any) => {
  return (
    <EarthImageryGalleryWithLoading
      params={{ lat, lon }}
      saveLocation={saveLocation}
      favorites={favorites}
    />
  );
};

const EarthImageryPage = () => {
  const [lat, setLat] = useState<number | null>(null);
  const [lon, setLon] = useState<number | null>(null);
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
    <div className="earth-page">
      <h1 className="page-title">Earth Imagery</h1>
      <p className="earth-paragraph">Pick a location on the map</p>

      <div className="map">
        <LeafletMap
          onLocationSelect={(latitude, longitude) => {
            setLat(latitude);
            setLon(longitude);
          }}
        />

        {lat !== null && lon !== null && (
          <EarthImageryWithLoading
            lat={lat}
            lon={lon}
            saveLocation={saveLocation}
            favorites={favorites}
          />
        )}
      </div>
    </div>
  );
};

export default EarthImageryPage;
