import Card from "./NavCard";

export const Cards = () => {
  return (
    <div className="card-container">
      <Card
        title="Astronomy Picture of the Day (APOD)"
        description="Expect daily images of space with detailed descriptions. Explore fascinating images with the latest insights from NASA missions!"
        link="/apod"
      />
      <Card
        title="Mars Rover Photos"
        description="Check out the latest images from Mars! Here you can explore images taken by our rover cameras on the Red Planet."
        link="/mars"
      />
      <Card
        title="NEO Tracker"
        description="Track near-Earth asteroids and comets. Get informed about potential threats and their trajectories!"
        link="/neo"
      />
      <Card
        title="Earth Imagery"
        description="Explore our planet through satellite images. Find pictures of any location on Earth and discover new views of our planet!"
        link="/earth"
      />
    </div>
  );
};
