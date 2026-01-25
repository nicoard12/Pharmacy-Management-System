import { type ClientType } from "../database/database";
import { db } from "../database/database";

export const getClients = () => {
  return db[0];
};

export const addClient = (client: ClientType) => {
  const clients = getClients();
  const lastId = clients.length > 0 ? clients[clients.length - 1].id : 0;
  const newClient = {
    id: lastId + 1,
    name: client.name,
    affiliateNumber: client.affiliateNumber,
    personInCharge: client.personInCharge || "",
    email: client.email || "",
    phone: client.phone || "",
  };
  db[0].push(newClient);
  return newClient;
};

export const findClientsByAffiliateNumber = (search: string) => {
  const clients = getClients();
  return clients.find(client => client.affiliateNumber.toUpperCase().includes(search.toUpperCase()));
};