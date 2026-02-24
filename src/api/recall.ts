import { RecallType } from "../types";

export const createRecall = async (
  clientId: number,
): Promise<RecallType> => {
  return await window.ipcRenderer.invoke("createRecall", clientId);
};

export const updateRecallDate = async (
  recallId: number,
  newDate: string,
): Promise<RecallType> => {
  return await window.ipcRenderer.invoke("updateRecallDate", recallId, newDate);
};

export const deleteRecall = async (
  recallId: number
): Promise<void> => {
  return await window.ipcRenderer.invoke("deleteRecall", recallId);
}
