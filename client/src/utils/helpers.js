export const calculateEndTime = (startTime, durationHours = 2) => {
  const [hour, minute] = startTime.split(":");
  const endHour = (parseInt(hour, 10) + durationHours).toString().padStart(2, "0");
  return `${endHour}:${minute}`;
};

export const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
