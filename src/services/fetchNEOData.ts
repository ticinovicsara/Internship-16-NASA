import { NEO, NEOApiResponse } from "../types/neo";

export const fetchNEOData = async (params: {
  startDate: string;
  endDate: string;
}): Promise<NEO[]> => {
  const { startDate, endDate } = params;
  const API_KEY = import.meta.env.VITE_NASA_API_KEY;
  const url = `https://api.nasa.gov/neo/rest/v1/feed?start_date=${startDate}&end_date=${endDate}&api_key=${API_KEY}`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }

    const result: NEOApiResponse = await response.json();
    return Object.values(result.near_earth_objects).flat();
  } catch (error: any) {
    throw new Error(error.message || "Failed to fetch NEO data");
  }
};
