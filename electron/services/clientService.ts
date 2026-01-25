import { ClientType } from "../database/database";
import {
  addClient,
  findClientsByAffiliateNumber,
  getClients,
} from "../repository/clientRepository";

export const getAllClients = () => {
  return getClients();
};

export const createClient = (client: ClientType) => {
  if (!client.name.trim() || !client.affiliateNumber.trim()) {
    throw new Error("Nombre y numero de afiliado requeridos");
  }
  const existingClient = findClientsByAffiliateNumber(client.affiliateNumber);
  if (existingClient) {
    throw new Error("Ya existe un cliente con este número de afiliado");
  }
  return addClient(client);
};
