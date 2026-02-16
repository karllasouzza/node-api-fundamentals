export async function json(req, res) {
  if (req.headers["content-type"] !== "application/json") {
    return;
  }

  const buffers = [];

  for await (const chunk of req) {
    buffers.push(chunk);
  }

  try {
    req.body = JSON.parse(Buffer.concat(buffers).toString());
  } catch (error) {
    res
      .writeHead(400, { "Content-Type": "application/json" })
      .end(JSON.stringify({ error: "Invalid JSON" }));
  }
}
