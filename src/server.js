import http from "node:http";

const USERS = [];
const server = http.createServer(async (req, res) => {
  const { method, url } = req;

  const buffers = [];
  for await (const chunk of req) {
    buffers.push(chunk);
  }

  try {
    req.body = JSON.parse(Buffer.concat(buffers).toString());
  } catch {
    req.body = null;
  }

  if (method === "GET" && url === "/users") {
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
      id: USERS.length,
      name,
      email,
    };

    USERS.push(user);

    return res
      .writeHead(201, { "Content-Type": "application/json" })
      .end(JSON.stringify(user));
  }

  res.writeHead(404, { "Content-Type": "text/plain" }).end("Not Found");
});

server.listen(3333, () => {
  console.log("Server is running on http://localhost:3333");
});
