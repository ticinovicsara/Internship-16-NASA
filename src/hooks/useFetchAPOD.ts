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
          if (err.message.includes("Failed to fetch data")) {
            setError("There was an issue fetching data from the API.");
          } else if (err.message.includes("NetworkError")) {
            setError(
              "Network error occurred. Please check your internet connection."
            );
          } else {
            setError(err.message || "An unknown error occurred.");
          }
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
