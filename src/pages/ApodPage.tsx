import { Fragment } from "react/jsx-runtime";
import { APOD } from "../types/apod";
import { Link } from "react-router-dom";
import { withLoader } from "../hoc/withLoader";
import { fetchApodData } from "../services/fetchApodData";
import "../styles/apod/apod.css";

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

const ApodGalleryWithLoading = withLoader<APOD[], { loadingData: APOD[] }>(
  ApodGallery,
  fetchApodData(20)
);

export const ApodPage: React.FC = () => {
  return (
    <Fragment>
      <div className="apod-page">
        <h1 className="page-title">APOD - Astronomy Picture of the Day</h1>
        <ApodGalleryWithLoading />
      </div>
    </Fragment>
  );
};
