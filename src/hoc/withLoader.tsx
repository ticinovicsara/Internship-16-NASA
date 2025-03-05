import React, { useEffect, useState } from "react";
import { useLoading } from "../contexts/LoadingContext";

const withLoader = <P extends object>(
  WrappedComponent: React.ComponentType<P>
) => {
  return (props: P) => {
    const { loading, setLoading } = useLoading();
    const [isLoading, setIsLoading] = useState<boolean>(loading);

    useEffect(() => {
      // Stabilizuj loading stanje da se ne menja prečesto
      if (loading !== isLoading) {
        setIsLoading(loading);
      }
    }, [loading, isLoading]);

    console.log("WithLoader loading:", isLoading);

    if (isLoading) {
      return <div className="loader"></div>;
    }

    return <WrappedComponent {...props} />;
  };
};

export default withLoader;
