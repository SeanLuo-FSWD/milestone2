console.log("JS loaded");

let imgUploaded;

const fileSelector = document.getElementById("myFile");
fileSelector.addEventListener("change", (event) => {
  imgUploaded = event.target.files;
  let image = document.getElementById("output");

  console.log("imgUploaded[0] " + imgUploaded[0]);
  image.src = URL.createObjectURL(imgUploaded[0]);
  console.log("file uploaded binaries? " + imgUploaded[0]);
  debugger;
  upload(imgUploaded[0]);
});

const uploadImg = (img) => {
  let image = document.getElementById("input");
  image.src = URL.createObjectURL(img);
};

const upload = (img) => {
  console.log("img img " + JSON.stringify(img));
  fetch("http://localhost:3000/", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ a: 1, b: "Textual content" }),
  })
    .then((response) => {
      if (response.status == 200) {
        return response;
      } else {
        throw new Error();
      }
    })
    .then(
      (responseData) => uploadImg(responseData.body) // Handle the success response object
    )
    .catch(
      (error) => console.log(error) // Handle the error response object
    );
};
