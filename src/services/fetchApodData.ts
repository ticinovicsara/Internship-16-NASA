import { APOD } from "../types/apod";
import { fetchData } from "../services/apiHelper"; // Import zajedničke funkcije

export const fetchApodData = (count: number) => {
  return async (): Promise<APOD[]> => {
    const url = `https://api.nasa.gov/planetary/apod?api_key=${
      import.meta.env.VITE_NASA_API_KEY
    }&count=${count}`;

    return fetchData<APOD[]>(url);
  };
};
