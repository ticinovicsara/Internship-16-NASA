import { Loader } from "@react-three/drei";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

interface Rover {
  name: string;
}

interface Camera {
  full_name: string;
}

interface MarsPhoto {
  id: number;
  img_src: string;
  earth_date: string;
  rover: Rover;
  camera: Camera;
}

const PhotoDetails = () => {
  const { id } = useParams();
  const [photo, setPhoto] = useState<MarsPhoto | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPhoto = async () => {
      try {
        const API_KEY = import.meta.env.VITE_NASA_API_KEY;
        const rovers = ["curiosity", "opportunity", "spirit"];

        let foundPhoto: MarsPhoto | null = null;

        for (const rover of rovers) {
          const response = await fetch(
            `https://api.nasa.gov/mars-photos/api/v1/rovers/${rover}/photos?sol=1000&api_key=${API_KEY}`
          );
          if (!response.ok) throw new Error(`Greška: ${response.status}`);

          const data = await response.json();
          foundPhoto = data.photos.find((p: MarsPhoto) => p.id === Number(id));

          if (foundPhoto) break;
        }

        if (!foundPhoto) throw new Error("Slika nije pronađena.");

        setPhoto(foundPhoto);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Greška pri dohvatanju podataka."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchPhoto();
  }, [id]);

  if (loading) return <Loader />;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return photo ? (
    <div>
      <h1>Image details</h1>
      <img src={photo.img_src} alt="Mars" width="500" />
      <p>
        <strong>Rover:</strong> {photo.rover.name}
      </p>
      <p>
        <strong>Camera:</strong> {photo.camera.full_name}
      </p>
      <p>
        <strong>Date:</strong> {photo.earth_date}
      </p>
    </div>
  ) : (
    <p>No picture found.</p>
  );
};

export default PhotoDetails;
