const fs = require("fs");
const formidable = require("formidable");
const PNG = require("pngjs").PNG;
const { pipeline } = require("stream");

const greyscale = (req, res) => {
  const form = formidable({ multiples: true });

  form.parse(req, (err, fields, files) => {
    console.log(fields + " inside parse " + files);

    if (err) {
      console.log("err " + err);
    } else {
      let oldPath = files.pngImg.path;
      let imgStream = fs.createReadStream(oldPath);
      let newPNG = new PNG({
        filterType: 4,
      });

      newPNG.on("parsed", function () {
        console.log("parsed");
        for (let y = 0; y < this.height; y++) {
          for (let x = 0; x < this.width; x++) {
            let idx = (this.width * y + x) << 2;
            let grey =
              this.data[idx] * 0.299 +
              this.data[idx + 1] * 0.587 +
              this.data[idx + 2] * 0.114;

            this.data[idx] = grey;
            this.data[idx + 1] = grey;
            this.data[idx + 2] = grey;
          }
        }

        let greyImg = this.pack().pipe(res);
        greyImg.on("error", (err) => {
          console.log(err);
        });
        greyImg.on("finish", () => {
          console.log("Greyscale images saved");
        });
      });

      pipeline(imgStream, newPNG, function onEnd(err) {
        if (err) {
          console.log(`Error: ${err}`);
          process.exit(1);
        }
        console.log("Done!");
      });
    }
  });
};

module.exports = greyscale;
