export const formatDateString = (dateString) => {
  if (!dateString) return "";
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    weekday: "short",
    year: "numeric",
    month: "long",
    day: "numeric"
  });
};

export const getTodayDateString = () => {
  return new Date().toISOString().split("T")[0];
};
