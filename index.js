const http = require("http");
const hostname = "127.0.0.1";
const port = 8080;

const server = http.createServer((req, res) => {
  const path = req.url;
  const method = req.method;
  if (path === "/members") {
    if (method === "GET") {
      res.writeHead(200, { "Content-type": "application/json" });
      const user = JSON.stringify([
        {
          userId: "zxnm46",
          password: "alswns1513!",
        },
      ]);
      res.end(user);
    } else if (method === "POST") {
      res.end("생성되었습니다!");
    }
  }
});

server.listen(port, hostname);

console.log("gw_project_server on!!!");
