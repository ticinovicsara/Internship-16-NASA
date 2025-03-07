export const fetchMarsData = async ({
  rover,
  camera,
  page,
}: {
  rover: string;
  camera: string;
  page: number;
}) => {
  let url = `https://api.nasa.gov/mars-photos/api/v1/rovers/${rover}/photos?sol=1000&page=${page}&api_key=${
    import.meta.env.VITE_NASA_API_KEY
  }`;

  if (camera) url += `&camera=${camera}`;

  const response = await fetch(url);

  if (!response.ok) {
    if (response.status === 400) {
      throw new Error("Bad request: Invalid parameters.");
    } else if (response.status === 404) {
      throw new Error("No data found for the given parameters.");
    } else {
      throw new Error(`API error: ${response.status}`);
    }
  }

  const result = await response.json();

  if (result.photos.length === 0) {
    throw new Error("No Mars photos found for the current selection.");
  }
  return result.photos;
};
