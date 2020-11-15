const fs = require("fs");
const formidable = require("formidable");

const greyscale = (req, res) => {
  console.dir(req);
  const form = formidable({ multiples: true });

  form.parse(req, (err, fields, files) => {
    console.log(fields + " inside parse " + files);

    if (err) {
      console.log("err " + err);
    } else {
      let oldPath = files.pngImg.path;

      let imgStream = fs.createReadStream(oldPath);

      imgStream.on("end", () => {
        console.log("finished reading");
      });

      imgStream.on("open", function () {
        imgStream.pipe(res).on("finish", function () {
          console.log("responded to client");
        });
      });

      imgStream.on("error", function (err) {
        console.log(err);
        res.end(err);
      });
    }
  });
};

module.exports = greyscale;
