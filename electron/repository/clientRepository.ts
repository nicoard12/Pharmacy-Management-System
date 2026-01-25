import { type ClientType } from "../database/database";
import { db } from "../database/database";

export const getClients = (): ClientType[] => {
  return db[0] as ClientType[];
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

export const findClientByAffiliateNumber = (search: string) => {
  const clients = getClients();
  return clients.find(
    (client) =>
      client.affiliateNumber.trim().toUpperCase() ===
      search.trim().toUpperCase(),
  );
};

export const updateC = (client: ClientType) => {
  const clients = getClients();
  const index = clients.findIndex((c) => c.id === client.id);

  if (index !== -1) {
    // Esto sobreescribe el objeto viejo con el nuevo respetando el tipo
    clients[index] = { ...client };
  }
};

export const deleteC= (clientId: number) => {
  const clients = getClients();
  const index = clients.findIndex((c) => c.id === clientId);

  if (index !== -1) {
    clients.splice(index, 1);
  }
};
