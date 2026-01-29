export type ClientType = {
  id: number;
  name: string;
  affiliateNumber: string;
  personInCharge?: string;
  phone?: string;
  email?: string;
};

export const getClients = async (): Promise<ClientType[]> => {
  return await window.ipcRenderer.invoke("getClients");
};

export const createClient = async (
  client: Omit<ClientType, "id">,
): Promise<ClientType> => {
  try {
    return await window.ipcRenderer.invoke("createClient", client);
  } catch (error) {
    throw error;
  }
};

export const updateClient = async (client: ClientType): Promise<void> => {
  try {
    await window.ipcRenderer.invoke("updateClient", client);
  } catch (error) {
    throw error;
  }
};

export const deleteClient = async (clientId: number): Promise<void> => {
  try {
    await window.ipcRenderer.invoke("deleteClient", clientId);
  } catch (error) {
    throw error;
  }
};
