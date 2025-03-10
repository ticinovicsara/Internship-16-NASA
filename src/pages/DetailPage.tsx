import { Loader } from "@react-three/drei";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "../styles/details/details.css";
import "../styles/error.css";
import ErrorBoundary from "../utils/ErrorBoundary";
import { ErrorFallback } from "../utils/errorFallback";

const DetailPage = () => {
  const { type, id } = useParams();
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const API_KEY = import.meta.env.VITE_NASA_API_KEY;
        let url = "";

        switch (type) {
          case "apod":
            url = `https://api.nasa.gov/planetary/apod?api_key=${API_KEY}&date=${id}`;
            break;
          case "mars":
            url = `https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?sol=1000&api_key=${API_KEY}`;
            break;
          case "neo":
            url = `https://api.nasa.gov/neo/rest/v1/neo/${id}?api_key=${API_KEY}`;
            break;
          default:
            throw new Error("Unknown datatype.");
        }

        const response = await fetch(url);
        if (!response.ok) throw new Error("Data fetch failed.");
        const result = await response.json();

        if (type === "mars") {
          const foundPhoto = result.photos.find(
            (p: any) => p.id === Number(id)
          );
          if (!foundPhoto) throw new Error("Image not found.");
          setData(foundPhoto);
        } else {
          setData(result);
        }
      } catch (err: any) {
        setError(err.message || "Data fetch failed.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [type, id]);

  if (loading) return <Loader />;

  if (error) {
    return (
      <ErrorFallback
        error={{ name: "Error", message: error }}
        resetErrorBoundary={() => setError(null)}
      />
    );
  }

  return (
    <div className="details-page">
      <ErrorBoundary>
        {type === "apod" && data && (
          <>
            <h1 className="page-title">{data.title}</h1>
            <img src={data.url} alt={data.title} width="100%" />
            <p>Details: {data.explanation}</p>
            <p>
              <strong>Date:</strong> {data.date}
            </p>
          </>
        )}

        {type === "mars" && data && (
          <>
            <h1 className="page-title">Mars Rover Image</h1>
            <img src={data.img_src} alt="Mars" width="100%" />
            <p>
              <strong>Rover:</strong> {data.rover.name}
            </p>
            <p>
              <strong>Camera:</strong> {data.camera.full_name}
            </p>
            <p>
              <strong>Date:</strong> {data.earth_date}
            </p>
          </>
        )}

        {type === "neo" && data && (
          <>
            <h1 className="page-title">NEO Tracker - {data.name}</h1>
            <p>
              <strong>Radius:</strong>{" "}
              {data.estimated_diameter.kilometers.estimated_diameter_max} km
            </p>
            <p>
              <strong>Close Approach Date:</strong>{" "}
              {data.close_approach_data[0].close_approach_date}
            </p>
            <p>
              <strong>Speed:</strong>{" "}
              {
                data.close_approach_data[0].relative_velocity
                  .kilometers_per_hour
              }{" "}
              km/h
            </p>
          </>
        )}
      </ErrorBoundary>
    </div>
  );
};

export default DetailPage;
