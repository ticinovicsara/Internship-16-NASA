import { useState } from "react";
import "../styles/mars/mars.css";
import { fetchMarsData } from "../services/fetchMarsData";
import { withLoader } from "../hoc/withLoader";
import { MarsRoverGallery } from "../components/galeries/MarsRoverGallery";

const MarsRoverWithLoading = withLoader(MarsRoverGallery, fetchMarsData);

const MarsRoverPage: React.FC = () => {
  const [rover, setRover] = useState<string>("curiosity");
  const [camera, setCamera] = useState<string>("");
  const [page, setPage] = useState<number>(1);

  const params = { rover, camera, page };

  return (
    <div className="mars-rover-page">
      <h1 className="page-title">Mars Rover Photos</h1>

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

      <MarsRoverWithLoading params={params} />

      <div className="pagination">
        <button
          className="button mars-btn"
          disabled={page === 1}
          onClick={() => setPage(page - 1)}
        >
          Prethodna
        </button>
        <span> Stranica {page} </span>
        <button className="button mars-btn" onClick={() => setPage(page + 1)}>
          Sljedeća
        </button>
      </div>
    </div>
  );
};

export default MarsRoverPage;
