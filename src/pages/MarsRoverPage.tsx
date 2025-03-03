import { useState } from "react";
import useFetchMars from "../hooks/useFetchMars";
import { Link } from "react-router-dom";

const MarsRoverPage: React.FC = () => {
  const [rover, setRover] = useState<string>("curiosity");
  const [camera, setCamera] = useState<string>("");
  const [page, setPage] = useState<number>(1);

  const { data, loading, error } = useFetchMars(rover, camera, page);

  return (
    <div className="mars-rover-page">
      <h1>Mars Rover Photos</h1>

      <div className="filters">
        <label>Odaberi Rover:</label>
        <select onChange={(e) => setRover(e.target.value)} value={rover}>
          <option value="curiosity">Curiosity</option>
          <option value="opportunity">Opportunity</option>
          <option value="spirit">Spirit</option>
        </select>

        <label>Odaberi Kameru:</label>
        <select onChange={(e) => setCamera(e.target.value)} value={camera}>
          <option value="">Sve kamere</option>
          <option value="FHAZ">Front Hazard Avoidance Camera</option>
          <option value="RHAZ">Rear Hazard Avoidance Camera</option>
          <option value="NAVCAM">Navigation Camera</option>
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

      <div className="pagination">
        <button disabled={page === 1} onClick={() => setPage(page - 1)}>
          Prethodna
        </button>
        <span> Stranica {page} </span>
        <button onClick={() => setPage(page + 1)}>Sljedeća</button>
      </div>
    </div>
  );
};

export default MarsRoverPage;
