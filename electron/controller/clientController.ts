import { ipcMain } from "electron";
import { deleteClient, getAllClients, updateClient } from "../services/clientService";
import { createClient } from "../services/clientService";
import { ClientType } from "../database/database";

ipcMain.handle("getClients", () => {
  return getAllClients();
});

ipcMain.handle("createClient", (event, client: ClientType) => {
  return createClient(client);
});

ipcMain.handle("updateClient", (event, client: ClientType) => {
  return updateClient(client);
});

ipcMain.handle("deleteClient", (event, clientId: number) => {
  return deleteClient(clientId);
});
