//Random color
function randomColor() {
  r = Math.floor(Math.random() * 255);
  g = Math.floor(Math.random() * 255);
  b = Math.floor(Math.random() * 255);
  return { r, g, b };
}
function toRad(deg) {
  return deg * (Math.PI / 180);
}
function randomRange(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
function easeOutSine(x) {
  return Math.sin((x * Math.PI) / 2);
}
function getPercent(input, min, max) {
  return ((input - min) * 100) / (max - min) / 100;
}

//Build Wheel
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const width = document.getElementById("canvas").width;
const height = document.getElementById("canvas").height;
const centerX = width / 2;
const centerY = height / 2;
const radius = width / 2;
let items = document.getElementsByTagName("textarea")[0].value.split("\n");
let currentDeg = 0;
let step = 360 / items.length;
let colors = [];
for (let i = 0; i < items.length + 1; i++) {
  colors.push(randomColor());
}
function createWheel() {
  items = document.getElementsByTagName("textarea")[0].value.split("\n");
  step = 360 / items.length;
  colors = [];
  for (let i = 0; i < items.length + 1; i++) {
    colors.push(randomColor());
  }
}
draw();
document.getElementById("textarea").addEventListener("blur", draw);
//Reset Wheel
function draw() {
  ctx.beginPath();
  ctx.arc(centerX, centerY, radius, toRad(0), toRad(360));
  ctx.fillStyle = `rgb(${33}, ${33}, ${33})`;
  ctx.lineTo(centerX, centerY);
  ctx.fill();
  let startDeg = currentDeg;
  for (let i = 0; i < items.length; i++, startDeg += step) {
    let endDeg = startDeg + step;
    color = colors[i];
    let colorStyle = `rgb(${color.r}, ${color.g}, ${color.b})`;

    ctx.beginPath();
    rad = toRad(360 / step);
    ctx.arc(centerX, centerY, radius - 2, toRad(startDeg), toRad(endDeg));
    let colorStyle2 = `rgb(${color.r - 30}, ${color.g - 30}, ${color.b - 30})`;
    ctx.fillStyle = colorStyle2;
    ctx.lineTo(centerX, centerY);
    ctx.fill();

    ctx.beginPath();
    rad = toRad(360 / step);
    ctx.arc(centerX, centerY, radius - 30, toRad(startDeg), toRad(endDeg));
    ctx.fillStyle = colorStyle;
    ctx.lineTo(centerX, centerY);
    ctx.fill();

    ctx.save();
    ctx.translate(centerX, centerY);
    ctx.rotate(toRad((startDeg + endDeg) / 2));
    ctx.textAlign = "center";
    if (color.r > 150 || color.g > 150 || color.b > 150) {
      ctx.fillStyle = "#000";
    } else {
      ctx.fillStyle = "#fff";
    }
    ctx.font = "bold 24px serif";
    ctx.fillText(items[i], 130, 10);
    ctx.restore();
    if (
      startDeg % 360 < 360 &&
      startDeg % 360 > 270 &&
      endDeg % 360 > 0 &&
      endDeg % 360 < 90
    ) {
      document.getElementById("winner").innerHTML = items[i];
    }
  }
}
//Winner hightlight
let blink = document.getElementById("winner");
let blinkblink = function () {
  blink.style.color = blink.style.color == "red" ? "white" : "red";
};
setInterval(blinkblink, 200);
function soundWinner() {
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
//Rolling Wheel
let speed = 0;
let maxRotation = randomRange(360 * 3, 360 * 6);
let pause = false;
function animate() {
  if (pause) {
    return;
  }
  speed = easeOutSine(getPercent(currentDeg, maxRotation, 0)) * 20;
  if (speed < 0.01) {
    speed = 0;
    pause = true;
    soundWinner();
    createFireworkEffect();
  }
  currentDeg += speed;
  draw();
  window.requestAnimationFrame(animate);
}
function spin() {
  if (speed != 0) {
    return;
  }
  currentDeg = 0;
  maxRotation = randomRange(360 * 3, 360 * 6);
  pause = false;
  window.requestAnimationFrame(animate);
}

//---------------------
function createFireworkEffect() {
  // Tạo canvas
  var fireworksCanvas = document.createElement("canvas");
  fireworksCanvas.id = "fireworksCanvas";
  fireworksCanvas.style.position = "fixed";
  fireworksCanvas.style.top = "0";
  fireworksCanvas.style.left = "0";
  fireworksCanvas.style.zIndex = "9999";
  fireworksCanvas.width = window.innerWidth;
  fireworksCanvas.height = window.innerHeight;
  document.body.appendChild(fireworksCanvas);

  // Lấy context của canvas
  var ctx = fireworksCanvas.getContext("2d");

  // Tạo mảng chứa các pháo hoa
  var fireworks = [];

  // Hàm vẽ pháo hoa
  function drawFirework() {
    ctx.clearRect(0, 0, fireworksCanvas.width, fireworksCanvas.height);

    // Vẽ mỗi pháo hoa trong mảng
    for (var i = 0; i < fireworks.length; i++) {
      fireworks[i].draw();
    }

    // Gọi hàm vẽ pháo hoa sau mỗi khoảng thời gian
    requestAnimationFrame(drawFirework);
  }

  // Class Firework
  function Firework() {
    this.x = Math.random() * fireworksCanvas.width;
    this.y = Math.random() * fireworksCanvas.height;
    this.color = `hsl(${Math.random() * 360}, 100%, 50%)`;
    this.radius = 3;
    this.speedY = Math.random() * 3 + 2;
  }

  Firework.prototype.draw = function () {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fillStyle = this.color;
    ctx.fill();
    this.y -= this.speedY;
    if (this.y < 0) {
      this.y = fireworksCanvas.height + this.radius;
      this.x = Math.random() * fireworksCanvas.width;
    }
  };

  // Tạo ra các pháo hoa mới và thêm vào mảng
  function createFirework() {
    var firework = new Firework();
    fireworks.push(firework);
  }

  // Tạo hiệu ứng pháo hoa
  setInterval(createFirework, 100);

  // Sau 3 giây, xóa canvas
  setTimeout(function () {
    document.body.removeChild(fireworksCanvas);
    document.getElementById("fireworksCanvas").style.left = 0;
  }, 3000);

  // Bắt đầu vẽ hiệu ứng pháo hoa
  drawFirework();
}