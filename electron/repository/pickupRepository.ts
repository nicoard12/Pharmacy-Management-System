import { db } from "../database/database";
import { PickupType } from "../types";

const statements = {
  insert: db.prepare(`
    INSERT INTO pickups (clientId, date)
    VALUES (?, ?)
  `),

    updateDate: db.prepare(`
    UPDATE pickups
    SET date = ?
    WHERE id = ?
  `),

  getById: db.prepare(`
    SELECT * FROM pickups
    WHERE id = ?
  `),

  getByClientId: db.prepare(`
    SELECT * FROM pickups
    WHERE clientId = ?
    ORDER BY date DESC
  `),

  getAll: db.prepare(`
    SELECT * FROM pickups
    ORDER BY date DESC
  `),

  deleteById: db.prepare(`
    DELETE FROM pickups
    WHERE id = ?
  `),

  deleteByClientId: db.prepare(`
    DELETE FROM pickups
    WHERE clientId = ?
  `),
};

export const PickupRepository = {
  create: (clientId: number, date: string): PickupType => {
    const result = statements.insert.run(clientId, date);

    return {
      id: Number(result.lastInsertRowid),
      clientId,
      date,
    };
  },

  findById: (id: number): PickupType | undefined => {
    return statements.getById.get(id) as PickupType | undefined;
  },

  findByClientId: (clientId: number): PickupType[] => {
    return statements.getByClientId.all(clientId) as PickupType[];
  },

  findAll: (): PickupType[] => {
    return statements.getAll.all() as PickupType[];
  },

  updateDate: (pickupId: number, newDate: string): PickupType | undefined => {
    const pickup = statements.getById.get(pickupId) as PickupType | undefined;

    if (!pickup) return undefined;

    statements.updateDate.run(newDate, pickupId);

    return { ...pickup, date: newDate };
  },

  delete: (id: number): boolean => {
    return statements.deleteById.run(id).changes > 0;
  },

  deleteByClientId: (clientId: number): number => {
    return statements.deleteByClientId.run(clientId).changes;
  },
};
