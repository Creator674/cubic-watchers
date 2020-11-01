const colorBtn = document.querySelector(".color-button");
const discoBtn = document.querySelector(".disco-button");
const body = document.querySelector("body");
const watchers = document.querySelectorAll(".watcher");


const bodyBGC = ["", "#1B1464", "#6F1E51", "#5758BB", "#A3CB38", "#F79F1F", "#1289A7", "#f19066", "#c0392b", "#d35400", "#27ae60", "#1e272e", "#808e9b", "#3c40c6", "#ffa801", "#0fbcf9", "#2c2c54", "#cc8e35", "#b33939", "#227093", "#218c74", "#2C3A47", "#182C61", "#82589F"];
const watcherBGC = ["", "#0652DD", "#833471", "#9980FA", "#C4E538", "#FFC312", "#12CBC4", "#f3a683", "#e74c3c", "#e67e22", "#2ecc71", "#485460", "#d2dae2", "#575fcf", "#ffc048", "#4bcffa", "#40407a", "#ffb142", "#ff5252", "#34ace0", "#33d9b2", "#CAD3C8", "#3B3B98", "#D6A2E8"];

let isDisco = false;
let colorNumber = Math.floor(Math.random() * bodyBGC.length) + 1;

function changeBGC() {
  if(colorNumber === bodyBGC.length){
    colorNumber = 0;
  }

  body.style.backgroundColor = bodyBGC[colorNumber];
  watchers.forEach(e => e.style.backgroundColor = watcherBGC[colorNumber]);
  if(isDisco) {
    setTimeout(() => changeBGC(), 1500);
  }

  colorNumber += 1;
}

colorBtn.addEventListener("click", () => {
  colorBtn.style.backgroundColor = "black";
  setTimeout(() => {
    colorBtn.style.backgroundColor = "transparent";
  }, 500)
  changeBGC();
});
discoBtn.addEventListener("click", () => {
  isDisco = !isDisco;
  changeBGC();
  if(isDisco) {
    discoBtn.style.backgroundColor = "black";
  } else {
    discoBtn.style.backgroundColor = "transparent";
  }
});

document.addEventListener("mousemove", (e) => {
  const sqrs = document.querySelectorAll(".watcher");

  const mouseX = e.pageX;
  const mouseY = e.pageY;

  sqrs.forEach((sqr) => {
    const sqrX = sqr.offsetLeft + 20;
    const sqrY = sqr.offsetTop + 20;

    const diffX = mouseX - sqrX;
    const diffY = mouseY - sqrY;

    const radians = Math.atan2(diffY, diffX);

    const angle = (radians * 180) / Math.PI;
    sqr.style.transform = `rotate(${angle}deg)`;
  });
}, false);