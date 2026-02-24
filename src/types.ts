export type ClientType = {
  id: number;
  name: string;
  affiliateNumber: string;
  personInCharge?: string;
  phone?: string;
  email?: string;
  recalls?: RecallType[];
};

export type RecallType = {
  id: number;
  date: string;
};

export type ClientsAction =
  | { type: "CLIENTS_SET"; payload: ClientType[] }
  | { type: "CLIENT_CREATED"; payload: ClientType }
  | { type: "CLIENT_DELETED"; payload: { id: number } }
  | { type: "CLIENT_EDITED"; payload: ClientType }
  | { type: "RECALL_CREATED"; payload: { clientId: number; recall: { id: number; date: string } } }
  | { type: "RECALL_DATE_UPDATED"; payload: { clientId: number; recallId: number; date: string } }
  | { type: "RECALL_DELETED"; payload: { clientId: number; recallId: number } };