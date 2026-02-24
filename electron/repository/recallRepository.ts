import { db } from "../database/database";
import { RecallType } from "../types";

const statements = {
  insert: db.prepare(`
    INSERT INTO recalls (clientId, date)
    VALUES (?, ?)
  `),

    updateDate: db.prepare(`
    UPDATE recalls
    SET date = ?
    WHERE id = ?
  `),

  getById: db.prepare(`
    SELECT * FROM recalls
    WHERE id = ?
  `),

  getByClientId: db.prepare(`
    SELECT * FROM recalls
    WHERE clientId = ?
    ORDER BY date DESC
  `),

  getAll: db.prepare(`
    SELECT * FROM recalls
    ORDER BY date DESC
  `),

  deleteById: db.prepare(`
    DELETE FROM recalls
    WHERE id = ?
  `),

  deleteByClientId: db.prepare(`
    DELETE FROM recalls
    WHERE clientId = ?
  `),
};

export const RecallRepository = {
  create: (clientId: number, date: string): RecallType => {
    const result = statements.insert.run(clientId, date);

    return {
      id: Number(result.lastInsertRowid),
      clientId,
      date,
    };
  },

  findById: (id: number): RecallType | undefined => {
    return statements.getById.get(id) as RecallType | undefined;
  },

  findByClientId: (clientId: number): RecallType[] => {
    return statements.getByClientId.all(clientId) as RecallType[];
  },

  findAll: (): RecallType[] => {
    return statements.getAll.all() as RecallType[];
  },

  updateDate: (recallId: number, newDate: string): RecallType | undefined => {
    const recall = statements.getById.get(recallId) as RecallType | undefined;

    if (!recall) return undefined;

    statements.updateDate.run(newDate, recallId);

    return { ...recall, date: newDate };
  },

  delete: (id: number): boolean => {
    return statements.deleteById.run(id).changes > 0;
  },

  deleteByClientId: (clientId: number): number => {
    return statements.deleteByClientId.run(clientId).changes;
  },
};
