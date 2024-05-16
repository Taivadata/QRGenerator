const PI = 3.14159;
let radius;
let perimeter;
let area;

document.getElementById("submit").onclick = function () {
  radius = document.getElementById("radius").value;
  radius = Number(radius);
  if (radius === null) {
    window.alert("Please enter a radius");
  } else if (radius === 0) {
    window.alert("Please enter radius more than 0");
  } else {
    perimeter = 2 * PI * radius;
    document.getElementById("perimeter").textContent = perimeter.toFixed(2);
    area = PI * radius + radius;
    document.getElementById("area").textContent = area.toFixed(2);
  }
};
