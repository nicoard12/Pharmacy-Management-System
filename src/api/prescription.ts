import { ClientType } from "./client";

export const savePrescriptions = (prescription: string, client: ClientType) => {
  localStorage.setItem(client.id.toString(), prescription);
};

export const getPrescriptions = (client: ClientType) => {
  return localStorage.getItem(client.id.toString()) || "";
};
