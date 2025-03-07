export const handleApiError = (error: any): string => {
  if (error instanceof Error) {
    if (error.message.includes("Failed to fetch")) {
      return "There was an issue fetching data from the API.";
    } else if (error.message.includes("NetworkError")) {
      return "Network error occurred. Please check your internet connection.";
    } else {
      return error.message || "An unknown error occurred.";
    }
  }
  return "An unexpected error occurred.";
};
