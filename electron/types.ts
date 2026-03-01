export type ClientType = {
  id: number;
  name: string;
  affiliateNumber: string;
  personInCharge?: string;
  phone?: string;
  email?: string;
  prescriptions?: string;
};

export type PickupType = {
  id: number;
  clientId?: number;
  date: string;
}; 

export type ClientWithPickupsType = ClientType & {
  pickups: PickupType[];
};