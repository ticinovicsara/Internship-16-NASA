import { useState, useEffect } from "react";
import LeafletMap from "../components/LeafletMap";
import useFetchEarthImage from "../hooks/useFetchEarthImagery";
import { withLoader } from "../hoc/withLoader";
import EarthImageryGallery from "../components/galeries/EarthImageryGallery";
import "../styles/earth/earth.css";

interface SavedLocation {
  lat: number;
  lon: number;
}

const EarthImageryWithLoading = withLoader(
  EarthImageryGallery,
  async ({ lat, lon }: { lat: number; lon: number }) => {
    const result = await useFetchEarthImage(lat, lon);
    return result.image;
  }
);

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
      <p className="earth-paragraph">Odaberite lokaciju klikom na mapu</p>

      <LeafletMap
        onLocationSelect={(latitude, longitude) => {
          setLat(latitude);
          setLon(longitude);
        }}
      />

      {lat !== null && lon !== null && (
        <EarthImageryWithLoading
          params={{ lat, lon }}
          {...{ lat, lon, saveLocation, favorites }} // Prosljeđivanje dodatnih props-a
        />
      )}
    </div>
  );
};

export default EarthImageryPage;
