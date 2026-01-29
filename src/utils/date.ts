export const getCurrentDate = () => {
  return new Date().toLocaleString("es-AR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

export const getCurrentDateForFile = () => {
    return getCurrentDate().replace(/[\/:,]/g, "-");
};
