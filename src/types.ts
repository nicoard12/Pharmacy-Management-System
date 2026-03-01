export type ClientType = {
  id: number;
  name: string;
  affiliateNumber: string;
  personInCharge?: string;
  phone?: string;
  email?: string;
  pickups?: PickupType[];
};

export type PickupType = {
  id: number;
  date: string;
};

export type ClientsAction =
  | { type: "CLIENTS_SET"; payload: ClientType[] }
  | { type: "CLIENT_CREATED"; payload: ClientType }
  | { type: "CLIENT_DELETED"; payload: { id: number } }
  | { type: "CLIENT_EDITED"; payload: ClientType }
  | { type: "PICKUP_CREATED"; payload: { clientId: number; pickup: { id: number; date: string } } }
  | { type: "PICKUP_DATE_UPDATED"; payload: { clientId: number; pickupId: number; date: string } }
  | { type: "PICKUP_DELETED"; payload: { clientId: number; pickupId: number } };