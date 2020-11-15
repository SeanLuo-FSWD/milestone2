console.log("JS loaded");

let imgUploaded;

const fileSelector = document.getElementById("myFile");
fileSelector.addEventListener("change", (event) => {
  imgUploaded = event.target.files;
  uploadImg("output", imgUploaded[0]);

  // debugger;
  upload(imgUploaded[0]);
});

const uploadImg = (eleId, img) => {
  let image = document.getElementById(eleId);
  image.src = URL.createObjectURL(img);
};

const upload = (img) => {
  let formData = new FormData();
  formData.append("pngImg", img);

  fetch("http://localhost:3000/upload", {
    method: "POST",
    // headers: {
    //   "Content-Type": "multipart/form-data",
    // },
    body: formData,
  })
    .then((response) => {
      if (response.status == 200) {
        return response.blob();
      } else {
        throw new Error();
      }
    })
    .then((responseData) => {
      console.log("responseData  responseData  ");

      console.log(responseData);
      uploadImg("input", responseData);
    })
    .catch(
      (error) => console.log(error) // Handle the error response object
    );
};
