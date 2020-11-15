const fs = require("fs");
const path = require("path");

const routing = (req, res) => {
    let filePath = "." + req.url;
    switch (filePath) {
      case "./main.css":
        filePath = "/public/main.css";
        res.writeHead(200, { "Content-type": "text/css" });
        break;
      case "./main.js":
        filePath = "/public/main.js";
        res.writeHead(200, { "Content-type": "application/javascript" });
        break;
      case "./":
        filePath = "/public/index.html";
        res.writeHead(200, { "Content-type": "text/html" });
    }

    fs.readFile(path.join(__basedir,filePath), function (error, content) {
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

module.exports = routing;