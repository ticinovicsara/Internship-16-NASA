import { useState, useEffect } from "react";
import { MarsPhoto } from "../types/mars";
import { fetchMarsData } from "../services/fetchMarsData";

// Accept an object containing rover, camera, and page
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
        // Fetch photos with the provided parameters
        const photos = await fetchMarsData({ rover, camera, page });
        setData(photos);
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
