import { APOD } from "../types/apod";

// Adjusted fetchApodData to return a function with no parameters:
export const fetchApodData = (count: number) => {
  return async (): Promise<APOD[]> => {
    const response = await fetch(
      `https://api.nasa.gov/planetary/apod?api_key=${
        import.meta.env.VITE_NASA_API_KEY
      }&count=${count}`
    );
    if (!response.ok) {
      throw new Error("Failed to fetch data");
    }
    return response.json();
  };
};
