import { ipcMain } from "electron";
import { getAllClients } from "../services/clientService";
import { createClient } from "../services/clientService";
import { ClientType } from "../database/database";

ipcMain.handle("getClients", () => {
  return getAllClients();
});

ipcMain.handle("createClient", (event, client: ClientType) => {
  return createClient(client);
});
