console.log("JS loaded");

let imgUploaded;

const fileSelector = document.getElementById("myFile");
fileSelector.addEventListener("change", (event) => {
  imgUploaded = event.target.files;

  let image = document.getElementById("output");
  image.src = URL.createObjectURL(imgUploaded[0]);
});

document.getElementById("convert").onclick = () => {
  imgUploaded
    ? convert(imgUploaded[0])
    : alert("please upload a png image first");
};

const uploadGreyImg = (eleId, img) => {
  let image = document.getElementById(eleId);
  let download = document.getElementById("download");
  let downloadBtn = document.getElementById("downloadBtn");

  img.lastModifiedDate = new Date();
  img.name = 'grayscale.png';

  blob = img.slice(0, img.size, "image/png");


  let imgUrl = URL.createObjectURL(blob);

  image.src = imgUrl;
  download.href = imgUrl;
  downloadBtn.style.display = "block";

};

const convert = (img) => {
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
      uploadGreyImg("input", responseData);
    })
    .catch(
      (error) => console.log(error) // Handle the error response object
    );
};
