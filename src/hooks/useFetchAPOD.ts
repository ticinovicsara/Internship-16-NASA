import { useState, useEffect } from "react";
import { APOD } from "../types/apod";
import { useLoading } from "../contexts/LoadingContext";
import { fetchApodData } from "../services/fetchApodData";
import { handleApiError } from "./apiHookHelper";

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
          if (response.length === 0) {
            setError("No APOD images found for the given request.");
          } else {
            setData(response);
          }
          setLoading(false);
        }
      })
      .catch((err) => {
        if (isMounted) {
          setError(handleApiError(err));
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
