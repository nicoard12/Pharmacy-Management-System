import Database from "better-sqlite3";
import path from "node:path";
import { app } from "electron";

const isDev = process.env.NODE_ENV === "development";

const dbPath = isDev 
  ? path.join(process.cwd(), "PMS.db")
  : path.join(app.getPath("userData"), "PMS.db");

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

  CREATE TABLE IF NOT EXISTS pickups (
    id INTEGER PRIMARY KEY,
    clientId INTEGER NOT NULL,
    date TEXT NOT NULL,
    FOREIGN KEY (clientId) REFERENCES clients(id) ON DELETE CASCADE
  );
`);

