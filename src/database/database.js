import fs from "node:fs";

const databasePath = new URL("db.json", import.meta.url);


export class Database {
  #database = {};

  constructor() {
    try {
      const data = fs.readFileSync(databasePath, "utf-8");
      this.#database = JSON.parse(data);
    } catch (error) {
      this.#persist();
    }
  }

  #persist() {
    fs.writeFileSync(databasePath, JSON.stringify(this.#database));
  }

  select(table) {
    const data = this.#database[table] ?? [];
    return data;
  }

  insert(table, data) {
    if (Array.isArray(this.#database[table])) {
      this.#database[table].push(data);
    } else {
      this.#database[table] = [data];
    }
    this.#persist();
    return data;
  }
}
