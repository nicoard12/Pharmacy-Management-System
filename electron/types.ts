export type ClientType = {
  id: number;
  name: string;
  affiliateNumber: string;
  personInCharge?: string;
  phone?: string;
  email?: string;
  prescriptions?: string;
};

export type RecallType = {
  id: number;
  clientId?: number;
  date: string;
}; 

export type ClientWithRecallsType = ClientType & {
  recalls: RecallType[];
};