import { useState, useEffect } from "react";
import { MarsPhoto } from "../types/mars";

const useFetchMars = (rover: string, camera: string, page: number) => {
  const [data, setData] = useState<MarsPhoto[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const API_KEY = import.meta.env.VITE_NASA_API_KEY;

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        let url = `https://api.nasa.gov/mars-photos/api/v1/rovers/${rover}/photos?sol=1000&page=${page}&api_key=${API_KEY}`;
        if (camera) url += `&camera=${camera}`;

        console.log("Fetching:", url);
        const response = await fetch(url);
        if (!response.ok) throw new Error(`API error: ${response.status}`);

        const result = await response.json();
        setData(result.photos);
      } catch (err: any) {
        setError(err.message || "Greška pri dohvatanju podataka.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [rover, camera, page]);

  return { data, loading, error };
};

export default useFetchMars;
