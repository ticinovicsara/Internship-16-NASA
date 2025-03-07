export const fetchData = async <T>(url: string): Promise<T> => {
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

  const data: T = await response.json();
  return data;
};
