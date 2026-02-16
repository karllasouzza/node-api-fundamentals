import http from "node:http";

const USERS = [];
const server = http.createServer((req, res) => {
  const { method, url } = req;

  if (method === "GET" && url === "/users") {
    return res
      .setHeader("Content-Type", "application/json")
      .end(JSON.stringify(USERS));
  }

  if (method === "POST" && url === "/users") {
    USERS.push({ id: 1, name: "John Doe", email: "john.doe@example.com" });
    return res.writeHead(201, { "Content-Type": "application/json" }).end();
  }

  res.writeHead(404, { "Content-Type": "text/plain" }).end("Not Found");
});

server.listen(3333, () => {
  console.log("Server is running on http://localhost:3333");
});
