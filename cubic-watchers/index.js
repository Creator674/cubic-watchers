const body = document.querySelector("body");
const colorBtn = document.querySelector(".color-button");
const discoBtn = document.querySelector(".disco-button");
const figureBtn = document.querySelector(".change-button");
const shadowBtn = document.querySelector(".shadow-button");
const watchers = document.querySelectorAll(".watcher");
const pcIcon = document.querySelector(".shadow-button--pc");
const shadowBtnIcon = document.querySelector(".shadow-button--icon");

const bodyBGC = ["#546de5", "#1B1464", "#6F1E51", "#5758BB", "#A3CB38", "#F79F1F", "#1289A7", "#f19066", "#c0392b", "#d35400", "#27ae60", "#1e272e", "#808e9b", "#3c40c6", "#ffa801", "#0fbcf9", "#2c2c54", "#cc8e35", "#b33939", "#227093", "#218c74", "#2C3A47", "#182C61", "#82589F"];
const watcherBGC = ["#778beb", "#0652DD", "#833471", "#9980FA", "#C4E538", "#FFC312", "#12CBC4", "#f3a683", "#e74c3c", "#e67e22", "#2ecc71", "#485460", "#d2dae2", "#575fcf", "#ffc048", "#4bcffa", "#40407a", "#ffb142", "#ff5252", "#34ace0", "#33d9b2", "#CAD3C8", "#3B3B98", "#D6A2E8"];
const forms = [
  "polygon(0 0, 100% 0, 100% 100%, 0 100%, 0 0, 0 0, 0 0, 0 0, 0 0, 0 0, 0 0, 0 0)",
  "polygon(50% 0%, 0% 100%, 100% 100%, 100% 100%, 100% 100%, 100% 100%, 100% 100%, 100% 100%, 100% 100%, 100% 100%, 100% 100%, 100% 100%)",
  "polygon(0 35%, 25% 35%, 25% 10%, 50% 10%, 50% 35%, 100% 35%, 100% 65%, 50% 65%, 50% 90%, 25% 90%, 25% 65%, 0 65%)",
  "polygon(20% 0%, 100% 20%, 100% 75%, 20% 100%, 0% 80%, 0% 20%, 0% 20%, 0% 20%, 0% 20%, 0% 20%, 0% 20%, 0% 20%)",
  "polygon(20% 0%, 100% 50%, 20% 100%, 0% 80%, 0% 20%,  0% 20%, 0% 20%, 0% 20%, 0% 20%, 0% 20%, 0% 20%, 0% 20%)",
  "polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%, 0% 50%, 0% 50%, 0% 50%, 0% 50%, 0% 50%, 0% 50%, 0% 50%, 0% 50%)",
  "polygon(0% 20%, 60% 20%, 60% 0%, 100% 50%, 60% 100%, 60% 80%, 0% 80%, 0% 80%, 0% 80%, 0% 80%, 0% 80%, 0% 80%)",
  "polygon(0 35%, 35% 35%, 35% 0%, 50% 0, 65% 35%, 100% 50%, 65% 65%, 50% 100%, 35% 100%, 35% 65%, 0 65%, 0% 65%)"
]



let isDisco = false;
let colorNumber = 1;

function changeBGC() {
  if(colorNumber >= bodyBGC.length){
    colorNumber = 0;
  }

  body.style.backgroundColor = bodyBGC[colorNumber];
  watchers.forEach(e => e.style.backgroundColor = watcherBGC[colorNumber]);
  if(isDisco) {
    setTimeout(() => changeBGC(), 1500);
  }

  colorNumber +=  1;
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



let formsCounter = Math.floor(Math.random() * forms.length) + 1;

figureBtn.addEventListener("click", () => {
  if(formsCounter === forms.length){
    formsCounter = 0;
  }

  figureBtn.style.backgroundColor = "black";
  setTimeout(() => {
    figureBtn.style.backgroundColor = "transparent";
  }, 500);

  watchers.forEach((e) => {
    e.style.clipPath = forms[formsCounter];
  })

  formsCounter += 1;
})

let isColoring = false;

function shadowHandler () {
  isColoring =! isColoring;
  if(isColoring) {
    shadowBtn.style.backgroundColor = "black";
  } else {
    shadowBtn.style.backgroundColor = "transparent";
  }
}

shadowBtn.addEventListener("click", shadowHandler);

document.addEventListener("mousemove", (e) => {
  const mouseX = e.pageX;
  const mouseY = e.pageY;

  if(isColoring){
    if(e.target.className === "watcher"){
      e.target.style.transition = "0s";
      e.target.style.backgroundColor = bodyBGC[colorNumber-1];

      setTimeout(() => {
        e.target.style.backgroundColor = watcherBGC[colorNumber-1];
        e.target.style.transition = "background-color 1s ease-in-out, clip-path 1s ease-in-out";
      }, 1500)
    }
  }

  watchers.forEach((sqr) => {
    const sqrX = sqr.offsetLeft + 20;
    const sqrY = sqr.offsetTop + 20;

    const diffX = mouseX - sqrX;
    const diffY = mouseY - sqrY;

    const radians = Math.atan2(diffY, diffX);

    const angle = (radians * 180) / Math.PI;
    sqr.style.transform = `rotate(${angle}deg)`;

  });
}, false);


document.addEventListener("touchmove", (e) => {
  const mouseX = e.touches[0].clientX;
  const mouseY = e.touches[0].clientY;

  if(isColoring){
    if(e.target.className === "watcher"){
      e.target.style.transition = "0s";
      e.target.style.backgroundColor = bodyBGC[colorNumber-1];

      setTimeout(() => {
        e.target.style.backgroundColor = watcherBGC[colorNumber-1];
        e.target.style.transition = "background-color 1s ease-in-out, clip-path 1s ease-in-out";
      }, 1500)
  }
  }

  watchers.forEach((sqr) => {
    const sqrX = sqr.offsetLeft + 20;
    const sqrY = sqr.offsetTop + 20;

    const diffX = mouseX - sqrX;
    const diffY = mouseY - sqrY;

    const radians = Math.atan2(diffY, diffX);

    const angle = (radians * 180) / Math.PI;
    sqr.style.transform = `rotate(${angle}deg)`;
  });
}, false);

if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
  pcIcon.style.display = "inline-block";
  shadowBtnIcon.style.display = "none";
  shadowBtn.removeEventListener('click', shadowHandler);
  shadowBtn.addEventListener("click", () => {
    pcIcon.classList.add('pc--animation');
    setTimeout(() => {
      pcIcon.classList.remove('pc--animation');
    }, 1000);
  })
  } else {
  pcIcon.style.display = "none";
  shadowBtnIcon.style.display = "inline-block";
}
