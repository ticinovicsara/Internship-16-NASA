import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

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
            url = `https://api.nasa.gov/planetary/apod?api_key=${API_KEY}`;
            break;
          case "mars-rover":
            url = `https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?sol=1000&api_key=${API_KEY}`;
            break;
          case "neo":
            url = `https://api.nasa.gov/neo/rest/v1/neo/${id}?api_key=${API_KEY}`;
            break;
          default:
            throw new Error("Nepoznat tip podataka.");
        }

        const response = await fetch(url);
        if (!response.ok)
          throw new Error("Greška prilikom dohvaćanja podataka.");
        const result = await response.json();

        // Za Mars Rover filtriramo sliku po ID-ju
        if (type === "mars-rover") {
          const foundPhoto = result.photos.find(
            (p: any) => p.id === Number(id)
          );
          if (!foundPhoto) throw new Error("Slika nije pronađena.");
          setData(foundPhoto);
        } else {
          setData(result);
        }
      } catch (err: any) {
        setError(err.message || "Greška.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [type, id]);

  if (loading) return <p>Učitavanje...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <div>
      {type === "apod" && data && (
        <>
          <h1>{data.title}</h1>
          <img src={data.url} alt={data.title} width="100%" />
          <p>{data.explanation}</p>
        </>
      )}

      {type === "mars-rover" && data && (
        <>
          <h1>Mars Rover Slika</h1>
          <img src={data.img_src} alt="Mars" width="100%" />
          <p>
            <strong>Rover:</strong> {data.rover.name}
          </p>
          <p>
            <strong>Kamera:</strong> {data.camera.full_name}
          </p>
          <p>
            <strong>Datum:</strong> {data.earth_date}
          </p>
        </>
      )}

      {type === "neo" && data && (
        <>
          <h1>{data.name}</h1>
          <p>
            <strong>Promjer:</strong>{" "}
            {data.estimated_diameter.kilometers.estimated_diameter_max} km
          </p>
          <p>
            <strong>Datum bliskog prolaska:</strong>{" "}
            {data.close_approach_data[0].close_approach_date}
          </p>
          <p>
            <strong>Brzina:</strong>{" "}
            {data.close_approach_data[0].relative_velocity.kilometers_per_hour}{" "}
            km/h
          </p>
        </>
      )}
    </div>
  );
};

export default DetailPage;
