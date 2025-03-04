import { useState } from "react";
import useFetchMars from "../hooks/useFetchMars";
import { MarsPhoto } from "../types/mars";

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

      {error && <p className="error">{error}</p>}

      <div className="rover-gallery">
        {data.map((photo: MarsPhoto) => (
          <div key={photo.id} className="rover-photo">
            <img src={photo.img_src} alt={`Mars Rover - ${photo.id}`} />
            <p>{photo.earth_date}</p>
          </div>
        ))}
      </div>

      {loading && <p>Učitavanje...</p>}

      <div className="pagination">
        <button onClick={() => setPage(page - 1)} disabled={page === 1}>
          Prethodna
        </button>
        <span>Stranica {page}</span>
        <button onClick={() => setPage(page + 1)}>Sljedeća</button>
      </div>
    </div>
  );
};

export default MarsRoverPage;
