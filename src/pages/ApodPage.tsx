import { Fragment } from "react/jsx-runtime";
import { APOD } from "../types/apod";
import { withLoader } from "../hoc/withLoader";
import { fetchApodData } from "../services/fetchApodData";
import "../styles/apod/apod.css";
import ApodGallery from "../components/galeries/ApodGallery";

const ApodGalleryWithLoading = withLoader<
  APOD[],
  { params: { count: number } }
>(ApodGallery, fetchApodData(20));

export const ApodPage: React.FC = () => {
  const params = { count: 20 };

  return (
    <Fragment>
      <div className="apod-page">
        <h1 className="page-title">APOD - Astronomy Picture of the Day</h1>
        <ApodGalleryWithLoading params={params} />
      </div>
    </Fragment>
  );
};
