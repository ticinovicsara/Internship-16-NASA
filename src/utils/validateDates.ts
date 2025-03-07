import ToastNotification from "../components/ToastNotification";

export const validateDates = (start: string, end: string): boolean => {
  const currentDate = new Date().toISOString().split("T")[0];
  if (start > currentDate) {
    ToastNotification("Start date cannot be in the future.");
    return false;
  }
  if (end < start) {
    ToastNotification("End date cannot be before start date.");
    return false;
  }
  return true;
};
