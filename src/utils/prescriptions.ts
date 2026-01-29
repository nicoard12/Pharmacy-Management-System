import { ClientType } from "../api/client";

const DATE_REGEX = /\d{2}\/\d{2}\/\d{4}/;
const sliceFromFirstDate = (lines: string[]): string[] => {
  const firstDateIndex = lines.findIndex((line) => DATE_REGEX.test(line));
  return firstDateIndex >= 0 ? lines.slice(firstDateIndex) : [];
};

const normalizeLine = (line: string): string => {
  const cleanLine = line.replace(/\r/g, "\n").trim();
  const isOnlyDate = new RegExp(`^${DATE_REGEX.source}$`).test(cleanLine);

  return isOnlyDate ? `\n${cleanLine}` : cleanLine;
};

const buildClientHeader = (client: ClientType | null): string => {
  if (!client) return "-";

  return [
    `*${new Date().toLocaleString("es-AR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })}*`,
    `*Nombre: ${client.name.toUpperCase()}*`,
    client.personInCharge &&
      `*Persona a cargo: ${client.personInCharge.toUpperCase()}*`,
    `*N° Afiliado: ${client.affiliateNumber}*`,
    "- ".repeat(15),
  ]
    .filter(Boolean)
    .join("\n");
};

const buildFooter = (hasPrescriptions: boolean): string =>
  hasPrescriptions
    ? "\n\n*Esto es todo lo que tiene cargado, ¿qué no llevaría de todo esto?*\n*Informe la forma de pago: efectivo o Mercado Pago.*"
    : "\n*No tiene recetas cargadas.*";

export const formatPrescriptions = (
  client: ClientType | null,
  prescription: string,
) => {
  const formattedPrescription = sliceFromFirstDate(
    prescription.split(/[\n\t]+/),
  )
    .map(normalizeLine)
    .filter((line) => line.length > 0)
    .join("\n");

  return `${buildClientHeader(client)}
  ${formattedPrescription}${buildFooter(formattedPrescription.length > 0)}`;
};
