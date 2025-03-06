import { useState, useEffect } from "react";
import { APOD } from "../types/apod";
import { useLoading } from "../contexts/LoadingContext";
import { fetchApodData } from "../services/fetchApodData";

const useFetchAPOD = (count: number) => {
  const [data, setData] = useState<APOD[]>([]);
  const [error, setError] = useState<string | null>(null);
  const { loading, setLoading } = useLoading();

  useEffect(() => {
    let isMounted = true;
    setLoading(true);

    const fetchData = fetchApodData(count);

    fetchData()
      .then((response) => {
        if (isMounted) {
          setData(response);
          setLoading(false);
        }
      })
      .catch((err) => {
        if (isMounted) {
          setError(err.message || "Greška pri dohvaćanju podataka.");
          setLoading(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, [count, setLoading]);

  return { data, loading, error };
};

export default useFetchAPOD;
