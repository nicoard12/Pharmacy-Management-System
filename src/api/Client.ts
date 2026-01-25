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
