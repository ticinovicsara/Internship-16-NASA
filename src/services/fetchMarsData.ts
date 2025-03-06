export const fetchMarsData = async (
  rover: string,
  camera: string,
  page: number
) => {
  const API_KEY = import.meta.env.VITE_NASA_API_KEY;
  let url = `https://api.nasa.gov/mars-photos/api/v1/rovers/${rover}/photos?sol=1000&page=${page}&api_key=${API_KEY}`;

  if (camera) url += `&camera=${camera}`;

  console.log("Fetching:", url);

  const response = await fetch(url);
  if (!response.ok) throw new Error(`API error: ${response.status}`);

  const result = await response.json();
  return result.photos;
};
