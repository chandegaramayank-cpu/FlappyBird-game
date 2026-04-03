let gameRunning = false;

const img = document.querySelector("img");

document.addEventListener("keydown", (e) => {
  let left = img.offsetLeft;
  let top = img.offsetTop;

  // if (e.code === "ArrowRight") {
  //   img.style.left = left + 10 + "px";
  //   img.style.transform = "rotateY(0deg)";
  // } else if (e.code === "ArrowLeft") {
  //   img.style.left = left - 10 + "px";
  //   img.style.transform = "rotateY(180deg)";
  // } else if (e.code === "ArrowUp") {
  //   img.style.top = top - 10 + "px";
  // } else if (e.code === "ArrowDown") {
  //   img.style.top = top + 10 + "px";
  // } else if (e.code === "Space") {
  //   img.style.animation = "jump 0.5s ease";

  //   setTimeout(() => {
  //     img.style.animation = "";
  //   }, 500);
  // }
});

const ground = document.querySelector(".ground");
let x = 0;
function moveGround() {
  if (!gameRunning) return;
  x -= 5;
  ground.style.backgroundPosition = `${x}px`; //mathod.1
  //ground.style.backgroundPosition = x + "px 0px";  //mathod.2

  requestAnimationFrame(moveGround);
}
// moveGround();

const bird = document.querySelector(".bird");

let y = 200;
let velocity = 0;

function birdFall() {
  if (!gameRunning) return; //Sabse pehle code check karta hai ki "gameRunning (variable)" true hai ya nahi. Agar game khatam ho chuka hai ya paused hai, toh "return" ho jata hai, yani aage ka code nahi chalta.
  // gravity
  velocity += 0.5;
  y += velocity;

  bird.style.top = y + "px";

  checkCollision();

  requestAnimationFrame(birdFall);
}

document.addEventListener("keydown", (e) => {
  if (e.code === "Space" && gameRunning) {
    velocity = -8;
  }
});
// birdFall();

const btn = document.createElement("button");{


btn.innerText = "Click Me";
btn.style.position = "absolute";
btn.style.borderRadius = "20px";
btn.style.border = "none";
btn.style.height = "100px";
btn.style.width = "200px";
btn.style.top = "45%";
btn.style.left = "45%"; 
}
btn.onclick = () => {
  gameRunning = true;

  moveGround();
  birdFall();
  movePipes()
  btn.style.display = "none";
};

document.body.appendChild(btn);





const topPipe = document.querySelector(".top")
const bottomPipe = document.querySelector(".bottom");

let pipeX =window.innerWidth
let gap =150

function setPipeHeight() {
  let randomTop = Math.random() * 500;
 

  topPipe.style.height = randomTop + "px";
  bottomPipe.style.height = window.innerHeight - randomTop - gap + "px";
}

function movePipes() {
  if (!gameRunning) return;

  pipeX -= 5;

  topPipe.style.left = pipeX + "px";
  bottomPipe.style.left = pipeX + "px";

  // reset pipe
  if (pipeX < -60) {
    pipeX = window.innerHeight;
    setPipeHeight(); // new random gap
  }

  requestAnimationFrame(movePipes);
}

// start once
setPipeHeight();
// movePipes();






function checkCollision() {
  let screenHeight = window.innerHeight;
  let birdHeight = bird.clientHeight;

  // TOP collision
  if (y <= 0) {
    restartGame();
  }

  //bottom collision
  if (y >= screenHeight - birdHeight) {
    restartGame();
  }

  
}
checkCollision();

const gameOversound = new Audio("./faaa0_6.mp3")
function restartGame() {
  gameRunning = false;

  gameOversound.play()
  console.log("FAAA")
  
  setTimeout(()=>{
    location.reload();
  },1200)
  
}
