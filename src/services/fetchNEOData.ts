import { NEO, NEOApiResponse } from "../types/neo";
import { fetchData } from "../services/apiHelper";

export const fetchNEOData = async (params: {
  startDate: string;
  endDate: string;
}): Promise<NEO[]> => {
  const { startDate, endDate } = params;
  const API_KEY = import.meta.env.VITE_NASA_API_KEY;
  const url = `https://api.nasa.gov/neo/rest/v1/feed?start_date=${startDate}&end_date=${endDate}&api_key=${API_KEY}`;

  const result: NEOApiResponse = await fetchData<NEOApiResponse>(url);
  return Object.values(result.near_earth_objects).flat();
};
