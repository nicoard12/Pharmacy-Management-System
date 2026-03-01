import { PickupType } from "../types";

export const createPickup = async (
  clientId: number,
): Promise<PickupType> => {
  return await window.ipcRenderer.invoke("createPickup", clientId);
};

export const updatePickupDate = async (
  pickupId: number,
  newDate: string,
): Promise<PickupType> => {
  return await window.ipcRenderer.invoke("updatePickupDate", pickupId, newDate);
};

export const deletePickup = async (
  pickupId: number
): Promise<void> => {
  return await window.ipcRenderer.invoke("deletePickup", pickupId);
}
