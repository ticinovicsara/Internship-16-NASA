import { useState } from "react";
import useFetchAPOD from "../hooks/useFetchAPOD";
import { APOD } from "../types/apod";
import { Link } from "react-router-dom";
import "../styles/apod/apod.css";
import "../index.css";

const ApodPage: React.FC = () => {
  const [count, setCount] = useState<number>(10);
  const { data, loading, error } = useFetchAPOD(count);

  return (
    <div className="apod-page">
      <h1 className="page-title">APOD - Astronomy Picture of the Day</h1>

      {error && <p className="error">{error}</p>}

      <div className="apod-gallery">
        {data.map((item: APOD, index: number) => (
          <div key={index} className="apod-item">
            <Link to={`/details/apod/${item.date}`}>
              <img src={item.url} alt={item.title} />
            </Link>
            <h3>{item.title}</h3>
            <p>{item.date}</p>
          </div>
        ))}
      </div>

      {loading && <p>Ucitavanje...</p>}

      <button className="button" onClick={() => setCount(count + 10)}>
        Ucitaj više
      </button>
    </div>
  );
};

export default ApodPage;
