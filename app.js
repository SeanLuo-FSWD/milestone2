global.__basedir = __dirname;
const http = require("http");

const greyscale = require("./api/greyscale.js");
const routing = require("./views/router.js");

const hostname = "127.0.0.1";
const port = 3000;

const server = http.createServer(function (req, res) {
  if (req.method.toLowerCase() === "post") {
    greyscale(req, res);
  } else {
    routing(req, res);
  }
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
