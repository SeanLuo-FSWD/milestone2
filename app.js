const http = require("http");
const fs = require("fs");
// const fsp = fs.promises;
const path = require("path");
const { promises } = require("dns");

const hostname = "127.0.0.1";
const port = 3000;

http
  .createServer(function (request, response) {
    console.log("request ", request.url);

    const cssPath = "./public/main.css";
    const jsPath = "./public/main.js";
    let filePath = "." + request.url;

    if (filePath == "./") {
      filePath = "./public/index.html";
    }

    const readFilePromise = (fileToRead) => {
      let extname = String(path.extname(fileToRead)).toLowerCase();
      let mimeTypes = {
        ".html": "text/html",
        ".js": "text/javascript",
        ".css": "text/css",
        ".json": "application/json",
        ".png": "image/png",
      };
      let contentType = mimeTypes[extname] || "application/octet-stream";

      return new Promise((resolve, reject) => {
        fs.readFile(fileToRead, function (error, content) {
          if (error) {
            reject(error);
          } else {
            response.writeHead(200, { "Content-Type": contentType });
            if (contentType == "text/javascript") {
              console.log("end " + contentType);
              response.end(content, "utf-8");
            } else {
              console.log("write " + contentType);

              response.write(content, "utf-8");
            }
            resolve();
          }
        });
      });
    };

    readFilePromise(filePath)
      .then(() => readFilePromise(cssPath))
      .then(() => readFilePromise(jsPath))
      .catch((error) => {
        response.end(
          "Sorry, check with the site admin for error: " + error.code + " ..\n"
        );
      });
  })
  .listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
  });
