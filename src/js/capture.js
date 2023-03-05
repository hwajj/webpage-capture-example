import html2canvas from "html2canvas";

const button = document.querySelector("#image-capture-button");
button.onclick = () => {
  html2canvas(document.querySelector("#image-capture")).then((canvas) => {
    let el = document.getElementById("image-target");
    el.href = canvas.toDataURL("image/jpeg");
    el.download = "rose.jpg";
    el.click();
    // let base64image = canvas.toDataURL("image/png");
    // window.open(base64image, "_blank");
  });
};
