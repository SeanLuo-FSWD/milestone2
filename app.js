const http = require("http");
const fs = require("fs");
const path = require("path");
const { promises } = require("dns");
const formidable = require("formidable");

const hostname = "127.0.0.1";
const port = 3000;
const cssPath = "./public/main.css";
const jsPath = "./public/main.js";

const server = http.createServer(function (req, res) {
  let filePath = "." + req.url;

  if (req.method.toLowerCase() === "post") {
    console.log("req body " + req.body);
    const form = formidable({ multiples: true });

    form.parse(req, (err, fields, files) => {
      let buf = Buffer.from(JSON.stringify({ fields, files }, null, 2));
      res.writeHead(200, { "content-type": "image/png" });
      res.end(buf);
    });

    return;
  } else {
    switch (filePath) {
      case "./main.css":
        filePath = "./public/main.css";
        res.writeHead(200, { "Content-type": "text/css" });
        break;
      case "./main.js":
        filePath = "./public/main.js";
        res.writeHead(200, { "Content-type": "application/javascript" });
        break;
      case "./":
        filePath = "./public/index.html";
        res.writeHead(200, { "Content-type": "text/html" });
    }

    fs.readFile(filePath, function (error, content) {
      if (error) {
        if (filePath == "./favicon.ico") {
          res.writeHead(200, { "Content-Type": "image/x-icon" });
          res.end();
          return;
        } else {
          res.end(
            "Sorry, check with the site admin for error: " + error + " ..\n"
          );
        }
      } else {
        res.end(content, "utf-8");
      }
    });
  }
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
