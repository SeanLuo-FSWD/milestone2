console.log("JS loaded");

let imgUploaded;

const fileSelector = document.getElementById("myFile");
fileSelector.addEventListener("change", (event) => {
  imgUploaded = event.target.files;
  let image = document.getElementById("output");

  console.log("imgUploaded[0] " + imgUploaded[0]);
  image.src = URL.createObjectURL(imgUploaded[0]);
  // debugger;
  upload(imgUploaded[0]);
});

const uploadImg = (img) => {
  let image = document.getElementById("input");
  image.src = URL.createObjectURL(img);
};

const upload = (img) => {
  let formData = new FormData();
  formData.append("pngImg", img);

  fetch("http://localhost:3000/upload", {
    method: "POST",
    // headers: {
    //   Accept:
    //     "application/json, application/xml, text/plain, text/html, image/png, *.*",
    //   "Content-Type": "multipart/form-data",
    // },
    // headers: {
    //   "Content-Type": "image/png",
    //   "content-length": img.size,
    // },
    body: formData,
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
