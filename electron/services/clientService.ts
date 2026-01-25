import { ClientType } from "../database/database";
import {
  addClient,
  deleteC,
  findClientByAffiliateNumber,
  getClients,
  updateC,
} from "../repository/clientRepository";

export const getAllClients = () => {
  return getClients();
};

export const createClient = (client: ClientType) => {
  if (!client.name.trim() || !client.affiliateNumber.trim()) {
    throw new Error("Nombre y numero de afiliado requeridos");
  }
  const existingClient = findClientByAffiliateNumber(client.affiliateNumber);
  console.log(existingClient);
  if (existingClient) {
    throw new Error("Ya existe un cliente con este número de afiliado");
  }
  return addClient(client);
};

export const updateClient = (client: ClientType) => {
  const existingClient = findClientByAffiliateNumber(client.affiliateNumber);
  if (existingClient && existingClient.id !== client.id) {
    throw new Error("Ya existe un cliente con este número de afiliado");
  }
  updateC(client);
};

export const deleteClient = (clientId: number) => {
  deleteC(clientId);
};
