import { Fragment, useEffect, useState } from "react";
import { APOD } from "../types/apod";
import { withLoader } from "../hoc/withLoader";
import { fetchApodData } from "../services/fetchApodData";
import "../styles/apod/apod.css";
import ApodGallery from "../components/galeries/ApodGallery";
import Loader from "../components/Loader";

const INITIAL_COUNT = 20;
const LOAD_MORE_COUNT = 20;

const ApodGalleryWithLoading = withLoader<
  APOD[],
  { params: { count: number } }
>(ApodGallery, fetchApodData(INITIAL_COUNT));

export const ApodPage: React.FC = () => {
  const [count, setCount] = useState(INITIAL_COUNT);
  const [images, setImages] = useState<APOD[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const loadMoreImages = async () => {
      setLoading(true);
      try {
        const newImages = await fetchApodData(LOAD_MORE_COUNT)();
        if (Array.isArray(newImages)) {
          setImages((prev) => [...prev, ...newImages]);
        } else {
          console.error("Expected an array but got:", newImages);
        }
      } catch (error) {
        console.error("Failed to load images", error);
      }
      setLoading(false);
    };

    if (count > INITIAL_COUNT) loadMoreImages();
  }, [count]);

  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + window.scrollY >=
          document.body.offsetHeight - 200 &&
        !loading
      ) {
        setCount((prev) => prev + LOAD_MORE_COUNT); // Trigger loading more images on scroll
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [loading]);

  return (
    <Fragment>
      <div className="apod-page">
        <h1 className="page-title">APOD - Astronomy Picture of the Day</h1>

        <ApodGalleryWithLoading params={{ count }} />

        {images.length > 0 && <ApodGallery loadingData={images} />}

        {loading && <Loader />}
      </div>
    </Fragment>
  );
};
