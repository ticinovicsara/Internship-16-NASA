import { useState, useEffect } from "react";
import { MarsPhoto } from "../types/mars";
import { fetchMarsData } from "../services/fetchMarsData";

const useFetchMars = ({
  rover,
  camera,
  page,
}: {
  rover: string;
  camera: string;
  page: number;
}) => {
  const [data, setData] = useState<MarsPhoto[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const photos = await fetchMarsData({ rover, camera, page });
        if (photos.length === 0) {
          setError("No Mars photos found for the given parameters.");
        } else {
          setData(photos);
        }
      } catch (err: any) {
        if (err.message.includes("API error")) {
          setError("API error occurred while fetching Mars photos.");
        } else if (err.message.includes("NetworkError")) {
          setError("Network error. Please check your connection.");
        } else {
          setError(err.message || "An unknown error occurred.");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [rover, camera, page]);

  return { data, loading, error };
};

export default useFetchMars;
