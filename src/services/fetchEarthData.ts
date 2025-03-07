import { EarthImage } from "../types/earth";
import { fetchData } from "../services/apiHelper";

export const fetchEarthData = async (
  lat: number,
  lon: number
): Promise<EarthImage> => {
  const API_KEY = import.meta.env.VITE_NASA_API_KEY;
  const url = `https://api.nasa.gov/planetary/earth/assets?lat=${lat}&lon=${lon}&dim=0.1&api_key=${API_KEY}`;

  return fetchData<EarthImage>(url);
};
