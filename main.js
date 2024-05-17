/* ==========            ========== */
/* ==========  SETTING   ========== */
/* ==========            ========== */
//Random Audio
function playAudio() {
  let audioFiles = [
    (audio = new Audio("./src/audios/omgwow.mp3")),
    (audio1 = new Audio("./src/audios/laughing-dog-meme.mp3")),
    (audio2 = new Audio("./src/audios/yeah-boy.mp3")),
    (audio3 = new Audio("./src/audios/oh-my-god-meme.mp3")),
  ];
  let randomIndex = Math.floor(Math.random() * audioFiles.length);
  let randomAudio = audioFiles[randomIndex];
  randomAudio.play();
}
//Hàm paste
function paste() {
  if (navigator.clipboard) {
    navigator.clipboard.readText().then((text) => {
      document.getElementById("qrText").value = text;
    });
  } else {
    alert("Please try again!");
  }
}
/* ==========            ========== */
/* ========== CUSTOM CSS ========== */
/* ==========            ========== */
//Show QR
let imgBox = document.getElementById("imgBox");
let qrImage = document.getElementById("qrImage");
let qrText = document.getElementById("qrText");
let reset = document.getElementById("reset");
//QR API
function generateQR() {
  if (qrText.value.length <= 0) {
    alert("Please enter your Text or URL!");
  } else if (qrText.value.length > 1000) {
    alert("Your Text or URL must be less than 1000 character!");
  } else {
    addWait();
    playAudio();
    qrImage.src =
      "https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=" +
      qrText.value;
  }
}
//Hàm refresh
function refresh() {
  qrImage.src = "";
  document.getElementById("wait").classList.remove("display-block", "light");
  qrText.value = "";
}
//Thêm chữ đợi
function addWait() {
  document.getElementById("wait").classList.add("display-block", "light"); // Sửa lỗi ở đây, phải sử dụng dấu phẩy để chia các class
}
