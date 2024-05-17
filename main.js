// document.addEventListener("DOMContentLoaded", function () {
//   flatpickr("#date", {
//     dateFormat: "d-m-Y",
//   });
// });

//Get value
let userInput = document.getElementById("date");
userInput.max = new Date().toISOString().split("T")[0];
let result = document.getElementById("result");
//Get audio
function PlayAudio() {
  let audio = new Audio("./src/audios/boom.mp3");
  audio.play();
}
document.addEventListener("DOMContentLoaded", function () {
  let today = new Date();
  let day = ("0" + today.getDate()).slice(-2);
  let month = ("0" + (today.getMonth() + 1)).slice(-2);
  let year = today.getFullYear();
  let formattedDate = `${year}-${month}-${day}`;
  userInput.value = formattedDate;
});
function calculateAge() {
  PlayAudio();
  let birthDate = new Date(userInput.value);
  let d1 = birthDate.getDate();
  let m1 = birthDate.getMonth() + 1;
  let y1 = birthDate.getFullYear();

  let today = new Date();
  let d2 = today.getDate();
  let m2 = today.getMonth() + 1;
  let y2 = today.getFullYear();

  let d3, m3, y3;

  y3 = y2 - y1;
  if (m2 >= m1) {
    m3 = m2 - m1;
  } else {
    y3--;
    m3 = 12 + m2 - m1;
  }
  if (d2 >= d1) {
    d3 = d2 - d1;
  } else {
    m3--;
    d3 = getDaysInMonth(y1, m1) + d2 - d1;
  }
  if (m3 < 0) {
    m3 = 11;
    y3--;
  }
  result.innerHTML = `You have lived for <span>${y3}</span> year <span>${m3}</span> months <span>${d3}</span> day`;
}
//Get Date in Month
function getDaysInMonth(year, month) {
  return new Date(year, month, 0).getDate();
}
