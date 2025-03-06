import React, { useState, useEffect } from "react";
import { useLoading } from "../contexts/LoadingContext";
import Loader from "../components/Loader";

type FetchDataFunction<T> = (...args: any[]) => Promise<T>;

export function withLoader<T, P extends { params: any; loadingData?: T }>(
  WrappedComponent: React.ComponentType<P & { loadingData: T }>,
  fetchData: FetchDataFunction<T>
) {
  return function WithLoadingComponent(props: P) {
    const { setLoading } = useLoading();
    const [data, setData] = useState<T | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
      const loadData = async () => {
        setIsLoading(true);
        setLoading(true);

        try {
          const result = await fetchData(props.params);
          setData(result);
        } catch (err) {
          setError("Failed to load data.");
        } finally {
          setIsLoading(false);
          setLoading(false);
        }
      };

      loadData();
    }, [fetchData, setLoading, props.params]);

    if (isLoading) {
      return <Loader />;
    }

    if (error) {
      return <div>{error}</div>;
    }

    return <WrappedComponent {...props} loadingData={data as T} />;
  };
}
