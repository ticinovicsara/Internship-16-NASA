import { useState, useCallback, useEffect } from "react";
import { APOD } from "../types/apod";
import { useLoading } from "../contexts/LoadingContext";

const useFetchAPOD = (count: number) => {
  const [data, setData] = useState<APOD[]>([]);
  const [error, setError] = useState<string | null>(null);
  const { loading, setLoading } = useLoading();

  const fetchData = useCallback(async () => {
    if (!loading) {
      setLoading(true);
    }

    try {
      const response = await fetch(
        `https://api.nasa.gov/planetary/apod?api_key=${
          import.meta.env.VITE_NASA_API_KEY
        }&count=${count}`
      );
      const result = await response.json();
      const validResult = Array.isArray(result) ? result : [result];

      setData((prevData) => [...prevData, ...validResult]);
    } catch (err) {
      setError("Greška pri dohvaćanju podataka.");
    } finally {
      setLoading(false);
    }
  }, [count, loading, setLoading]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { data, error };
};

export default useFetchAPOD;
