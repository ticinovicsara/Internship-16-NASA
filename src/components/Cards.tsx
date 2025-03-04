import Card from "./NavCard";

export const Cards = () => {
  return (
    <div className="card-container">
      <Card
        title="Astronomy Picture of the Day (APOD)"
        description="View the gallery of APOD images from the last 20 days, with date filtering and infinite scrolling."
        link="/apod"
      />
      <Card
        title="Mars Rover Photos"
        description="Explore the latest Mars rover photos, filter by rover and camera, and navigate through paginated results."
        link="/mars"
      />
      <Card
        title="NEO Tracker"
        description="Track Near-Earth Objects (NEOs), visualize data with charts, and explore the latest objects close to Earth."
        link="/neo"
      />
      <Card
        title="Earth Imagery"
        description="Interact with satellite imagery of Earth, select locations, and store favorites in localStorage."
        link="/earth"
      />
    </div>
  );
};
