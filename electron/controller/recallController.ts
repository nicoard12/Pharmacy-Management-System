import { ipcMain } from "electron";
import { RecallService } from "../services/recallService";

ipcMain.handle("createRecall", (_, clientId: number) => {
  return RecallService.createRecall(clientId);
});