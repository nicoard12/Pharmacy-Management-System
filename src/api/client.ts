export type RecallType = {
  id: number;
  date: Date;
};

export type ClientType = {
  id: number;
  name: string;
  affiliateNumber: string;
  personInCharge?: string;
  phone?: string;
  email?: string;
  recalls: RecallType[];

};

export const getClients = async (): Promise<ClientType[]> => {
  return await window.ipcRenderer.invoke("getClients");
};

export const createClient = async (
  client: Omit<ClientType, "id">,
): Promise<ClientType> => {
  return await window.ipcRenderer.invoke("createClient", client);
};

export const updateClient = async (client: ClientType): Promise<void> => {
  await window.ipcRenderer.invoke("updateClient", client);
};

export const deleteClient = async (clientId: number): Promise<void> => {
  await window.ipcRenderer.invoke("deleteClient", clientId);
};

export const savePrescriptions = async (
  prescription: string,
  clientId: number,
): Promise<boolean> => {
  return await window.ipcRenderer.invoke(
    "savePrescriptions",
    clientId,
    prescription,
  );
};

export const getPrescriptions = async (
  clientId: number,
): Promise<string> => {
  return await window.ipcRenderer.invoke("getPrescriptions", clientId) || "";
};
