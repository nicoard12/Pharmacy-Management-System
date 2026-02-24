export type RecallType = {
  id: number;
  date: string;
};

export const createRecall = async (
  clientId: number,
): Promise<RecallType> => {
  return await window.ipcRenderer.invoke("createRecall", clientId);
};
