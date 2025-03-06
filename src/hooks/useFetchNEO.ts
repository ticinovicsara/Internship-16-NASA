import { useEffect, useState } from "react";
import { fetchNEOData } from "../services/fetchNEOData";
import { NEO } from "../types/neo";

const useFetchNEO = (startDate: string, endDate: string) => {
  const [data, setData] = useState<NEO[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadNEOData = async () => {
      setLoading(true);
      setError(null);
      try {
        const result = await fetchNEOData({ startDate, endDate });
        setData(result);
      } catch (err: any) {
        setError(err.message || "Failed to load data");
      } finally {
        setLoading(false);
      }
    };

    loadNEOData();
  }, [startDate, endDate]);

  return { data, loading, error };
};

export default useFetchNEO;
