export const fetchData = async <T>(url: string): Promise<T> => {
  try {
    const response = await fetch(url);

    if (!response.ok) {
      if (response.status === 400) {
        throw new Error("Bad request: Invalid parameters.");
      } else if (response.status === 404) {
        throw new Error("No data found for the given parameters.");
      } else if (response.status === 429) {
        throw new Error("API rate limit exceeded. Please try again later.");
      } else if (response.status >= 500) {
        throw new Error(`Server error: ${response.status}`);
      } else {
        throw new Error(`API error: ${response.status}`);
      }
    }

    const data: T = await response.json();
    return data;
  } catch (error) {
    console.error("Error during API fetch:", error);
    throw error;
  }
};
