import { ipcMain } from "electron";
import { PickupService } from "../services/pickupService";

ipcMain.handle("createPickup", (_, clientId: number) => {
  return PickupService.createPickup(clientId);
});

ipcMain.handle("updatePickupDate", (_, pickupId: number, newDate: string) => {
  return PickupService.updatePickupDate(pickupId, newDate);
});

ipcMain.handle("deletePickup", (_, pickupId: number) => {
  return PickupService.deletePickup(pickupId);
});
