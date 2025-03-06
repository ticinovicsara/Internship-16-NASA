import { Link } from "react-router-dom";
import { APOD } from "../../types/apod";
import "../../styles/apod/apod.css";

const ApodGallery: React.FC<{ loadingData: APOD[] }> = ({ loadingData }) => {
  return (
    <div className="apod-gallery">
      {loadingData.map((item: APOD, index: number) => (
        <div key={index} className="apod-item">
          <Link to={`/details/apod/${item.date}`}>
            <img src={item.url} alt={item.title} />
          </Link>
          <h3>{item.title}</h3>
          <p>{item.date}</p>
        </div>
      ))}
    </div>
  );
};

export default ApodGallery;
