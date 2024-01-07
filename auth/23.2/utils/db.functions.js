import { readFileSync, writeFileSync } from "fs";
import { dirname, join } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const db = JSON.parse(
  readFileSync(join(__dirname, "../db/users.json")),
  "utf-8"
);

function loadDB() {
  return db;
}

function writeDB(db) {
  try {
    writeFileSync("./db/users.json", JSON.stringify(db));
  } catch (error) {
    throw error;
  }
}
export { loadDB , writeDB };
