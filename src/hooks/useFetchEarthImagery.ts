import { useEffect, useState } from "react";
import { fetchEarthData } from "../services/fetchEarthData";
import { handleApiError } from "./apiHookHelper";

interface EarthImage {
  url: string;
  date: string;
}

const useFetchEarthImagery = (lat: number | null, lon: number | null) => {
  const [image, setImage] = useState<EarthImage | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (lat === null || lon === null) return;

    const loadImage = async () => {
      setLoading(true);
      setError(null);
      try {
        const result = await fetchEarthData(lat, lon);
        setImage(result);
      } catch (err: any) {
        setError(handleApiError(err));
      } finally {
        setLoading(false);
      }
    };

    loadImage();
  }, [lat, lon]);

  return { image, loading, error };
};

export default useFetchEarthImagery;
