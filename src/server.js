import http from "node:http";
import { randomUUID } from "node:crypto";
import { json } from "./middlewares/json.js";
import { Database } from "./database/database.js";

const database = new Database();

const server = http.createServer(async (req, res) => {
  const { method, url } = req;

  await json(req, res);

  if (method === "GET" && url === "/users") {
    const USERS = database.select("users");

    return res
      .setHeader("Content-Type", "application/json")
      .end(JSON.stringify(USERS));
  }

  if (method === "POST" && url === "/users") {
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
  }

  res.writeHead(404, { "Content-Type": "text/plain" }).end("Not Found");
});

server.listen(3333, () => {
  console.log("Server is running on http://localhost:3333");
});
