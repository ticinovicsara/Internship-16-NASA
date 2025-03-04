import { useEffect, useState } from "react";
import { NEO, NEOApiResponse } from "../types/neo";

const useFetchNEO = (startDate: string, endDate: string) => {
  const [data, setData] = useState<NEO[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const API_KEY = import.meta.env.VITE_NASA_API_KEY;
        const response = await fetch(
          `https://api.nasa.gov/neo/rest/v1/feed?start_date=${startDate}&end_date=${endDate}&api_key=${API_KEY}`
        );

        if (!response.ok) throw new Error(`API error: ${response.status}`);

        const result: NEOApiResponse = await response.json();
        const neoArray: NEO[] = Object.values(result.near_earth_objects).flat();
        setData(neoArray);
      } catch (err: any) {
        setError(err.message || "Greška pri dohvatanju podataka.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [startDate, endDate]);

  return { data, loading, error };
};

export default useFetchNEO;
