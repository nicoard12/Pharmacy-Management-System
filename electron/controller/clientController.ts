import { ipcMain } from "electron";
import { ClientService } from "../services/clientService";
import { ClientType } from "../types";

ipcMain.handle("getClients", () => {
  return ClientService.getAllClients();
});

ipcMain.handle("createClient", (_, client: ClientType) => {
  return ClientService.createClient(client);
});

ipcMain.handle("updateClient", (_, client: ClientType) => {
  return ClientService.updateClient(client);
});

ipcMain.handle("deleteClient", (_, clientId: number) => {
  return ClientService.deleteClient(clientId);
});

ipcMain.handle(
  "savePrescriptions",
  (_, clientId: number, prescriptions: string) => {
    return ClientService.savePrescriptions(clientId, prescriptions);
  },
);

ipcMain.handle("getPrescriptions", (_, clientId: number) => {
  return ClientService.getPrescriptions(clientId);
});
