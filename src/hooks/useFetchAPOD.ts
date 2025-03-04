import { useState, useEffect } from "react";
import { APOD } from "../types/apod";

const useFetchAPOD = (count: number) => {
  const [data, setData] = useState<APOD[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const API_KEY = import.meta.env.VITE_NASA_API_KEY;

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(
          `https://api.nasa.gov/planetary/apod?api_key=${API_KEY}&count=${count}`
        );

        const result = await response.json();
        console.log("API Response:", result);

        const validResult = Array.isArray(result) ? result : [result];

        setData((prevData) => [...prevData, ...validResult]);
      } catch (err) {
        console.error("Error fetching APOD:", err);
        setError("Greška pri dohvaćanju podataka.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [count]);

  return { data, loading, error };
};

export default useFetchAPOD;
