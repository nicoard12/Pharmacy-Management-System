import Database from "better-sqlite3";
import path from "node:path";
import { app } from "electron";

const isDev = process.env.NODE_ENV === "development";

const dbPath = isDev 
  ? path.join(process.cwd(), "PMS.db") // En desarrollo: Raíz del proyecto
  : path.join(app.getPath("userData"), "PMS.db"); // En producción: Carpeta de datos de usuario

export const db = new Database(dbPath);
db.exec(`
  CREATE TABLE IF NOT EXISTS clients (
    id INTEGER PRIMARY KEY,
    name TEXT NOT NULL,
    affiliateNumber TEXT NOT NULL,
    personInCharge TEXT,
    phone TEXT,
    email TEXT,
    prescriptions TEXT
  );
`);

export type ClientType = {
  id: number;
  name: string;
  affiliateNumber: string;
  personInCharge?: string;
  phone?: string;
  email?: string;
  prescriptions?: string;
};
