import { useEffect, useState } from "react";

interface EarthImage {
  url: string;
  date: string;
}

const useFetchEarthImage = (lat: number | null, lon: number | null) => {
  const [image, setImage] = useState<EarthImage | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (lat === null || lon === null) return;

    const fetchImage = async () => {
      setLoading(true);
      setError(null);
      try {
        const API_KEY = import.meta.env.VITE_NASA_API_KEY;
        const response = await fetch(
          `https://api.nasa.gov/planetary/earth/assets?lat=${lat}&lon=${lon}&dim=0.1&api_key=${API_KEY}`
        );

        if (!response.ok) throw new Error(`API error: ${response.status}`);

        const data = await response.json();
        setImage({ url: data.url, date: data.date });
      } catch (err: any) {
        setError(err.message || "Greška pri dohvatanju slike.");
      } finally {
        setLoading(false);
      }
    };

    fetchImage();
  }, [lat, lon]);

  return { image, loading, error };
};

export default useFetchEarthImage;
