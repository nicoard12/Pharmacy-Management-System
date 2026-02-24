import { ipcMain } from "electron";
import { RecallService } from "../services/recallService";

ipcMain.handle("createRecall", (_, clientId: number) => {
  return RecallService.createRecall(clientId);
});

ipcMain.handle("updateRecallDate", (_, recallId: number, clientId: number, newDate: string) => {
  return RecallService.updateRecallDate(recallId, clientId, newDate);
});

ipcMain.handle("deleteRecall", (_, recallId: number, clientId: number) => {
  return RecallService.deleteRecall(recallId, clientId);
});

