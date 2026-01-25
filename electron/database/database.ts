export let db = [
  [
    {
      id: 1,
      name: "John Doe",
      affiliateNumber: "AFF12345",
      email: "random@example.com",
      phone: "1234567890",
    },
    {
      id: 2,
      name: "Juan Carlos",
      affiliateNumber: "AFF67890",
      personInCharge: "Maria Garcia",
      email: "random2@example.com",
      phone: "321654222",
    },
  ],
];

export type ClientType = {
  id: number;
  name: string;
  affiliateNumber: string;
  personInCharge?: string;
  phone?: string;
  email?: string;
};
