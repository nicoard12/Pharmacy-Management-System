import { db } from "../database/database";
import type { ClientType } from "../database/database";

const statements = {
  getAll: db.prepare("SELECT * FROM clients"),
  getById: db.prepare("SELECT * FROM clients WHERE id = ?"),
  getByAffiliate: db.prepare(
    "SELECT * FROM clients WHERE UPPER(TRIM(affiliateNumber)) = UPPER(TRIM(?))",
  ),
  insert: db.prepare(`
    INSERT INTO clients (name, affiliateNumber, personInCharge, email, phone)
    VALUES (?, ?, ?, ?, ?)
  `),
  update: db.prepare(`
  UPDATE clients
  SET
    name = COALESCE(?, name),
    affiliateNumber = COALESCE(?, affiliateNumber),
    personInCharge = COALESCE(?, personInCharge),
    email = COALESCE(?, email),
    phone = COALESCE(?, phone),
    prescriptions = COALESCE(?, prescriptions)
  WHERE id = ?
`),
  delete: db.prepare("DELETE FROM clients WHERE id = ?"),
  updatePrescriptions: db.prepare(
    "UPDATE clients SET prescriptions = ? WHERE id = ?",
  ),
};

export const ClientRepository = {
  findAll: (): ClientType[] => {
    return statements.getAll.all() as ClientType[];
  },

  findByAffiliateNumber: (search: string): ClientType | undefined => {
    return statements.getByAffiliate.get(search) as ClientType | undefined;
  },

  save: (client: Omit<ClientType, "id">): ClientType => {
    const result = statements.insert.run(
      client.name,
      client.affiliateNumber,
      client.personInCharge ?? null,
      client.email ?? null,
      client.phone ?? null,
    );

    return {
      ...client,
      id: Number(result.lastInsertRowid),
    } as ClientType;
  },

  update: (client: ClientType): boolean => {
    const result = statements.update.run(
      client.name ?? undefined,
      client.affiliateNumber ?? undefined,
      client.personInCharge ?? undefined,
      client.email ?? undefined,
      client.phone ?? undefined,
      client.prescriptions ?? undefined,
      client.id,
    );

    return result.changes > 0;
  },

  delete: (id: number): boolean => {
    return statements.delete.run(id).changes > 0;
  },

  setPrescriptions: (id: number, prescriptions: string): boolean => {
    return statements.updatePrescriptions.run(prescriptions, id).changes > 0;
  },

  getPrescriptions: (id: number): string | null => {
    const row = statements.getById.get(id) as { prescriptions?: string };
    return row?.prescriptions ?? null;
  },
};
