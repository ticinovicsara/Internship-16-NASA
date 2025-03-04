import { useState, useEffect } from "react";
import { MarsPhoto } from "../types/mars";

const useFetchMars = (rover: string, camera: string, page: number) => {
  const [data, setData] = useState<MarsPhoto[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(
          `https://api.nasa.gov/mars-photos/api/v1/rovers/${rover}/photos?camera=${camera}&page=${page}&api_key=${process.env.VITE_NASA_API_KEY}`
        );
        const result = await response.json();
        setData(result.photos);
      } catch (err) {
        setError("Greska pri dohvacanju podataka.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [rover, camera, page]);

  return { data, loading, error };
};

export default useFetchMars;
