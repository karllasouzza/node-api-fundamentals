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
    return res.end("Create a new user");
  }

  res.end("Hello, World!");
});

server.listen(3333, () => {
  console.log("Server is running on http://localhost:3333");
});
