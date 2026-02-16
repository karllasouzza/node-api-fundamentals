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

  select(table, search) {
    console.log(search);
    const data = this.#database[table] ?? [];
    if (search) {
      return data.filter((row) =>
        Object.entries(search).some(([key, value]) =>
          row[key].toLowerCase().includes(value.toLowerCase()),
        ),
      );
    }
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

  update(table, id, data) {
    const rowIndex = this.#database[table].findIndex((item) => item.id === id);

    if (rowIndex === -1) {
      return;
    }

    if (rowIndex > -1) {
      this.#database[table][rowIndex] = {
        ...this.#database[table][rowIndex],
        ...data,
      };
      this.#persist();
      return;
    }
  }

  delete(table, id) {
    const rowIndex = this.#database[table].findIndex((item) => item.id === id);

    if (rowIndex === -1) {
      return;
    }

    if (rowIndex > -1) {
      this.#database[table].splice(rowIndex, 1);
      this.#persist();
      return;
    }
  }
}
