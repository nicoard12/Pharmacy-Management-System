import { ipcMain } from "electron";
import { RecallService } from "../services/recallService";

ipcMain.handle("createRecall", (_, clientId: number) => {
  return RecallService.createRecall(clientId);
});

ipcMain.handle("updateRecallDate", (_, recallId: number, newDate: string) => {
  return RecallService.updateRecallDate(recallId, newDate);
});

ipcMain.handle("deleteRecall", (_, recallId: number) => {
  return RecallService.deleteRecall(recallId);
});
