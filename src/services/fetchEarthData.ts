interface EarthImage {
  url: string;
  date: string;
}

export const fetchEarthImage = async (
  lat: number,
  lon: number
): Promise<EarthImage> => {
  const API_KEY = import.meta.env.VITE_NASA_API_KEY;
  const response = await fetch(
    `https://api.nasa.gov/planetary/earth/assets?lat=${lat}&lon=${lon}&dim=0.1&api_key=${API_KEY}`
  );

  if (!response.ok) throw new Error(`API error: ${response.status}`);

  const data = await response.json();
  return { url: data.url, date: data.date };
};
