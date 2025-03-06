import React, { useState, useEffect } from "react";
import { useLoading } from "../contexts/LoadingContext";
import Loader from "../components/Loader";

type FetchDataFunction<T> = (...args: any[]) => Promise<T>;

export function withLoader<T, P extends { loadingData: T }>(
  WrappedComponent: React.ComponentType<P>,
  fetchData: FetchDataFunction<T>
) {
  return function WithLoadingComponent(props: Omit<P, "loadingData">) {
    const { setLoading } = useLoading();
    const [data, setData] = useState<T | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
      const loadData = async () => {
        setIsLoading(true);
        setLoading(true);

        try {
          const result = await fetchData(...(props as any));
          setData(result);
        } catch (err) {
          setError("Failed to load data.");
        } finally {
          setIsLoading(false);
          setLoading(false);
        }
      };

      loadData();
    }, [fetchData, setLoading, props]);

    if (isLoading) {
      return <Loader></Loader>;
    }

    return <WrappedComponent {...(props as P)} loadingData={data as T} />;
  };
}
