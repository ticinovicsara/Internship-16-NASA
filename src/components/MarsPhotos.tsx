import { useState } from "react";
import useFetchMars from "../hooks/useFetchMars";
import { Link } from "react-router-dom";

const MarsPhotos = () => {
  const [rover, setRover] = useState("curiosity");
  const [camera, setCamera] = useState("");
  const [page, setPage] = useState(1);

  const { data, loading, error } = useFetchMars({ rover, camera, page });

  return (
    <div>
      <h1>Mars Rover Photos</h1>

      <div>
        <label>Rover: </label>
        <select value={rover} onChange={(e) => setRover(e.target.value)}>
          <option value="curiosity">Curiosity</option>
          <option value="opportunity">Opportunity</option>
          <option value="spirit">Spirit</option>
        </select>

        <label>Kamera: </label>
        <select value={camera} onChange={(e) => setCamera(e.target.value)}>
          <option value="">Sve</option>
          <option value="FHAZ">Front Hazard Avoidance Camera</option>
          <option value="RHAZ">Rear Hazard Avoidance Camera</option>
          <option value="MAST">Mast Camera</option>
        </select>
      </div>

      {loading && <p>Učitavanje...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      <div style={{ display: "flex", flexWrap: "wrap" }}>
        {data.map((photo) => (
          <Link key={photo.id} to={`/photo/${photo.id}`}>
            <img src={photo.img_src} alt="Mars" width="200" height="200" />
          </Link>
        ))}
      </div>

      <div>
        <button disabled={page === 1} onClick={() => setPage(page - 1)}>
          Prethodna
        </button>
        <span> Stranica {page} </span>
        <button onClick={() => setPage(page + 1)}>Sljedeća</button>
      </div>
    </div>
  );
};

export default MarsPhotos;
