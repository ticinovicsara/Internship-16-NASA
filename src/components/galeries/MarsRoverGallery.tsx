import { Link } from "react-router-dom";
import { MarsPhoto } from "../../types/mars";

export const MarsRoverGallery: React.FC<{ loadingData: MarsPhoto[] }> = ({
  loadingData,
}) => {
  return (
    <div style={{ display: "flex", flexWrap: "wrap" }}>
      {loadingData.map((photo) => (
        <Link key={photo.id} to={`/details/mars/${photo.id}`}>
          <img src={photo.img_src} alt="Mars" width="200" height="200" />
        </Link>
      ))}
    </div>
  );
};
