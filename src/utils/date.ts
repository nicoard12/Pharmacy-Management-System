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

export function formatToDateTimeLocal(dateString: string) {
  const date = new Date(dateString);

  const pad = (n: number) => n.toString().padStart(2, "0");

  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(
    date.getDate(),
  )}T${pad(date.getHours())}:${pad(date.getMinutes())}`;
}

export function isOldDate(dateString: string, days: number = 30): boolean {
  const pickupDate = new Date(dateString);
  pickupDate.setHours(0, 0, 0, 0);

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const diffTime = today.getTime() - pickupDate.getTime();
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

  return diffDays >= days;
}
