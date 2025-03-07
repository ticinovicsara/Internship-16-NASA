import { useState, useEffect } from "react";
import { MarsPhoto } from "../types/mars";
import { fetchMarsData } from "../services/fetchMarsData";
import { handleApiError } from "./apiHookHelper";

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
        setError(handleApiError(err));
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [rover, camera, page]);

  return { data, loading, error };
};

export default useFetchMars;
