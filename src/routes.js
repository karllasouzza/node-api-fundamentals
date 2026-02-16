import { randomUUID } from "node:crypto";
import { Database } from "./database/database.js";
import { buildRoutePath } from "./utils/build-route-path.js";

const database = new Database();

export const routes = [
  {
    method: "GET",
    path: buildRoutePath("/users"),
    handler: (req, res) => {
      const { search } = req.query || {};
      const USERS = database.select(
        "users",
        search
          ? {
              name: search,
              email: search,
            }
          : undefined,
      );

      return res
        .setHeader("Content-Type", "application/json")
        .end(JSON.stringify(USERS));
    },
  },
  {
    method: "POST",
    path: buildRoutePath("/users"),
    handler: (req, res) => {
      const { name, email } = req.body || {};

      if (!name || !email) {
        return res
          .writeHead(400, { "Content-Type": "application/json" })
          .end(JSON.stringify({ error: "Name and email are required" }));
      }

      const user = {
        id: randomUUID(),
        name,
        email,
      };

      database.insert("users", user);

      return res
        .writeHead(201, { "Content-Type": "application/json" })
        .end(JSON.stringify(user));
    },
  },
  {
    method: "PUT",
    path: buildRoutePath("/users/:id"),
    handler: (req, res) => {
      const { id } = req.params || {};
      const { name, email } = req.body || {};

      database.update("users", id, { name, email });

      return res.end();
    },
  },
  {
    method: "DELETE",
    path: buildRoutePath("/users/:id"),
    handler: (req, res) => {
      const { id } = req.params || {};

      database.delete("users", id);

      return res.end();
    },
  },
];
