import { ClientType } from "../types";

const FOOTER1=`\n*Indicar con letras lo que requiera (ej: llevo A, B y C o llevo todo menos B).*\n*Informe también la forma de pago: Efectivo o Mercado Pago.*`
const FOOTER2= "\n*No tiene recetas cargadas.*"

export const wrapText = (text: string, maxLength: number = 30, indent: string = "    "): string => {
  if (!text || text.replace(/\*/g, '').length <= maxLength) return text;

  const words = text.split(" ");
  const lines: string[] = [];
  let currentLine = "";

  for (const word of words) {
    if (currentLine.length === 0) {
      currentLine = word;
    } else {
      const visibleLength = currentLine.replace(/\*/g, '').length + 1 + word.replace(/\*/g, '').length;
      if (visibleLength <= maxLength) {
        currentLine += " " + word;
      } else {
        lines.push(currentLine);
        currentLine = word;
      }
    }
  }

  if (currentLine.length > 0) {
    lines.push(currentLine);
  }

  return lines.join("\n" + indent);
};

export const formatPrescriptions = (
  cliente: ClientType | null,
  recetas: string,
  lastLetter?: string | null
) => {
  const renderHeader = (c: ClientType) => {
    if (!c) return "";
    return `*Nombre: ${c.name.toUpperCase()}*\n${
      c.personInCharge
        ? "*Persona a cargo: " + c.personInCharge.toUpperCase() + "*\n"
        : ""
    }*N° Afiliado: ${c.affiliateNumber}* \n - - - - - - - - - - - - - - -`;
  };

  const lettersToNumber = (letters?: string | null) => {
    if (!letters) return 0;
    const clean = letters.trim().toUpperCase();
    if (!/^[A-Z]+$/.test(clean)) return 0;

    let num = 0;
    for (let i = 0; i < clean.length; i++) {
      num = num * 26 + (clean.charCodeAt(i) - 64);
    }

    return num;
  };

  const numberToLetters = (num: number) => {
    let result = "";
    num++;

    while (num > 0) {
      num--;
      result = String.fromCharCode(65 + (num % 26)) + result;
      num = Math.floor(num / 26);
    }

    return result;
  };

  if (!recetas || recetas.trim() === "" || recetas.includes("Informe también la forma de pago: Efectivo o Mercado Pago.")) {
    return (
      (cliente ? renderHeader(cliente) : "-") +
      FOOTER2
    );
  }

  const dateRegex = /(\d{2}\/\d{2}\/\d{4})/g;
  const positions = [];
  let match;
  while ((match = dateRegex.exec(recetas)) !== null) {
    positions.push({ index: match.index, date: match[0] });
  }

  if (positions.length === 0) {
    return (
      (cliente ? renderHeader(cliente) : "-") +
      FOOTER2
    );
  }

  const groups = [];
  for (let i = 0; i < positions.length; i++) {
    const start = positions[i].index;
    const end = positions[i + 1] ? positions[i + 1].index : recetas.length;
    const chunk = recetas.substring(start, end).replace(positions[i].date, "").trim();

    const idMatch = chunk.match(/(\d{10,16})/);
    const id = idMatch ? idMatch[0] : "";

    let medsSection = chunk.replace(id, "").trim();
    medsSection = medsSection
      .replace(/\b(Receta|Nro|Numero|Número|N°|No|Medicamento|Med|Nro\.?)\b[:\s]*/gi, "")
      .trim();

    const remedios = medsSection
      .split(/[\n\t]+/)
      .map((line) => line.trim())
      .map((line) => line.replace(/^\s*\*?([A-Z]|\d+)\)\*?\s*/i, "").trim())
      .filter((line) => line.length > 2);

    groups.push({ fecha: positions[i].date, id, remedios });
  }

  let formattedRecetas = "";
  let globalMedIndex = lettersToNumber(lastLetter);

  groups.forEach((group) => {
    formattedRecetas += `\n${group.fecha}\nReceta: ${group.id || "S/N"}\n`;
    group.remedios.forEach((remedio) => {
      const letter = numberToLetters(globalMedIndex++);
      const formattedRemedio = remedio
        .replace(/([a-zA-ZñÑáéíóúÁÉÍÓÚ]*)(\d+(?:[.,]\d+)?)([a-zA-ZñÑáéíóúÁÉÍÓÚ]*)/g, (match, before, num, after) => {
          if (before.length + after.length === 1) {
            return match;
          }
          return `${before} *${num}* ${after}`;
        })
        .replace(/\s+/g, ' ')
        .trim();
      const wrappedRemedio = wrapText(formattedRemedio, 30, "     ");
      formattedRecetas += `*${letter})* ${wrappedRemedio}\n`;
    });
  });

  const headerText = cliente ? renderHeader(cliente) + "\n" : "-";

  return (
    headerText +
    formattedRecetas +
    FOOTER1
  );
};


export const extractLastLetter = (prescriptions: string): string | null => {
  if (!prescriptions) return null;

  const regex = /\*([A-Z]+)\)\*/g;
  const matches = [...prescriptions.matchAll(regex)];

  if (matches.length === 0) return null;

  return matches[matches.length - 1][1];
};

export const extractFooter = (prescriptions: string): string => {
  if (!prescriptions) return "";

  return prescriptions
    .replace(FOOTER1, "")
    .trim();
};